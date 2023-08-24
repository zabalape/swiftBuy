const { Order, User, Product } = require("../../db");
const { sendPurchaseEmail } = require("../../utils/email");
const mercadopago = require("mercadopago");

const receiveWebHook = async (req, res) => {
  try {
    // mercadopago.configure({
    //   access_token: process.env.MP_TOKEN,
    // });

    const payment = req.body;

    const preferenceId = payment.preference_id;
    const status = payment.status;
    const refid = payment.orderId;

    if (!preferenceId || !status) {
      return res
        .status(400)
        .json({ error: "Missing preference_id or status in the request body" });
    }

    if (status === "failure" || status === "pending") {
      // Actualizar estado y preferenceId según el estado
      const order = await Order.findOne({
        where: { preferenceId: preferenceId },
      });
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      order.status = status;
      order.preferenceId = preferenceId;
      await order.save();
    }

    if (status === "success") {
      const id = refid;

      const filters = {
        external_reference: refid,
      };

      const response = await mercadopago.payment.search({
        qs: filters,
      });

      const data = response.body;

      const order = await Order.findOne({ where: { id: id } });

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      order.status = status;
      order.save();

      if (order.status === "success") {
        await Promise.all(
          order.products.map(async (product) => {
            const item = await Product.findByPk(product.id);

            if (!item) {
              return res
                .status(404)
                .json({ error: `Product not found with id: ${product.id}` });
            }

            const newStock =
              item.stock >= 1 ? item.stock - product.quantity : 0;
            if (newStock < 0) {
              throw new Error("Stock cannot be negative");
            }

            item.stock = newStock;
            await item.save();
          })
        );

        const user = await User.findByPk(order.userId);
        await sendPurchaseEmail(user, order);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

module.exports = receiveWebHook;

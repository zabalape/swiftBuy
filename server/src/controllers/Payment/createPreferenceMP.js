const { User } = require("../../db");
const mercadopago = require("mercadopago");

const createPreference = async (req, res) => {
  try {
    mercadopago.configure({
      access_token: process.env.MP_TOKEN,
    });

    const { items, shipinfo, transaction_amount, userId } = req.body;

    let user;
    if (userId) {
      user = await User.findByPk(userId);
    }
    const newOrder =
      user &&
      (await user.createOrder({
        total: transaction_amount,
        userId,
        products: items,
      }));
    var preference = {
      shippinginfo: shipinfo,
      transaction_amount,
      items,
      back_urls: {
        success: `${process.env.FRONT_URL}success`,
        failure: `${process.env.FRONT_URL}failure`,
        pending: `${process.env.FRONT_URL}pending`,
      },
      external_reference: newOrder ? `${newOrder.id}` : "",
    };

    const response = await mercadopago.preferences.create(preference);
    const data = response.body;
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
};

module.exports = createPreference;

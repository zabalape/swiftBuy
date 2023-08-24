const server = require("./src/server");
const { conn } = require("./src/db.js");
const axios = require("axios");
const bcryptjs = require("bcryptjs");

const { Product, User } = require("./src/db");
const PORT = 3001;

conn
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, async () => {
      const dataProducts = await axios.get("http://localhost:5000/products");
      const dataUsers = await axios.get("http://localhost:5000/users");

      let idHard = "SKU000";

      const dataPasswordHash = dataUsers.data.map((user) => {
        return {
          ...user,
          password: bcryptjs.hashSync(user.password, 10),
        };
      });

      const products = dataProducts.data.map((product) => {
        let number = parseInt(idHard.split("U")[1]);
        number = number + 1;
        if (number >= 100) {
          idHard = idHard;
          return {
            ...product,
            id: `SKU${number}`,
          };
        }
        if (number < 10) {
          idHard = `SKU00${number}`;
          return {
            ...product,
            id: idHard,
          };
        }
        idHard = `SKU0${number}`;
        return {
          ...product,
          id: idHard,
        };
      });

      await Product.bulkCreate(products);
      await User.bulkCreate(dataPasswordHash);

      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));

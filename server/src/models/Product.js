const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Product", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    color: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    image_public_id: {
      type: DataTypes.STRING,
    },
    image_secure_url: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    rating: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    averageRating:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    genre: {
      type: DataTypes.STRING,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};

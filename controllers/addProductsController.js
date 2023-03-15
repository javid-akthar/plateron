const ClientDiscount = require("../models/discount");
const Products = require("../models/product");

module.exports.sheduleDiscount = async function (req, res) {
  try {
    let { smartphone, laptop } = require("../testData");
    await Products.deleteMany({});
    let products = await Products.insertMany([smartphone, laptop]);
  }catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      const errorMessage = Object.values(error.errors).map(val => val.message).join(', ');
      return res.status(404).json({ error: errorMessage });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

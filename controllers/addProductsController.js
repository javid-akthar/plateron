const ClientDiscount = require("../models/discount");
const Products = require("../models/product");

module.exports.sheduleDiscount = async function (req, res) {
  try {
    let { smartphone, laptop } = require("../testData");
    await Products.deleteMany({});
    let products = await Products.insertMany([smartphone, laptop]);
  } catch (err) {
    console.log(err);
  }
};

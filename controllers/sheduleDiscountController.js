const Discount = require("../models/discount");
const Product = require("../models/product");

module.exports.sheduleDiscount = async function (req, res) {
  try {
    let product = "";
    if (req.body) {
      console.log(req.body.discountData.length);
      let discountData = req.body.discountData;
      for(let i=0; i<discountData.length; i++){
        let currDiscountData = discountData[i];
        let brandArray = Array.from(currDiscountData.brandName);
        for(let k=0; k<brandArray.length; k++){
            console.log('dd', currDiscountData.brandName);
            currDiscountData.brandName = brandArray[k];
            console.log(currDiscountData);
            discount = await Discount.findOneAndUpdate({categoryName : currDiscountData.categoryName,brandName: currDiscountData.brandName  },currDiscountData, { upsert: true, new: true });
        }
        // let category = currDiscountData.categoryName;
        //  product = await Product.findOneAndUpdate({category}, {discountData : discount._id})
      }
    }
    return res.status(200).json({discount : req.body, product});
  } catch (err) {
    console.log(err);
  }
};

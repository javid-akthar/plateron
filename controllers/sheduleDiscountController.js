const Discount = require("../models/discount");
const Product = require("../models/product");

module.exports.sheduleDiscount = async function (req, res) {
  try {
    let product = "";
    if (req.body) {
      console.log(req.body.discountData.length);
      let discountData = req.body.discountData;
      let discount = [];
      for (let i = 0; i < discountData.length; i++) {
        let currDiscountData = discountData[i];
        let brandArray = Array.from(currDiscountData.brandName);
        for (let k = 0; k < brandArray.length; k++) {
          console.log("dd", currDiscountData.brandName);
          currDiscountData.brandName = brandArray[k];
          console.log(currDiscountData);

          let newDocument = new Discount(currDiscountData);
          
          let status = await newDocument.validate();
          console.log(status);

            await Discount.findOneAndDelete({
              categoryName: currDiscountData.categoryName,
              brandName: currDiscountData.brandName,
            });
          tempDiscount = await Discount.findOneAndUpdate(
            {
              categoryName: currDiscountData.categoryName,
              brandName: currDiscountData.brandName,
            },
            currDiscountData,
            {
              upsert: true,
              new: true,
              runValidators: true
              // validateBeforeSave: true,
            }
          );
          discount.push(tempDiscount);
        }
        // let category = currDiscountData.categoryName;
        //  product = await Product.findOneAndUpdate({category}, {discountData : discount._id})
      }
      return res.status(200).json({ discount });
    }
    // return res.status(200).json({discount});
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      const errorMessage = Object.values(error.errors)
        .map((val) => val.message)
        .join(", ");
      return res.status(404).json({ error: errorMessage });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

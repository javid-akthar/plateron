const moment = require("moment");
const Product = require("../models/product");
const Discount = require("../models/discount");
const ItemSchema = require("../models/itemSchema");
const _ = require("lodash");

function isValidDateFormat(dateString) {
  return moment(dateString, "DD-MM-YYYY", true).isValid();
}

module.exports.categoriesList = async function (req, res) {
  try {
    const categoryId = req.params["categoryid"];
    const date = req.query.date;

    // checking if date is valid or not
    if (!isValidDateFormat(date)) {
      console.log(date, " date is in invalid format");
      return res.status(404).json({
        message: "invalid date",
      });
    }

    // getting the products from the product collection
    let products = await Product.findOne({ category: categoryId });
    if(!products){
      console.log(date, " categories value is invalid");
      return res.status(404).json({
        message: "invalid category",
      });
    }
    
    products = products.toJSON();
    // let ansObj = _.cloneDeep(products);

    for (let i = 0; i < products.itemDetails.length; i++) {
      console.log({
        category: categoryId,
        brand: products.itemDetails[i].brand,
      });

      // for the given category and brandname getting the discount details
      let discount = await Discount.findOne({
        categoryName: categoryId,
        brandName: products.itemDetails[i].brand,
      });

      if (
        discount &&
        discount.discountTimeType &&
        discount.discountTimeType === "date" &&
        discount.startDate &&
        discount.endDate
      ) {
        const isInRange = isDateInRange(
          date,
          discount.startDate,
          discount.endDate
        );
        console.log(isInRange); // true
        if (isInRange) {
          discountInStartAndEndDate(products, discount, i)
        }
      }

      if (discount && discount.discountTimeType === "day") {
        let day = dayFinder(date);
        if (discount.days.includes(day)) {
          discountInDaysUpdate(products, discount, i)
        }
      }
    }
    console.log(products.itemDetails.length);
    const allItems = products.itemDetails.flatMap((details) => details.item);  
    return res.status(200).json(allItems);
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      const errorMessage = Object.values(error.errors).map(val => val.message).join(', ');
      return res.status(404).json({ error: errorMessage });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

function discountInStartAndEndDate(products, discount, i){
  for (let j = 0; j < products.itemDetails[i].item.length; j++) {
    products.itemDetails[i].item[j].discountPercentage =
      discount.discountPercentage;
    products.itemDetails[i].item[j].discountedPrice = applyDiscount(
      products.itemDetails[i].item[j].totalprice,
      discount.discountPercentage
    );
  }
}

function discountInDaysUpdate(products, discount, i){
  for (let j = 0; j < products.itemDetails[i].item.length; j++) {
    console.log(discount.discountPercentage);
    console.log(products.itemDetails[i].item[j]);
    products.itemDetails[i].item[j].discountPercentage =
      discount.discountPercentage;
    products.itemDetails[i].item[j].discountedPrice = applyDiscount(
      products.itemDetails[i].item[j].totalprice,
      discount.discountPercentage
    );
  }
}

function applyDiscount(price, discountPercentage) {
  const discountAmount = (price * discountPercentage) / 100;
  const discountedPrice = price - discountAmount;
  return discountedPrice;
}

function dayFinder(dateString) {
  const dateParts = dateString.split("-");
  const day = new Date(
    +dateParts[2],
    +dateParts[1] - 1,
    +dateParts[0]
  ).getDay();
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const dayOfWeek = daysOfWeek[day];
  console.log(dayOfWeek);
  return dayOfWeek;
}

function isDateInRange(dateString, startDateString, endDateString) {
  const dateParts = dateString.split("-");
  const startDateParts = startDateString.split("-");
  const endDateParts = endDateString.split("-");
  const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  const startDate = new Date(
    +startDateParts[2],
    startDateParts[1] - 1,
    +startDateParts[0]
  );
  const endDate = new Date(
    +endDateParts[2],
    endDateParts[1] - 1,
    +endDateParts[0]
  );
  return date >= startDate && date <= endDate;
}

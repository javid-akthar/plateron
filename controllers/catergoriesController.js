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
    if (!isValidDateFormat(date)) {
      console.log(date, " date is in invalid format");
      return res.status(404).json({
        message: "invalid date",
      });
    }
    let products = await Product.findOne({ category: categoryId });
    products = products.toJSON();
    let ansObj = _.cloneDeep(products);

    for (let i = 0; i < products.itemDetails.length; i++) {
      console.log({
        category: categoryId,
        brand: products.itemDetails[i].brand,
      });
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
          for (let j = 0; j < products.itemDetails[i].item.length; j++) {
            console.log(discount.discountPercentage);
            console.log(ansObj.itemDetails[i].item[j]);
            console.log(products.itemDetails[i].item[j]);
            products.itemDetails[i].item[j].discountPercentage =
              discount.discountPercentage;
            products.itemDetails[i].item[j].priceAfterDiscount = applyDiscount(
              products.itemDetails[i].item[j].totalprice,
              discount.discountPercentage
            );
          }
        }
      }

      if (discount && discount.discountTimeType === "day") {
        let day = dayFinder(date);
        if (discount.days.includes(day)) {
          console.log("day present");
          console.log("ansObj", ansObj);
          console.log("ansObjansObj", products.itemDetails[i].item);
          for (let j = 0; j < products.itemDetails[i].item.length; j++) {
            console.log(discount.discountPercentage);
            console.log(ansObj.itemDetails[i].item[j]);
            // let a = products.itemDetails[i].item[j];
            console.log(products.itemDetails[i].item[j]);
            products.itemDetails[i].item[j].discountPercentage =
              discount.discountPercentage;
            products.itemDetails[i].item[j].priceAfterDiscount = applyDiscount(
              products.itemDetails[i].item[j].totalprice,
              discount.discountPercentage
            );
          }
        }
      }
    }
    console.log(products.itemDetails.length);

    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: "invalid",
    });
  }
};

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

function dateCheck(dateToCheck, startDate, endDate) {
  console.log(dateToCheck);
  console.log(startDate);
  console.log(endDate);
  // Sample date to check
  dateToCheck = "14-03-2023";

  // Start and end dates
  startDate = "01-01-2023";
  endDate = "31-12-2023";

  // Convert dates to timestamp for comparison
  const dateToCheckTimestamp = new Date(dateToCheck).getTime();
  // const startDateTimestamp = new Date(startDate).getTime();
  // const endDateTimestamp = new Date(endDate).getTime();
  const startDateTimestamp = new Date(startDate).getTime();
  const endDateTimestamp = new Date(endDate).getTime();
  console.log(dateToCheckTimestamp, startDateTimestamp, endDateTimestamp);
  // Check if dateToCheck falls within the range
  if (
    dateToCheckTimestamp >= startDateTimestamp &&
    dateToCheckTimestamp <= endDateTimestamp
  ) {
    console.log("Date falls within the range.");
  } else {
    console.log("Date is outside the range.");
  }
}

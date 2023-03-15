const mongoose = require("mongoose");
const moment = require("moment");

// startDate: {
//     type: Date,
//     required: true,
//     get: (value) => {
//       return value ? moment(value).format('DD-MM-YYYY') : null;
//     },
//     set: (value) => {
//       return value ? moment(value, 'DD-MM-YYYY').toDate() : null;
//     }
//   },
//   endDate: {
//     type: Date,
//     required: true,
//     get: (value) => {
//       return value ? moment(value).format('DD-MM-YYYY') : null;
//     },
//     set: (value) => {
//       return value ? moment(value, 'DD-MM-YYYY').toDate() : null;
//     }
//   }

const discountDataSchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  brandName: { type: String, required: true },
  discountTimeType: { type: String, enum: ["date", "day"], required: true },
  days: [
    {
      type: String,
      enum: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
    },
  ],
  Location: { type: String, required: true },
  CountryTimeFormat: { type: String, required: true },
  startDate: {
    type: Date,
    // validate: {
    //   validator: function (v) {
    //     return moment(v, "DD-MM-YYYY", true).isValid();
    //   },
    //   message: "Invalid date format, must be in DD-MM-YYYY",
    // },
    get: (value) => {
      return value ? moment(value).format("DD-MM-YYYY") : null;
    },
    set: (value) => {
      return value ? moment(value, "DD-MM-YYYY").toDate() : null;
    },
  },
  endDate: {
    type: Date,
    // validate: {
    //   validator: function (v) {
    //     return moment(v, "DD-MM-YYYY", true).isValid();
    //   },
    //   message: "Invalid date format, must be in DD-MM-YYYY",
    // },
    get: (value) => {
      return value ? moment(value).format("DD-MM-YYYY") : null;
    },
    set: (value) => {
      return value ? moment(value, "DD-MM-YYYY").toDate() : null;
    },
  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  discountPercentage: { type: Number, required: true },
});

// const discountSchema = new mongoose.Schema({
//   clientId: { type: String, required: true },
//   discountData: [discountDataSchema],
// });

// const Discount = mongoose.model("Discount", discountSchema);

// const clientDiscountSchema = new mongoose.Schema({
//   // clientId: { type: String, required: true },
//   discountData: { type: [discountDataSchema], required: true },
// });

const Discount = mongoose.model("Discount", discountDataSchema);

module.exports = Discount;

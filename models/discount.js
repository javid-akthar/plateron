const mongoose = require("mongoose");
const moment = require("moment");

const daysEnum = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const discountDataSchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  brandName: { type: String, required: true },
  discountTimeType: {
    type: String,
    enum: ["date", "day"],
    required: true,
    set: function (val) {
      return val.toLowerCase();
    },
  },
  days: [
    {
      type: String,
      enum: [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
      set: function (val) {
        return val.toLowerCase();
      },
      required: function () {
        return this.discountTimeType === "day";
      },
    },
  ],
  Location: { type: String, required: true },
  CountryTimeFormat: { type: String, required: true },
  startDate: {
    type: Date,
    required: function () {
      return this.discountTimeType === "date";
    },
    get: (value) => {
      return value ? moment(value).format("DD-MM-YYYY") : null;
    },
    set: (value) => {
      return value ? moment(value, "DD-MM-YYYY").toDate() : null;
    },
  },
  endDate: {
    type: Date,
    required: function () {
      return this.discountTimeType === "date";
    },
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
},

);

discountDataSchema.path("days").validate(function (value) {
  return this.discountTimeType !== "day" || (value && value.length > 0);
}, "At least one day is required if discountTimeType is day");

const Discount = mongoose.model("Discount", discountDataSchema);

module.exports = Discount;

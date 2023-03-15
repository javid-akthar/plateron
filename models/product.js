const mongoose = require('mongoose');
// const ClientDiscount = require('./clientDiscount');

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  totalprice: {
    type: Number,
    required: true,
  }
});

const itemDetailsSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  item: [{
    type: itemSchema,
    required: true,
  }],

});

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  itemDetails: {
    type: [itemDetailsSchema],
    required: true,
  },
  discountData : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Discount'
  }
});

const Products = mongoose.model('Products', productSchema);

module.exports = Products;

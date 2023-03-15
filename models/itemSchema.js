const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true
  },
  brandId: {
    type: String,
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountedPrice: {
    type: Number,
    required: true
  },
  discountedPercentage: {
    type: Number,
    required: true
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;

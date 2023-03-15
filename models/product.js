const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  totalprice: {
    type: Number,
    required: true,
  }
  
},{
  // Define a default projection to exclude _id
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;
      return ret;
    }
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

},{
  // Define a default projection to exclude _id
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;
      return ret;
    }
  }
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
},{
  // Define a default projection to exclude _id
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const Products = mongoose.model('Products', productSchema);

module.exports = Products;

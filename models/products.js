const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: Number,
  imageUrl: String,
  description: String
});

const Product = mongoose.model('Product', productSchema);

//When this file is required, that other file will get the file constructor
module.exports = Product;

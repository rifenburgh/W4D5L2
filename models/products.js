const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');


const productSchema = new Schema({
  name: {type: String, required: [true, 'You did not enter anything'] },
  price: {type: Number, required: true},
  imageUrl: String,
  description: String,
  reviews: [ Review.schema ],
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number
  }
});
  //reviews includes the reviews as a subdocument for each products reviews (and it's structure)
  //address would be another sub-document to the Product Schema
const Product = mongoose.model('Product', productSchema);

//When this file is required, that other file will get the file constructor
module.exports = Product;

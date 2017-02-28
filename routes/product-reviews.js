const express = require('express');
const Review = require('../models/review.js');
const Product = require('../models/products.js');
const reviewRoutes = express.Router();

reviewRoutes.get('/product-reviews/:productId/review/new', (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (err, item) => {
    if (err) {
      next(err);
      return;
    }
    res.render('product-reviews/new', {
      product: item
    });
  });
});
reviewRoutes.post('/product-reviews/:productId/reviews', (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (err, item) => {
    if (err) {
      next (err);
      return;
    }
    const reviewInfo = {
      content: req.body.content,
      stars: req.body.stars,
      author: req.body.author
    };
    const newReview = new Review(reviewInfo);
    item.reviews.push(newReview);
    item.save((err) => {
      if (err){
        next (err);
        return;
      }
      res.redirect(`products/${productId}`);

    });
  });
});
reviewRoutes.get('/product-reviews/:productId/show', (req, res, next) => {
  const productId = params.body.productId;
  Product.findById(productId, (err, item) => {
    if (err) {
      next (err);
      return;
    }
    res.render('product-reviews/show');
  });
});


module.exports = reviewRoutes;

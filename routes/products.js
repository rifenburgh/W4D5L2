//Building the Products Routes

const express = require('express');
const Product = require('../models/products.js');
const router = express.Router();  //Can be used by as if you were using app.route

router.get('/products', (req, res, next) => {
  // res.send('Products List Page');
  Product.find({},{}, (err, products) => {
    if (err) {
      next(err);  //if there is an error go to the 'next' item in the loop
      return;
    }
    //this will display the views/products/index.ejs file
    res.render('products/index', {
      products: products
    });
  });
});

//Forms need two routes, one to display a form and another to recieve the data
router.get('/products/new', (req, res, next) => {
  res.render('products/new', {});
});

router.post('/products/new', (req, res, next) => {
  const productInfo = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl
  };
  const theProduct = new Product(productInfo);
  theProduct.save((err) => {
    if (err) {
      next (err);
      return;
    }
    res.redirect('/products');
  });
});

router.get('/products/remove', (req, res, next) => {});

router.get('/products/:id', (req, res, next) => {});


//This file must be required/imported by app.js
module.exports = router;

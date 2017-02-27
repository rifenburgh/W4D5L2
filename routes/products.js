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
    //without redirecting, the user could re-submit the form by refreshing
    res.redirect('/products');
  });
});

router.get('/products/remove', (req, res, next) => {});

//This will establish a route to a product details page for each item in the store
//This route needs to be after the 'NEW' route, potentially at the end of all of the routes
//req.params will query the parameters
router.get('/products/:id', (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId, (err, prodDoc) => {
    if (err) {
      next(err);
      return;
    }
    res.render('products/show', {
      product: prodDoc.name,
      id: prodDoc._id,
      price: prodDoc.price,
      description: prodDoc.description
    });
  });
});

router.get('/products/:id/edit', (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId, (err, prodDoc) => {

    if (err) {
      next(err);
      return;
    }
    res.render('products/edit', {
      item: prodDoc,
      name: prodDoc.name,
      product: prodDoc.name,
      price: prodDoc.price,
      description: prodDoc.description,
      id: prodDoc._id
    });
  });
});
router.post('/products/:id', (req, res, next) => {
  const productId = req.params.id;
  const productUpdates = {
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    desrciption: req.body.description
  };
  Product.findByIdAndUpdate(productId, productUpdates, (err, products) => {
  // if(err) {
  //   next(err);
  //   return;
  // }
  res.redirect('/products');
  });
});
router.post('/products/:id/delete', (req, res, next) => {
  const productId = req.params.id;
  //mongo conversion completing db.products.deleteOne({_id: productId})
  Product.findByIdAndRemove(productId, (err, prodDoc) => {
    if (err) {
      next (err);
      return;
    }
    res.redirect('/products');
  });

});


//This file must be required/imported by app.js
module.exports = router;

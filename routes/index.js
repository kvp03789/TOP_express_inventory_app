const express = require('express');
const router = express.Router();
const ItemModel = require('../models/item')


/* GET home page. */
router.get('/', (req, res, next) => {

  const categoriesArray = [] //USE THIS TO DYNAMICALLY DISPLAY TABS
  //GET ALL CATEGORIES AND PUSH TO ARRAY, PASS ARRAY TO VIEW

  ItemModel.find()
    .then((items) => {
      res.render('index', { title: 'Express', items })
    })
  
})

module.exports = router;

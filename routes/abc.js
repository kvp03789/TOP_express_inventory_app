const express = require('express');
const router = express.Router();
const ItemModel = require('../models/item')
const Category = require('../models/category')
const NPC = require("../models/npc")

/* GET home page. */
router.get('/', (req, res, next) => {
  Promise.all([
    Category.find(),
    ItemModel.find()
        .sort({name: 1}),
    NPC.find()
  ]).then((values) => {
    //console.log(values)
    res.render('index', { title: "APInventory", items: values[1], categoriesArray: values[0], npcsArray: values[2] })
  })
  
  
})

module.exports = router;

const express = require('express');
const router = express.Router();
const ItemModel = require('../models/item')
const Category = require('../models/category')
const NPC = require('../models/npc')

//DELETE ITEM
router.get('/delete/:id', async (req, res, next) => {
  await ItemModel.findOneAndRemove({ _id: req.params.id })  
  const items = await ItemModel.find();
  const categoriesArray = await Category.find()
  res.render('index', { title: "APInventory", items, categoriesArray })

})

/* GET home page. */
router.get('/', (req, res, next) => {
  Promise.all([
    Category.find(),
    ItemModel.find(),
    NPC.find()
  ]).then((values) => {
    //console.log(values)
    res.render('index', { title: "APInventory", items: values[1], categoriesArray: values[0], npcsArray:values[2] })
  })
})

module.exports = router;

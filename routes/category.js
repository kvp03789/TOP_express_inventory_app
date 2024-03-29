const express = require('express');
const router = express.Router();
const ItemModel = require('../models/item')
const Category = require('../models/category')
const NPC = require('../models/npc')


router.get("/:cid", (req, res, next) => {
    Promise.all([
        Category.find(),
        ItemModel.find({category: `${req.params.cid}`})
            .populate("category"),
        NPC.find()
      ]).then((values) => {
        //console.log(values)
        res.render('index', { title: "APInventory", items: values[1], categoriesArray: values[0], npcsArray: values[2] })
      })
})

module.exports = router
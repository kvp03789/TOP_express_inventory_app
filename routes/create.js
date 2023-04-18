const express = require('express');
const router = express.Router();
const Item = require('../models/item')
const Category = require('../models/category')
const NPC = require('../models/npc')
const async = require('async')

router.post('/category', (req, res, next) => {
    Promise.all([
        Category.find(),
        Item.find()
    ]).then(async (results) => {
        const newName = new Category({name: req.body.name});
        await newName.save()
        Category.find().then(updatedCategories => {
            res.render('index', {title: 'APInventory', items: results[1], categoriesArray: updatedCategories})
        })
    })
})

router.post('/', (req, res, next) => {
    Promise.all([
        Category.find(),
        Item.find(),
        NPC.find()
    ]).then(async (values) => {
        const categoryList = values[0];
        const npcList = values[2]
        const categoryString = req.body.category
        const npcString = req.body.npc
        let categoryIdValue = '';
        categoryList.forEach(item => {
            if(item.name === categoryString){
                categoryIdValue = item._id
            }
        })
        let npcIdValue = ''
        npcList.forEach(npc => {
            if(npc.name === npcString){
                npcIdValue = npc._id
            }
        })
        const newItem = new Item({
            name: req.body.name,
            priceGold: parseInt(req.body.priceGold),
            priceSilver: parseInt(req.body.priceSilver),
            priceCopper: parseInt(req.body.priceCopper),
            category: categoryIdValue,
            rarity: req.body.rarity.toLowerCase(),
            availabilty: req.body.availability,
            npc: npcIdValue,
            imgPath: req.body.imgPath
        })

        await newItem.save()
        Item.find().then((updatedItems) => {
            res.render('index', {title: "APInventory", items: updatedItems, categoriesArray: values[0], npcsArray: values[2]})
        })
    })    
})

router.post('/npc', async (req, res, next)=> {
    const newNpc = new NPC({name: req.body.name})
    await newNpc.save()
    Promise.all([
        NPC.find(),
        Category.find(),
        Item.find()
    ]).then(values => {
        res.render('index', {title: "APInventory", items: values[2], categoriesArray:  values[1], npcsArray: values[0]})
    })
})

module.exports = router;
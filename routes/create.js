const express = require('express');
const router = express.Router();
const Item = require('../models/item')
const Category = require('../models/category')
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
        Item.find()
    ]).then(async (values) => {
        const categoryList = values[0];
        const categoryString = req.body.category
        let categoryIdValue = '';
        categoryList.forEach(item => {
            if(item.name === categoryString){
                categoryIdValue = item._id
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
            imgPath: req.body.imgPath
        })
        await newItem.save()
        Item.find().then((updatedItems) => {
            res.render('index', {title: "APInventory", items: updatedItems, categoriesArray:  values[0]})
        })
    })
      
    



    // Category.find()
    //     .then(results => {
    //         const categoryList = results;
    //         const categoryString = req.body.category
    //         let categoryIdValue = '';
    //         categoryList.forEach(item => {
    //             if(item.name === categoryString){
    //                 categoryIdValue = item._id
    //             }
    //         })
    //         const newItem = new Item({
    //             name: req.body.name,
    //             priceGold: parseInt(req.body.priceGold),
    //             priceSilver: parseInt(req.body.priceSilver),
    //             priceCopper: parseInt(req.body.priceCopper),
    //             category: categoryIdValue,
    //             rarity: req.body.rarity.toLowerCase(),
    //             availabilty: req.body.availability,
    //             imgPath: req.body.imgPath
    //         })
    //         try{
    //             newItem.save()
    //         }
    //         catch{err => {
    //             res.next(err)
    //         }}
    //     })
    
    // Item.find()
    //     .then(items => {
    //         res.render('index', {title: "APInventory", items})
    //     })
    
})

module.exports = router;
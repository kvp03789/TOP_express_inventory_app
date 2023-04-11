#! /usr/bin/env node
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  const connectToDatabase = require('./database')
  const Item = require("./models/item");
  const Category = require("./models/category")
  
  const items = [];
  const categoriesArray = []

  async function categoryCreate(name) {
    const category = new Category({name: name})
    await category.save()
    categoriesArray.push(category)
    console.log(`category added: ${category}, here's the array: ${categoriesArray}`)
  }
  
  async function itemCreate(name, priceGold, priceSilver, priceCopper, category, rarity, availability, imgPath) {
    const item = new Item( {name, priceGold, priceSilver, priceCopper, category, rarity, availability, imgPath});
    await item.save();
    items.push(item);
    console.log(`Added item: ${name}`);
  }

  async function createItems() {
    console.log("Adding items");
    await Promise.all([
      itemCreate("Crystal Vial", 0, 1, 0, categoriesArray[0], "common", 5, "/images/items/item_vial.jpg"),
      itemCreate("Lesser Healing Potion", 0, 1, 5, categoriesArray[2], "common", 3, "/images/items/item_potion.jpg"),
      itemCreate("Executioner's Sword", 1, 50, 25, categoriesArray[1], "rare", 1, "/images/items/item_sword.jpg"),
      itemCreate("Imbued Vial", 3, 0, 0, categoriesArray[0],"uncommon", 2, "/images/items/item_vial.jpg"),
      itemCreate("Earthroot", 0, 0, 72, categoriesArray[0], "common", 3, "/images/items/item_root.jpg"),
      itemCreate("Owl Bracers", 0, 35, 40, categoriesArray[1], "uncommon", 1, "/images/items/item_bracers.jpg")
    ]);
  }

  async function createCategories() {
    console.log("Adding categories")
    await Promise.all([
      categoryCreate("crafting"),
      categoryCreate("equipment"),
      categoryCreate("consumable")
    ])
  }

  async function connectAndPopulateDb() {
    connectToDatabase()
    await Item.deleteMany({})
    await Category.deleteMany({})
    await createCategories();   
    await createItems();
  }
  
  module.exports = connectAndPopulateDb
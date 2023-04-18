#! /usr/bin/env node
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  const connectToDatabase = require('./database')
  const Item = require("./models/item");
  const Category = require("./models/category")
  const NPC = require("./models/npc")

  const items = [];
  const categoriesArray = []
  const npcs = []

  async function categoryCreate(name) {
    const category = new Category({name: name})
    await category.save()
    categoriesArray.push(category)
    console.log(`Added Category: ${name}`)
  }
  
  async function itemCreate(name, priceGold, priceSilver, priceCopper, category, rarity, availability, npc, imgPath) {
    const item = new Item( {name, priceGold, priceSilver, priceCopper, category, rarity, availability, npc, imgPath});
    await item.save();
    items.push(item);
    console.log(`Added item: ${name}`);
  }

  async function npcCreate(name){
    const newNpc = new NPC( {name} )
    await newNpc.save();
    npcs.push(newNpc)
    console.log(`Added NPC: ${name}`)
  }

  async function createItems() {
    console.log("--Adding items--");
    await Promise.all([
      itemCreate("Crystal Vial", 0, 1, 0, categoriesArray[0], "common", 5, npcs[0], "/images/items/item_vial.jpg"),
      itemCreate("Lesser Healing Potion", 0, 1, 5, categoriesArray[2], "common", 3, npcs[0], "/images/items/item_potion.jpg"),
      itemCreate("Executioner's Sword", 1, 50, 25, categoriesArray[1], "rare", 1, npcs[0], "/images/items/item_sword.jpg"),
      itemCreate("Imbued Vial", 3, 0, 0, categoriesArray[0],"uncommon", 2, npcs[0], "/images/items/item_vial.jpg"),
      itemCreate("Earthroot", 0, 0, 72, categoriesArray[0], "common", 3, npcs[0], "/images/items/item_root.jpg"),
      itemCreate("Owl Bracers", 0, 35, 40, categoriesArray[1], "uncommon", 1, npcs[0], "/images/items/item_bracers.jpg")
    ]);
  }

  async function createCategories() {
    console.log("--Adding categories--")
    await Promise.all([
      categoryCreate("crafting"),
      categoryCreate("equipment"),
      categoryCreate("consumable")
    ])
  }

  async function createNpcs() {
    console.log("--Adding NPC's--")
    await Promise.all([
      // npcCreate("Barkeep Dobbins"),
      // npcCreate("Brother Danil"),
      // npcCreate("Quartermaster Hudson"),
      npcCreate("Antonio Perelli")
    ])
  }

  async function connectAndPopulateDb() {
    connectToDatabase()
    await Item.deleteMany({})
    await Category.deleteMany({})
    await NPC.deleteMany({})
    await createNpcs()
    console.log(npcs)
    await createCategories();   
    await createItems();
  }
  
  module.exports = connectAndPopulateDb
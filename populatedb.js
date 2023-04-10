#! /usr/bin/env node
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  const connectToDatabase = require('./database')
  const Item = require("./models/item");
  const Category = require("./models/category")
  
  const items = [];
  const categories = []
  
  const mongoose = require("mongoose");
  
  async function itemCreate(name, price, rarity, availability) {
    const item = new Item({ name, price, rarity, availability});
    await item.save();
    items.push(item);
    console.log(`Added item: ${name}`);
  }

  async function categoryCreate(name) {
    const category = new Category({name: name})
    await category.save()
    categories.push(category)
    console.log(`category added: ${category}`)
  }
  
  async function createItems() {
    console.log("Adding items");
    await Promise.all([
      itemCreate("Crystal Vial", "1s", "common", 5),
    ]);
  }

  async function createCategories() {
    console.log("Adding categories")
    categoryCreate("crafting")
  }

  async function connectAndPopulateDb() {
    connectToDatabase()
    await createCategories();
    await createItems();
    
  }
  
  module.exports = connectAndPopulateDb
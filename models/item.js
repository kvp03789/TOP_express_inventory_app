const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {type: String, unique: true},
    price: {type: String},
    // category: {type: Schema.Types.ObjectId, ref: "Category"},
    rarity: {type: String, enum: ["common", "uncommon", "rare"], default: "common"},
    availability: Number
})

const itemModel = mongoose.model("item", itemSchema)

module.exports = itemModel
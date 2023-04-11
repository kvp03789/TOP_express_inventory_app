const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {type: String, required: true},
    priceGold: {type: Number, required: true},
    priceSilver: {type: Number, required: true},
    priceCopper: {type: Number, required: true},
    category: {type: Schema.Types.ObjectId, ref: "Category", required: true},
    rarity: {type: String, enum: ["common", "uncommon", "rare"], default: "common"},
    availability: Number,
    imgPath: {type: String}
})

//CONSIDER USING MAP SCHEMA TYPE FOR COST DENOMINATIONS!!!??

itemSchema.virtual("url").get(function(){
    return `/all/${this._id}`
})


const itemModel = mongoose.model("item", itemSchema)

module.exports = itemModel
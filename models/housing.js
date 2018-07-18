const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const STATES    = require("./states");
const User     = require("./User");
const ObjectId = Schema.ObjectId;

const houseSchema = new Schema({
  title: String,
  price: Number,
  motive: { type: String, enum: ['Rent','Sale']},
  state: String,
  ownerOfPost: String,
  imagePath: String,
  imageName: String ,
  description: String,
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const HOUSING = mongoose.model("Housing", houseSchema);

module.exports = HOUSING;
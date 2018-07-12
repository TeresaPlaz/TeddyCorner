const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const State    = require("./states");
const User     = require("./User");
const ObjectId = Schema.ObjectId;

const houseSchema = new Schema({
  title: String,
  price: String,
  state: [{ type : ObjectId, ref: 'State' }],
  ownerOfPost: [{ type : ObjectId, ref: 'User' }],
  image : String,
  description: String,
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const HOUSING = mongoose.model("Housing", houseSchema);

module.exports = HOUSING;
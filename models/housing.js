const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const User     = require("./User");

const houseSchema = new Schema({
  title: String,
  price: Number,
  motive: { type: String, enum: ['Rent','Sale']},
  state: String,
  ownerOfPost: { type: Schema.Types.ObjectId, ref: 'Users' },
  imagePath: String,
  imageName: String ,
  pets: { type: String, default: "No"},
  laundry: { type: String, default: "No"},
  available: { type: String, default: "No"},
  description: String,
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const HOUSING = mongoose.model("Housing", houseSchema);

module.exports = HOUSING;
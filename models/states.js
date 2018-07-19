const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const stateSchema = new Schema({
  name: String,
  acronym: String,
  classifieds: [{ type: Schema.Types.ObjectId, ref: 'Housing' }]
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const STATES = mongoose.model("States", stateSchema);

module.exports = STATES;
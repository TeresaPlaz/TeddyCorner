const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true; });

const userSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['ADMIN', 'User'],
    default: 'User'
  },
  classifieds: [{ type: Schema.Types.ObjectId, ref: 'Housing' }]
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
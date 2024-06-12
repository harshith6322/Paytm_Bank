const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

const Userschema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  lastname: { type: String, required: true, trim: true, maxLength: 50 },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: { type: String, required: true, minLength: 6 },
  creationAt: { type: Date, default: Date.now },
});

const Bankschema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  Balance: { type: Number, required: true },
});

const Historyschema = new mongoose.Schema({
  // From: { type: String, required: true },
  // To: { type: String, required: true },
  Date: { type: Date, default: Date.now },
  Amount: { type: String, required: true },
  FromID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ToID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});
const User = mongoose.model("User", Userschema);
const Bank = mongoose.model("Bank", Bankschema);
const History = mongoose.model("History", Historyschema);

module.exports = {
  User,
  Bank,
  History,
};

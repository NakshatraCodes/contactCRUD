const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  avatar: {
    type: Buffer,
    required: true,
  },
});

mongoose.model("contacts", contactSchema);

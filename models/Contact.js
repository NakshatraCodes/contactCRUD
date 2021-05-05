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
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    data: Buffer,
    contentType: String,
  },
});

mongoose.model("contacts", contactSchema);

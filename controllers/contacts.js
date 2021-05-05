const mongoose = require("mongoose");
const Contact = mongoose.model("contacts");
const multer = require("multer");

const avatar = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/))
      return cb(new Error("This is not a correct format of the file"));
    cb(undefined, true);
  },
});

const getContacts = async (req, res) => {
  try {
    const allContacts = await Contact.find({});
    console.log(allContacts);
    if (allContacts) {
      return res.json({ success: true, data: allContacts });
    } else {
      return res.json({ success: false, message: "Nothing Found" });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      msg: err.toString(),
    });
  }
};

const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOne({ _id: id });
    if (contact) {
      return res.json({ success: true, data: contact });
    } else {
      return res.json({ success: false, message: "Nothing Found" });
    }
  } catch (err) {
    return res.json({
      success: false,
      msg: err.toString(),
    });
  }
};
const addContact = async (req, res) => {
  try {
    const { email, phone, fullName } = JSON.parse(req.body.data);
    const avatar = req.file.buffer;
    if (!email || !phone || !fullName) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
      });
    }
    const contact = await Contact.findOne({ email });
    if (contact) {
      return res.json({
        success: false,
        message: "User with this email is already registered",
      });
    } else {
      let newContact = await new Contact({
        email,
        phone,
        fullName,
        avatar,
      }).save();
      return res.json({
        success: true,
        data: newContact,
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      msg: err.toString(),
    });
  }
};
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOne({ _id: id });
    if (!contact) {
      return res
        .status(400)
        .json({ success: false, message: "Contact not found" });
    } else {
      console.log(contact);
      await Contact.deleteOne({ _id: id });
      return res.json({ success: false, message: "Successfully deleted" });
    }
  } catch (err) {
    return res.json({
      success: false,
      msg: err.toString(),
    });
  }
};
const updateContact = async (req, res) => {
  const { email, phone, fullName } = req.body;
  const { id } = req.params;
  if (!email || !phone || !fullName) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  try {
    const contact = await Contact.findOne({ _id: id });
    if (!contact) {
      return res
        .status(400)
        .json({ success: false, message: "Contact not found" });
    } else {
      console.log(contact);
      await Contact.updateOne(
        { _id: id },
        { $set: { email, phone, fullName } }
      );
      return res.json({ success: false, message: "Successfully updated" });
    }
  } catch (err) {
    return res.json({
      success: false,
      msg: err.toString(),
    });
  }
};

module.exports = {
  getContacts,
  getContact,
  addContact,
  deleteContact,
  updateContact,
  avatar,
};

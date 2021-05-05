const express = require("express");
const Router = express.Router();

const {
  getContacts,
  getContact,
  addContact,
  deleteContact,
  updateContact,
  avatar,
} = require("../controllers/contacts.js");

Router.get("/contact", getContacts)
  .get("/contact/:id", getContact)
  .post("/contact", avatar.single("avatar"), addContact)
  .put("/contact/:id", updateContact)
  .delete("/contact/:id", deleteContact);

module.exports = Router;

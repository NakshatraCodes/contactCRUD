const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connected to DB Servers");
  }
);
require("./models/Contact");

const contactsRoutes = require("./routes/contactsRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", contactsRoutes);

app.use("/*", (req, res) => {
  return res.status(404).json({ msg: "Bad Request", status: res.statusCode });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});

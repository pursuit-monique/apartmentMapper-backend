const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
const apartmentControllers = require("./controllers/apartmentControllers");
const contractorControllers = require("./controllers/contractorControllers");

app.use("/apartments", apartmentControllers);
app.use("/contractors", contractorControllers);

// app.use("/users", userControllers);
app.get("/", (req, res) => {
  res.send("Welcome to the app");
});

module.exports = app;

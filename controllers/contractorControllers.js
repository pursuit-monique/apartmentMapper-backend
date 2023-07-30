const express = require("express");
const contractors = express.Router();
const db = require("../apartmentdb/dbConfig.js");
const { Client } = require("pg-promise");
const {
  getAllContractors,
  getAllBoroughs,
} = require("../queries/contractor.js");

contractors.get("/", async (req, res) => {
  try {
    const contractorList = await getAllContractors();
    res.json(contractorList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

contractors.get("/boroughs/", async (req, res) => {
  try {
    const boroughList = await getAllBoroughs();
    res.json(boroughList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = contractors;

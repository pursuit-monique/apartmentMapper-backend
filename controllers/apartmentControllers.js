const express = require("express");
const apartments = express.Router();
const {
  getAllApartments,
  addApartment,
  getApartmentsByQuery,
} = require("../queries/apartment.js");

apartments.get("/", async (req, res) => {
  const { contractor, floor, borough, accessable, vacant } = req.query;
  console.log(contractor);

  try {
    const results = await getAllApartments(
      contractor,
      floor,
      borough,
      accessable,
      vacant
    );
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

apartments.get("/query/", async (req, res) => {
  const contractor = req.query?.contractor || "";
  const floor = req.query?.floor || "";
  const borough = req.query?.borough || "";
  const accessable = req.query?.accessable || "";
  const vacant = req.query?.vacant || "";
  console.log("contractor", contractor);
  console.log("borough", borough);
  console.log("floor", floor);
  console.log("query", req.query.contractor);
  console.log("vacant", req.query.vacant);

  try {
    const results = await getApartmentsByQuery(
      contractor,
      floor,
      borough,
      accessable,
      vacant
    );
    res.json(results);
    console.log("Total results", results.length);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

apartments.post("/", async (req, res) => {
  try {
    const {
      contractor,
      staddress,
      apartment,
      floor,
      city,
      borough,
      zip,
      num_bedrooms,
      vacant,
      accessable,
      gender,
      unavail_date,
      isVacant,
      isOffline,
      offlineInfo,
      aptTreatment,
      notes,
      lat,
      lng,
    } = req.body;

    const newApartment = await addApartment({
      contractor,
      staddress,
      apartment,
      floor,
      city,
      borough,
      zip,
      num_bedrooms,
      vacant,
      accessable,
      gender,
      unavail_date,
      isVacant,
      isOffline,
      offlineInfo,
      aptTreatment,
      notes,
      lat,
      lng,
    });

    res.json(newApartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = apartments;

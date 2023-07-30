const express = require("express");
const events = express.Router();
const db = require("../apartmentdb/dbConfig.js");

const getAllApartments = async () => {
  try {
    const allApartments = await db.any("SELECT * FROM addresses");
    return allApartments;
  } catch (error) {
    return error;
  }
};

const getApartmentsByQuery = async (
  contractor,
  floor,
  borough,
  accessable,
  vacant
) => {
  let query = "SELECT * FROM addresses";

  let conditions = [];
  let values = [];
  console.log("what is vacant", vacant);

  if (contractor !== "") {
    conditions.push(`contractor = '${contractor.replaceAll("_", " ")}'`);
    values.push(contractor.replaceAll("_", " "));
  }

  if (borough !== "") {
    conditions.push(`borough = '${borough.replaceAll("_", " ")}'`);
    values.push(borough);
  }

  if (accessable) {
    conditions.push(`accessable = '${accessable === "true" ? "Yes" : "No"}'`);
    values.push(accessable);
  }

  if (vacant) {
    console.log("query, vacant", vacant);
    conditions.push(
      `isvacant = '${vacant === "true" ? "Vacant" : "Occupied"}'`
    );
    values.push(vacant);
  } else {
    null;
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  if (conditions) {
    console.log(query);
    console.log(values);
    try {
      const result = await db.any(`${query}`);
      console.log(query, values);
      return result;
    } catch (error) {
      throw new Error("Error executing the query: " + error);
    }
  } else {
    try {
      const result = await db.any(query);
      return result.rows;
    } catch (error) {
      throw new Error("Error executing the query: " + error);
    }
  }
};

const addApartment = async (event) => {
  try {
    const apartment = await db.one(
      "INSERT INTO addresses (contractor, staddress, apartment, floor, city, borough, zip, num_bedrooms, vacant, accessable, gender, unavail_date, isVacant, isOffline, offlineInfo, aptTreatment, notes, lat, lng) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *",
      [
        event.contractor,
        event.staddress,
        event.apartment,
        event.floor,
        event.city,
        event.borough,
        event.zip,
        event.num_bedrooms,
        event.vacant,
        event.accessable,
        event.gender,
        //   unavail_date, isVacant, isOffline, offlineInfo, aptTreatment, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        event.unavail_date,
        event.isVacant,
        event.isOffline,
        event.offlineInfo,
        event.aptTreatment,
        event.notes,
        event.lat,
        event.lng,
      ]
    );
    return apartment;
  } catch (error) {
    return error;
  }
};

module.exports = { addApartment, getAllApartments, getApartmentsByQuery };

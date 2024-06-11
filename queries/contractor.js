const express = require("express");
const db = require("../apartmentdb/dbConfig.js");

const getAllContractors = async () => {
  try {
    const allContractors = await db.any(
      "SELECT DISTINCT TRIM(contractor) AS contractor, LENGTH(TRIM(contractor)) AS length, COUNT(TRIM(contractor)) FROM addresses GROUP BY TRIM(contractor) ORDER BY length ASC;"
    );
    return allContractors;
  } catch (error) {
    return error;
  }
};

const getAllBoroughs = async () => {
  try {
    const allBorough = await db.any(
      "SELECT distinct borough, COUNT(borough) FROM addresses GROUP BY borough;"
    );
    return allBorough;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllContractors, getAllBoroughs };

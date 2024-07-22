"use strict"

// import calcFutureValue() from the murach-calc-future-value.js module
const {calcFutureValue} = require("./murach-calc-future-value");

// convert command line arguments from strings to numbers
const investment = parseFloat(process.argv[2]);
const rate = parseFloat(process.argv[3]);
const years = parseInt(process.argv[4]);

// use calcFuture() to calculate future value
const futureValue = calcFutureValue(investment, rate, years);

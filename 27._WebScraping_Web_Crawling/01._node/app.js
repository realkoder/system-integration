import fs from "fs";

// Here we fetches the site once to store it loally for further tweaking xD
// const result = await fetch("https://www.proshop.dk/baerbar");
// const response = await result.text();
// fs.writeFileSync("index.html", response);

import { load } from "cheerio";

// To make the loaded file from Buffer to String either "utf-8" as arg or .toString()
// const page = await fs.readFileSync("index.html", "utf-8");
const page = fs.readFileSync("index.html").toString();

const $ = load(page);

$("#products [product]").each((index, element) => {
  const name = $(element).find(".site-product-link").text();
  const price = $(element).find(".site-currency-lg").text();
  console.log(price, name)
});
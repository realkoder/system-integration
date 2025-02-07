import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import csvParser from "csv-parser";
import xml2js from "xml2js";

export async function parseFile(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  let data;
  switch (ext) {
    case ".csv":
      data = await parseCSV(filePath);
      break;
    case ".yaml":
    case ".yml":
      data = parseYAML(filePath);
      break;
    case ".json":
      data = parseJSON(filePath);
      break;
    case ".txt":
      data = parseTXT(filePath);
      break;
    case ".xml":
      data = await parseXML(filePath);
      break;
    default:
      throw new Error("Unsupported file format");
  }

  // printKeysAndTypes(data);

  return data;
}

function parseCSV(filePath: string) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

function parseYAML(filePath) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  return yaml.load(fileContents);
}

function parseJSON(filePath) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

function parseTXT(filePath) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  return { content: fileContents };
}

function parseXML(filePath) {
  return new Promise((resolve, reject) => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    xml2js.parseString(fileContents, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function printKeysAndTypes(obj, parentKey = "") {
  for (const key in obj) {
    const value = obj[key];
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof value === "object" && value !== null) {
      console.log(`Key: ${fullKey}, Type: Object`);
      printKeysAndTypes(value, fullKey);
    } else {
      console.log(`Key: ${fullKey}, Type: ${typeof value}`);
    }
  }
  console.log();
}

const fs = require("fs");
const path = require("path");

class Utils {
  static getDate() {
    return new Date().toString();
  }

  static writeToFile(text) {
    fs.appendFileSync(path.join(__dirname, "../file.txt"), text + "\n", "utf8");
  }

  static readFromFile(fileName) {
    const filePath = path.join(__dirname, "../", fileName);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    return fs.readFileSync(filePath, "utf8");
  }

  static extractFileName(pathname) {
    const basePath = "/COMP4537/labs/3/readFile/";
    return pathname.replace(basePath, "");
  }
}

module.exports = Utils;

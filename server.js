const http = require("http");
const url = require("url");

const utils = require("./modules/utils");
const lang = require("./lang/en/en");

const PORT = process.env.PORT || 3000;

class Server {
  static start() {
    const server = http.createServer(Server.handleRequest);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }

  static handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;

    if (pathName === "/COMP4537/labs/3/getDate/") {
      const name = parsedUrl.query.name || lang.defaultName;
      const date = utils.getDate();

      const message = `
        <p style="color:blue;">
          ${lang.greeting.replace("%1", name)} ${date}
        </p>
      `;

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(message);
      return;
    }

    if (pathName === "/COMP4537/labs/3/writeFile/") {
      const text = parsedUrl.query.text || "";

      utils.writeToFile(text);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(lang.appendSuccessMessage);
      return;
    }

    if (pathName.startsWith("/COMP4537/labs/3/readFile/")) {
      const fileName = utils.extractFileName(pathName);
      const content = utils.readFromFile(fileName);

      if (!content) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end(fileName + lang.fileNotFoundErrorMessage);
        return;
      }

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(content);
      return;
    }

    res.writeHead(404);
    res.end("Route not found");
  }
}

Server.start();

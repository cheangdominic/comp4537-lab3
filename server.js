const http = require("http");
const url = require("url");

const utils = require("./modules/utils");
const lang = require("./lang/en/en");

const PORT = process.env.PORT || 3000;

class Server {
  static start() {
    const server = http.createServer((req, res) => {
      const parsedUrl = url.parse(req.url, true);

      const name = parsedUrl.query.name || "Guest";
      const date = utils.getDate();

      const message = `
        <p style="color:blue;">
          ${lang.greeting.replace("%1", name)} ${date}
        </p>
      `;

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(message);
    });

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}

Server.start();

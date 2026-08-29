const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "..", "out");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".wasm": "application/wasm",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost:3000"}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // If root, serve index.html
  if (pathname === "/" || pathname === "") {
    pathname = "/index.html";
  }

  const candidates = [
    path.join(PUBLIC_DIR, pathname),
    path.join(PUBLIC_DIR, pathname + ".html"),
    path.join(PUBLIC_DIR, pathname, "index.html"),
  ];

  let targetFile = null;
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      targetFile = candidate;
      break;
    }
  }

  if (!targetFile) {
    targetFile = path.join(PUBLIC_DIR, "404.html");
  }

  if (!fs.existsSync(targetFile)) {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>404 Not Found</h1>");
    return;
  }

  const ext = path.extname(targetFile).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(targetFile, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.end("<h1>500 Internal Server Error</h1>");
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": Buffer.byteLength(data),
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(data);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`> Clean Static Server running at http://0.0.0.0:${PORT}`);
});

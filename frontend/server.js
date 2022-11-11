const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 80;
const exstentions = ["js", "css"];

app.disable("x-powered-by");

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", function (req, res) {
  const reqPathsParts = req.path.split("/");
  const request = reqPathsParts[reqPathsParts.length - 1];
  const requestParts = request.split(".");
  const hasExtention = exstentions.includes(
    requestParts[requestParts.length - 1],
  );
  hasExtention
    ? res.sendFile(path.join(__dirname, "dist", request))
    : res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, function () {
  console.log(`Frontend start on http://localhost:${PORT}`);
});

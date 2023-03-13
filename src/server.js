const express = require("express");
const rateLimit = require("express-rate-limit");
const { registerInApp } = require("./lib/services");
require("dotenv").config();

const limiter = rateLimit({
  windowMs: 1 * 15 * 1000,
  max: 1,
});

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.text());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.post("/api/players", limiter)

app.get("/admin", (req, res) => {
  res.redirect("/admin/swagger");
});

registerInApp(app);

app.listen(PORT, () => {
  console.log(
    `Listening http://localhost:${PORT}/admin/swagger`
  );
});

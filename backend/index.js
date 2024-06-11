require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const MainRouter = require("./MainRouter/MainRoute");
const mongodb = require("mongodb");

const cors = require("cors");
const app = express();
app.use(cors());
app.use("/api/v1", MainRouter);
app.use(express.json({ limit: "50mb" }));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("http://localhost:" + PORT + "/api/v1");
});

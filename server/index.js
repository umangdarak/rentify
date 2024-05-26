const express = require("express");
require("dotenv").config();
require("./db");
const bodyParser = require("body-parser"); 

const auth = require("./routers/login");
const prop = require("./routers/propertylog");
const app = express();
const CORS = require("cors");
app.use(express.json());
app.use(bodyParser.json({ limit: "20mb" }));

app.use(CORS());
app.listen(5000, () => {
  console.log("Server running on 5000");
});

//routers
app.use("/auth", auth);
app.use("/prop", prop);

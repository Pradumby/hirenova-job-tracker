const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.use(errorHandler);
module.exports = app;

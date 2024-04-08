const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(cors());

const movieRoutes = require("./routes/movie");

app.use("/api/movies", movieRoutes);

app.listen(5000);

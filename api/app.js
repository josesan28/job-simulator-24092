const express = require("express");
const cors = require("cors");
const teamsRouter = require("./src/routes/teams");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/teams", teamsRouter);

module.exports = app;
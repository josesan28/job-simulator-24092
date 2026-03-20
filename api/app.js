const express = require("express");
const teamsRouter = require("./src/routes/teams");

const app = express();
app.use(express.json());

app.use("/teams", teamsRouter);

module.exports = app;
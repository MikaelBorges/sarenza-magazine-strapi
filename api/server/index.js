require("dotenv").config();
const express = require("express");
const app = new express();

app.listen(process.env.PORT, ()=> console.log(`Example app listening at http://localhost:${process.env.PORT}`))
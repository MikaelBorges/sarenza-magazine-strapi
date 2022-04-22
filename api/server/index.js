require("dotenv").config();
const specs = require("./swagger.js")

const express = require("express");

const swaggerUi = require("swagger-ui-express")

const app = new express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs.default));

app.listen(process.env.PORT, () => console.log(`Example app listening at http://localhost:${process.env.PORT}`))
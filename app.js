const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const port = process.env.PORT || 80;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.listen(port);
console.log("Server listening on port "+ port);
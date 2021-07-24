const express = require('express');
const port = process.env.PORT || 80;

const app = express();
app.use(express.json());

app.listen(port);
console.log("Server listening on port "+ port);
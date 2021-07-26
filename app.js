const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const path = require('path');
const port = process.env.PORT || 80;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const submissionRoutes = require('./routes/submission');
app.use('/submission',submissionRoutes);

//Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);
console.log("Server listening on port "+ port);
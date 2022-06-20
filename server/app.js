const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// set root to serve client app
app.use('/', express.static('dist/roman-eleusis'));
// set API routes
require('./routes/index')(app);
// set all other routes to use client app
app.use('*', express.static('dist/roman-eleusis'));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const express = require('express');
const bodyParser = require('body-parser');
const dbClient = require('./db/client');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

dbClient.initializeDatabaseClient((error) => {
  if (error) {
    console.log(error);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

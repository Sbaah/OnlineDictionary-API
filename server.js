// Web service setup
require('dotenv').config();

const express = require('express');
const { response } = require('express');
const cors = require('cors');
const path = require('path');
// const bodyParser = require('body-parser');

const HTTP_PORT = process.env.PORT || 8080;

// Add support for incoming JSON entities
// app.use(bodyParser.json());
const app = express();
app.use(express.json());
// Add support for CORS
app.use(cors());
app.options('*', cors());
app.set('json spaces', 4); // Make the JSON responses... readable

// Data model and persistent store setup
const manager = require('./controllers/manager.js');
const dbConnect = manager(process.env.DB_CONNECTION);

// control for the cruds
const lanCode = require('./controllers/lanCode');
const english = require('./controllers/english');
const otherLan = require('./controllers/otherLan');

// Deliver the app's home page to browser clients
app.get('/', (req, res) => {
  //   res.json('Welcome !!!, It looks like this code is working so far.');\
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Resources available in this web API

app.get('/api', (req, res) => {
  const links = [];

  //English Links
  links.push({
    rel: 'collection',
    href: '/terms/english',
    //   target="_blank",
    //   rel="noopener noreferrer",
    methods: 'GET,POST',
  });
  links.push({
    rel: 'collection',
    href: '/terms/english/:id',
    //   target="_blank",
    //   rel="noopener noreferrer",
    methods: 'GET,PUT,DELETE',
  });

  //Other Links
  links.push({
    rel: 'collection',
    href: '/terms/other',
    //   target="_blank",
    //   rel="noopener noreferrer",
    methods: 'GET,POST',
  });
  links.push({
    rel: 'collection',
    href: '/terms/other/:id',
    //   target="_blank",
    //  rel="noopener noreferrer",
    methods: 'GET,PUT,DELETE',
  });

  const linkObject = {
    apiName: 'Portfolio',
    apiDescription: 'Node Web-service',
    apiVersion: '1.1',
    apiAuthor: 'Sefa Baah - Acheamphour',
    links: links,
  };
  res.json(linkObject);
});

// ********************************************
// *                                          *
// *       Prefix for all Languages           *
// *                                          *
// ********************************************
app.get('/api/languages', (req, res) => {
  lanCode.handleLanCode(req, res, dbConnect);
});

// ********************************************
// *                                          *
// *        English Terminology API           *
// *                                          *
// ********************************************

// GET: Get all Eng words
app.get('/api/terms/english', (req, res) => {
  english.handleGetAllEng(req, res, dbConnect);
});

//GET:  Get by ENG id
app.get('/api/terms/english/:id', (req, res) => {
  english.handleGetEngById(req, res, dbConnect);
});

// GET: Get some ENG by word
app.get('/api/terms/english/word/:word', (req, res) => {
  english.handleGetEngByWord(req, res, dbConnect);
});

//POST:  Add a new ENG Word/Detail
app.post('/api/terms/english/', (req, res) => {
  english.handleEngAddNewWord(req, res, dbConnect);
});

// PUT: Edit existing ENG Detail by adding a sub-doc for Definition/s
app.put('/api/terms/english/:id/add-definitions', (req, res) => {
  english.handleEngAddNewDef(req, res, dbConnect);
});

// PUT: Edit ENG Detail
app.put('/api/terms/english/:id', (req, res) => {
  english.handleEngEditDetail(req, res, dbConnect);
});

// Put: Edit existing ENG doc for Helpful count
app.put('/api/terms/english/helpful/:id', (req, res) => {
  english.handleHelpful(req, res, dbConnect);
});

// Put: Edit existing ENG doc for Un-Helpful count
app.put('/api/terms/english/un-helpful/:id', (req, res) => {
  english.handleUnHelpful(req, res, dbConnect);
});

// Put: Edit existing ENG sub doc by increasing the like count
app.put('/api/terms/english/likeCount/:id', (req, res) => {
  english.handleEngLikeCount(req, res, dbConnect);
});

// DELETE // Delete ENG word details Definition/s
app.delete('/api/terms/english/:id', (req, res) => {
  english.handleEngDelete(req, res, dbConnect);
});

//  ********************************************
//  *                                          *
//  *          Other Terminology API           *
//  *                                          *
//  ********************************************

// Get all other words
app.get('/api/terms/other', (req, res) => {
  otherLan.handleGetAllOther(req, res, dbConnect);
});

// Get by Other id
app.get('/api/terms/other/:id', (req, res) => {
  otherLan.handleGetOthById(req, res, dbConnect);
});

// Get some other by word
app.get('/api/terms/other/word/:word', (req, res) => {
  otherLan.handleGetOthByWord(req, res, dbConnect);
});

// Add a new Other Word/Detail
app.post('/api/terms/other/', (req, res) => {
  otherLan.handleOthAddNewWord(req, res, dbConnect);
});

// PUT: Edit existing Other Detail by adding a sub-doc for Definition/s
app.put('/api/terms/other/:id/add-definitions', (req, res) => {
  otherLan.handleOthAddNewDef(req, res, dbConnect);
});

// PUT: Edit Other Detail
app.put('/api/terms/other/:id', (req, res) => {
  otherLan.handleOthEditDetail(req, res, dbConnect);
});

// Put: Edit existing Oth doc for Helpful count
app.put('/api/terms/other/helpful/:id', (req, res) => {
  otherLan.handleOthHelpful(req, res, dbConnect);
});

// Put: Edit existing Other doc for Un-Helpful count
app.put('/api/terms/other/un-helpful/:id', (req, res) => {
  otherLan.handleOthUnHelpful(req, res, dbConnect);
});

// Put: Edit existing ENG sub doc by increasing the like count
app.put('/api/terms/other/likeCount/:id', (req, res) => {
  otherLan.handleOthLikeCount(req, res, dbConnect);
});

// DELETE // Delete ENG word details Definition/s
app.delete('/api/terms/other/:id', (req, res) => {
  otherLan.handleOthDelete(req, res, dbConnect);
});

// ################################################################################
// Resource not found (this should be at the end)

app.use((req, res) => {
  res.status(404).send('Resource not found');
});

// Database connection and port host
dbConnect.log(`Attempting to start a connection with the MongoDB...`);
dbConnect
  .connect()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      dbConnect.log(`Connection to MongoDB has being established...`);
      console.log('Ready to handle requests on port ' + HTTP_PORT);
    });
  })
  .catch((err) => {
    console.log('Unable to start the server:\n' + err);
    process.exit();
  });

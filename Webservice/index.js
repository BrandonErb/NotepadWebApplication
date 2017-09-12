/*
Brandon Erb
index.js
Endpoint definitions for a RESTful webservice
based on
https://github.com/mjhea0/mjhea0.github.com/blob/test/source/_posts/2016-03-13-designing-a-restful-api-with-node-and-postgres.markdown
*/

var express = require('express');
var router = express.Router();
var db = require('./queries');


router.get('/notes/note', db.getNotes);
router.get('/notes/:id', db.getNote);
router.post('/notes/add', db.addNote);
router.put('/notes/:id', db.updateNote);
router.delete('/notes/:id', db.deleteNote);

// application -------------------------------------------------------------
router.get('/', function (req, res) {
    res.render('index', {title: 'node-postgres-promises'}); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;

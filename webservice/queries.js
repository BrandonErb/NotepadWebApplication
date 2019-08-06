/*
Brandon Erb
queries.js
File Containing queries for a RESTful webservice
based on
https://github.com/mjhea0/mjhea0.github.com/blob/test/source/_posts/2016-03-13-designing-a-restful-api-with-node-and-postgres.markdown
*/

var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var cn = {
  host: 'localhost',
  port: 5433,
  database: 'Notepad',
  user: 'admin',
  password: 'magic'
}

const db = pgp(cn);

db.connect()
    .then(obj => {
        obj.done(); // success, release the connection;
        console.log("Connection Success!, Ready for Use")
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });


module.exports = {
  getNotes: getNotes,
  getNote: getNote,
  addNote: addNote,
  updateNote: updateNote,
  deleteNote: deleteNote
};


//Aknowleged Bad Code Heroku + PGAdmin did not allow stored proccedure creation
function getNotes(req, res, next) {
  var limit = parseInt(req.query.limit);
  var offset = parseInt(req.query.start);
  //if(req.query.order == 'asc'){
  db.any('SELECT * FROM notes ORDER BY "note_id" ASC')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved a note'
        });
      })
    .catch(function (err) {
      return next(err);
    });
 }

function getNote(req, res, next) {
  db.one('SELECT note_id, note_text FROM notes WHERE "note_id" = $1', [req.params.id])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved a note'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function addNote(req, res, next) {
    db.none('INSERT INTO notes (note_id , note_text) VALUES ( $1 , $2 )', [req.query.id , req.query.text])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted Note'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateNote(req, res, next) {
  db.none('UPDATE notes SET note_text = $1 WHERE note_id = $2' , [req.query.text, req.params.id] )
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Note'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function deleteNote(req, res, next) {
  db.result('DELETE FROM notes WHERE note_id = $1', req.params.id)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} Note`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

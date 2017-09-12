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

var cn = 'postgres://tifhfzgnordfuw:63cc4edebccfa8e3d7b17c858c47cd43a6447ed426370b7b750366fb16c1e4cd@ec2-54-204-0-88.compute-1.amazonaws.com:5432/d6kc78ehqi9r46?ssl=true';

var db = pgp(cn);

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
  // console.log(req.params.note);
  // console.log(limit);
  // console.log(offset);
  // console.log(req.query.order);
  if(req.query.order == 'asc'){
  db.any('SELECT * FROM "Notepad"."Note" ORDER BY "NoteId" ASC LIMIT $1 OFFSET $2', [limit, offset])
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
  else{
    db.any('SELECT * FROM "Notepad"."Note" ORDER BY "NoteId" DESC LIMIT $1 OFFSET $2', [limit, offset])
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
 }

function getNote(req, res, next) {
  db.one('SELECT "NoteId", "Text" FROM "Notepad"."Note" WHERE "NoteId" = $1', [req.params.id])
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
    db.none('INSERT INTO "Notepad"."Note" ("NoteId" , "Text") VALUES ( $1 , $2 )', [req.body.id , req.body.text])
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
  db.none('UPDATE "Notepad"."Note" SET "Text" = $1 WHERE "NoteId" = $2' , [req.body.text, req.params.id] )
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
  db.result('DELETE FROM "Notepad"."Note" WHERE "NoteId" = $1', req.params.id)
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

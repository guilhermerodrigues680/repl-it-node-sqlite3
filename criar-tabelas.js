// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

// const sqlite3 = require('sqlite3').verbose();

// // open database in memory
// let db = new sqlite3.Database(':memory:', (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Connected to the in-memory SQlite database.');
// });

// // close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

const sqlite3 = require('sqlite3').verbose();

// // open the database connection
// let db = new sqlite3.Database(':memory:', (err) => {
//   if (err) {
//     console.error(err.message);
//   }
// });
let db = new sqlite3.Database('banco.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});



db.serialize(() => {
  // Queries scheduled here will be serialized.
  db.run('CREATE TABLE greetings(message text)')
    .run(`INSERT INTO greetings(message)
          VALUES('Hi'),
                ('Hello'),
                ('Welcome')`)
    .each(`SELECT message FROM greetings`, (err, row) => {
      if (err){
        throw err;
      }
      console.log(row.message);
    });
});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
});


// Somente para não imprimir variaveis no terminal
console.log();
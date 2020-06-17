var express = require('express');
var app = express();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('banco.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/db', function (req, res) {
  db.serialize(() => {
  // Queries scheduled here will be serialized.
    db.run(`INSERT INTO greetings(message)
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

  // // close the database connection
  // db.close((err) => {
  //   if (err) {
  //     return console.error(err.message);
  //   }
  // });
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// Somente para não imprimir variaveis no terminal
console.log();
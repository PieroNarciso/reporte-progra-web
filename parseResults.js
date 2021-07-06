const fs = require('fs');

const linesSQL = fs.readFileSync('./sql-test.log', { encoding: 'utf-8' }).split('\n');

const sqlResults = {
  'DELETE': {},
  'INSERT': {},
  'READ': {},
}

for (let line of linesSQL) {
  // INSERT | NUMERO-OPERACIONES | TIME
  line = line.toString().split(' ');
  if (line.length <= 1) continue;
  if (sqlResults[line[0]][line[1]] === undefined) {
    sqlResults[line[0]][line[1]] = 0.00;
  }
  sqlResults[line[0]][line[1]] += parseFloat(line[2]);
}

console.log(sqlResults);

const mongoResults = {
  'DELETE': {},
  'INSERT': {},
  'READ': {},
}

const linesMongo = fs.readFileSync('./mongo-test.log', { encoding: 'utf-8' }).split('\n');

for (let line of linesMongo) {
  line = line.toString().split(' ');
  if (line.length <= 1) continue;
  if (mongoResults[line[0]][line[1]] === undefined) {
    mongoResults[line[0]][line[1]] = 0.00;
  }

  mongoResults[line[0]][line[1]] += parseFloat(line[2]);
}

console.log(mongoResults);

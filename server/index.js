const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Import the cors module

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'goldfish',
  database: 'studentregistrationform'
});

db.connect((err) => {
  if (err) throw err;
  console.log('db is connected...');
});

const app = express();

// Use the cors middleware
app.use(cors());

app.use(express.json());

app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE studentregistrationform';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Database created successfully');
  });
});

app.get('/createtable', (req, res) => {
  let sql = 'CREATE TABLE studentdb(rollno int AUTO_INCREMENT, name VARCHAR(255), dob DATE, PRIMARY KEY (rollno))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('studentdb is created successfully');
  });
});

app.post('/insert', (req, res) => {
  const { name, dob } = req.body;

  let sql = 'INSERT INTO studentdb (name, dob) VALUES (?, ?)';
  db.query(sql, [name, dob], (err, result) => {
    if (err) {
      console.error('Error inserting data', err);
      res.status(500).json({ message: 'Error inserting data' }); // Respond with an error message
    } else {
      console.log('Data inserted successfully:', result);
      res.status(200).json({ message: 'Data inserted successfully' }); // Respond with a success message
    }
  });
});

app.listen(3000, () => {
  console.log('server is on');
});

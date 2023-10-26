const mysql = require('mysql');
const connection = mysql.createConnection({
  //port: '3306',
  host: "localhost",
  user: "root",
  password: "Avani9967!",
  database: "restaurant"
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log("connection created with Mysql successfully");
  }
});
module.exports = connection;

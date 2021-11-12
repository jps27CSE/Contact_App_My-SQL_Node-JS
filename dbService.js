const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

let instance = null;

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("db" + connection.state);
});

class Dbservice {
  static getDbServiceInstace() {
    return instance ? instance : new Dbservice();
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names;";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertNewName(name, phone, email, id) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO names (name,phone,email) VALUES (?,?,?);";

        connection.query(query, [name, phone, email], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.insertId);
        });
      });

      console.log(insertId);
      // return insertData;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Dbservice;

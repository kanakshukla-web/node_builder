var mysql = require("mysql2");
//module.exports = getSqlConnection();
function getSqlConnection()
{
  var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "kanak1",
    password: "otpl@12",
    database: "casebuilder",
  })
  con.connect(function (error) {
    if (error)
      console.log(error);
    else
      console.log("Connection established with MySQL db");
  })
  return con;
}

global.db = getSqlConnection();;

function sqlQueries() {

    // -------CREATE
    // var sql = `CREATE TABLE dimensions (length VARCHAR(3), width VARCHAR(3), height VARCHAR(3), Lid_height VARCHAR(3))`;
    // connection.query(sql, function (err, result) {
    //   if (err) throw err;
    //   console.log("Table created");
    // });
    //-------ALTER
    // connection.query("ALTER TABLE dimensions CHANGE Prod_Id Prod_Id INT(10)AUTO_INCREMENT PRIMARY KEY;", function (err, result) {
    //   if (err) throw err;
    //   console.log("Table altered");
    // });
    // -------INSERT
    // var sql = "INSERT INTO dimensions (length,width,height,Lid_height,Product_Name) VALUES ('70', '50','50','7.5','Trunccase')";
    // connection.query(sql, function (err, result) {
    //   if (err) throw err;
    //   console.log("1 record inserted");
    // });
    //--------SELECT
    // connection.query("SELECT * FROM dimensions", function (err, result, fields) {
    //   if (err) throw err;
    //   console.log(result);
    // });
    //--------UPDATE
    // connection.query("UPDATE dimensions SET Product_Name = 'Suitcase' WHERE length = '50';", function (err, result) {
    //   if (err) throw err;
    //   console.log("1 record updated");
    // });
  }
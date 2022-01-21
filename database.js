const mysql = require("mysql");
const { promisify } = require("util");
const { database } = require("./keys");

//Creamos la connexión

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
    if (err.code === "PROTOCOL_CONECTION LOST") {
      console.log("DATABASE CONNECTION WAS CLOSED");
    }

    if (err.code === "ER_CON_COUNT_ERROR") {
      console.log("LA BASE DE DATOS TIENE DEMASIADAS CONEXIONES");
    }

    if (err.code === "ECONNREFUSED") {
      console.log("CONEXIÓN DENEGADA");
    }
  }

  if (connection) {
    connection.release();
    console.log("DB is Connected");
  }

  return;
});

pool.query = promisify(pool.query);
module.exports = pool;

require('dotenv').config();
module.exports = {
    "development": {
      "username": "assesment",
      "password": 123,
      "database": "assesment",
      "host": "127.0.0.1",
      "dialect": "postgres"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "postgres"
    },
    "production": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASS,
      "database": process.env.DB_DATABASE,
      "host": process.env.DB_HOST,
      "dialect": "postgres",
      dialectOptions:{
        "ssl":{
          "rejectUnauthorized":false
        }
      }
    }
}

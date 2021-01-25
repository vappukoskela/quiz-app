const { Pool } = require('pg')
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'Tenttikanta',
//   password: 'ikea1234',
//   port: 5432
// })
var connectInfo = {}
if (process.env.HEROKU) {
  connectInfo = {
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432
  }
}else {
  connectInfo = {
    user: 'postgres',
    host: 'localhost',
    database: 'Tenttikanta',
    password: 'ikea1234',
    port: 5432
  }
}

const pool = new Pool(connectInfo)
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}


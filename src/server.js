require('dotenv').config()

const knex = require('knex')
const jsonServer = require('json-server')
const app = require('./app')
const { PORT, Database_URL } = require('./config')

const middlewares = jsonServer.defaults()

const db = knex({
  client: 'pg',
  connection: Database_URL,
})

app.set('db', db)
app.use(middlewares)

app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));

module.exports = {app};
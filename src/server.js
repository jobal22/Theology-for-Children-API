const knex = require('knex')
const jsonServer = require('json-server')
const app = require('./app')
const db = require('./db')

const server = jsonServer.create()
// const router = jsonServer.router(db())
const middlewares = jsonServer.defaults()

const { PORT, API_BASE_URL} = require('./config')

// const db = knex({
//   client: 'pg',
//   connection: API_BASE_URL,
// })

app.set('db', db)

app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));

module.exports = {app};
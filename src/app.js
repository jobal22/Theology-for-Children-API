require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const versesRouter = require('./verses/verses-router')
const chaptersRouter = require('./chapters/chapters-router')
const booksRouter = require('./books/books-router')
const plantitlesRouter = require('./plantitle/plantitle-router')
const plansRouter = require('./plans/plans-router')
const contentsRouter = require('./contents/contents-router')
const quiztitlesRouter = require('./quiztitles/quiztitles-router')
const quizesRouter = require('./quizes/quizes-router')
const usersRouter = require('./users/users-router')
const scoresRouter = require('./answers1/scores-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.use('/api/verses', versesRouter)
app.use('/api/chapters', chaptersRouter)
app.use('/api/books', booksRouter)
app.use('/api/plantitles', plantitlesRouter)
app.use('/api/plans', plansRouter)
app.use('/api/contents', contentsRouter)
app.use('/api/quiztitles', quiztitlesRouter)
app.use('/api/quizes', quizesRouter)
app.use('/api/users', usersRouter)
app.use('/api/scores', scoresRouter)

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
       response = { error: { message: 'server error' } }
    } else {
      console.error(error)
      response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app
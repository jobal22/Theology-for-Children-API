const express = require('express')
const BooksService = require('./books-service')
const logger = require('../logger')

const BooksRouter = express.Router()
const jsonParser = express.json()


BooksRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    BooksService.getAllBooks(knexInstance)
      .then(books => {
          res.json(books)
      })
      .catch(next)
  })

  BooksRouter
  .route('/:bookId')
  .all((req, res, next) => {
    BooksService.getById(
      req.app.get('db'),
      req.params.bookId
    )
      .then(book => {
        if (!book) {
          return res.status(404).json({
            error: { message: `Book doesn't exist` }
          })
        }
        res.book = book
        next()
      })
      .catch(next)
  })

  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    BooksService.getById(knexInstance, req.params.bookId)
      .then(book => {
        if (!book) {
          return res.status(404).json({
            error: { message: `Book doesn't exist` }
          })
        }
        res.json(book)
      })
      .catch(next)
  })

module.exports = BooksRouter
const path = require('path')
const express = require('express')
const xss = require('xss')
// const AddressesService = require('./addresses-service')
const db = require('../db.json')
const logger = require('../logger')

const booksRouter = express.Router()
const bodyParser = express.json()


booksRouter
  .route('/')
  .get((req, res, next) => {
        res.json(db.books)
  })

booksRouter
  .route('/:booksId')
  .get((req, res) => {
    const { booksId } = req.params

    const book = db.books.find(s => s.id == booksId)

    if (!book) {
      logger.error(`Book with id ${booksId} not found.`)
      return res
        .status(404)
        .send('Book Not Found')
    }

  res.json(book)
})

module.exports = booksRouter
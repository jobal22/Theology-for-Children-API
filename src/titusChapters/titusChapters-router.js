const path = require('path')
const express = require('express')
const xss = require('xss')
// const AddressesService = require('./addresses-service')
const db = require('../db.json')
const logger = require('../logger')

const titusChaptersRouter = express.Router()
const bodyParser = express.json()


titusChaptersRouter
  .route('/')
  .get((req, res, next) => {
        res.json(db.titusChapters)
  })

titusChaptersRouter
  .route('/:titusChapterId')
  .get((req, res) => {
    const { titusChapterId } = req.params

    const titusChapter = db.titusChapters.find(s => s.id == titusChapterId)

    if (!titusChapter) {
      logger.error(`TitusChapter with id ${titusChapterId} not found.`)
      return res
        .status(404)
        .send('TitusChapter Not Found')
    }

  res.json(titusChapter)
})

module.exports = titusChaptersRouter
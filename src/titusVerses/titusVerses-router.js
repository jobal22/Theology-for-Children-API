const path = require('path')
const express = require('express')
const xss = require('xss')
// const AddressesService = require('./addresses-service')
const db = require('../db.json')
const logger = require('../logger')

const titusVersesRouter = express.Router()
const bodyParser = express.json()

const serializeTitusVerses = titusVerse => ({
  id: titusVerse.id,
  notes: xss(titusVerse.notes),
})


titusVersesRouter
  .route('/')
  .get((req, res, next) => {
        res.json(db.titusVerses)
  })
  .post(bodyParser, (req, res, next) => {
    for (const field of ['notes']) {
      if (!req.body[field]) {
        logger.error(`${field} is required`)
        return res.status(400).send(`'${field}' is required`)
      }
    }
    const titusVerse = { notes }

    db.titus.push(titusVerse)

    logger.info(`Notes with id ${titusVerse.id} created`)
    res
      .status(201)
      .location(`http://localhost:3000/titusVerses/${titusVerse.id}`)
      .json(titusVerse)
  })

titusVersesRouter
  .route('/:titusVerseId')
  .get((req, res) => {
    const { titusVerseId } = req.params

    const titusVerse = db.titusVerses.find(s => s.id == titusVerseId)

    if (!titusVerse) {
      logger.error(`TitusVerse with id ${titusVerseId} not found.`)
      return res
        .status(404)
        .send('TitusVerse Not Found')
    }

  res.json(titusVerse)
})

module.exports = titusVersesRouter
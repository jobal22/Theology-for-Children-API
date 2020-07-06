const path = require('path')
const express = require('express')
const xss = require('xss')
// const AddressesService = require('./addresses-service')
const db = require('../db.json')
const logger = require('../logger')

const scripturesRouter = express.Router()
const bodyParser = express.json()

const serializeScriptures = scripture => ({
  id: scripture.id,
  notes: xss(scripture.notes),
})


scripturesRouter
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
    // const { notes } = req.body

    // if (!street) {
    //   return res
    //     .status(400)
    //     .send('street required');
    // }

    // if (!city) {
    //   return res
    //     .status(400)
    //     .send('city required');
    // }

    // if (!state) {
    //   return res
    //     .status(400)
    //     .send('state required');
    // }

    // if (!state.length <0 || state.length > 3) {
    //   return res
    //     .status(400)
    //     .send('state must be a two letter abbreviation');
    // }


    // res.send('All validation passed');

    const scripture = { notes }

    db.titus.push(scripture)

    logger.info(`Notes with id ${scripture.id} created`)
    res
      .status(201)
      .location(`http://localhost:3000/scriptures/${scripture.id}`)
      .json(scripture)
  })

  scripturesRouter
  .route('/:scriptureId')
  .get((req, res) => {
    const { scriptureId } = req.params

    const scripture = db.titusVerses.find(s => s.id == scriptureId)

    if (!scripture) {
      logger.error(`Scripture with id ${scriptureId} not found.`)
      return res
        .status(404)
        .send('Scripture Not Found')
    }

    res.json(scripture)
  })

module.exports = scripturesRouter
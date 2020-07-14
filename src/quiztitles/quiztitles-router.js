const express = require('express')
const QuiztitlesService = require('./quiztitles-service')
const logger = require('../logger')

const QuiztitlesRouter = express.Router()
const jsonParser = express.json()


QuiztitlesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    QuiztitlesService.getAllQuiztitles(knexInstance)
      .then(quiztitles => {
          res.json(quiztitles)
      })
      .catch(next)
})

QuiztitlesRouter
  .route('/:quiztitleId')
  .all((req, res, next) => {
    QuiztitlesService.getById(
      req.app.get('db'),
      req.params.quiztitleId
    )
      .then(quiztitle => {
        if (!quiztitle) {
          return res.status(404).json({
            error: { message: `Quiztitles doesn't exist` }
          })
        }
        res.quiztitle = quiztitle
        next()
      })
      .catch(next)
  })

  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    QuiztitlesService.getById(knexInstance, req.params.quiztitleId)
      .then(quiztitle => {
        if (!quiztitle) {
          return res.status(404).json({
            error: { message: `Quiztitles doesn't exist` }
          })
        }
        res.json(quiztitle)
      })
      .catch(next)
  })

module.exports = QuiztitlesRouter
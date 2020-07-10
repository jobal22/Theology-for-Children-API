const express = require('express')
const ContentsService = require('./contents-service')
const logger = require('../logger')

const ContentsRouter = express.Router()
const jsonParser = express.json()


ContentsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ContentsService.getAllContents(knexInstance)
      .then(contents => {
          res.json(contents)
      })
      .catch(next)
  })

  ContentsRouter
  .route('/:contentId')
  .all((req, res, next) => {
    ContentsService.getById(
      req.app.get('db'),
      req.params.contentId
    )
      .then(content => {
        if (!content) {
          return res.status(404).json({
            error: { message: `Content doesn't exist` }
          })
        }
        res.content = content
        next()
      })
      .catch(next)
  })

  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ContentsService.getById(knexInstance, req.params.contentId)
      .then(content => {
        if (!content) {
          return res.status(404).json({
            error: { message: `Content doesn't exist` }
          })
        }
        res.json(content)
      })
      .catch(next)
  })

module.exports = ContentsRouter
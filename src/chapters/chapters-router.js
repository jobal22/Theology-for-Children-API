const express = require('express')
const ChaptersService = require('./chapters-service')
const logger = require('../logger')

const ChaptersRouter = express.Router()
const jsonParser = express.json()


ChaptersRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ChaptersService.getAllChapters(knexInstance)
      .then(chapters => {
          res.json(chapters)
      })
      .catch(next)
  })

  ChaptersRouter
  .route('/:chapterId')
  .all((req, res, next) => {
    ChaptersService.getById(
      req.app.get('db'),
      req.params.chapterId
    )
      .then(chapter => {
        if (!chapter) {
          return res.status(404).json({
            error: { message: `Chapter doesn't exist` }
          })
        }
        res.chapter = chapter
        next()
      })
      .catch(next)
  })

  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ChaptersService.getById(knexInstance, req.params.chapterId)
      .then(chapter => {
        if (!chapter) {
          return res.status(404).json({
            error: { message: `Chapter doesn't exist` }
          })
        }
        res.json(chapter)
      })
      .catch(next)
  })

module.exports = ChaptersRouter
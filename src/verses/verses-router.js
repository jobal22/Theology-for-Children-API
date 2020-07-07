const express = require('express')
const VersesService = require('./verses-service')
const logger = require('../logger')

const VersesRouter = express.Router()
const jsonParser = express.json()

// const serializeTitusVerses = titusVerse => ({
//   id: titusVerse.id,
//   notes: xss(titusVerse.notes),
// })


VersesRouter
  .route('/')
  .get((req, res, next) => {
  //       res.json(db.titusVerses)
  // })
    const knexInstance = req.app.get('db')
    VersesService.getAllVerses(knexInstance)
      .then(verses => {
          res.json(verses)
      })
      .catch(next)
  })

VersesRouter
  .route('/:verseId')
  .all((req, res, next) => {
    VersesService.getById(
      req.app.get('db'),
      req.params.verseId
    )
      .then(verse => {
        if (!verse) {
          return res.status(404).json({
            error: { message: `Verse doesn't exist` }
          })
        }
        res.verse = verse
        next()
      })
      .catch(next)
  })

  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    VersesService.getById(knexInstance, req.params.verseId)
      .then(verse => {
        if (!verse) {
          return res.status(404).json({
            error: { message: `Verse doesn't exist` }
          })
        }
        res.json(verse)
      })
      .catch(next)
  })

  .patch(jsonParser, (req, res, next) => {
    const {name, notes} = req.body
    const notesToUpdate = {notes}

    VersesService.updateVerse(
        req.app.get('db'),
        req.params.verseId,
        notesToUpdate
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })


module.exports = VersesRouter
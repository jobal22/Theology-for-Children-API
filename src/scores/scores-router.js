const path = require('path')
const express = require('express')
const xss = require('xss')
const ScoresService = require('./answer-service')

const ScoresRouter = express.Router()
const jsonParser = express.json()

const serializeScore = score => ({
  id: score.id,
  text: xss(score.text),
  quiz_id: score.quiz_id,
  user_id: score.user_id
})

ScoresRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ScoresService.getAllScores(knexInstance)
      .then(scores => {
        res.json(scores.map(serializeScore))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { text, quiz_id, user_id } = req.body
    const newScore = { text, quiz_id, user_id }

    for (const [key, value] of Object.entries(newScore))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    ScoresService.insertScore(
      req.app.get('db'),
      newScore
    )
      .then(score => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${score.id}`))
          .json(serializeScore(score))
      })
      .catch(next)
  })

  ScoresRouter
  .route('/:score_id')
  .all((req, res, next) => {
    ScoresService.getById(
      req.app.get('db'),
      req.params.score_id
    )
      .then(score => {
        if (!score) {
          return res.status(404).json({
            error: { message: `Score doesn't exist` }
          })
        }
        res.score = score
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeScore(res.score))
  })
  .delete((req, res, next) => {
    ScoresService.deleteScore(
      req.app.get('db'),
      req.params.score_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { text } = req.body
    const scoreToUpdate = { text }

    const numberOfValues = Object.values(scoreToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain 'text'`
        }
      })

      ScoresService.updateScore(
      req.app.get('db'),
      req.params.score_id,
      scoreToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = ScoresRouter
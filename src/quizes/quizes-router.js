const express = require('express')
const QuizesService = require('./quizes-service')
const logger = require('../logger')

const QuizesRouter = express.Router()
const jsonParser = express.json()

QuizesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    QuizesService.getAllQuizes(knexInstance)
      .then(quizes => {
          res.json(quizes)
      })
      .catch(next)
  })

  QuizesRouter
  .route('/:quizId')
  .all((req, res, next) => {
    QuizesService.getById(
      req.app.get('db'),
      req.params.quizId
    )
      .then(quiz => {
        if (!quiz) {
          return res.status(404).json({
            error: { message: `Quiz doesn't exist` }
          })
        }
        res.quiz = quiz
        next()
      })
      .catch(next)
  })

  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    QuizesService.getById(knexInstance, req.params.quizId)
      .then(quiz => {
        if (!quiz) {
          return res.status(404).json({
            error: { message: `Quiz doesn't exist` }
          })
        }
        res.json(quiz)
      })
      .catch(next)
  })

  .patch(jsonParser, (req, res, next) => {
    const {name, answer} = req.body
    const answerToUpdate = {answer}

    QuizesService.updateQuiz(
        req.app.get('db'),
        req.params.quizId,
        answerToUpdate
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })


module.exports = QuizesRouter
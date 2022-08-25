const express = require('express')
const PlansService = require('./plans-service')
const logger = require('../logger')
const { requireAuth } = require('../middleware/basic-auth')


const PlansRouter = express.Router()
const jsonParser = express.json()


PlansRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PlansService.getAllPlans(knexInstance)
      .then(plans => {
          res.json(plans)
      })
      .catch(next)
  })

  PlansRouter
  .route('/:planId')
  .all(requireAuth)
  .all((req, res, next) => {
    PlansService.getById(
      req.app.get('db'),
      req.params.planId
    )
      .then(plan => {
        if (!plan) {
          return res.status(404).json({
            error: { message: `Plan doesn't exist` }
          })
        }
        res.plan = plan
        next()
      })
      .catch(next)
  })

  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PlansService.getById(knexInstance, req.params.planId)
      .then(plan => {
        if (!plan) {
          return res.status(404).json({
            error: { message: `Plan doesn't exist` }
          })
        }
        res.json(plan)
      })
      .catch(next)
  })

module.exports = PlansRouter
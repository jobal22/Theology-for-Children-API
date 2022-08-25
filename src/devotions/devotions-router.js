const express = require("express");
const DevotionsService = require("./devotions-service");
const logger = require("../logger");

const DevotionsRouter = express.Router();
const jsonParser = express.json();

DevotionsRouter.route("/").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  DevotionsService.getAllDevotions(knexInstance)
    .then((devotions) => {
      res.json(devotions);
    })
    .catch(next);
});

// DevotionsRouter.route("/:devotionId")
//   .all((req, res, next) => {
//     DevotionsService.getById(req.app.get("db"), req.params.devotionId)
//       .then((devotion) => {
//         if (!devotion) {
//           return res.status(404).json({
//             error: { message: `Devotion doesn't exist` },
//           });
//         }
//         res.devotion = devotion;
//         next();
//       })
//       .catch(next);
//   })

//   .get((req, res, next) => {
//     const knexInstance = req.app.get("db");
//     DevotionsService.getById(knexInstance, req.params.devotionId)
//       .then((devotion) => {
//         if (!devotion) {
//           return res.status(404).json({
//             error: { message: `Devotion doesn't exist` },
//           });
//         }
//         res.json(devotion);
//       })
//       .catch(next);
//   });

module.exports = DevotionsRouter;

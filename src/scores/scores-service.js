const ScoresService = {
  getAllScores(knex) {
    return knex.select('*').from('theologyforchildren_scores')
  },

  insertScore(knex, newScore) {
    return knex
      .insert(newScore)
      .into('theologyforchildren_scores')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getById(knex, id) {
    return knex
      .from('theologyforchildren_scores')
      .select('*')
      .where('id', id)
      .first()
  },

  deleteScore(knex, id) {
    return knex('theologyforchildren_scores')
      .where({ id })
      .delete()
  },

  updateScore(knex, id, newScoreFields) {
    return knex('theologyforchildren_scores')
      .where({ id })
      .update(newScoreFields)
  },
}

module.exports = ScoresService
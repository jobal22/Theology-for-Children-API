const QuizesService = {
  getAllQuizes(knex) {
    return knex.select('*').from('theologyforchildren_quizes')
  },
  insertQuiz(knex, newQuiz) {
    return knex
      .insert(newQuiz)
      .into('theologyforchildren_quizes')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex.from('theologyforchildren_quizes').select('*').where('id', id).first()
  },
  deleteQuiz(knex, id) {
    return knex('theologyforchildren_quizes')
      .where({ id })
      .delete()
  },
  updateQuiz(knex, id, newQuizFields) {
    return knex('theologyforchildren_quizes')
      .where({ id })
      .update(newQuizFields)
  },
}

module.exports = QuizesService
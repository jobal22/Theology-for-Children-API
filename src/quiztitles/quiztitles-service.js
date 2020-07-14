const QuiztitlesService = {
  getAllQuiztitles(knex) {
    return knex.select('*').from('theologyforchildren_quiztitles')
  },
  insertQuiztitle(knex, newQuiztitle) {
    return knex
      .insert(newQuiztitle)
      .into('theologyforchildren_quiztitles')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex.from('theologyforchildren_quiztitles').select('*').where('id', id).first()
  },
  deleteQuiztitle(knex, id) {
    return knex('theologyforchildren_quiztitles')
      .where({ id })
      .delete()
  },
  updateQuiztitle(knex, id, newQuiztitleFields) {
    return knex('theologyforchildren_quiztitles')
      .where({ id })
      .update(newQuiztitleFields)
  },
}

module.exports = QuiztitlesService
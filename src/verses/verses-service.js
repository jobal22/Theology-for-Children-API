const VersesService = {
  getAllVerses(knex) {
    return knex.select('*').from('theologyforchildren_verses')
  },
  insertVerse(knex, newVerse) {
    return knex
      .insert(newVerse)
      .into('theologyforchildren_verses')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex.from('theologyforchildren_verses').select('*').where('id', id).first()
  },
  deleteVerse(knex, id) {
    return knex('theologyforchildren_verses')
      .where({ id })
      .delete()
  },
  updateVerse(knex, id, newVerseFields) {
    return knex('theologyforchildren_verses')
      .where({ id })
      .update(newVerseFields)
  },
}

module.exports = VersesService
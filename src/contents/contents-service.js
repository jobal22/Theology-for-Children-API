const ContentsService = {
  getAllContents(knex) {
    return knex.select('*').from('theologyforchildren_contents')
  },
  insertContent(knex, newContent) {
    return knex
      .insert(newContent)
      .into('theologyforchildren_contents')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex.from('theologyforchildren_contents').select('*').where('id', id).first()
  },
  deleteContent(knex, id) {
    return knex('theologyforchildren_contents')
      .where({ id })
      .delete()
  },
  updateContent(knex, id, newContentFields) {
    return knex('theologyforchildren_contents')
      .where({ id })
      .update(newContentFields)
  },
}

module.exports = ContentsService
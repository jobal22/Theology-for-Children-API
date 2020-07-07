const ChaptersService = {
  getAllChapters(knex) {
    return knex.select('*').from('theologyforchildren_chapters')
  },
  insertChapter(knex, newChapter) {
    return knex
      .insert(newChapter)
      .into('theologyforchildren_chapters')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex.from('theologyforchildren_chapters').select('*').where('id', id).first()
  },
  deleteChapter(knex, id) {
    return knex('theologyforchildren_chapters')
      .where({ id })
      .delete()
  },
  updateChapter(knex, id, newChapterFields) {
    return knex('theologyforchildren_chapters')
      .where({ id })
      .update(newChapterFields)
  },
}

module.exports = ChaptersService
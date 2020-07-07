const BooksService = {
  getAllBooks(knex) {
    return knex.select('*').from('theologyforchildren_books')
  },
  insertBook(knex, newBook) {
    return knex
      .insert(newBook)
      .into('theologyforchildren_books')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex.from('theologyforchildren_books').select('*').where('id', id).first()
  },
  deleteBook(knex, id) {
    return knex('theologyforchildren_books')
      .where({ id })
      .delete()
  },
  updateBook(knex, id, newBookFields) {
    return knex('theologyforchildren_books')
      .where({ id })
      .update(newBookFields)
  },
}

module.exports = BooksService
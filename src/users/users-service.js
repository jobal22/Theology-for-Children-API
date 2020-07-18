const UsersService = {
  getAllUsers(knex) {
    return knex.select('*').from('theologyforchildren_users')
  },

  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into('theologyforchildren_users')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getById(knex, id) {
    return knex
      .from('theologyforchildren_users')
      .select('*')
      .where('id', id)
      .first()
  },

  deleteUser(knex, id) {
    return knex('theologyforchildren_users')
      .where({ id })
      .delete()
  },

  updateUser(knex, id, newUserFields) {
    return knex('theologyforchildren_users')
      .where({ id })
      .update(newUserFields)
  },
}

module.exports = UsersService
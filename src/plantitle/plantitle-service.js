const PlantitlesService = {
  getAllPlantitles(knex) {
    return knex.select('*').from('theologyforchildren_plantitles')
  },
  insertPlantitle(knex, newPlantitle) {
    return knex
      .insert(newPlantitle)
      .into('theologyforchildren_plantitles')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex.from('theologyforchildren_plantitles').select('*').where('id', id).first()
  },
  deletePlantitle(knex, id) {
    return knex('theologyforchildren_plantitles')
      .where({ id })
      .delete()
  },
  updatePlantitle(knex, id, newPlantitleFields) {
    return knex('theologyforchildren_plantitles')
      .where({ id })
      .update(newPlantitleFields)
  },
}

module.exports = PlantitlesService
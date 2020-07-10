const PlansService = {
  getAllPlans(knex) {
    return knex.select('*').from('theologyforchildren_plans')
  },
  insertPlan(knex, newPlan) {
    return knex
      .insert(newPlan)
      .into('theologyforchildren_plans')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex.from('theologyforchildren_plans').select('*').where('id', id).first()
  },
  deletePlan(knex, id) {
    return knex('theologyforchildren_plans')
      .where({ id })
      .delete()
  },
  updatePlan(knex, id, newPlanFields) {
    return knex('theologyforchildren_plans')
      .where({ id })
      .update(newPlanFields)
  },
}

module.exports = PlansService
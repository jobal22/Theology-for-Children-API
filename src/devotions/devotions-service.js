const DevotionsService = {
  getAllDevotions(knex) {
    return knex.select("*").from("devotions");
  },
  insertDevotion(knex, newDevotion) {
    return knex
      .insert(newDevotion)
      .into("devotions")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex.from("devotions").select("*").where("id", id).first();
  },
  deleteDevotion(knex, id) {
    return knex("devotions").where({ id }).delete();
  },
  updateDevotion(knex, id, newDevotionFields) {
    return knex("devotions").where({ id }).update(newDevotionFields);
  },
};

module.exports = DevotionsService;

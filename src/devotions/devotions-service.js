const DevotionsService = {
  getAllDevotions(knex) {
    return knex.select("*").from("Devotions_devotions");
  },
  insertDevotion(knex, newDevotion) {
    return knex
      .insert(newDevotion)
      .into("Devotions_devotions")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex.from("Devotions_devotions").select("*").where("id", id).first();
  },
  deleteDevotion(knex, id) {
    return knex("Devotions_devotions").where({ id }).delete();
  },
  updateDevotion(knex, id, newDevotionFields) {
    return knex("Devotions_devotions").where({ id }).update(newDevotionFields);
  },
};

module.exports = DevotionsService;

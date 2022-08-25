module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  // Database_URL:
  //   process.env.Database_URL ||
  //   "ostgres://bmkdrszi:EocyHusuL9OTHF9rHOR2M6iH03e7mIII@ruby.db.elephantsql.com:5432/bmkdrszi",
  Database_URL:
    process.env.Database_URL2 ||
    "postgres://wuxmyupo:xGM_krJk0pKaOfNE-KSldK4ctX5UnCTM@suleiman.db.elephantsql.com/wuxmyupo",
};

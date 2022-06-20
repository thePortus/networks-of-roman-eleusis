module.exports = {
  HOST: "localhost",
  USER: "eleusisuser",
  PASSWORD: "password",
  DB: "roman_eleusis",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

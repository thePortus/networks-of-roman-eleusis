module.exports = app => {
  require('./inscription.routes')(app);
  require('./honor.routes')(app);
  require('./institution.routes')(app);
  require('./person.routes')(app);
  require('./inscription_feature.routes')(app);
  require('./inscription_reference.routes')(app);
  require('./honor_in_inscription.routes')(app);
  require('./institution_honor.routes')(app);
  require('./institution_inscription.routes')(app);
  require('./person_in_inscription.routes')(app);
  require('./person_with_honor.routes')(app);
  require('./network.routes')(app);
  require('./export.routes')(app);
  require('./user.routes')(app);
  require('./profile.routes')(app);
};

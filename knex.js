var moment = require('moment');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'maindel_matkaDelhi',
    password: 'Passmein^22',
    database: 'maindel_mainDelhi',
    typeCast: function (field, next) {
      if (field.type == 'DATE') {
        return moment(field.string()).format('YYYY-MM-DD ');
      }
      return next();
    }
  },
  useNullAsDefault: true

});
module.exports = knex;
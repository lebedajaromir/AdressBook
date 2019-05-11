/* eslint-disable */
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() =>
      // Inserts seed entries
      knex('users').insert([
        { email: 'test@test.com', password: '$2b$07$llIs5HgIVdK.qRTg2nfHdOPj5dOWnT6ex6QhC/uQB5jIZZNwmPOh.' },
      ]))
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admins').del()
    .then(function () {
      // Inserts seed entries
      return knex('admins').insert([
        {
          id: 1,
          fullname:'An Ann',
          username:'An',
          email: 'nigel@email.com',
          password: 'dorwssap'
        },
        {
          id: 2,
          fullname:'Bii Ann',
          username:'Bii',
          email: 'nakaz@email.com',
          password: 'password1'
        }
      ]);
    });
};

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'demo-sgroup',
      host: 'localhost',
      user: 'root',
      password:''
    },  useNullAsDefault: true,
    migrations: {
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds'
    }

  },
}
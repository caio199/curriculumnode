// knexfile.js
module.exports = {
    development: {
      client: 'pg',
      connection: {
        database: 'my_curriculo_db',
        user: 'postgres', 
        password: '123456', 
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: './db/migrations',
      },
      seeds: {
        directory: './db/seeds',
      },
    // Nome da tabela deve ser 'Curriculums'
    tableName: 'Curriculums',
  },
};
  
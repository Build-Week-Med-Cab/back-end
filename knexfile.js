// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/database.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
    afterCreate: (conn, done) => {
    conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/testing.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds/testing'
    },
    pool: {
    afterCreate: (conn, done) => {
    conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }

};

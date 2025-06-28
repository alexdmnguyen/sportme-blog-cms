import path from 'path';

// This function helps parse the database URL from Render
const { parse } = require("pg-connection-string");

export default ({ env }) => {
  const isProduction = env('NODE_ENV') === 'production';

  if (isProduction) {
    // Ensure the DATABASE_URL is set
    if (!env('DATABASE_URL')) {
      throw new Error('DATABASE_URL environment variable is not set for production environment.');
    }

    const config = parse(env('DATABASE_URL'));

    return {
      connection: {
        client: 'postgres',
        connection: {
          host: config.host,
          port: config.port,
          database: config.database,
          user: config.user,
          password: config.password,
          ssl: { rejectUnauthorized: false }, // Required for Render
        },
        debug: false,
      },
    };
  }

  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };
};
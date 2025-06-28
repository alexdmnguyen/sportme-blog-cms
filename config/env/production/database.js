const { parse } = require("pg-connection-string");

console.log("✅ LOADING PRODUCTION DATABASE CONFIG...");

module.exports = ({ env }) => {
  const databaseUrl = env("DATABASE_URL");

  console.log(`✅ Production DATABASE_URL found: ${databaseUrl ? 'Yes' : 'No'}`);

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable not set for production.");
  }

  const { host, port, database, user, password } = parse(databaseUrl);

  return {
    connection: {
      client: 'postgres',
      connection: {
        host,
        port,
        database,
        user,
        password,
        ssl: { rejectUnauthorized: false },
      },
      debug: false,
    },
  }
};
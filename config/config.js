const config = {}
config.port =  process.env.PORT;
config.node_env = process.env.NODE_ENV;
config.db_host = process.env.DB_HOST;
config.db_password = process.env.DB_PASSWORD;
config.db_port = process.env.DB_PORT
config.node_env = process.env.NODE_ENV

module.exports = config;

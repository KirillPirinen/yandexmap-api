const session = require('express-session')
// const redis = require('redis')
// const RedisStore = require('connect-redis')(session)
const FileStore = require('session-file-store')(session);
// const redisClient = redis.createClient()
require('dotenv').config();

const sessionsConf = {
  store: new FileStore(/*{host:'localhost', port:6379, client: redisClient }*/),
  key: 'sid', // ключ куки (название куки)
  secret: process.env.SECRET, // для шифрования id сессии
  resave: true, // сессия будет сохраняться заново только при изменениях
  saveUninitialized: false, // сохранение (или не сохранение) не инициализированной сессии
  httpOnly: true, // невозможно изменить куку с фронта
  cookie: { expires: 24 * 60 * 60e3 },
}

module.exports = session(sessionsConf);

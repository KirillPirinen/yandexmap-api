const express = require('express');
const path = require('path');
const hbs = require('hbs');
const sessionMiddleware = require('./src/routers/middleware/sessionstore');
const Validator = require('./src/routers/middleware/validate');
const app = express();

const PORT = 3000;

hbs.registerPartials(path.resolve(process.env.PWD, 'views', 'partials'));
app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'views'));

app.use(sessionMiddleware);
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const indexRouter = require('./src/routers/index.router');
const userRouter = require('./src/routers/user.router');
const errorHandler = require('./src/routers/middleware/error');
app.use(Validator.isAuth);

app.use('/', indexRouter);
app.use('/user', Validator.checkAbility, userRouter);

app.post('/registration', Validator.registration);
app.post('/authorization', Validator.checkPass);
app.get('*', (req, res) => {
  res.render('error', {message:'404 Cтраницы не существует'});
})

//обработчик ошибок
app.use(errorHandler);
app.enable('trust proxy')
app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
})

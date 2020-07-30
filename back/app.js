let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const mongooseConnect = require('./mongo/mongoConnect');
let cors = require('cors');

const jwt = require('jsonwebtoken');
const privateKey = 'hello';

let indexRouter = require('./routes/index');
let userRouter = require('./routes/user');
let postsRouter = require('./routes/posts');
let conversationRouter = require('./routes/conversation');

let app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// connect to mongo
mongooseConnect();
// connect to mongo

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
const helperServices = require('./services/helperServices');
app.use('/', indexRouter);
app.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, privateKey, function (err, decoded) {
            if (err instanceof jwt.TokenExpiredError) {
                return res.status(401).json({"error": true, "message": 'Unauthorized access.'});
            }
            if (err instanceof jwt.JsonWebTokenError) {
                return res.status(403).json({"error": true, "message": 'No token provided.'});
            }
            next();
        });
    } else {
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
});
app.use('/', userRouter);
app.use('/', conversationRouter);
app.use('/', postsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');

});

module.exports = app;

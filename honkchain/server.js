const errorHandler = require('./middleware/errorHandler');
const router = require('./routes/honk-routes');
const AppError = require('./utils/AppError');
const dotenv = require('dotenv')
dotenv.config('./.env')
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors({
    origin: '*',
    'Access-Control-Allow-Origin': "*"
}));
app.use('/honkRpc', router);
app.use(express.json());


app.all('*', (req, res, next) => {
    next(
        new AppError(
          `We honkly believe ${req.originalUrl}, is a honking wronk URL!`,
          404
        )
    );
});

app.use(errorHandler);

PORT = 1235;
app.listen(
    PORT,
    console.log(`This server be honking on port: ${PORT} in DEV MODE`)
);
 
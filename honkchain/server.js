const errorHandler = require('./middleware/errorHandler');
const router = require('./routes/honk-routes');
const AppError = require('./utils/AppError');
const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors');

dotenv.config({path:'./config/.env'});

const app = express();

app.use(cors({
    origin: '*',
    'Access-Control-Allow-Origin': "*"
}));

app.use('/honkRpc', router);
app.use(express.json());
app.use(errorHandler);


app.all('*', (req, res, next) => {
    next(
        new AppError(
          `We honkly believe ${req.originalUrl}, is a honking wronk URL!`,
          404
        )
    );
});

app.use(errorHandler);

PORT = process.env.PORT;

app.listen(
    PORT,
    //console.log(`This server be honking on port: ${PORT} in DEV MODE`)
);
 
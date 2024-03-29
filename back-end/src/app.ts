import 'dotenv/config';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import currenciesRoutes from './routes/currencies';
import tagsRoutes from './routes/tags';
import savingsRoutes from './routes/savings';
import movementsRoutes from './routes/movements';
import { get404, get500 } from './controllers/error';


const app = express();

app.use(bodyParser.json());

//CORS - Access-Control-Allow-Origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/currencies', currenciesRoutes);
app.use('/tags', tagsRoutes);
app.use('/savings', savingsRoutes);
app.use('/movements', movementsRoutes);
app.use(get404);

mongoose
    .connect(`${process.env.MONGODB_URL}`)
    .then(() => {
        app.listen(process.env.PORT);
    })
    .catch((err) => {
        console.log(err);
        app.use(get500);
    });




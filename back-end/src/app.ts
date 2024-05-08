import 'dotenv/config';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import authRouter from './routes/auth';
import currenciesRoutes from './routes/currencies';
import tagsRoutes from './routes/tags';
import savingsRoutes from './routes/savings';
import movementsRoutes from './routes/movements';
import { get404, get500 } from './controllers/error';
import { authToken } from './middleware/authToken';
import { authUser } from './middleware/authUser';
import populateCurrencies from './utils/populateCurrencies';
import Currency from './models/currency';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

//CORS - Access-Control-Allow-Origin
/*
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
*/
app.use(cors({
    origin: ['http://localhost:3000'],
}));
app.use('/currencies', authToken, authUser, currenciesRoutes);
app.use('/tags', authToken, authUser, tagsRoutes);
app.use('/savings', authToken, authUser, savingsRoutes);
app.use('/movements', authToken, authUser, movementsRoutes);
app.use(authRouter);
app.use(get404);

const connectToMongoDB = () => {
    mongoose
    .connect(`${process.env.MONGODB_URL}`)
    .then(async () => {
        console.log("MongoDB connected successfully");
        if ( process.env.POPULATE_CURRENCIES ) {
            await populateCurrencies();
        }
    })    
    .catch((err) => {
        console.log('Error while connecting to MongoDB...' + err);
        app.use(get500);
    });
}

connectToMongoDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



import express from 'express';
import bodyParser from 'body-parser';
import Routes from './routes/routes';
import 'dotenv/config';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 8080;
const app = express();

mongoose.connect(process.env.MONGO_URI || '')
    .then(() => {
        console.info('Connected to mongo db');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(bodyParser.json());
app.use('/api', Routes.initialize());

app.listen(PORT, () => {
    console.info(`INFO LOG: Listening to PORT ${PORT}`);
});


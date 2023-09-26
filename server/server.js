import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { json } from 'express';
import http from 'http';
import './config/connectDB.js';
import router from './routes/router.js';
const app = express();

const { readdirSync } = require('fs');
readdirSync('./routes').map((file) =>
    app.use('/', require('./routes/' + file))
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
app.use('/api/v1', router);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const port = process.env.PORT || 8080;
const server = http.createServer(app);

app.listen(port, () =>
    console.log(`Server Running on  http://localhost:${port}`)
);

export default app;

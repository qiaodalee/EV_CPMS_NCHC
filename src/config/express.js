/* express.js */
import express from 'express';
import cors from 'cors';
import index from '../server/routes/index.route';
import service from '../server/routes/service.route';
import admin from '../server/routes/admin.route';
import sql from '../server/routes/sql.route';


const app = express();

app.use(cors());

app.use((req, res, next) =>{
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    console.log(`${currentHour}:${currentMinute}:${currentSecond}` + ' GMT+0800 (台北標準時間): ' + req.method + " " + req.url);
    next();
});

/* GET home page. */
app.use('/', index);

app.use('/admin', admin);

app.use('/service', service);

app.use('/sql', sql);

export default app;

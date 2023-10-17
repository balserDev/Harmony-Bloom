import express from 'express'
import { Calendar, generateCalendars } from './public/scripts/calendar.js';
import bodyParser from "body-parser";


const app = express();

const port = 3000;
const myCalendars = generateCalendars(2023);
const currentMonth = (new Date().getMonth()) + 1;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.listen(port, (req, res)=>{
    console.log(`The server has started at the port ${port}`)
})

app.get('/', (req, res)=>{

    res.render('main.ejs', {
        calendars:myCalendars,
        Month:currentMonth
    })
})

app.get('/SUBMIT', (req, res)=>{

    res.send('TEST');
})


app.post('/SUBMIT', (req, res)=>{
    let month = req.body.currentMonth
    res.render('main.ejs', {
        calendars:myCalendars,
        Month:month
    })
})
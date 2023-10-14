import express from 'express'
import { Calendar, generateCalendars } from './public/scripts/calendar.js';


const app = express();
const port = 3000;

app.use(express.static("public"))

app.listen(port, (req, res)=>{
    console.log(`The server has started at the port ${port}`)
})

app.get('/', (req, res)=>{

    const myCalendars = generateCalendars(2023);
    console.log(myCalendars[0].getMonthName());

    res.render('main.ejs', {calendars:myCalendars})
})
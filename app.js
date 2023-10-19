import express from 'express'
import { Calendar, generateCalendars } from './public/scripts/calendar.js';
import bodyParser from "body-parser";
import mongoose from 'mongoose';


const app = express();
const port = 3000;

const myCalendars = generateCalendars(2023);
const currentMonth = (new Date().getMonth()) + 1;


await mongoose.connect("mongodb://127.0.0.1:27017/HarmonyBloom")

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})
const userData=  mongoose.model("users", userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.listen(port, (req, res)=>{
    console.log(`The server has started at the port ${port}`)
})


app.get('/', (req, res)=>{

    res.render('login.ejs');

})


app.get('/main', (req, res)=>{

    res.render('main.ejs', {
        calendars:myCalendars,
        Month:currentMonth
    })
})


app.get('/sing-up', (req, res)=>{

    res.render('register.ejs');
})


app.post('/login', (req, res) =>{
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    userData.findOne({email:userEmail})
    .then( found =>{
        if(found){
            if(found.password){
                res.render('main.ejs', {
                    calendars:myCalendars,
                    Month:currentMonth
                })
            }else{
               
                res.render('login.ejs', {error:"worng password or email"});
            }
        }
        else{
       
            res.render('login.ejs', {error:"worng password or email"});
        }
        
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    })
})
    
    
app.post('/register', (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const user = new userData({
        username: username,
        email: email,
        password: password
    })

    console.log('user');
    user.save()
    .then(item => {
        res.render('main.ejs', {
            calendars:myCalendars,
            Month:currentMonth
        })
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
})
    





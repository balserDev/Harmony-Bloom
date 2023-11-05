import express from 'express'
import { Calendar, generateCalendars } from './public/scripts/calendar.js';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import 'dotenv/config'

const app = express();
const port = 3000;

const myCalendars = generateCalendars(2023);
const currentMonth = (new Date().getMonth()) + 1;

var USEREMAIL = '';
var marks = {};

await mongoose.connect(`mongodb+srv://${process.env.DATABASEUSER}${process.env.DATABASEPASSWORD}@cluster0.ufqg3ep.mongodb.net/HarmonyBloom`)

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    data : Map
})
const userData=  mongoose.model("users", userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit:'5mb'}))
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

app.get('/help', (req,res)=>{
    res.send('help here')
})
app.get('/about', (req,res)=>{
    res.render('about.ejs');
})


app.post('/login', (req, res) =>{
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    userData.findOne({email:userEmail})
    
    .then( found =>{
        if(found){
          
            if(found.password == userPassword){
                
                USEREMAIL = userEmail;

                userData.findOne({email:userEmail})
                .then(f=>{
                    marks = f.data;
                    console.log(marks);
                    
                    var data = JSON.stringify(marks);
                    res.render('main.ejs', {
                        calendars:myCalendars,
                        Month:currentMonth,
                        userName : found.username,
                        jsonData: data
                })
                })

               // myData = JSON.stringify(marks);

           
                

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

    userData.findOne({email:email})
    .then(found =>{
        if(found){
            res.render('register.ejs', {error: "Error email allready in use"})
        }
        else{
            const user = new userData({
                username: username,
                email: email,
                password: password,
                data : {0:[], 1:[], 2:[], 3:[], 4:[], 5:[],
                    6:[], 7:[], 8:[], 9:[], 10:[], 11:[]}
            })
        
            console.log('user');
            user.save()
            .then(item => {
                res.render('login.ejs')
              })
              .catch(err => {
                res.status(400).send("unable to save to database");
              });
        }
    })
   
})
    

app.post('/user-data', (req, res)=>{

    console.log('I got a request');
    console.log(req.body);

    var markeddays = req.body

    userData.updateOne({email:USEREMAIL}, { data: markeddays})
    .then(found =>{
        console.log('succes')
       //res.render('login.ejs')
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });

})



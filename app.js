import express from 'express'


const app = express();
const port = 3000;

app.use(express.static("public"))

app.listen(port, (req, res)=>{
    console.log(`The server has started at the port ${port}`)
})

app.get('/', (req, res)=>{
    res.render('main.ejs')
})
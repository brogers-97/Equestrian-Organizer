// required packages
require('dotenv').config()
const express = require('express')
// app config
const app = express()
const PORT = process.env.PORT || 8000
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/users', require('./controllers/users.js'))

app.listen(PORT, function(){
    console.log(`server ${PORT} linked!`)
})
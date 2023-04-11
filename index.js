// required packages
require('dotenv').config()
const express = require('express')
// app config
const app = express()
const PORT = process.env.PORT || 8000
const cookieParser = require('cookie-parser')
const cryptoJs = require('crypto-js')
const db = require('./models')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public/'))

//tells express to parse incoming cookies sent from the browser
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}]: ${req.method} ${req.url}`)
    console.log('request body:', req.body)
    next() //tell epress that this middleware has finished
})

// custom auth middleware
app.use( async (req, res, next) => {
    try{
        // check if there is a cookie
        if (req.cookies.userId) {
            const decryptedPk = cryptoJs.AES.decrypt(req.cookies.userId, process.env.ENC_KEY)
            const decryptedPkString = decryptedPk.toString(cryptoJs.enc.Utf8)
            const user = await db.user.findByPk(decryptedPkString)
            res.locals.user = user
            // if so, we will decrypt the cookie and look up user using PK
            // mount the found user on the res.locals
            // in all other routes you can assume that the res.locals.user is the currently logged in user
        } else {
            res.locals.user = null
            // if there is no cookie, set res.locals.user to be null
        }
    } catch (err){
        console.log(err)
        // if something goes wrong
        // set the res.locals to be null
        res.locals.user = null
    } finally {
        // runs regardless of whether there was an error or not
        next() // got to the next thing no matter what
    }
})

app.get('/', (req, res) => {
    console.log(res.locals)
    res.render('index.ejs', {
        user: res.locals.user
    })
})

app.use('/users', require('./controllers/users.js')) 
app.use('/horses', require('./controllers/horses.js')) 
app.use('/tasks', require('./controllers/tasks.js')) 


app.listen(PORT, function(){
    console.log(`server ${PORT} linked!`)
})
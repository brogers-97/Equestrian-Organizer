// required packages
const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptoJs = require('crypto-js')
const axios = require('axios')
const weatherToken = process.env.API_KEY
//mount routes

// GET /users/new -- show route for a form that creates a new user (sign up for the app)
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})
// POST /users -- create a new user from the form @ GET /users/new
router.post('/', async (req, res) => {
    try{
        console.log(req.body)
        //find or create with the users given email
        
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email
            }
        })
        if(!created){
             // if the users email returns as found -- don't sign up -- redirect to login
             console.log('user account exists')
             res.redirect('/users/login?message=Please login to your account to continue 🛑')
        } else {
        // hass the users password before its added to the database
        const hashedPassed = bcrypt.hashSync(req.body.password, 12)
        // save the user in the db
        newUser.password = hashedPassed
        await newUser.save()
        // encrypt the logged in users id
        const encryptedPk = cryptoJs.AES.encrypt(newUser.id.toString(), process.env.ENC_KEY)
        // set encrypted id as a cookie
        res.cookie('userId', encryptedPk.toString())
        // redirect user
        res.redirect('/users/profile')
        }
        
    }catch(err){
        console.log(err)
    }
    //res.send('create a new user if they do not exist')
})
// GET /users/login -- show route for a form that lets a user login
router.get('/login', (req, res) => {
    console.log(req.query)
    res.render('users/login.ejs', {
        message: req.query.message ? req.query.message : null
    })
})
// POST /users/login -- authenticate a user's credentials
router.post('/login', async (req, res) => {
    try{
        // search for the users email in the db
        const foundUser = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        const failedLoginMessage = 'incorrect email or password 🥳'
        if (!foundUser){
            // if the users email is not found, do not login
            console.log('user not found')
            res.redirect('/users/login?message=' + failedLoginMessage)
        } else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
            console.log('incorrect password')
            // if the user exists but they have wrong passord, do not login
            res.redirect('/users/login?message=' + failedLoginMessage)
        } else {
            // if user exists with correct password, log them in
            const encryptedPk = cryptoJs.AES.encrypt(foundUser.id.toString(), process.env.ENC_KEY)
            res.cookie('userId', encryptedPk.toString())
            res.redirect('/users/profile')
        }
                // encrypt the user's PK
                // set the encrypted PK as a cookie
                //redirect them to their profile
            
    }catch(err){
        console.log(err)
        res.redirect('/')
    }
})
// GET /users/logout -- logout the current user
router.get('/logout', (req, res) => {
    console.log('logging user out')
    res.clearCookie('userId')
    res.redirect('/')
})
// GET /users/profile -- show authorized users their profile page
router.get('/profile', async (req, res) =>{
    //if the user comes and isnot logged in -- lack authroization
    if(!res.locals.user) {
        //redirect them to the login
        res.redirect('/users/login?message="you are not authorized to view that page. Please authenticate to continue')
    } else {
        const userId = res.locals.user.dataValues.id
        const horses = await db.horses.findAll({
            where: {
                foreignKey: userId 
            },
            attributes: ['id', 'name']
        })
        const tasks = await db.task.findAll({
            where: {
                userId: userId
            }
        })

        const literalDate = new Date().toLocaleString().split(',')[0]
        //this function creates the current date and formats it for user convenience.
        function displayDate(){
            const currentDate = new Date().toLocaleDateString('en-US', {weekday:'long',month:'long',day:'numeric'});
            return currentDate
        }

        // declares variables used in weather api
        const zipCode = 85205
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${weatherToken}&q=${zipCode}&days=1&aqi=no&alerts=no`)

        const dayClock = response.data.location.localtime.split(' ')[1]
        const sunTimer = response.data
        

        // all the info on line 125 -> 131 is being passed to profile.ejs
        res.render('users/profile.ejs',{
            horses,
            tasks,
            displayDate,
            sunTimer,
            literalDate,
            dayClock
        })
    }
    //if they are allowed to be here, show them their profile
})
//export the router instance
module.exports = router
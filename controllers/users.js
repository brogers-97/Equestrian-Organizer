// required packages
const express = require('express')
const router = express.Router()
//mount routes

// GET /users/new -- show route for a form that creates a new user (sign up for the app)
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})
// POST /users -- create a new user from the form @ GET /users/new
router.post('/', (req, res) => {
    console.log(req.body)
    //find or create with the users given email
        // if the users email returns as found -- don't sign up -- redirect to login
    // hass the users password before its added to the database
    // save the user in the db
    // ???

    res.send('create a new user if they do not exist')
})
// GET /users/login -- show route for a form that lets a user login
router.get('/login', (req, res) => {
    res.send('show a login form')
})
// POST /users/login -- authenticate a user's credentials
router.post('/login', (req, res) => {
    res.send('verify login auth')
})
// GET /users/logout -- logout the current user
router.get('/logout', (req, res) => {
    res.send('log a user out, redirect to login')
})
// GET /users/profile -- show authorized users their profile page
router.get('/profile', (req, res) =>{
    res.send('show home page w/ user')
})
//export the router instance
module.exports = router
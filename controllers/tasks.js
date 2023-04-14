const express = require('express')
const router = express.Router()
const db = require('../models')
const methodOverride = require('method-override')
const accountSid = "AC475a207f159883a2d1978f32525c626e";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
router.use(methodOverride('_method'))



router.get('/new', (req, res) => {
    res.render('tasks/new.ejs')
})


// send info to ejs file for creating a profile page with list of tasks
router.post('/new', async (req, res) => {
    try{
        const userData = res.locals.user.dataValues
        const date = new Date(`${req.body.date} ${req.body.time} GMT-07:00`) 
        const taskData = {
            task: req.body.task,
            day: date,
            time: req.body.time,
            userId: userData.id
        }
        console.log('new time',taskData.time)
        await db.task.create(taskData)
        res.redirect('/users/profile')
    }catch(err){
        console.log(err)
    }
})


// renders the ejs file to edit a specific task
router.get('/edit/:id', async (req, res) => {
    const tasksId = req.params.id
    const task = await db.task.findOne({
        where: {
            id: tasksId
        }
    })
    try{
        res.render('tasks/edit.ejs', {
            task
        })
    }catch(err){
        console.log(err)
    }
})


// alters the info of specific task inside of the database
router.put('/edit/:id', async (req, res) => {
    try{
        const taskId = req.params.id
        const date = new Date(`${req.body.date} ${req.body.time} GMT-07:00`)
        task = await db.task.findOne({
            where:{
                id: taskId
            }
        })
        await task.update({
            task: req.body.task || task.task,
            day: date,
            time: req.body.time || task.time
        })
        console.log('edited time',task.dataValues.time)
        res.redirect(`/tasks/${taskId}`)
    }catch(err){
        console.log(err)
    }
})


// destroys specific task inside database
router.delete('/:id', async (req, res) =>{
    const taskId = req.params.id
    try{
        await db.task.destroy({
            where:{
                id: taskId
            }
        })
        res.redirect('../users/profile')
    }catch(err){

    }
})


// an api I created to send info to my script.js file.
router.get('/api', async (req, res) => {
    try{
        if(res.locals.user){
            const tasks = await db.task.findAll()
            const users = await db.user.findAll()
            const currentUserId = res.locals.user.dataValues;
            
            // line 103 -> 107 is all database info use in the script.js file
            res.json({
                tasks: tasks,
                users: users,
                currentUserId: currentUserId,
            })
        }
    }catch(err){
        console.log(err)
    }
})


// the recieves the api request sent from the script.js file
router.post('/send-message', async (req, res) => {
    try{
        message = req.body.message
        console.log('received message:',message)
        // this function is being called when a task is found and the message created in the script.js file is being passed through to the users cell phone.
        await sendMessage(message)
        res.sendStatus(200)
    }catch(err){
        console.log(err)
    }
})


// this function uses Twilio npm. It sends the passed in message from the twilio number on line 135 to the users phone on 136. (didnt have time to finish pulling users phone number and setting it to a variable then passing into this function.)
async function sendMessage(message) {
    if(message){
        try{
            await client.messages.create({
                body: message,
                from: "+18449801859",
                to: "+14806366841"
            })
            console.log('message sent:', message)
        }catch(err){
            console.log(err)
        }
    }else {
        console.log('message is empty or undefined')
    }
}


// renders the ejs of a specific task
router.get('/:id', async (req, res) => {
    const taskId = req.params.id
    const currentTask = await db.task.findOne({
        where: {
            id: taskId
        }
    }) 
    res.render('tasks/details.ejs', {
        currentTask
    }) 
})

module.exports = router
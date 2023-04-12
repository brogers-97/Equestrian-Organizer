const express = require('express')
const router = express.Router()
const db = require('../models')
const methodOverride = require('method-override')
router.use(methodOverride('_method'))

router.get('/', (req, res) => {
    res.redirect('horses/new')
})

router.get('/new',(req, res) => {
    res.render('horses/new.ejs')
})

router.post('/', async (req, res) => {
    try {
        const userData = res.locals.user.dataValues
        const horseData = {
            type: req.body.type,
            name: req.body.name,
            breed: req.body.breed,
            sex: req.body.sex,
            status: req.body.status,
            notes: req.body.notes,
            lastChecked: req.body.lastChecked,
            registration: req.body.registration,
            client: req.body.client,
            foreignKey: userData.id
        }
        await db.horses.create(horseData)
        res.redirect('/users/profile')
    } catch (err) {
        console.log(err)
    }
})


router.get('/:id/task', (req, res) =>{
    console.log('Horse ID:', req.params.id)
    try{
        console.log('im in the controller')
        res.render('tasks/horseTask.ejs',{
            horseId: req.params.id
        })
    }catch(err){
        console.log(err)
    }
})

router.post('/:id/task', async (req, res) =>{
    try{
        const horseId = req.params.id
        const userData = res.locals.user.dataValues
        const date = new Date(`${req.body.date} ${req.body.time} GMT-07:00`)
        const taskData = {
            task: req.body.task,
            day: date,
            time: req.body.time,
            userId: userData.id,
            horseId: horseId
        }
        await db.task.create(taskData)
        res.redirect(`/horses/${horseId}`)
    }catch(err){
        console.log(err)
    }
})

router.get('/edit/:id', async (req, res) => {
    const horseId = req.params.id
    const horse = await db.horses.findOne({
        where: {
            id: horseId
        }
    })
    try{
        res.render('horses/edit.ejs', {
            horse
        })
    }catch(err){
        console.log(err)
    }
})

router.put('/edit/:id', async (req, res) => {
    try{
        const horseId = req.params.id
        horse = await db.horses.findOne({
            where:{
                id: horseId
            }
        })
        await horse.update({
            client: req.body.client || horse.client,
            status: req.body.status || horse.status,
            registration: req.body.registration || horse.registration
        })
        res.redirect(`/horses/${horseId}`)
    }catch(err){
        console.log(err)
    }
})

router.delete('/:id', async (req, res) => {
    const horseId = req.params.id
    try{
        await db.horses.destroy({
            where: {
                id: horseId
            }
        })
        res.redirect('../users/profile')
    }catch(err){
        console.log(err)
    }
})

router.get('/:id', async (req, res) => {
    const horseId = req.params.id
    const horse = await db.horses.findOne({
        where: {
            id: horseId
        }
    })
    const horseTask = await db.task.findAll({
        where:{
            horseId: horseId
        }
    })
    try {
        res.render('horses/details.ejs', {
            horse,
            horseTask
        })
    } catch(err){
        console.log(err)
    }
})

module.exports = router
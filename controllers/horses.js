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
        console.log(userData)
        await db.horses.create(horseData)
        res.redirect('/users/profile')
    } catch (err) {
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
    try {
        res.render('horses/details.ejs', {
            horse
        })
    } catch(err){
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

module.exports = router
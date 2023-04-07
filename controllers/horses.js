const express = require('express')
const router = express.Router()
const db = require('../models')

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

module.exports = router
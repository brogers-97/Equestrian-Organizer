const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', (req, res) => {
    res.redirect('tasks/new')
})

module.exports = router
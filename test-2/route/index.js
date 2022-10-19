const express = require('express')
const router = express.Router()
const controller = require('../controller')
const isAuth = require('../middleware/auth')

router.get('/guestList', controller.getData)
router.get('/guestListAdmin',isAuth, controller.getDataAdmin)
router.get('/guestList/:id', controller.dataById)
router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/create', controller.create)
router.put('/edit/:id', isAuth, controller.edit)
router.delete('/delete/:id', isAuth, controller.delete)

module.exports = router;
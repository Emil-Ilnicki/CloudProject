const express = require("express")
const router = express.Router()
const { googlelogin, userlogin, userregister, authUser } = require("../controllers/auth")
const { auth } = require('../middleware/authMiddleware')
    
router.post('/api/googlelogin', googlelogin)
router.post('/api/login', userlogin)
router.post('/api/register', userregister)
router.get('/api/user/auth', auth, authUser)


module.exports = router


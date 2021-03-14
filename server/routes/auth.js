const express = require("express")
const router = express.Router()
const { googlelogin, userlogin, userregister, getAPIRecipes } = require("../controllers/auth")
const { auth } = require('../middleware/authMiddleware')
    
router.post('/api/googlelogin', googlelogin)
router.post('/api/login', userlogin)
router.post('/api/register', userregister)
router.post('/api/edamam/recipes', auth, getAPIRecipes)


module.exports = router


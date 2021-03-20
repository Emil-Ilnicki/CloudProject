const express = require("express")
const router = express.Router()
const { googlelogin, userlogin, userregister, getAPIRecipes, dbHelperAddRecipe, dbHelperGetRecipes, dbHelperDeleteRecipe } = require("../controllers/auth")
const { auth } = require('../middleware/authMiddleware')
 
// auth login and register routes
router.post('/api/googlelogin', googlelogin)
router.post('/api/login', userlogin)
router.post('/api/register', userregister)

// Edamam API route
router.post('/api/edamam/recipes', auth, getAPIRecipes)

// DbHelper Route
router.post('/api/dbhelper/add', auth, dbHelperAddRecipe)
router.post('/api/dbhelper/get', auth, dbHelperGetRecipes)
router.post('/api/dbhelper/delete', auth, dbHelperDeleteRecipe)


module.exports = router


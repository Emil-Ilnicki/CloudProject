const express = require('express')
const router = express.Router()
const { addEdamamRecipe, 
    getRecipes, 
    deleteRecipe, 
    addUserRecipe
} = require("../controllers/dbcontroller")

router.post('/db/addEdamamRecipe', addEdamamRecipe)
router.post('/db/getRecipe', getRecipes)
router.post('/db/deleteRecipe', deleteRecipe)
router.post('/db/addUserRecipe', addUserRecipe)


module.exports = router
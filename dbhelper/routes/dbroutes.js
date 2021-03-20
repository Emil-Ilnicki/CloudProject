const express = require('express')
const router = express.Router()
const { addRecipe, getRecipes, deleteRecipe } = require("../controllers/dbcontroller")

router.post('/db/addRecipe', addRecipe)
router.post('/db/getRecipe', getRecipes)
router.post('/db/deleteRecipe', deleteRecipe)


module.exports = router
const Recipe = require("../models/Recipe")

const addRecipe = async (req,res) => {
    console.log("Adding Recipe")
    const recipe = Recipe(req.body)

    try {
        await recipe.save()
        res.status(200).send({msg: 'success'})
    } catch (err) {
        res.status(500).send({msg : "error"})
    }
}

const getRecipes = async (req, res) => {
    console.log("Getting Recipe")
    const { user } = req.body
    await Recipe.find({user}, (err, data) => {
        if (err) res.status(500).send({msg: "There was an error getting the data"})

        res.status(200).send({
            data
        })
    })
}

const deleteRecipe = async (req, res) => {
    console.log("Deleting Recipe")
    const { user, title } = req.body

    try {
        await Recipe.deleteOne({ user, title}, (err, data) => {
            if(err) res.status(400).send({msg: "database error"})
            res.status(200).send({msg: "Recipe Deleted"})
        })
    } catch (e){
        res.status(500).send({msg: "Error"})
    }

}

module.exports = { addRecipe, getRecipes, deleteRecipe}
const mongoose = require("mongoose")

const RecipeSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    ingredients: {
        type: [{}],
        required: true
    },
    image: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    }
})

const Recipe = mongoose.model("recipedb", RecipeSchema)
module.exports = Recipe
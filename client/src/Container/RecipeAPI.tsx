import Recipe from '../Components/Recipe'

const RecipeAPI = () => {
    return (
        <div>
            <h1> Edamam Recipe API Page </h1>
            <p> We will call the Recipe component for every recipe that is returned to use from the Edamam API </p>
            <Recipe /> 
        </div>

    )
}

export default RecipeAPI
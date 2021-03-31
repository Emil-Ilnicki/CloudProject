import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Cookies from 'js-cookie'
import { addUserRecipe } from '../Network/API'
import { Container } from '@material-ui/core'
import '../Styles/RecipeForm.scss'



const RecipeForm = () => {

    const token = Cookies.get("x-auth-token") !== null ? Cookies.get("x-auth-token") : "null"

    const [recipeName, setRecipeName] = useState("")
    const [recipeIngredients, setRecipeIngredients] = useState("")

    async function handleSubmit (event: { preventDefault: () => void }){
        event.preventDefault();
        if (recipeName === "" || recipeIngredients === "") window.alert("Please fill out all the fields")
        else {
            const array = recipeIngredients.split(",")

            const response = await addUserRecipe({ 
                user: localStorage.getItem("userName"),
                ingredients: array,
                title: recipeName
            }, token)

            if (response === 200) window.alert(`${recipeName} was added to your repository`)
            else window.alert("There was an error adding your recipe.")
        }

    }

    return (
        <div className="add-recipe-form">
            <Container component="main" maxWidth="xs">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="recipeName">
                    <Form.Label> Recipe Name </Form.Label>
                    <Form.Control className="form-con"
                        autoFocus
                        type="recipeName"
                        placeholder="Enter a name for the recipe"
                        value={recipeName}
                        onChange={e => setRecipeName(e.target.value)}  
                    />
                </Form.Group>  
                <Form.Group>
                    <Form.Label> Ingredients </Form.Label> 
                    <Form.Control className="form-con"
                        placeholder="Please enter comma seperated values (e.g., 1 egg, 2 cups flour, ...)"
                        as="textarea"
                        rows={4}
                        onChange={(e) => setRecipeIngredients(e.target.value)}
                    />   
                </Form.Group>
                <Button block type="submit" variant="primary">
                {" "}
                Sumbit{" "}
                </Button>
            </Form>
            </Container>
        </div>
    )
}

export default RecipeForm
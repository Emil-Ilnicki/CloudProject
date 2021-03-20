import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import {edamamAPI, addEdamamRecipe} from "../Network/API"
import Cookies from 'js-cookie'
import "../Styles/EdamamAPI.css"
import {
    DataTable,
    Card,
    Page
} from "@shopify/polaris"
import { VoidExpression } from 'typescript'

interface Recipe {
    calories: number,
    label: string,
    image: string,
    ingredients: [],
    digest: {
        total: number
    }[]
}

interface RecipeData {
    recipe: Recipe
}

const RecipeAPI = () => {

    const token = Cookies.get("x-auth-token") !== null ? Cookies.get("x-auth-token") : "null"

    const [recipes, setRecipes] = useState("");
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("chicken");

    const [rows, setRows] = useState<any[][]>([])

    useEffect(() => {
        getRecipes()
    }, [query])


    const getRecipes = async () => {
        const response = await edamamAPI({ query }, token)
        const recipeData = response as Array<RecipeData>

        const finalRows = recipeData.map((items : RecipeData) => {
            const image : any = (
                <img src={items.recipe.image} alt={items.recipe.label}></img>
            )
            const title : string = items.recipe.label
            const calories : number = Number(items.recipe.calories.toFixed(2))
            const fat : number = Number(items.recipe.digest[0].total.toFixed(2))
            const protein : number = Number(items.recipe.digest[2].total.toFixed(2))
            const addBtn : any = (
                <Button
                    onClick={() => {
                        const ingredientList = Object.values(items.recipe.ingredients).map((item : any) => {
                            return item.text
                        })

                        addEdamamRecipe({
                            user: localStorage.getItem("userName"),
                            ingredients: ingredientList,
                            image: items.recipe.image,
                            title,
                        }, token)
                    }}
                >
                    Add to Repo
                </Button>
            )

            return [
                image,
                title,
                calories,
                fat,
                protein,
                addBtn
            ]
        });

        setRows(finalRows)
        setRecipes(response)
    }

    function handleSubmit(event: { preventDefault: () => void }){
        event.preventDefault();
        setQuery(search)
    }


    return (
        <div>
            <div className="EdamamSearch">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="recipieName">
                <Form.Label> Recipe Name </Form.Label>
                <Form.Control
                    autoFocus
                    type="recipeName"
                placeholder="Enter a recipe name (e.g. Apple)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </Form.Group>
            <Button className="reicpeSearch" variant="primary" type="submit">
                Search
            </Button>
            </Form>
            </div>
            <div className="EdamamTable">
                <Page title="EdamamRecipes">
                    <Card>
                        <DataTable
                            columnContentTypes={["text","text","text","text","text"]}
                            headings={[
                                "Image",
                                "Title",
                                "Calories",
                                "Fat",
                                "Protein",
                                ""
                            ]}
                            rows={rows}
                        />
                    </Card>
                </Page>  
            </div>
        </div>

    )
}

export default RecipeAPI
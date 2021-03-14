import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import {edamamAPI} from "../Network/API"
import Cookies from 'js-cookie'
import "../Styles/EdamamAPI.css"
import {
    DataTable,
    Card,
    Page
} from "@shopify/polaris"


interface recipeJSON {
    recipe: object;
}

const RecipeAPI = () => {

    const token = Cookies.get("x-auth-token") !== null ? Cookies.get("x-auth-token") : "null"

    const [recipes, setRecipes] = useState("");
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("chicken");

    const [rows, setRows] = useState([])

    useEffect(() => {
        getRecipes()
    }, [query])

    const addRecipe = (props : string) => {
        console.log(props)
    }

    const getRecipes = async () => {
        const response = await edamamAPI({ query }, token)

        const finalRows = response.map((items : any) => {
            console.log(items)
            const image : any = (
                <img src={items.recipe.image} alt={items.recipe.label}></img>
            )
            const title : string = items.recipe.label
            const calories : number = items.recipe.calories.toFixed(2)
            const fat : number = items.recipe.digest[0].total.toFixed(2)
            const protien : number = items.recipe.digest[2].total.toFixed(2)
            const addBtn : any = (
                <Button
                    onClick={() => {
                        addRecipe("Hello")
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
                protien,
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
            <div className="personalRepo">
                <Page title="Edamam Recipes">
                    <Card>
                        <DataTable
                            columnContentTypes={["text","text","text","text","text"]}
                            headings={[
                                "Image",
                                "Title",
                                "Calories",
                                "Fat",
                                "Protien",
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
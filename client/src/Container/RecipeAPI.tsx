import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import {edamamAPI, addEdamamRecipe} from "../Network/API"
import Cookies from 'js-cookie'
import { Container } from '@material-ui/core'
import {
    DataTable,
    Card,
    Page
} from "@shopify/polaris"
import { Dropdown } from 'react-bootstrap'
import "../Styles/EdamamAPI.scss"

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
    const [healthLabel, setHealthLabel] = useState("none");
    const [query, setQuery] = useState("pork");

    const [rows, setRows] = useState<any[][]>([])

    useEffect(() => {
        getRecipes()
    }, [query, healthLabel])


    const getRecipes = async () => {
        const response = await edamamAPI({ query, healthLabel }, token)
        const recipeData = response as Array<RecipeData>

        const finalRows = recipeData.map((items : RecipeData) => {
            const image : any = (
                <img className="edamamImg" src={items.recipe.image} alt={items.recipe.label}></img>
            )
            const title : string = items.recipe.label
            const calories : number = Number(items.recipe.calories.toFixed(2))
            const fat : number = Number(items.recipe.digest[0].total.toFixed(2))
            const protein : number = Number(items.recipe.digest[2].total.toFixed(2))
            const addBtn : any = (
                <Button
                    onClick={async () => {
                        const ingredientList = Object.values(items.recipe.ingredients).map((item : any) => {
                            return item.text
                        })

                        const response = await addEdamamRecipe({
                            user: localStorage.getItem("userName"),
                            ingredients: ingredientList,
                            image: items.recipe.image,
                            title,
                        }, token)

                        if (response === 200) window.alert(`${title} was added to your repository`)
                        else window.alert("There was an error adding that recipe, try again.")
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
        console.log("Handle Submit")
        setQuery(search)
    }


    return (
        <div>
            <div className="EdamamSearch">
            <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="recipieName">
                <Form.Label className="recipeQuery"> Recipe Name </Form.Label>
                <Form.Control className="recipeQuery"
                    autoFocus
                    type="recipeName"
                placeholder="Enter a recipe name (e.g. Apple)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </Form.Group>
            <div className="searchRecipeBtn">
            <Dropdown>
                <Button variant="primary" size="lg" type="submit">Search</Button>

                <Dropdown.Toggle split variant="primary" size="lg" id="health-label-dropdown">
                    <Dropdown.Menu>
                        <Dropdown.Item onSelect={() => setHealthLabel("none")}>None</Dropdown.Item>
                        <Dropdown.Item onSelect={() => setHealthLabel("alcohol-free")}>Alcohol Free</Dropdown.Item>
                        <Dropdown.Item onSelect={() => setHealthLabel("immuno-supportive")}>Immuno Supportive</Dropdown.Item>
                        <Dropdown.Item onSelect={() => setHealthLabel("peanut-free")}>Peanut Free</Dropdown.Item>
                        <Dropdown.Item onSelect={() => setHealthLabel("sugar-conscious")}>Sugar Conscious</Dropdown.Item>
                        <Dropdown.Item onSelect={() => setHealthLabel("tree-nut-free")}>Tree Nut Free</Dropdown.Item>
                        <Dropdown.Item onSelect={() => setHealthLabel("vegan")}>Vegan</Dropdown.Item>
                        <Dropdown.Item onSelect={() => setHealthLabel("vegetarian")}>Vegetarian</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Toggle>
            </Dropdown>
            </div>
            </Form>
            </Container>
            </div>
            <div className="EdamamTable">
                <Container>
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
                </Container>
            </div>
        </div>

    )
}

export default RecipeAPI
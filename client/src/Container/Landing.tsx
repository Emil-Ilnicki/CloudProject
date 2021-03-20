import { useEffect, useState } from 'react'
import { deleteRecipe, getRecipes } from '../Network/API'
import { List,
         Page,
         Card,
         DataTable
} from '@shopify/polaris'
import Button from 'react-bootstrap/Button'
import Cookies from 'js-cookie'

const Landing = () => {

    const token = Cookies.get("x-auth-token") !== null ? Cookies.get("x-auth-token") : "null"

    const [rows, setRows] = useState<any[][]>([])
    const [deleteBtn, setdeleteBtn] = useState(false)

    useEffect(() => {
        loadLocalRepo()
    }, [deleteBtn])

    const loadLocalRepo = async () => {
        const data = await getRecipes({
            user: localStorage.getItem("userName"),
        }, Cookies.get('x-auth-token'));
        
        
        const finalRows = data.map((recipe : any) => {
            const image : any = (
                <img src={recipe.image} alt={recipe.image}></img>
            )
            const title : string = recipe.title

            const finalIngredients : any = (
                <List type="bullet">
                    {recipe.ingredients.map((item : any) => {
                        return <List.Item>{item}</List.Item>
                    })}
                </List>
            )

            const deleteBtn : any = (
                <Button
                    onClick={() => {
                        deleteRecipe({
                           user: localStorage.getItem("userName"),
                           title
                        }, token)
                        setdeleteBtn(true)
                    }}
                    variant="danger"
                >
                Delete
                </Button>
            )
            
            setdeleteBtn(false)
            return [
                image,
                title,
                finalIngredients,
                deleteBtn
            ]
        }) 
        setRows(finalRows)
    }

    return (
        <div className="RepoTable">
            <Page title = "Your Recipes">
                <Card>
                <DataTable
                    columnContentTypes={["text","text","text"]}
                    headings={[
                        "Image",
                        "Title",
                        "Ingredients",
                        ""
                    ]}
                    rows={rows}
                />
                </Card>
            </Page>
        </div>
    )
}

export default Landing
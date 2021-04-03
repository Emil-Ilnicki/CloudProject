import { useCallback, useEffect, useState } from 'react'
import {deleteRecipe, getRecipes, deleteUserExercise, getUserExercise} from '../Network/API'
import {
    Card,
    DataTable,
    Page,
    List,
    Modal,
    TextContainer,
    TextField,
  } from "@shopify/polaris";
import Container  from '@material-ui/core/Container'
import Button from 'react-bootstrap/Button'
import Cookies from 'js-cookie'
import Countdown from 'react-countdown'
import '../Styles/Landing.scss'

const Landing = () => {

    const token = Cookies.get("x-auth-token") !== null ? Cookies.get("x-auth-token") : "null"

    const [recipeRows, setRecipeRows] = useState<any[][]>([])
    const [exerciseRows, setExerciseRows] = useState<any[][]>([])
    const [deleteRecipeBtn, setDeleteRecipeBtn] = useState(false)
    const [deleteExerciseBtn, setDeleteExerciseBtn] = useState(false)
    const [active, setActive] = useState(false);
    const [time, setTime] = useState(0);

    const handleChange = useCallback(() => setActive(!active), [active]);

    useEffect(() => {
        loadLocalRepo()
        loadExerciseRepo()
    }, [deleteRecipeBtn, deleteExerciseBtn])

    const loadLocalRepo = async () => {
        const data = await getRecipes({
            user: localStorage.getItem("userName"),
        }, token);
        
        
        const finalRecipeRows = data.map((recipe : any) => {
            const image : any = (
                <img className="edamamImg" src={recipe.image} alt={recipe.image}></img>
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
                        

                        setDeleteRecipeBtn(true)
                    }}
                    variant="danger"
                >
                Delete
                </Button>
            )
            
            setDeleteRecipeBtn(false)
            return [
                image,
                title,
                finalIngredients,
                deleteBtn
            ]
        }) 
        setRecipeRows(finalRecipeRows)
    }

    const loadExerciseRepo = async () => {
        const data = await getUserExercise({
            user: localStorage.getItem("userName"),
        }, token);

       const finalExerciseRows = data.map((items : any) => {
           const calories : string = items.calories
           const description : string = items.description
           const equipment : string = items.equipment

           const targetGroups : any = (
            <List type="bullet">
                {items.target.map((muscle : any) => {
                    return <List.Item>{muscle}</List.Item>
                })}
            </List>
            )

            const time : string = items.time
            const title : string = items.title

            const startExerciseBtn : any = (
                <Button
                onClick={() => {
                    var exerciseTime = parseFloat(time)
                    setTime(exerciseTime*60*1000)
                    handleChange()
                }}
                >
                    Start Exercise
                </Button>
            )
            
            const deleteExerciseBtn : any = (
                <Button
                variant="danger"
                onClick={() => {
                    deleteUserExercise({
                        user: localStorage.getItem("userName"),
                        title
                     }, token)
                     setDeleteExerciseBtn(true)
                }}
                >
                    Delete
                </Button>
            )

            setDeleteExerciseBtn(false)
            return [
                title,
                targetGroups,
                equipment,
                calories,
                time,
                startExerciseBtn,
                deleteExerciseBtn
            ]
       })

       setExerciseRows(finalExerciseRows)
    
    }

    return (
        <div>
        <div className="Popup">
        <Modal
          open={active}
          onClose={handleChange}
          title="Start!"
          secondaryActions={[
            {
              content: "Close",
              onAction: handleChange,
            },
          ]}
        >
          <Modal.Section>
             <Countdown className="countdown-time" date={Date.now() + time} onComplete={handleChange}/>
          </Modal.Section>
        </Modal>
      </div>
        <div className="RecipeTable">
        <Container>
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
                    rows={recipeRows}
                />
                </Card>
            </Page>
        </Container>
        </div>
        <div className="exercise-table">
        <Container>
        <Page title = "Your Exercises">
            <Card>
            <DataTable
                columnContentTypes={["text","text","text","text","text"]}
                headings={[
                    "Name",
                    "Target Groups",
                    "Equipment Needed",
                    "Calories Burned",
                    "Time (mins)",
                    "",
                    ""
                ]}
                rows={exerciseRows}
            />
            </Card>
        </Page>
        </Container>
    </div>
    </div>
    )
}

export default Landing
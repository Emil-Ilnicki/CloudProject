import React, { useCallback, useEffect, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Container from "@material-ui/core/Container"
import TextField from '@material-ui/core/TextField'
import Button from 'react-bootstrap/Button'
import { GetExercise, addUserExercise } from '../Network/API'
import Cookies from 'js-cookie';
import { List,
    Page,
    Card,
    DataTable
} from '@shopify/polaris'
import "../Styles/Exercise.scss"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    targetValue: {
        fontSize: "medium"
    },
    labelValue: {
        fontSize: "medium"
    },
    textField: {
      padding: "10px"  
    },
    resize: {
        fontSize: "medium"
    }
  }),
);

interface ExerciseData {
    targets: [],
    name: string,
    equipment: string,
    MET: number,
    level: string,
    directions: string
    time:number
    carloriesBurned:number
}

const GetDBExercise = () => {

    const token = Cookies.get("x-auth-token") !== null ? Cookies.get("x-auth-token") : "null"

    const classes = useStyles()
    const [target, setTarget] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [weight, setWeight] = useState<number>(0);
    const [rows, setRows] = useState<any[][]>([])
    const [data,setData] = useState<Array<ExerciseData>>([])


    const calculateCalorieBurned=useCallback((MET:number,time:number)=>{
        const val = ((MET * weight) * (time/60)).toString()
        return parseInt(val)
    },[weight])

    const getExercises = useCallback( () => {
        if (target === "" || weight <= 0){
            window.alert("Please check your inputs")
        } else {
            const updateCaloriesBurned=(value:number, index:number)=>{
                const dataCopy = [...data]
                const updateRow = dataCopy[index]
                dataCopy[index] = {...updateRow,carloriesBurned: calculateCalorieBurned(updateRow.MET,value)}
                setData(dataCopy)
            }


            const finalRows = data.map((items : ExerciseData,index:number) => {
                const title : string = items.name
                const targetGroups : any = (
                    <List type="bullet">
                        {items.targets.map((muscle : any) => {
                            return <List.Item>{muscle}</List.Item>
                        })}
                    </List>
                )
                const equipment : string = items.equipment
                const level : string = items.level
                const timeInput : any = (
                    <TextField className="time-label" id="standard-basic" label="Time (mins)" defaultValue={items.time}  onChange={(e) => {
                        var val = parseFloat(e.target.value)  
                        updateCaloriesBurned(!isNaN(val)?val:30,index)
                    }} />
                )  

                const addBtn : any = (
                    <Button
                        onClick={async () => {
                            var calories = items.carloriesBurned
                            var time = Math.ceil(((items.carloriesBurned*60)/(items.MET*weight)))
                            const response = await addUserExercise({
                                user: localStorage.getItem("userName"),
                                title,
                                target: items.targets,
                                equipment,
                                time,
                                calories,
                                description: items.directions
                            }, token)

                            if (response === 200) window.alert(`${title}'s has been added to your exercises.`)
                            else window.alert(`There was an error adding that exercise, try again.`)
                            
                        }}
                >
                    Add to Repo
                </Button>
                )

                return [
                    title,
                    targetGroups,
                    equipment,
                    level,
                    timeInput,
                    items.carloriesBurned,
                    addBtn
                ]
            });

            setRows(finalRows)
        }
    },[calculateCalorieBurned, data, target, weight])

    useEffect(()=>{
        if(data.length>0){
            getExercises()
        }
    },[data, getExercises])


    const getData= async ()=>{
 const response = await GetExercise({target}, token)
           
            const exerciseData = response.map((item:any)=>{
                return {
                    ...item,
                    time:30,
                    carloriesBurned: calculateCalorieBurned(item.MET,30)
                } as ExerciseData
            })
            console.log(exerciseData)
            setData([...exerciseData])
            
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown}>) => {
        setTarget(event.target.value as string)
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <div>
            <div className="exercise-search">
            <FormControl className={classes.formControl}>
                <InputLabel className={classes.labelValue}>Target Muslces</InputLabel>
                <Select
                className={classes.targetValue}
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={target}
                onChange={handleChange}
             >
                <MenuItem className={classes.targetValue} value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem className={classes.targetValue} value={"Chest"}>Chest</MenuItem>
                <MenuItem className={classes.targetValue} value={"Triceps"}>Tricpes</MenuItem>
                <MenuItem className={classes.targetValue} value={"Quads"}>Quads</MenuItem>
                <MenuItem className={classes.targetValue} value={"Lower Body"}>Lower Body</MenuItem>
                <MenuItem className={classes.targetValue} value={"Full Body"}>Full Body</MenuItem>
                <MenuItem className={classes.targetValue} value={"Core"}>Core</MenuItem>
                <MenuItem className={classes.targetValue} value={"Glutes"}>Glutes</MenuItem>
                <MenuItem className={classes.targetValue} value={"Biceps"}>Biceps</MenuItem>
                <MenuItem className={classes.targetValue} value={"Calves"}>Calves</MenuItem>
                <MenuItem className={classes.targetValue} value={"Back"}>Back</MenuItem>
                <MenuItem className={classes.targetValue} value={"Hamstrings"}>Hamstrings</MenuItem>
                <MenuItem className={classes.targetValue} value={"Lower Back"}>Lower Back</MenuItem>
                </Select>
                <TextField InputProps={{
                    classes: {
                        input: classes.resize,
                    }
                }} InputLabelProps={{
                    classes: {
                        root: classes.resize,
                    }
                }} label="Weight (kg)" defaultValue={weight} onChange={(e) => {setWeight(parseFloat(e.target.value))}}/>
                <Button variant="primary" size="lg" type="submit" onClick={getData}>Search</Button>
            </FormControl>
            </div>
            <div className="exercise-table">
                <Container>
                <Page title="Exercies">
                    <Card>
                        <DataTable
                            columnContentTypes={["text","text","text","text","text"]}
                            headings={[
                                "Name",
                                "Target Groups",
                                "Equipment Needed",
                                "Level",
                                "Time (minutes)",
                                "Kcal Burned",
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

export default GetDBExercise
import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "./Container/Login"
import Register from "./Container/Register"
import Landing from "./Container/Landing"
import RecipeForm from './Container/AddRecipeForm'
import RecipeAPI from './Container/RecipeAPI'
import Cookies from "js-cookie"
import { userAuth } from "./Network/API"
import PrivateNavbar from './Components/Navbar';


function App() {

  const token = Cookies.get("x-auth-token") !== null ? Cookies.get("x-auth-token") : null
  const [isAuth, setAuth] = useState(false)

  const check = () => {  
    if (token){
      return true
    } else {
      return false
    }

  }

  useEffect(() => {
      setAuth(check())
  }, [])

  function Private({ Component, ...rest } : any) {
    return (
      <div>
        <PrivateNavbar/>
        {console.log(isAuth)}
        <Route
        {...rest}
        render={(props) =>
            check() === true ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      />
      </div>
    );
  }

  function Public({ Component, ...rest } : any) {
    return (
      <Route
        {...rest}
        render={(props) =>
          check() === false ? <Component {...props} /> : <Redirect to="/home" />
        }
      />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Public exact path="/" Component={Login}/>
        <Public exact path="/register" Component={Register}/>
        <Private exact path="/home" Component={Landing}/>
        <Private exact path="/home/edamamRecipes" Component={RecipeAPI}/>
        <Private exact path="/home/addrecipes" Component={RecipeForm}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App



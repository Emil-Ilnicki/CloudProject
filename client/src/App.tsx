import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "./Container/Login"
import Register from "./Container/Register"
import Landing from "./Container/Landing"
import RecipeForm from './Container/AddRecipeForm'
import RecipeAPI from './Container/RecipeAPI'
import Cookies from "js-cookie"
import PrivateNavbar from './Components/Navbar';
import { AppProvider } from "@shopify/polaris"
import en from "@shopify/polaris/locales/en.json";


function App() {

  const token = Cookies.get("x-auth-token") !== null ? Cookies.get("x-auth-token") : null
  const [isAuth, setAuth] = useState(false)

  const check = useCallback(() => {  
    console.log("Called again")
    if (token){
      return true
    } else {
      return false
    }
  }, [token])

  useEffect(() => {
      setAuth(check())
  }, [check])

  function Private({ Component, ...rest } : any) {
    return (
      <div>
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
    <AppProvider i18n={en} theme={{ colorScheme: "light" }}>
      <BrowserRouter>
      {isAuth && <PrivateNavbar/>}
      <Switch>
        <Public exact path="/" Component={Login}/>
        <Public exact path="/register" Component={Register}/>
        <Private exact path="/home" Component={Landing}/>
        <Private exact path="/home/edamamRecipes" Component={RecipeAPI}/>
        <Private exact path="/home/addrecipes" Component={RecipeForm}/>
      </Switch>
    </BrowserRouter>
    </AppProvider>
  );
}

export default App



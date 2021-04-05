

const defaultHeaders = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

export const login = async (props: object) => {
  console.log(props)
    const requestOptions = {
        method: "POST",
        headers: defaultHeaders(),
        body: JSON.stringify(props),
    };
    const response = await fetch(`/api/login`, requestOptions)
      .then((res) => res.json())
      .then((data) => data)

    return response
}

export const register = async (props: object) => {
  console.log(props)
    const requestOptions = {
        method: "POST",
        headers: defaultHeaders(),
        body: JSON.stringify(props),
    };
    const response = await fetch(`/api/register`, requestOptions)
      .then((res) => res.json())
      .then((data) => data)

    return response 
}

export const googleLogin = async (token : object) => {
  const requestOptions = {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify(token),
  };
  const response = await fetch(`/api/googlelogin`, requestOptions)
    .then((res) => res.json())
    .then((data) => data)

  return response 
}

export const edamamAPI = async (query: any, token : any) => {

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-auth-token": token 
    },
    body: JSON.stringify(query)
  }

  const response = await fetch(`/api/edamam/recipes`, requestOptions)
    .then((res) => res.json())
    .then((data) => data)

  return response
}

export const addEdamamRecipe = async (props : any, token : any) => {
  console.log(props)
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-auth-token": token
    },
    body: JSON.stringify(props),
  };

  const response = await fetch(`/api/dbhelper/addEdamam`, requestOptions)
    .then((res) => res.status)

  return response
}

export const getRecipes = async (props: object, token : any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-auth-token": token
    },
    body: JSON.stringify(props),
  };

  const response = await fetch(`/api/dbhelper/get`, requestOptions)
    .then((response) => response.json())
    .then((data) => data.response.data)

    return response
}

export const deleteRecipe = async (props : object, token : any) => {
  console.log(props)
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-auth-token": token
    },
    body: JSON.stringify(props),
  };

  const response = await fetch(`/api/dbhelper/delete`, requestOptions)
    .then((res) => res.status)
  

  return response
}

export const addUserRecipe = async (props: object, token : any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-auth-token": token
    },
    body: JSON.stringify(props),
  };

  const response = await fetch(`/api/dbhelper/addUser`, requestOptions)
    .then((res) => res.status)

    return response
}

export const GetExercise = async (props: object, token: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-auth-token": token
    },
    body: JSON.stringify(props),
  };
  
  const response = await fetch(`/api/dbhelper/getDBExercise`, requestOptions)
    .then((res) => res.json())
    .then((data) => data.response.data)

    return response
}

export const addUserExercise = async (props : object, token : any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-auth-token": token
    },
    body: JSON.stringify(props),
  };

  const response = await fetch(`/api/dbhelper/addUserExercise`, requestOptions)
    .then((res) => res.status)

    return response

}

export const deleteUserExercise = async (props : object, token : any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-auth-token": token
    },
    body: JSON.stringify(props),
  };

  const response = await fetch(`/api/dbhelper/deleteUserExercise`, requestOptions)
    .then((res) => res.status)

    return response

}

export const getUserExercise = async (props : object, token : any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-auth-token": token
    },
    body: JSON.stringify(props),
  };

  const response = await fetch(`/api/dbhelper/getUserExercise`, requestOptions)
    .then((res) => res.json())
    .then((data) => data.response.data)

    return response

}
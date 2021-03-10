const URL = `http://localhost:4000`; // URL used only for local development remove this when deploying

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
    const response = await fetch(`${URL}/api/login`, requestOptions)
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
    const response = await fetch(`${URL}/api/register`, requestOptions)
      .then((res) => res.json())
      .then((data) => data)

    return response 
}

export const userAuth = async (token : any) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-auth-token": token
    }
  };
  const response = await fetch(`${URL}/api/user/auth`, requestOptions)
    .then((res) => res.json())
    .then((data) => data.auth)

  return response
}

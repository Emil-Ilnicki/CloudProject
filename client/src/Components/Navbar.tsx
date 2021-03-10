import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Cookies from "js-cookie"
import React from "react";
import Form  from 'react-bootstrap/Form';

const PrivateNavbar = () => {
    const shouldShowNav =
    window.location.pathname === "/" ||
    window.location.pathname === "/register";

    return (
        <div>
        {shouldShowNav ? null : (
          <Navbar bg="success" variant="dark">
          <Navbar.Brand>GitFit+</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/home/edamamRecipes">Edamam Recipes</Nav.Link>
            <Nav.Link href="/home/addrecipes">Add a Recipe</Nav.Link>
          </Nav>
          <Form inline>
          <Button
              variant="danger"
              onClick={() => {
                Cookies.remove("x-auth-token");
                window.location.reload(true);
              }}
            >
              Log out
            </Button>
          </Form>
        </Navbar>
        )}
      </div>
    )
}

export default PrivateNavbar
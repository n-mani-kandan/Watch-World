import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";
import { RiLoginBoxFill, RiAdminFill } from "react-icons/ri";
import "../../css/Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar as Navbars } from "react-bootstrap";


function Navbar() {
  const { getUser, userIsAuthenticated, userLogout } = useAuth();

  const logout = () => {
    userLogout();
  };

  const enterMenuStyle = () => {
    return userIsAuthenticated() ? { display: "none" } : { display: "block" };
  };

  const logoutMenuStyle = () => {
    return userIsAuthenticated() ? { display: "block" } : { display: "none" };
  };

  const adminPageStyle = () => {
    const user = getUser();
    return user && user.role === "ADMIN"
      ? { display: "block" }
      : { display: "none" };
  };

  const userPageStyle = () => {
    const user = getUser();
    return user && user.role === "USER"
      ? { display: "block" }
      : { display: "none" };
  };

  const getUserName = () => {
    const user = getUser();
    return user ? user.name : "";
  };

  return (
    <>
      <Navbars bg="light" sticky="top">
        <Container>
          <Navbars.Brand>
            <Link to="/" className="fruit">
              <h1>Watch World</h1>
            </Link>
          </Navbars.Brand>
          <Navbars.Toggle aria-controls="basic-navbar-nav" />
          <Navbars.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Navbars.Collapse className="slign">
                <Nav.Link className="userpage">
                  <Link
                    to="/productpage"
                    className="link userpage"
                    style={userPageStyle()}
                  >
                    Products
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    to="/adminpage"
                    className="link userpage "
                    style={adminPageStyle()}
                  >
                    Admin Page
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/login" className="link" style={enterMenuStyle()}>
                    <RiLoginBoxFill /> Hello,Sign in
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    to="/signup"
                    style={enterMenuStyle()}
                    className="link ml-auto sign"
                  >
                    <RiAdminFill />
                    Sign Up
                  </Link>
                </Nav.Link>
                <Nav.Link
                  style={logoutMenuStyle()}
                  className="link"
                >{`Hi ${getUserName()}`}</Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/"
                  style={logoutMenuStyle()}
                  onClick={logout}
                  className="link"
                >
                  Logout
                </Nav.Link>
              </Navbars.Collapse>
            </Nav>
          </Navbars.Collapse>
        </Container>
      </Navbars>
    </>
  );
}

export default Navbar;

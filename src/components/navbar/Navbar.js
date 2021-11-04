import React from "react";
import { Navbar, Container } from "react-bootstrap";
import CookMemoIcon from "../assets/CookMemo_Brand.png";

const NavbarNav = ({ onLogout, isAuthenticated = false }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#">
          <img
            alt=""
            src={CookMemoIcon}
            width="30"
            height="30"
            className="d-inline-block align-top"
            style={{ border: "white 1px solid", margin: "0 15px" }}
          />
          CookMemo
        </Navbar.Brand>
        {isAuthenticated && <button onClick={onLogout}>Logout</button>}
      </Container>
    </Navbar>
  );
};

export default NavbarNav;

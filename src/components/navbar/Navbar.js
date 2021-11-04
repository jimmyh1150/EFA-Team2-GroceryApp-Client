import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Modal,
  Offcanvas,
} from "react-bootstrap";
import CookMemoIcon from "../assets/CookMemo_Brand.png";
import MyList from "../myrecipelist/mylist";
import DisplayMyList from "../myrecipelist/myListDisplay";

const NavbarNav = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      style={{ backgroudColor: "red", padding: "0" }}
    >
      <Navbar.Brand href="#">
        <img
          alt=""
          src={CookMemoIcon}
          width="60"
          height="50"
          className="d-inline-block align-top"
          style={{}}
        />
      </Navbar.Brand>
      <Navbar.Text
        style={{
          fontSize: "32px",
          borderRight: "1px #333333 solid",
          paddingRight: "20px",
          color: "whitesmoke",
        }}
      >
        CookMemo
      </Navbar.Text>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto" style={{ paddingLeft: "25px" }}>
          <Button
            onClick={handleShow}
            size="sm"
            variant="outline-secondary"
            style={{ height: "30px", margin: "7px 5px" }}
          >
            Add Recipe
          </Button>
          <Modal show={show} onHide={handleClose}>
            <MyList token={props.token} />
          </Modal>
          <Button
            onClick={handleShow2}
            size="sm"
            variant="outline-secondary"
            style={{ height: "30px", margin: "7px 5px" }}
          >
            My Recipes
          </Button>
          <Offcanvas show={show2} onHide={handleClose2}>
            <Offcanvas.Header closeButton>My Recipes</Offcanvas.Header>
            <Offcanvas.Body>
              <DisplayMyList token={props.token} />
            </Offcanvas.Body>
          </Offcanvas>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarNav;

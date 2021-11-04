import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import Background_Image from "./Landing_Page.png";
import "./Login_Registration.css";
import APIURL from "../../helpers/environment";

const Auth = (props) => {
  //    variable name, functionname = initial value
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);

  const title = () => {
    return !login ? "Signup" : "Login";
  };

  const loginToggle = (e) => {
    e.preventDefault();

    setLogin(!login);

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  const signupFields = () =>
    !login ? (
      <div>
        <label className="label" style={{ color: "yellow" }} html4="firstName">
          First Name:
        </label>
        <br />
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <br />
        <label className="label" style={{ color: "yellow" }} html4="lastName">
          Last Name:
        </label>
        <br />
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <br />
      </div>
    ) : null;

  const handleSubmit = (event) => {
    console.log(handleSubmit);
    event.preventDefault();

    let reqBody = login
      ? {
          email: email,
          password: password,
        }
      : {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        };

    let url = login
      ? `${APIURL}:4000/user/login`
      : `${APIURL}:4000/user/register`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((json) => props.updateToken(json.token))
      .catch((err) => console.log(err));
  };

  return (
    <div className="Background_IMG">
      <form>
        <Button
          style={{ backgroundColor: "brown" }}
          type="submit"
          onClick={loginToggle}
        >
          Login / Signup
        </Button>
        <br />
        <br />

        <h1>{title()}</h1>
        {signupFields()}
        <label className="label" style={{ color: "yellow" }} html4="email">
          Email
        </label>
        <br />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        <label className="label" style={{ color: "yellow" }} html4="password">
          password
        </label>
        <br />
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br />
        <br />
        <Button
          style={{ backgroundColor: "brown" }}
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Auth;

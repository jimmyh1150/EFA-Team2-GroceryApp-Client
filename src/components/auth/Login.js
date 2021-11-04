import React, { useState } from "react";
import { API_SERVER_LIVE } from "../../constants";

const Auth = (props) => {
  //    variable name, functionname = initial value
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");

  const title = () => {
    return !login ? "Signup" : "Login";
  };

  const loginToggle = (e) => {
    e.preventDefault();

    setLogin("");

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  const signupFields = () =>
    !login ? (
      <div>
        <label html4="firstName">First Name:</label>
        <br />
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <br />
        <label html4="lastName">Last Name:</label>
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

    const url = `${API_SERVER_LIVE}/user/${login ? "login" : "register"}`;

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
    <section className="login-page">
      <form>
        <button onClick={loginToggle}>Login / Signup</button>
        <br />
        <h1>{title()}</h1>
        {signupFields()}
        <label html4="email">Email</label>
        <br />
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        <label html4="password">password</label>
        <br />
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default Auth;

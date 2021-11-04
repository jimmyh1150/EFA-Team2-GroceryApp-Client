import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        bottom: "0",
        left: "0",
        right: "0",
        textAlign: "center",
        display: "inline",
      }}
    >
      <div>&copy; CookMemo, Inc.</div>
      <a
        href="https://github.com/jimmyh1150/EFA-Team2-Grocery-Server"
        style={{ margin: "0 5px", textDecoration: "none", color: "black" }}
      >
        GitHub-Server
      </a>
      <a
        href="https://github.com/jimmyh1150/EFA-Team2-GroceryApp-Client"
        style={{ margin: "0 5px", textDecoration: "none", color: "black" }}
      >
        GitHub-Client
      </a>
    </div>
  );
};
export default Footer;

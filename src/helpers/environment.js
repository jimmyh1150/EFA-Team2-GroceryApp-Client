let APIURL = "";

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    APIURL = "http://localhost:4000";
    break;
  case "grocery-app-efa.herokuapp.com":
    APIURL = "https://groceryappserver.herokuapp.com";
}

export default APIURL;

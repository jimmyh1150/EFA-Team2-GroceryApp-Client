let APIURL = "";

switch(window.location.hostname){
    case "localhost" || "127.0.0.1":
        APIURL = "https://localhost:4000"
        break;
    case "groceryappclient.herokuapp.com/":
        APIURL = "https://groceryappserver.herokuapp.com"
}

export default APIURL;
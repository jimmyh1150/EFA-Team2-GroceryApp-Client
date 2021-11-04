import React, {useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';

const MyList = (props) => {
    console.log("LIST",props.token)
    const [recipeName, setRecipeName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("NAME", recipeName)
        console.log("TOKEN", props.token)

        fetch('http://localhost:4000/mylist/create', {
            method: 'POST',
            body: JSON.stringify({mylist: {recipeName: recipeName}}),
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Authorization': props.token

            })
        })
        .then((res) => res.json())
        .catch(err => console.log(err))
    }

    return (
        <div>
                <Modal.Header><h4>My Recipe List</h4></Modal.Header>
                <Modal.Body>
                    <Form >
                    <label html4="recipe"><i>Add your own recipe to save for later.</i></label>
                    <br/>
                    <input type='text' id='recipe' value={recipeName} onChange={(e) => setRecipeName(e.target.value)} style={{width:"460px",height:"150px"}}></input>
                    <br/>
                    <Button onClick={handleSubmit} type='submit' value="Submit" style={{marginTop:"10px",backgroundColor:"#0075A2",border:"none"}}>Add Recipe</Button>
                    </Form>
                </Modal.Body>
        </div>
    )

}

export default MyList;
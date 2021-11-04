import React, {useState} from 'react';

const DisplayMyList = (props) => {
    const [allItems, setAllItems] = useState([]);
     
    console.log(allItems);

    fetch('http://localhost:4000/mylist/mylist', {
        method: 'GET',
        headers: new Headers ({
            'Content-Type': 'application/json',
            'Authorization': props.token
        })
    })
    .then(response => response.json())
    .then(json => setAllItems(json))
    .catch(err => console.log(err))

    return (
        <div>
            <ul>
            {allItems.map((recipeName => (
                <li>{recipeName.recipeName}</li>
            )))}
            </ul>
        </div>
    )

}

export default DisplayMyList;

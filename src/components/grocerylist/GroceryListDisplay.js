import React from 'react';

const DisplayList = (props) => {
    return (
        <ol style={{textAlign:"left"}}>
            { props.Items.map((Item) => 
                <div style={{alignItems:"left"}}>
                <li htmlFor={Item.item}>
                    <button>-</button> {Item.item}
                </li>
                </div>
            )}
        </ol>
    )
}

export default DisplayList;

/*
- From DisplayList, Items is imported & iterating through the array.
- Array is displayed as a numbered list.
*/
import React from 'react'
import {Link} from 'react-router-dom'

const DishesList = (props) => {
    const itemy = props.item
    
    return (
        <div>
            <article className="cocktail">
            {/* <div className="img-container">
                <img src={image} alt={name} />
            </div> */}
            <div className="cocktail-footer">
                <h3>{itemy.ItemName}</h3>
                <h4>₹. {itemy.price}</h4>
                <div className="d-flex justify-content-between">
                <button style={{marginRight: '1rem'}} className="btn btn-primary">Delete</button>
                <button className="btn btn-primary">Edit</button>
                </div>
            </div>
        </article>
        </div>
    )
}

export default DishesList

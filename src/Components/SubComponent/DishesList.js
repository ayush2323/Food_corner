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
                <Link to={`/owner_dish_detail/${itemy._id}`} className="btn btn-primary btn-details">Show More</Link>
            </div>
        </article>
        </div>
    )
}

export default DishesList

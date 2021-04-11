import React from 'react'
import { Link } from 'react-router-dom'

const Item = (props) => {
    const itemy = props.dish
    return (
        <article className="cocktail">
            {/* <div className="img-container">
                <img src={image} alt={name} />
            </div> */}
            <div className="cocktail-footer">
                <h3>{itemy.ItemName}</h3>
                <h4>{itemy.price}</h4>
                {/* <Link to={`/cocktail/${id}`} className="btn btn-primary btn-details">Details</Link> */}
            </div>
        </article>
    )
}

export default Item

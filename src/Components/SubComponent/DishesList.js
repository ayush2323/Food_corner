import React from 'react'

const DishesList = (props) => {
    const itemy = props.item
    // console.log(props.item.ItemCatagory)
    
    return (
        <div>
            <article className="cocktail">
            {/* <div className="img-container">
                <img src={image} alt={name} />
            </div> */}
            <div className="cocktail-footer">
                <h3>{itemy.ItemName}</h3>
                <h4>{itemy.price} Rs.</h4>
                {/* <Link to={`/cocktail/${id}`} className="btn btn-primary btn-details">Details</Link> */}
            </div>
        </article>
        </div>
    )
}

export default DishesList

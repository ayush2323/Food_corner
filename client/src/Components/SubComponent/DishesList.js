import React from 'react'
import {Link} from 'react-router-dom'

const DishesList = (props) => {
    const itemy = props.item
    const deleteHandler = props.deleteHandler
    const editHandler = props.editHandler

    // const deleteHandler = (e) => {
    //     console.log(e.target)
    // }

    // const editHandler = (id) => {
    //     console.log(id.target.data)
    // }

    const get = (id) => {
        console.log(id.target)
    }
    
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
                <button value={itemy.id} data-ns={itemy._id} onClick={deleteHandler} style={{marginRight: '1rem'}} className="btn btn-primary">Delete</button>
                <button value={itemy.id} data-ns={itemy._id} onClick={editHandler} className="btn btn-primary">Edit</button>
                </div>
            </div>
        </article>
        </div>
    )
}

export default DishesList

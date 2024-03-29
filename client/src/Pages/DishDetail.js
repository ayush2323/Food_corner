import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'

const DishDetail = (props) => {
    const { id } = useParams()
    const history = useHistory()
    console.log(id)
    const [dishDetail, setDishDetail] = useState({})
    console.log(dishDetail)

    const getDishDetail = () => {
        axios.get(`https://foodcornerproject.herokuapp.com/dish_detail/${id}`)
            .then(res => {
                console.log(res.data)
                setDishDetail(res.data)
            }).catch(e => console.log(e))
    }

    const go_back = () => {
        history.goBack()
    }

    useEffect(() => {
        console.log("getdish")
        getDishDetail()
    }, [])
    return (
        <div>
            <section className="section cocktail-section">
            <button onClick={go_back} className='btn btn-primary mt-3'>Back Home</button>
            <h2 className="section-title">{dishDetail.ItemName}</h2>
            <div className="drink">
                {/* <img src={image} alt={name}></img> */}
                <div className="drink-info">
                    <p><span className="drink-data">name: </span>{dishDetail.ItemName}</p>
                    <p><span className="drink-data">category: </span>{dishDetail.ItemCatagory}</p>
                    <p><span className="drink-data">info: </span>{dishDetail.ItemDiscription}</p>
                    <p><span className="drink-data">Type: </span>{dishDetail.ItemType}</p>
                    <p><span className="drink-data">Constituents: </span>{dishDetail.Constituents}</p>
                    <p><span className="drink-data">Price: </span>₹. {dishDetail.price}</p>
                    <p><span className="drink-data">Restaurant name: </span>{dishDetail.restaurantName}</p>
                    <p><span className="drink-data">Restaurant address: </span>{dishDetail.restaurantAddress}</p>
                    <p><span className="drink-data">Restaurant phone: </span>{dishDetail.restaurantPhone}</p>
                </div>
            </div>
        </section>
        </div>
    )
}

export default DishDetail

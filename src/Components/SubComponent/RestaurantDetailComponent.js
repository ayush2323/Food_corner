import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import MenuPopup from '../MenuPopup'
import axios from 'axios'

const RestaurantDetailComponent = (props) => {
    const restaurantDetail = props.restaurantDetail
    const id = props.id
    const [modalShow, setModalShow] = useState(false);
    const [menuItem, setMenuItem] = useState({
        ItemName: "", ItemImage: "", ItemDiscription: "", ItemCatagory: "", ItemType: "", Constituents: "", price: ""
    })

    let item_name, item_value
    const ItemHandler = (e) => {
        item_name = e.target.name
        item_value = e.target.value
        setMenuItem({ ...menuItem, [item_name]: item_value })
    }

    const addItem = (e) => {
        e.preventDefault()
        console.log(menuItem)
        // const addedRestaurant = { "restaurant": [restaurantDetail] }
        const restaurantMenu = { "restaurantMenu": [menuItem] }
        // console.log(restaurantMenu)

        axios.post(`http://localhost:4000/app/dish/${id}`, restaurantMenu)
            .then(res => {
                console.log(res.data)
                // toast.success("Restaurant Added", {
                //     position: "top-right"
                // })
                // setModalShow(false)
            })
            .catch(e => {
                console.log(e)
                // toast.error("Invalid registration", {
                //     position: "top-right"
                // })
            })
    }

    return (
        <div>
            <div className="aboutRestaurant">
                <h1>{restaurantDetail.restaurantName}</h1>
                <h2>{restaurantDetail.restaurantDiscription}</h2>
                <p>Address: {restaurantDetail.restaurantAddress}</p>
                <p>Phone: {restaurantDetail.restaurantPhone}</p>
                <Button variant="success" onClick={() => setModalShow(true)}>Add Item to Restaurant</Button>
                <MenuPopup menuItem={menuItem} ItemHandler={ItemHandler} addItem={addItem} show={modalShow} onHide={() => setModalShow(false)} />
            </div>
        </div>
    )
}

export default RestaurantDetailComponent

import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import MenuPopup from '../MenuPopup'
import DishesList from './DishesList'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Card from 'react-bootstrap/Card'

const RestaurantDetailComponent = (props) => {
    const restaurantDetail = props.restaurantDetail
    const id = props.id
    const [modalShow, setModalShow] = useState(false);
    const [menuItem, setMenuItem] = useState({
        ItemName: "", ItemDiscription: "", ItemCatagory: "", ItemType: "", Constituents: "", price: ""
    })
    const [dishList, setDishList] = useState([])

    let item_name, item_value
    const ItemHandler = (e) => {
        item_name = e.target.name
        item_value = e.target.value
        setMenuItem({ ...menuItem, [item_name]: item_value })
    }

    const addItem = (e) => {
        e.preventDefault()
        const restaurantMenu = { "restaurantMenu": [menuItem] }

        axios.patch(`http://localhost:4000/app/dish/${id}`, restaurantMenu)
            .then(res => {
                console.log(res.data)
                toast.success("Restaurant Added", {
                    position: "top-right"
                })
                setModalShow(false)
            })
            .catch(e => {
                console.log(e)
                toast.error("Invalid registration", {
                    position: "top-right"
                })
            })
    }

    const onHide = () => setModalShow(false)
    const seeModalShow = () => { setModalShow(true) }

    const addDishes = (e) => {
        console.log(menuItem)
        e.preventDefault()
        axios.post(`http:///localhost:4000/app/dishes`, menuItem)
            .then(res => {
                onHide()
                showDishes()
            })
            .catch(e => console.log(e))
    }

    const showDishes = () => {
        axios.get(`http://localhost:4000/app/dishes`)
            .then(res => {
                setDishList(res.data)
            }).catch(e => console.log(e))
    }

    const showDishesList = () => {
        if (dishList.length != 0) {
            return (
                dishList.map((item, index) => {
                    return <DishesList key={index} item={item} />
                })
            )
        } else return ""
    }

    return (
        <div>
            <div className="aboutRestaurant">
                <Card
                    bg={'Primary'.toLowerCase()}
                    text={'Primary'.toLowerCase() === 'light' ? 'dark' : 'white'}
                    style={{ width: '48rem', textAlign: 'center' }}
                    className="m-2"
                >
                    <Card.Header><span style={{color: 'yellow', fontSize: '1.2rem', textAlign: 'center'}}>Restaurant Detail</span></Card.Header>
                    <Card.Body>
                        <Card.Title><span style={{color: 'white', fontSize: '2rem', textAlign: 'center'}}>{restaurantDetail[0].restaurantName}</span></Card.Title>
                        <Card.Text>
                            <span style={{color: 'white', fontSize: '1.3rem', textAlign: 'center'}}>{restaurantDetail[0].restaurantDiscription}</span>
                            <span style={{color: 'white', fontSize: '1rem', textAlign: 'center'}}><p>Address: {restaurantDetail[0].restaurantAddress}</p></span>
                            <span style={{color: 'white', fontSize: '1rem', textAlign: 'center'}}><p>Phone: {restaurantDetail[0].restaurantPhone}</p></span>
                        </Card.Text>
                    </Card.Body>
                </Card>
                {/* <h2>{restaurantDetail[0].restaurantDiscription}</h2> */}
                {/* <p>Address: {restaurantDetail[0].restaurantAddress}</p>
                <p>Phone: {restaurantDetail[0].restaurantPhone}</p> */}
                <Button style={{margin: '1rem'}} variant="success" onClick={() => setModalShow(true)}>Add Item to Restaurant</Button>
                <MenuPopup menuItem={menuItem} ItemHandler={ItemHandler} addDishes={addDishes} show={modalShow} onHide={onHide} />
                {showDishesList()}
            </div>
        </div>
    )
}

export default RestaurantDetailComponent
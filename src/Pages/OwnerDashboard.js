import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import RestaurantPopUp from '../Components/RestaurantPopUp'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RestaurantDetailComponent from '../Components/SubComponent/RestaurantDetailComponent'

const OwnerDashboard = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const { id } = useParams()
    const [restaurantDetail, setRestaurant] = useState({
        restaurantName: "", restaurantDiscription: "", restaurantAddress: "", restaurantPhone: "", restaurantMenu: []
    })

    let restaurant_name, restaurant_value
    const detailHandler = (e) => {
        restaurant_name = e.target.name
        restaurant_value = e.target.value
        setRestaurant({ ...restaurantDetail, [restaurant_name]: restaurant_value })
    }

    const submitRestaurantDetail = (e) => {
        e.preventDefault()
        // let ItemName, ItemImage, ItemDiscription, ItemCatagory, ItemType, Constituents, price
        // restaurantDetail.restaurantMenu= [ItemName= "", ItemImage= "", ItemDiscription= "", ItemCatagory= "", ItemType= "", Constituents= "", price= ""]
        const addedRestaurant = { "restaurant": [restaurantDetail] }
        console.log(addedRestaurant)

        axios.patch(`http://localhost:4000/app/signup/${id}`, addedRestaurant)
            .then(res => {
                toast.success("Restaurant Added", {
                    position: "top-right"
                })
                setModalShow(false)
            })
            .catch(e => {
                console.log(e)
                // toast.error("Invalid registration", {
                //     position: "top-right"
                // })
            })
    }

    const showRestaurantDetail = () => {
        if(!modalShow) {
            return (
                <RestaurantDetailComponent id={id} restaurantDetail={restaurantDetail} />
            )
        } else return ""
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/app/signup/${id}`)
            .then(res => {
                if (res.data.restaurant.length === 0) {
                    setModalShow(true)
                }
            }).catch(e => console.log(e))
    }, [])

    return (
        <div>
            {showRestaurantDetail()}
            <RestaurantPopUp
                show={modalShow}
                onHide={() => setModalShow(false)}
                user_id={id}
                restaurantDetail={restaurantDetail}
                detailHandler={detailHandler}
                submitRestaurantDetail={submitRestaurantDetail}
            />
            <ToastContainer />
        </div>
    )
}

export default OwnerDashboard
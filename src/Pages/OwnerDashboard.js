import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import RestaurantPopUp from '../Components/RestaurantPopUp'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RestaurantDetailComponent from '../Components/SubComponent/RestaurantDetailComponent'
import Loading from '../Components/Loading'

const OwnerDashboard = (props) => {
    const [modalShow, setModalShow] = useState(true);
    const [load, setLoad] = useState(false);
    const [rest, setRest] = useState([])
    const { id } = useParams()
    const [restaurantDetail, setRestaurant] = useState({
        restaurantName: "", restaurantDiscription: "", restaurantAddress: "", restaurantPhone: "", restaurantMenu: []
    })
    const [showDetails, setShowDetails] = useState(false)

    useEffect(() => {
        console.log("use effect")
        fetchRestaurantDetails()
    }, [modalShow])

    let restaurant_name, restaurant_value
    const detailHandler = (e) => {
        restaurant_name = e.target.name
        restaurant_value = e.target.value
        setRestaurant({ ...restaurantDetail, [restaurant_name]: restaurant_value })
    }

    const fetchRestaurantDetails = () => {
        axios.get(`http://localhost:4000/app/signup/${id}`)
            .then(res => {
                setLoad(false)
                setRest(res.data.restaurant)
                setShowDetails(true)
            }).catch(e => console.log(e))
            .finally(setLoad(false))
        }

    if(load) return <Loading />


    const submitRestaurantDetail = (e) => {
        e.preventDefault()
        setLoad(true)
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
        if(showDetails) {
            if(rest.length > 0) {
                return (
                    <RestaurantDetailComponent id={id} restaurantDetail={rest} />
                )
            } else return ""
        } else return ""
    }

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
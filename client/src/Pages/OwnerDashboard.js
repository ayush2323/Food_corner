import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import RestaurantPopUp from '../Components/RestaurantPopUp'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RestaurantDetailComponent from '../Components/SubComponent/RestaurantDetailComponent'
import Loading from '../Components/Loading'
import { useCostumHooks } from '../context'

const OwnerDashboard = (props) => {
    const { showRestaurantForm, setShowRestaurantForm } = useCostumHooks()
    const [modalShow, setModalShow] = useState(true);
    const [load, setLoad] = useState(false);
    const [rest, setRest] = useState([])
    const { id } = useParams()
    const [restaurantDetail, setRestaurant] = useState({
        restaurantName: "", restaurantDiscription: "", restaurantAddress: "", restaurantPhone: "", restaurantMenu: []
    })
    const [showDetails, setShowDetails] = useState(false)
    const [menuDetail, setMenuDetail] = useState([])

    const updateMenu = (menuItem) => {
        let updateMenu = { ...rest }
        updateMenu[0].restaurantMenu.push(menuItem)
        setRestaurant(updateMenu)
        const addedMenu = { "restaurant": [updateMenu[0]] }
        axios.patch(`https://foodcornerproject.herokuapp.com/signup/dish/${id}`, addedMenu)
            .then(res => {
                console.log(res.data)
                setModalShow(false)
                toast.success("Dish Added", {
                    position: "top-right"
                })
            })
            .catch(e => {
                console.log(e)
                toast.error("Invalid registration", {
                    position: "top-right"
                })
            })
    }

    useEffect(() => {
        fetchRestaurantDetails()
    }, [modalShow])

    let restaurant_name, restaurant_value
    const detailHandler = (e) => {
        restaurant_name = e.target.name
        restaurant_value = e.target.value
        setRestaurant({ ...restaurantDetail, [restaurant_name]: restaurant_value })
    }

    const fetchRestaurantDetails = () => {
        // setLoad(true)
        axios.get(`https://foodcornerproject.herokuapp.com/signup/${id}`)
            .then(res => {
                setRest(res.data.restaurant)
                console.log(res.data.restaurant[0].restaurantMenu)
                setMenuDetail(res.data.restaurant[0].restaurantMenu)
                setShowDetails(true)
            }).catch(e => console.log(e))
            .finally(setLoad(false))
    }

    if (load) return <Loading />

    const submitRestaurantDetail = (e) => {
        e.preventDefault()
        setLoad(true)
        // let ItemName, ItemImage, ItemDiscription, ItemCatagory, ItemType, Constituents, price
        // restaurantDetail.restaurantMenu= [ItemName= "", ItemImage= "", ItemDiscription= "", ItemCatagory= "", ItemType= "", Constituents= "", price= ""]
        const addedRestaurant = { "restaurant": [restaurantDetail] }
        console.log(addedRestaurant)

        axios.patch(`https://foodcornerproject.herokuapp.com/signup/${id}`, addedRestaurant)
            .then(res => {
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

    const editRestaurant = () => {
        console.log("editRestaurant")
        setShowRestaurantForm(true)
        setModalShow(true)
    }

    const showRestaurantDetail = () => {
        if (showDetails) {
            if (rest.length > 0) {
                return (
                    <RestaurantDetailComponent id={id} restaurantDetail={rest} menuDetail={menuDetail} editRestaurant={editRestaurant} updateMenu={updateMenu} />
                )
            } else return ""
        } else return (
            <center>
                <button style={{ margin: '2rem', height: '3rem', width: '10rem', padding: '.5rem' }} onClick={() => setModalShow(true)}>Add Restaurant</button>
                <h2>Please add restaurant detail</h2>
            </center>
        )
    }

    const showPopupOrNot = () => {
        if (showRestaurantForm) {
            return (
                <RestaurantPopUp
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    user_id={id}
                    restaurantDetail={restaurantDetail}
                    detailHandler={detailHandler}
                    submitRestaurantDetail={submitRestaurantDetail}
                    data-backdrop="static"
                    data-keyboard="false"
                />
            )
        } else return ''
    }

    return (
        <div className="owner" style={{ backgroundColor: 'rgb(212, 196, 196)', height: '100%' }}>
            {showRestaurantDetail()}
            {showPopupOrNot()}
            <ToastContainer />
        </div>
    )
}

export default OwnerDashboard
import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import RestaurantPopUp from '../Components/RestaurantPopUp'

const OwnerDashboard = (props) => {
    const { id } = useParams()
    console.log(id)
    useEffect(() => {
        axios.get(`http://localhost:4000/app/signup/${id}`)
            .then(res => {
                if (res.data.restaurant.length === 0) {
                    // console.log("open popup")
                    <RestaurantPopUp />
                }
            }).catch(e => console.log(e))
    }, [])

    return (
        <div>
            Owner_dashboard new dhdbbfbf
        </div>
    )
}

export default OwnerDashboard

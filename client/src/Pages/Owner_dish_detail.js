import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'

const Owner_dish_detail = (props) => {
    const { id } = useParams()
    const history = useHistory()
    console.log(id)

    const [dishDetail, setDishDetail] = useState({})

    const getDishDetail = () => {
        axios.get(`https://foodcornerproject.herokuapp.com/owner_dish_detail/${id}`)
            .then(res => {
                console.log(res)
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
            Owner_dish_detail
        </div>
    )
}

export default Owner_dish_detail

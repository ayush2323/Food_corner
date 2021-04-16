import React, {useState, useEffect, useCallback} from 'react'
import ItemsList from '../Components/ItemsList'
import SearchForm from '../Components/SubComponent/SearchForm'
import Loading from '../Components/Loading'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axios from 'axios'

const CustomerDashboard = (props) => {
    const [dishes, setDishes] = useState([])
    const [load, setLoad] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [total_dish, setTotal_dish] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const searchDish = (e) => {
        console.log(e.target.value)
        setSearchTerm(e.target.value)
    }
    
    const showDishes = () => {
        setLoad(true)
        axios.get(`https://foodcornerproject.herokuapp.com/dishes`)
        .then(res => {
            setDishes(res.data)
            setTotal_dish(res.data)
        }).catch(e => console.log(e))
        .finally(setLoad(false))
    }

    // if(dishes.length == 0) return <Loading />

    useEffect(() => {
        showDishes()
    }, [])

    const filterDish = () => {
        let newDish = total_dish.filter(item => item.ItemName.includes(searchTerm))
        setDishes(newDish)
    }

    useEffect(() => {
        console.log("use effect")
        filterDish()
    }, [searchTerm])

    // if(load) return <Loading />

    return (
        <div className="CustomerDashboard_container">
            <Container>
            <Row>
                    <Col></Col>
                    <Col xs={10} className="menu_title"><SearchForm handleSubmit={handleSubmit} searchTerm={searchTerm} searchDish={searchDish} /></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={10} className="menu_title"><ItemsList  load={load} dishes={dishes}/></Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default CustomerDashboard

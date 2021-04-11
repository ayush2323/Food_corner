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
    const { id } = useParams()
    const [dishes, setDishes] = useState([])
    const [load, setLoad] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    // const handleSubmit = () => {
    //     console.log("handleSubmit")
    // }

    // const searchCocktail = (e) => {
    //     console.log("searchCocktail")
    // }
    
    const showDishes = () => {
        setLoad(true)
        axios.get(`http://localhost:4000/app/dishes`)
        .then(res => {
            console.log(res.data)
            setDishes(res.data)
        }).catch(e => console.log(e))
        .finally(setLoad(false))
    }

    useEffect(() => {
        showDishes()
    }, [])

    // if(load) return <Loading />

    return (
        <div className="CustomerDashboard_container">
            <Container>
            <Row>
                    <Col></Col>
                    {/* <Col xs={10} className="menu_title"><SearchForm handleSubmit={handleSubmit} searchCocktail={searchCocktail} /></Col> */}
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={10} className="menu_title" load={load} dishes={dishes}><ItemsList/></Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default CustomerDashboard

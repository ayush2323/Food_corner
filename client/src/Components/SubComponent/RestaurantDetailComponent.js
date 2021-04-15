import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import MenuPopup from '../MenuPopup'
import DishesList from './DishesList'
import Pagination from './Pagination'
import Loading from '../Loading'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Card from 'react-bootstrap/Card'

const RestaurantDetailComponent = (props) => {
    const restaurantDetail = props.restaurantDetail
    console.log(restaurantDetail)
    const id = props.id
    const [modalShow, setModalShow] = useState(false);
    const [menuItem, setMenuItem] = useState({
        ItemName: "", ItemDiscription: "", ItemImage: "", ItemCatagory: "", ItemType: "veg", Constituents: "", price: "", restaurantName: restaurantDetail[0].restaurantName, restaurantAddress: restaurantDetail[0].restaurantAddress, restaurantPhone: restaurantDetail[0].restaurantPhone
    })
    const [dish_id, setDish_id] = useState('')

    let item_name, item_value
    const ItemHandler = (e) => {
        item_name = e.target.name
        item_value = e.target.value
        setMenuItem({ ...menuItem, [item_name]: item_value })
    }

    const [showPerPage, setShowPerPage] = useState(12)
    const [pagination, setPagination] = useState({
        start: 0,
        end: showPerPage
    })

    const onPaginationChange = (start, end) => {
        setPagination({start, end})
    }

    const onHide = () => setModalShow(false)
    const seeModalShow = () => { setModalShow(true) }

    const editHandler = (e) => {
        console.log(e.target.ns)
    }

    const deleteHandler = (e) => {
        console.log(e.target)
        console.log(e.target.value)
    }

    const addDishes = (e) => {
        e.preventDefault()
        console.log(menuItem)
        props.updateMenu(menuItem)
        axios.post(`http:///localhost:4000/app/dishes`, menuItem)
            .then(res => {
                console.log(res)
                setDish_id(res.data._id)
                setModalShow(false)
                onHide()
            })
            .catch(e => console.log(e))
    }

    const showDishesList = () => {
        if (props.menuDetail.length != 0) {
            return (
                <Container>
                    <Row>
                        <Col></Col>
                        <Col xs={10} className="menu_title">
                            <section className="section">
                                <div className="cocktails-center">
                                    {props.menuDetail.slice(pagination.start, pagination.end).map((item, index) => (
                                        <DishesList editHandler={editHandler} deleteHandler={deleteHandler} key={index} item={item} />
                                    ))}
                                </div>
                            </section>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Pagination showPerPage={showPerPage} onPaginationChange={onPaginationChange} total={props.menuDetail.length} />
                </Container>
            )
        } else return <h1>No Item Added</h1>
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
                    <Card.Header><span style={{color: 'yellow', fontSize: '1.2rem', textAlign: 'center'}}>Restaurant Detail</span> <span style={{position: 'absolute', cursor: 'pointer', marginLeft: '15rem'}} onClick={props.editRestaurant}>Edit</span></Card.Header>
                    <Card.Body>
                        <Card.Title><span style={{color: 'white', fontSize: '2rem', textAlign: 'center'}}>{restaurantDetail[0].restaurantName}</span></Card.Title>
                        <Card.Text>
                            <span style={{color: 'white', fontSize: '1.3rem', textAlign: 'center'}}>{restaurantDetail[0].restaurantDiscription}</span>
                            <span style={{color: 'white', fontSize: '1rem', textAlign: 'center'}}><p>Address: {restaurantDetail[0].restaurantAddress}</p></span>
                            <span style={{color: 'white', fontSize: '1rem', textAlign: 'center'}}><p>Phone: {restaurantDetail[0].restaurantPhone}</p></span>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Button style={{margin: '1rem'}} variant="success" onClick={() => setModalShow(true)}>Add Item to Restaurant</Button>
                <MenuPopup menuItem={menuItem} ItemHandler={ItemHandler} addDishes={addDishes} show={modalShow} onHide={onHide} />
                {showDishesList()}
            </div>
        </div>
    )
}

export default RestaurantDetailComponent
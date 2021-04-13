import React, { useState, useEffect } from 'react'
import Item from './SubComponent/Item'
import Loading from './Loading'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import { useCostumHooks } from '../context'

const ItemsList = (props) => {
    const {dishes, load} = useCostumHooks()
    if(load){
        return <Loading />
    }
    // console.log(props.dishes)

    if (props.dishes.length < 1) {
        return (
            <h2 className="section-title">
                No dishes matched your search criteria
            </h2>
        )
    }

    return (
        <div className="CustomerDashboard_container">
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={10} className="menu_title">
                        <section className="section">
                            <h2 className="section-title">Our Menu</h2>
                            <div className="cocktails-center">
                                {props.dishes.map((item, index) => (
                                    <Item key={index} dish={item} />
                                ))}
                            </div>
                        </section>
                        {/* {dishes.map((item, index) => (
                            <Item key={index} dish={item} />
                        ))} */}
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default ItemsList

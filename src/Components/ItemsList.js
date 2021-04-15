import React, { useState, useEffect } from 'react'
import Item from './SubComponent/Item'
import Loading from './Loading'
import Pagination from './SubComponent/Pagination'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import { useCostumHooks } from '../context'

const ItemsList = (props) => {
    const {dishes, load} = useCostumHooks()
    const [showPerPage, setShowPerPage] = useState(12)
    const [pagination, setPagination] = useState({
        start: 0,
        end: showPerPage
    })

    const onPaginationChange = (start, end) => {
        setPagination({start, end})
    }


    if(load){
        return <Loading />
    }

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
                                {props.dishes.slice(pagination.start, pagination.end).map((item, index) => (
                                    <Item key={index} dish={item} />
                                ))}
                            </div>
                        </section>
                    </Col>
                    <Col></Col>
                </Row>
                <Pagination showPerPage={showPerPage} onPaginationChange={onPaginationChange} total={props.dishes.length} />
            </Container>
        </div>
    )
}

export default ItemsList

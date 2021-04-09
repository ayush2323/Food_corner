import React from 'react'
import ItemsList from '../Components/ItemsList'
import SearchForm from '../Components/SubComponent/SearchForm'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const CustomerDashboard = (props) => {
    const { id } = useParams()
    return (
        <div className="CustomerDashboard_container">
            <Container>
            <Row>
                    <Col></Col>
                    <Col xs={10} className="menu_title"><SearchForm/></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={10} className="menu_title"><ItemsList/></Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default CustomerDashboard

import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import FormCol from './SubComponent/FormCol'

function RestaurantPopUp(props) {
  console.log(props)
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        data-backdrop="static"
        data-keyboard="false"
      >
        <Modal.Body data-backdrop="static" data-keyboard="false">
          <Form onSubmit={props.submitRestaurantDetail} data-backdrop="static" data-keyboard="false">
            <FormCol name={"Restaurant Name"} sendName={"restaurantName"} value={props.restaurantDetail.restaurantName} controlId={'restaurantName'} type={"text"} placeholder={"Enter restaurant name"} changeHandler={props.detailHandler} />
            <FormCol name={"Restaurant Discription"} sendName={"restaurantDiscription"} value={props.restaurantDetail.restaurantDiscription} controlId={'restaurantDiscription'} type={"text"} placeholder={"Enter restaurant discription"} changeHandler={props.detailHandler} />
            <FormCol name={"Restaurant Address"} sendName={"restaurantAddress"} value={props.restaurantDetail.restaurantAddress} controlId={'restaurantAddress'} type={"text"} placeholder={"Enter restaurant address"} changeHandler={props.detailHandler} />
            <FormCol name={"Restaurant Phone"} sendName={"restaurantPhone"} value={props.restaurantDetail.restaurantPhon} controlId={'restaurantPhone'} type={"number"} placeholder={"Enter restaurant phone"} changeHandler={props.detailHandler} />
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default RestaurantPopUp

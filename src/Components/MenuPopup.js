import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import FormCol from './SubComponent/FormCol'

const MenuPopup = (props) => {
    const {menuItem, ItemHandler, addItem} = props
    return (
        <div>
            <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form onSubmit={addItem}>
            <FormCol name={"Item Name"} sendName={"ItemName"} value={menuItem.ItemName} controlId={'ItemName'} type={"text"} placeholder={"Enter item name"} changeHandler={ItemHandler} />
            <FormCol name={"Item Discription"} sendName={"ItemDiscription"} value={menuItem.ItemDiscription} controlId={'ItemDiscription'} type={"text"} placeholder={"Enter item discription"} changeHandler={ItemHandler} />
            <FormCol name={"Item Catagory"} sendName={"ItemCatagory"} value={menuItem.ItemCatagory} controlId={'ItemCatagory'} type={"text"} placeholder={"Enter item catagory"} changeHandler={ItemHandler} />
            <FormCol name={"Item Type"} sendName={"ItemType"} value={menuItem.ItemType} controlId={'ItemType'} type={"text"} placeholder={"Enter item type"} changeHandler={ItemHandler} />
            <FormCol name={"Item Constituents"} sendName={"Constituents"} value={menuItem.Constituents} controlId={'Constituents'} type={"text"} placeholder={"Enter item constituents"} changeHandler={ItemHandler} />
            <FormCol name={"Item price"} sendName={"price"} value={menuItem.price} controlId={'price'} type={"number"} placeholder={"Enter item price"} changeHandler={ItemHandler} />
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
        </div>
    )
}

export default MenuPopup

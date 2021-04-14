import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import FormCol from './SubComponent/FormCol'

const MenuPopup = (props) => {
  const { menuItem, ItemHandler, addDishes } = props
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton><center><span>Write detail of Item</span></center></Modal.Header>
        <Modal.Body>
          <Form onSubmit={addDishes} encType="multipart/form-data">
            <FormCol name={"Item Name"} sendName={"ItemName"} value={menuItem.ItemName} controlId={'ItemName'} type={"text"} placeholder={"Enter item name"} changeHandler={ItemHandler} />
            <Form.Group>
              <Form.File name="ItemImage" id="exampleFormControlFile1" label="Upload Item Image" />
            </Form.Group>
            <FormCol name={"Item Discription"} sendName={"ItemDiscription"} value={menuItem.ItemDiscription} controlId={'ItemDiscription'} type={"text"} placeholder={"Enter item discription"} changeHandler={ItemHandler} />
            <FormCol name={"Item Catagory"} sendName={"ItemCatagory"} value={menuItem.ItemCatagory} controlId={'ItemCatagory'} type={"text"} placeholder={"Enter item catagory"} changeHandler={ItemHandler} />
            <div key={`default-radio`} className="mb-3">
              <div className="adjust_radio">
                <Form.Check value="veg" onClick={ItemHandler} type="radio" id={`default-radio`} name="ItemType" label={`Veg`} defaultChecked />
                <Form.Check value="non veg" onClick={ItemHandler} type="radio" id={`radio`} name="ItemType" label={`Non Veg`} />
              </div>
            </div>
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

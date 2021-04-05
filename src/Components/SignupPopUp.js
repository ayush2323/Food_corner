import React, {useState} from 'react'
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import FormCol from './SubComponent/FormCol'
import axios from 'axios'

function SignupPopUp(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [restaurantName, setRestaurantName] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')

    const nameHandler = (e) => (setName(e.target.value))
    const emailHandler = (e) => (setEmail(e.target.value))
    const phoneHandler = (e) => (setPhone(e.target.value))
    const restaurantNameHandler = (e) => (setRestaurantName(e.target.value))
    const addressHandler = (e) => (setAddress(e.target.value))
    const passwordHandler = (e) => (setPassword(e.target.value))

    const submitForm = (e) => {
        e.preventDefault()
        const registered = {
            fullName: name,
            email: email,
            phone: phone,
            restaurantName: restaurantName,
            address: address,
            password: password
        }

        axios.post('http://localhost:4000/app/signup', registered)
        .then(res => console.log(res.data))
        window.location = "/"
        setName('')
        setEmail('')
        setPhone('')
        setRestaurantName('')
        setAddress('')
        setPassword('')
    }

    return (
        <div>

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign Up for Owner
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitForm} action="owner_signup" method="POST">
                        <FormCol name={"Full name"} sendName={"fullName"} value={name} controlId={'Name'} type={"text"} placeholder={"Enter name"} changeHandler={nameHandler} />
                        <FormCol name={"Email"} sendName={"email"} value={email} controlId={'Name'} type={"email"} placeholder={"Enter email"} changeHandler={emailHandler} />
                        <FormCol name={"Phone"} sendName={"phone"} value={phone} controlId={'Phone'} type={"number"} placeholder={"Enter phone"} changeHandler={phoneHandler} />
                        <FormCol name={"Restaurant-name"} sendName={"restaurantName"} value={restaurantName} controlId={'RestaurantName'} type={"text"} placeholder={"Enter restaurant-name"} changeHandler={restaurantNameHandler} />
                        <FormCol name={"Address"} sendName={"address"} value={address} controlId={'Address'} type={"text"} placeholder={"Enter Address"} changeHandler={addressHandler} />
                        <FormCol name={"Password"} sendName={"password"} value={password} controlId={'Password'} type={"password"} placeholder={"Enter Password"} changeHandler={passwordHandler} />
                        {/* <Form.Group controlId="formBasicEmail">
                            <Form.Label>Full name</Form.Label>
                            <Form.Control value={name} onChange={nameHandler} name="fullName" type="text" placeholder="Enter text" />
                        </Form.Group> */}
                        {/* <Form.Group controlId="formBasicPassword">
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={email} onChange={emailHandler} name="email" type="email" placeholder="email" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control value={phone} onChange={phoneHandler} name="phone" type="number" placeholder="phone" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Restaurant-name</Form.Label>
                            <Form.Control value={restaurantName} onChange={restaurantNameHandler} name="restaurantName" type="text" placeholder="restaurant-name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Address</Form.Label>
                            <Form.Control value={address} onChange={addressHandler} name="address" type="text" placeholder="address" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={password} onChange={passwordHandler} name="password" type="password" placeholder="password" />
                        </Form.Group> */}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>       
            </Modal>
        </div>
    )
}

export default SignupPopUp

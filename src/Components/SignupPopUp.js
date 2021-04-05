import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import FormCol from './SubComponent/FormCol'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function SignupPopUp(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('Owner')

    const nameHandler = (e) => (setName(e.target.value))
    const emailHandler = (e) => (setEmail(e.target.value))
    const phoneHandler = (e) => (setPhone(e.target.value))
    const addressHandler = (e) => (setAddress(e.target.value))
    const passwordHandler = (e) => (setPassword(e.target.value))

    const handleRadio = (e) => {
        setRole(e.target.value)
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (name == "" || email == "" || phone == "" || role == "" || address == "" || password == "") {
            toast.error("Fill every column", {
                position: "bottom-right"
            })
            return;
        }
        const registered = {
            fullName: name,
            email: email,
            phone: phone,
            role: role,
            address: address,
            password: password
        }

        axios.post('http://localhost:4000/app/signup', registered)
            .then(res => console.log(res.data))
            .then(window.location = "/")

        setName('')
        setEmail('')
        setPhone('')
        setAddress('')
        setPassword('')
        toast.success("Login Successfull", {
            position: "top-right"
        })
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
                        <div key={`default-radio`} className="mb-3">
                            <Form.Check value="owner" onClick={handleRadio} type="radio" id={`default-radio`} name="role" label={`Owner`} />
                            <Form.Check value="customer" onClick={handleRadio} type="radio" id={`default-radio`} name="role" label={`Customer`} />
                        </div>
                        <FormCol name={"Address"} sendName={"address"} value={address} controlId={'Address'} type={"text"} placeholder={"Enter Address"} changeHandler={addressHandler} />
                        <FormCol name={"Password"} sendName={"password"} value={password} controlId={'Password'} type={"password"} placeholder={"Enter Password"} changeHandler={passwordHandler} />
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </div>
    )
}

export default SignupPopUp

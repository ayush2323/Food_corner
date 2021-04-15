import React from 'react'
import Form from 'react-bootstrap/Form'

const FormCol = (props) => {
    return (
        <div>
            <Form.Group controlId={`formBasic${props.controlId}`}>
                <Form.Label>{props.name}</Form.Label>
                <Form.Control value={props.value} onChange={props.changeHandler} name={props.sendName} type={props.type} placeholder={props.placeholder} />
            </Form.Group>
        </div>
    )
}

export default FormCol

import React,{useRef} from 'react'
import {Modal,Form,Button} from 'react-bootstrap'

export default function NewConversationModal(props)
{
    const {closeModal}=props;
    const idRef=useRef()
    const nameRef=useRef()

    const handleSubmit=(evt)=>
    {
        evt.preventDefault()
        closeModal()
    }

    return (
        <>
            <Modal.Header closeButton>Create Contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text" ref={idRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required></Form.Control>
                    </Form.Group>
                    <Button type="submit" style={{marginTop:'10px'}}>Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}

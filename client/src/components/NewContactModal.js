import React,{useRef} from 'react'
import {Modal,Form,Button} from 'react-bootstrap'
import {useContacts} from '../contexts/ContactsProvider'

export default function NewContactModal(props)
{
    const {closeModal}=props
    const idRef=useRef()
    const nameRef=useRef()
    const {createContact}=useContacts()

    const handleSubmit=(evt)=>
    {
        evt.preventDefault()
        createContact(idRef.current.value,nameRef.current.value)
        closeModal()
    }

    const handleRandom=()=>
    {
        idRef.current.value=
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
                    <Button type="submit" style={{marginTop:'16px',marginRight:'16px'}}>Create</Button>
                    <Button variant="secondary" style={{marginTop:'16px'}} onClick={handleRandom}>Random</Button>
                </Form>
            </Modal.Body>
        </>
    )
}
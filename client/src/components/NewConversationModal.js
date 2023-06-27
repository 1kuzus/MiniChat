import React,{useState} from 'react'
import {Modal,Form,Button} from 'react-bootstrap'
import {useContacts} from '../contexts/ContactsProvider'
import {useConversations} from '../contexts/ConversationsProvider'

export default function NewConversationModal(props)
{
    const {closeModal}=props
    const {contacts}=useContacts()
    const {createConversation}=useConversations()
    const [selectedContactIds,setSelectedContactIds]=useState([])

    const handleCheck=(id)=>
    {
        setSelectedContactIds(prevSelectedContactIds=>
        {
            if(prevSelectedContactIds.includes(id))
            {
                return prevSelectedContactIds.filter(itemId=>(itemId!==id))
            }
            else
            {
                return [...prevSelectedContactIds,id]
            }
        })
    }

    const handleSubmit=(evt)=>
    {
        evt.preventDefault()
        createConversation(selectedContactIds)
        closeModal()
    }

    return (
        <>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map((contact)=>
                    (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check
                                type="checkbox"
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={()=>{handleCheck(contact.id)}}
                            />
                        </Form.Group>
                    ))}
                    <Button type="submit" style={{marginTop:'10px'}}>Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}
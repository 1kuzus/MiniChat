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

    const handleCheck=(cid)=>
    {
        setSelectedContactIds(prevSelectedContactIds=>
        {
            if(prevSelectedContactIds.includes(cid))
            {
                return prevSelectedContactIds.filter(id=>(id!==cid))
            }
            else
            {
                return [...prevSelectedContactIds,cid]
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
                    {contacts.map((cid)=>
                    (
                        <Form.Group controlId={cid} key={cid}>
                            <Form.Check
                                type="checkbox"
                                value={selectedContactIds.includes(cid)}
                                label={cid}
                                onChange={()=>{handleCheck(cid)}}
                            />
                        </Form.Group>
                    ))}
                    <Button type="submit" style={{marginTop:'10px'}}>Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}
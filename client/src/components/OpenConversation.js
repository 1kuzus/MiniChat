import React,{useState} from 'react'
import {Button,Form,InputGroup} from 'react-bootstrap'
import {useConversations} from '../contexts/ConversationsProvider'
import './OpenConversation.css'

export default function OpenConversation()
{
    const [text,setText]=useState('')
    const {sendMessage,selectedConversation}=useConversations()

    const handleSubmit=(evt)=>
    {
        evt.preventDefault()
        sendMessage(selectedConversation.contactList.map(c=>c.id),text)
        setText('')
    }

    return (
        <div className="open-conversation-container">
            <div className="messages-container">
                {JSON.stringify(selectedConversation.messages)}
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={(evt)=>{setText(evt.target.value)}}
                            style={{outline:'none'}}
                        />
                        <Button type="submit">send</Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

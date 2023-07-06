import React,{useEffect, useRef,useState} from 'react'
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
                {selectedConversation.messages.map((message)=>{
                    const {fromMe,senderId,senderName,text}=message
                    return (
                        <div className="message-container">
                            <div className="message-bubble" style={{
                                marginLeft:fromMe?'auto':'0',
                                color:fromMe?'white':'black',
                                backgroundColor:fromMe?'#0d6efd':'#ffffff',
                                border:fromMe?'none':'1px solid #dddddd'
                            }}>{text}</div>
                            <div className="message-sender small" style={{marginLeft:fromMe?'auto':'0'}}>{senderName}</div>
                        </div>
                    )
                })}
            </div>
            <div className="send-container">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <InputGroup className="send-input">
                            <Form.Control
                                as="textarea"
                                required
                                value={text}
                                onChange={(evt)=>{setText(evt.target.value)}}
                            />
                        </InputGroup>
                        <Button className="send-btn" type="submit">send</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}
import React,{useCallback,useState} from 'react'
import {Button,Form,InputGroup} from 'react-bootstrap'
import {useConversations} from '../contexts/ConversationsProvider'
import './OpenConversation.css'

export default function OpenConversation(props)
{
    const {id}=props
    const [text,setText]=useState('')
    const {sendMessage,selectedConversation}=useConversations()

    const lastMessageRef=useCallback((node)=>
    {
        node&&node.scrollIntoView()
    },[])

    const handleSubmit=(evt)=>
    {
        evt.preventDefault()
        sendMessage(selectedConversation.idList,text)
        setText('')
    }

    return (
        <div className="open-conversation-container">
            <div className="messages-container">
                {selectedConversation.messages.map((message,index)=>{
                    const {senderId,text}=message
                    const fromMe=(senderId===id)
                    const isLast=selectedConversation.messages.length-1===index
                    return (
                        <div 
                            className="message-container"
                            ref={isLast?lastMessageRef:null}
                            key={index}
                        >
                            <div className="message-bubble" style={{
                                marginLeft:fromMe?'auto':'0',
                                color:fromMe?'white':'black',
                                backgroundColor:fromMe?'#0d6efd':'#ffffff',
                                border:fromMe?'none':'1px solid #dddddd'
                            }}>
                                {text}
                            </div>
                            <div className="message-sender small" style={{marginLeft:fromMe?'auto':'0'}}>
                                {fromMe?'You':senderId}
                            </div>
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
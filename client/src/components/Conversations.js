import React from 'react'
import {ListGroup} from 'react-bootstrap'
import {useConversations} from '../contexts/ConversationsProvider'

export default function Conversations()
{
    const {conversations,setSelectConversationIndex}=useConversations()

    return (
        <ListGroup variant="flush">
            {conversations.map((conversation,index)=>
            (
                <ListGroup.Item
                    key={index}
                    action
                    onClick={()=>{setSelectConversationIndex(index)}}
                    active={conversation.selected}
                >
                    {conversation.contactList.map(c=>c.name).join(', ')}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
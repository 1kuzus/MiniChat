import React from 'react'
import {ListGroup} from 'react-bootstrap'
import {useConversations} from '../contexts/ConversationsProvider'

export default function Conversations()
{
    const {conversations,selectedIndex,setSelectedIndex}=useConversations()

    return (
        <ListGroup variant="flush">
            {conversations.map((conversation,index)=>
            (
                <ListGroup.Item
                    key={index}
                    action
                    onClick={()=>{setSelectedIndex(index)}}
                    active={index===selectedIndex}
                >
                    {conversation.idList.join(', ')}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
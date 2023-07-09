import React from 'react'
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'
import {useConversations} from '../contexts/ConversationsProvider'


export default function Dashboard(props)
{
    const {id}=props
    const {selectedConversation}=useConversations()

    return (
        <div style={{display:'flex',height:'100vh'}}>
            <Sidebar id={id}/>
            {selectedConversation && <OpenConversation  id={id}/>}
        </div>
    )
}
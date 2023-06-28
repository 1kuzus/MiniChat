import React from 'react'
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'

export default function Dashboard(props)
{
    const {id}=props

    return (
        <Sidebar id={id}/>
    )
}
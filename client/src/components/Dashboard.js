import React from 'react'
import Sidebar from './Sidebar'

export default function Dashboard(props)
{
    const {id}=props

    return (
        <Sidebar id={id}/>
    )
}
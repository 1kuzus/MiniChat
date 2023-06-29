import React from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import useLocalStorage from '../hooks/useLocalStorage'
import {ContactsProvider} from '../contexts/ContactsProvider'
import {ConversationsProvider} from '../contexts/ConversationsProvider'

export default function App()
{
    const [id,setId]=useLocalStorage('id')
    const dashboard=(
        <ContactsProvider>
            <ConversationsProvider id={id}>
                <Dashboard id={id}/>
            </ConversationsProvider>
        </ContactsProvider>
    )

    return (
        <>
            {id?dashboard:<Login setId={setId}/>}
        </>
    )
}
import React from 'react'
import Login from './Login'
import useLocalStorage from '../hooks/useLocalStorage'

export default function App()
{
    const [id,setId]=useLocalStorage('id')
    return (
        <>
            {id}
            <Login setId={setId}/>
        </>
    )
}
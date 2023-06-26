import React from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import useLocalStorage from '../hooks/useLocalStorage'

export default function App()
{
    const [id,setId]=useLocalStorage('id')
    return (
        <>
            {id?<Dashboard id={id}/>:<Login setId={setId}/>}
        </>
    )
}
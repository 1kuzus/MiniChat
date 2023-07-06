import React,{useContext,createContext,useState,useEffect} from 'react'
import io from 'socket.io-client'

const SocketContext=createContext()

export function useSocket()
{
    return useContext(SocketContext)
}

export function SocketProvider(props)
{
    const {id,children}=props
    const [socket,setSocket]=useState()

    useEffect(()=>
    {
        const newSocket=io('http://localhost:1029',{query:{id}})////////////
        setSocket(newSocket)
        return ()=>newSocket.close()
    },[id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
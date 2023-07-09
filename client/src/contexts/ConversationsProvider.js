import React,{useContext,createContext,useState,useEffect,useCallback} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {useSocket} from './SocketProvider'

const ConversationsContext=createContext()

function arrayEqual(a,b)
{
    a.sort()
    b.sort()
    return a.join('')===b.join('')
}

export function useConversations()
{
    return useContext(ConversationsContext)
}

export function ConversationsProvider(props)
{
    const {children,id}=props
    const socket=useSocket()
    const [conversations,setConversations]=useLocalStorage('conversations',[])
    const [selectedIndex,setSelectedIndex]=useState(0)

    const createConversation=(idList)=>
    {
        //idList是选择的添加进聊天的联系人的id数组
        setConversations((prevConversations)=>[...prevConversations,{idList,messages:[]}])
    }

    const addMessageToConversation=useCallback((senderId,idList,text)=>
    {
        setConversations((prevConversations)=>
        {
            let isNewConversation=true//判断是否增添了新的对话
            const newMessage={senderId,text}
            const newConversations=prevConversations.map((conversation)=>
            {
                if(arrayEqual(conversation.idList,idList))
                {
                    isNewConversation=false
                    return {
                        idList:conversation.idList,
                        messages:[...conversation.messages,newMessage]
                    }
                }
                else return conversation
            })
            if(isNewConversation)
            {
                return [...prevConversations,{idList,messages:[newMessage]}]
            }
            else
            {
                return newConversations
            }
        })
    },[setConversations])

    const sendMessage=(idList,text)=>
    {
        socket.emit('send-message',idList,text)
        addMessageToConversation(id,idList,text)
    }

    useEffect(()=>
    {
        if(!socket) return
        socket.on('receive-message',addMessageToConversation)
        return ()=>socket.off('receive-message')
    },[socket,addMessageToConversation])

    const value=
    {
        conversations,
        selectedConversation:conversations[selectedIndex],
        selectedIndex,
        setSelectedIndex,
        createConversation,
        sendMessage,
        arrayEqual,
    }
    
    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}
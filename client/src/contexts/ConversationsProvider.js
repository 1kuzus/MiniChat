import React,{useContext,createContext,useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {useContacts} from './ContactsProvider'

const ConversationsContext=createContext()

export function useConversations()
{
    return useContext(ConversationsContext)
}

export function ConversationsProvider(props)
{
    const {children,id}=props
    const {contacts}=useContacts()
    const [conversations,setConversations]=useLocalStorage('conversations',[])
    const [selectConversationIndex,setSelectConversationIndex]=useState(0)

    const createConversation=(idList)=>
    {
        //idList是选择的添加进聊天的联系人的id数组
        setConversations((prevConversations)=>[...prevConversations,{idList,messages:[]}])
    }

    //原来的conversations中每个对话对象只有id列表和消息列表，现在希望加入name字段
    const formattedConversations=conversations.map((conversation,index)=>
    {
        const contactList=conversation.idList.map(id=>contacts.find(contact=>(contact.id===id)))
        const selected=index===selectConversationIndex
        return {contactList,messages:conversation.messages,selected}//构造出新的conversations对象
    })

    const addMessageToConversation=({senderId,recipients,text})=>
    {
        setConversations((prevConversations)=>
        {
            let changed=false//判断是否增添了新的对话
            if(changed)
            {
            }
            else
            {
            }
        })
    }

    const sendMessage=(recipients,text)=>
    {
        addMessageToConversation({senderId:id,recipients,text})
    }

    const value=
    {
        conversations:formattedConversations,
        createConversation,
        setSelectConversationIndex,
        selectedConversation:formattedConversations[selectConversationIndex],
        sendMessage,
    }
    
    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}
import React,{useContext,createContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {useContacts} from './ContactsProvider'

const ConversationsContext=createContext()

export function useConversations()
{
    return useContext(ConversationsContext)
}

export function ConversationsProvider(props)
{
    const {children}=props
    const {contacts}=useContacts()
    const [conversations,setConversations]=useLocalStorage('conversations',[])

    const createConversation=(idList)=>
    {
        //idList是选择的添加进聊天的联系人的id数组
        setConversations((prevConversations)=>[...prevConversations,{idList,messages:[]}])
    }

    //原来的conversations中每个对话对象只有id列表和消息列表，现在希望加入name字段
    const formattedConversations=conversations.map((conversation)=>
    {
        const contactList=conversation.idList.map(id=>contacts.find(contact=>(contact.id===id)))
        return {contactList,messages:conversation.messages}//构造出新的conversations对象
    })

    return (
        <ConversationsContext.Provider value={{conversations:formattedConversations,createConversation}}>
            {children}
        </ConversationsContext.Provider>
    )
}
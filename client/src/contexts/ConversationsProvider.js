import React,{useContext,createContext,useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {useContacts} from './ContactsProvider'

const ConversationsContext=createContext()

function arrayEqual(a,b)
{
    console.log(a,b);
    a.sort()
    b.sort()
    return a.join('')===b.join('')
}

export function useConversations()
{
    return useContext(ConversationsContext)
}

/*
idList: string[]    参与对话的id列表

senderId: string            消息发送者id
text: string                消息内容
message: {senderId,text}    消息对象
messages: message[]

conversation: {idList,messages}  对话对象
*/

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

    const sendMessage=(idList,text)=>
    {
        const senderId=id
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
                        idlist:conversation.idList,
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
    }

    //原来的conversations中每个对话对象只有id列表和消息列表，现在希望加入name字段
    const formattedConversations=conversations.map((conversation,index)=>
    {
        const contactList=conversation.idList.map(id=>contacts.find(contact=>(contact.id===id)))
        const messages=conversation.messages.map((message)=>
        {
            const sender=contacts.find(contact=>(contact.id===message.senderId))//找到senderId对应的联系人
            return {
                senderId:sender.id,
                senderName:sender.name,//新加入
                text:message.text,
                fromMe:(id===sender.id)//新加入
            }
        })
        const selected=index===selectConversationIndex
        return {contactList,messages,selected}//构造出新的conversations对象
    })

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
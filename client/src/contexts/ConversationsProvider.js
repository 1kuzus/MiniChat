import React,{useContext,createContext,useState,useEffect,useCallback} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {useContacts} from './ContactsProvider'
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
    const socket=useSocket()
    const [conversations,setConversations]=useLocalStorage('conversations',[])
    const [selectConversationIndex,setSelectConversationIndex]=useState(0)

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
        socket.emit('send-message',{idList,text})
        addMessageToConversation(id,idList,text)
    }

    useEffect(()=>
    {
        if(!socket) return
        socket.on('receive-message',addMessageToConversation)
        return ()=>socket.off('receive-message')
    },[socket,addMessageToConversation])

    //原来的conversations中每个对话对象只有id列表和消息列表，现在希望加入name字段
    const formattedConversations=conversations.map((conversation,index)=>
    {
        // //从联系人列表中查询id，假如发消息的人还没有被添加进contact列表，就用
        // const contactList=conversation.idList.map(id=>contacts.find(contact=>(contact.id===id))||{id:id,name:id})
        const messages=conversation.messages.map((message)=>
        {
            const senderId=message.senderId
            const sender=contacts.find(contact=>(contact.id===senderId))||{id:senderId,name:senderId}//找到senderId对应的联系人
            //如果senderId是登录账号，则contacts不会包含此id，sender为undefined
            const senderName=(sender&&sender.name)||'You'//如果sender是登录账号，设名称为You
            return {
                senderId,
                senderName,//新加入
                text:message.text,
                fromMe:(id===message.senderId)//新加入
            }
        })
        const selected=index===selectConversationIndex
        console.log({contactList,messages,selected});
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
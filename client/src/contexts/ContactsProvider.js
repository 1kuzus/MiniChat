import React,{useContext,createContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext=createContext()

export function useContacts()
{
    return useContext(ContactsContext)
}

export function ContactsProvider(props)
{
    const {children}=props
    const [contacts,setContacts]=useLocalStorage('contacts',[])
    
    const createContact=(id,name)=>
    {
        setContacts((prevContacts)=>[...prevContacts,{id,name}])
    }

    return (
        <ContactsContext.Provider value={{contacts,createContact}}>
            {children}
        </ContactsContext.Provider>
    )
}
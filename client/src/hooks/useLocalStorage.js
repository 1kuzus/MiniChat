import {useEffect,useState} from 'react'

const PREFIX='mini-chat-'

export default function useLocalStorage(key,initialValue)
{
    const [val,setVal]=useState(()=>
    {
        const jsonVal=localStorage.getItem(PREFIX+key)
        if (jsonVal!=null)
        {
            return JSON.parse(jsonVal)
        }
        if(typeof initialValue==='function')
        {
            return initialValue()
        }
        else
        {
            return initialValue
        }
    })

    useEffect(()=>
    {
        localStorage.setItem(PREFIX+key,JSON.stringify(val))
    },[key,val])

    return [val,setVal]
}
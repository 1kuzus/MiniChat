import React,{useRef} from 'react'
import {Container,Button,Form} from 'react-bootstrap'
import {v4 as uuidV4} from 'uuid'
import './Login.css'

export default function Login(props)
{
    const {setId}=props
    const idRef=useRef()

    const handleSubmit=(evt)=>
    { 
        evt.preventDefault()
        setId(idRef.current.value)
    }

    const createNewId=()=>
    {
        setId(uuidV4().slice(-12,-1))
    }

    return (
        <Container className="d-flex align-items-center" style={{height:'100vh'}}>
            <Form className="w-100" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Enter Your ID</Form.Label>
                    <Form.Control type="text" ref={idRef} required/>
                </Form.Group>
                <Button className="login-btn" type="submit">Login</Button>
                <Button className="login-btn" onClick={createNewId} variant="secondary">Create a new ID</Button>
            </Form>
        </Container>
    )
}
import React,{useRef} from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {v4 as uuidV4} from 'uuid'
import './Login.css'

export default function Login(props)
{
    const idRef=useRef()
    const {setId}=props

    const handleSubmit=(evt)=>
    { 
        evt.preventDefault()
        setId(idRef.current.value)
    }

    const createNewId=()=>
    {
        setId(uuidV4())
    }

    return (
        <Container className="d-flex align-items-center" style={{height:'100vh'}}>
            <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group>
                    <Form.Label>Enter Your ID</Form.Label>
                    <Form.Control type="text" ref={idRef} required/>
                </Form.Group>
                <Button type="submit" className="login-btn">Login</Button>
                <Button onClick={createNewId} variant="secondary" className="login-btn">Create a new ID</Button>
            </Form>
        </Container>
    )
}
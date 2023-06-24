import React from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';

export default function Login()
{
    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>Enter Your Id</Form.Label>
                    <Form.Control type='text'>123</Form.Control>
                </Form.Group>
            </Form>
        </Container>
    )
}

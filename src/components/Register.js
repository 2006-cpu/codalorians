import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import {callApi} from '../api'


const RegisterComponent = (props) => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const {token, setToken, user, setUser} = props;

    
    const registerHandler = async (event) => {
        try {
            event.preventDefault();

            const response = await axios.post(`/api/users/register`, {username, password})

            const {data} = response;
            console.log("here is the response:", response)
            if(data) {
                console.log("Here is the data:", data.token);
                setUsername('');
                setPassword('');

                console.log(`Welcome ${username}`)
                console.log(`Welcome ${password}`)
                localStorage.setItem('token', data.token);
                setToken(data.token);

                const user = await callApi(
                    {token: data.token, url:'/api/users/me'}
                )
                if(user && user.username) {
                    console.log("We have successfully created an account!!!");
                }
            }


        } catch(error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if(token) {
        setUser(user);
        }
    }, []);

    return <> 
       
       <Form onSubmit={registerHandler}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={(event) => {setUsername(event.target.value)}} placeholder="Enter Username" />
                <Form.Text className="text-muted">
                Please Create Your Username
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(event) => {setPassword(event.target.value)}}placeholder="Password" />
                <Form.Text className="text-muted">
                Please Create Your Password
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Create
            </Button>
        </Form>
    </>

}

export default RegisterComponent;
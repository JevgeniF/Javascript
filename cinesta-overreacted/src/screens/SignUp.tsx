import React, {SyntheticEvent, useState} from 'react';
import FormContainer from "../components/FormContainer";
import {Button, Form} from "react-bootstrap";
import {RouteComponentProps} from "react-router-dom";
import {useDispatch} from "react-redux";
import {signUp} from "../actions/userAction";

interface Props {
    history: RouteComponentProps['history']
}

const SignUp = ({history}: Props) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        // @ts-ignore
        dispatch(signUp(firstName, lastName, email, password))

        console.log('submitHandler: SignUp')
        history.push('/')
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form className="py-5"
                  onSubmit={submitHandler}>
                <Form.Group className="mb-3 my-3" controlId="firstName">
                    <Form.Control type="firstName" placeholder="Your name"
                                  value={firstName}
                                  onChange={e => setFirstName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3 my-3" controlId="lastName">
                    <Form.Control type="lastName" placeholder="Your last name"
                                  value={lastName}
                                  onChange={e => setLastName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3 my-3" controlId="email">
                    <Form.Control type="email" placeholder="Your email"
                                  value={email}
                                  onChange={e => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3 my-3" controlId="password">
                    <Form.Control type="password" placeholder="Password"
                                  value={password}
                                  onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" className="mb-3 my-3">
                    Sign Up
                </Button>
            </Form>
        </FormContainer>
    )
}

export default SignUp;

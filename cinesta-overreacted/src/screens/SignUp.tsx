import React, {SyntheticEvent, useEffect, useState} from 'react';
import ContentContainer from "../components/ContentContainer";
import {Button, Form} from "react-bootstrap";
import {RouteComponentProps} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signUp} from "../actions/userAction";
import {RootState} from "../store/store";
import {UserState} from "../reducers/userReducer";

interface Props {
    history: RouteComponentProps['history']
}

const SignUp = ({history}: Props) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const userSign = useSelector<RootState, UserState>(state => state.userSign)
    const {user} = userSign

    useEffect(() => {
        console.log(user)
        if (user !== null && user !== undefined && user.name) {
            history.push('/')
        }
    }, [user, history])

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        // @ts-ignore
        dispatch(signUp(firstName, lastName, email, password))

        console.log('submitHandler: SignUp')
    }

    return (
        <ContentContainer>
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
        </ContentContainer>
    )
}

export default SignUp;

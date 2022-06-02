import {SyntheticEvent, useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import {RouteComponentProps} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {signIn} from "../actions/userAction";
import {RootState} from "../store/store";
import {UserState} from "../reducers/userReducer";

interface Props {
    history: RouteComponentProps['history']

}
const SignIn = ({history}: Props) => {

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
        dispatch(signIn(email, password))

        console.log('submitHandler: SignIn')
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form className="py-5"
                  onSubmit={submitHandler}>
                <Form.Group className="mb-3 my-3" controlId="email">
                    <Form.Control type="email" placeholder="Enter email"
                                  value={email}
                                  onChange={e => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3 my-3" controlId="password">
                    <Form.Control type="password" placeholder="Password"
                                  value={password}
                                  onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" className="mb-3 my-3">
                    Sign In
                </Button>
            </Form>
        </FormContainer>
    )
}

export default SignIn;

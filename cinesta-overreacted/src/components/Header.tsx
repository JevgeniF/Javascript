import {SyntheticEvent, useEffect, useState} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {signOut} from "../actions/userAction";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {UserState} from "../reducers/userReducer";
import {useHistory} from "react-router-dom";
import {getSubscriptions} from "../actions/subscriptionAction";
import {SubscriptionState} from "../reducers/subscriptionReducer";
import {getUserSubscription} from "../actions/userSubscriptionAction";
import {getPaymentDetails} from "../actions/paymentDetailsAction";
import {UserSubscriptionState} from "../reducers/userSubscriptionReducer";
import {PaymentDetailsState} from "../reducers/paymentDetailsReducer";

const Header = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [accountRequest, setAccountRequest] = useState(false)

    const userSign = useSelector<RootState, UserState>(state => state.userSign)
    const {user} = userSign
    const firstName = user ? user.name : null

    const sub = useSelector<RootState, SubscriptionState>(state => state.subscription)
    let {subscriptions} = sub

    const userSub = useSelector<RootState, UserSubscriptionState>(state => state.userSubscription)
    const {userSubscription} = userSub

    const paymentDetails = useSelector<RootState, PaymentDetailsState>(state => state.paymentDetails)
    const {payment} = paymentDetails

    useEffect(() => {
        if (subscriptions !== null && subscriptions !== undefined && subscriptions[0] && !accountRequest) {
            history.push('/subscribe')
        }

    }, [subscriptions, history, userSubscription, payment, accountRequest])

    const signOutHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(signOut())
        console.log('signOutHandler: Signed out')
        history.push('/')
    }

    const subscribeHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        setAccountRequest(false)
        // @ts-ignore
        dispatch(getUserSubscription())
        // @ts-ignore
        dispatch(getPaymentDetails())
        // @ts-ignore
        dispatch(getSubscriptions())
    }

    const accountHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        setAccountRequest(true)
        // @ts-ignore
        dispatch(getUserSubscription())
        // @ts-ignore
        dispatch(getPaymentDetails())
        history.push('/account')
    }

    return (
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">Cinesta</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    {firstName ? <Nav className="ms-auto">
                            <Nav.Link onClick={subscribeHandler}>Subscription</Nav.Link>
                            <Nav.Link onClick={accountHandler}>Account</Nav.Link>
                            <Nav.Link onClick={signOutHandler} href="/">Sign Out</Nav.Link>
                        </Nav>
                        : <Nav className="ms-auto">
                            <Nav.Link href="/signin">Sign In</Nav.Link>
                            <Nav.Link href="/signup">Sign Up</Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;

import React, {SyntheticEvent, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {UserState} from "../reducers/userReducer";
import {Button, Card, Col, Row} from "react-bootstrap";
import {UserSubscriptionState} from "../reducers/userSubscriptionReducer";
import moment from "moment";
import {PaymentDetailsState} from "../reducers/paymentDetailsReducer";
import {deleteUserSubscription, getUserSubscription} from "../actions/userSubscriptionAction";
import {useHistory} from "react-router-dom";
import {getSubscriptions} from "../actions/subscriptionAction";
import {SubscriptionState} from "../reducers/subscriptionReducer";
import {deletePaymentDetails} from "../actions/paymentDetailsAction";

const Account = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const userSign = useSelector<RootState, UserState>(state => state.userSign)
    const { user } = userSign
    const firstName = user ? user.name : null
    const lastName = user ? user.surname : null
    const email = user ? user.email : null

    const userSub = useSelector<RootState, UserSubscriptionState>(state => state.userSubscription)
    const { userSubscription } = userSub
    const subscriptionName = userSubscription && userSubscription.subscription ? userSubscription.subscription.naming : null
    const expirationDateTime = userSubscription ? Date.parse(userSubscription.expirationDateTime): Date.now()
    const subscriptionValidity = moment.utc(expirationDateTime).local().format('DD-MM-YYYY')

    const paymentDet = useSelector<RootState, PaymentDetailsState>(state => state.paymentDetails)
    const { payment } = paymentDet
    const cardNumber = payment && payment.cardNumber ? payment.cardNumber.slice(0, 4) + ' **** **** ****' : null

    const sub = useSelector<RootState, SubscriptionState>(state => state.subscription)
    const { subscriptions } = sub

    useEffect(() => {
        if (subscriptions !== null && subscriptions !== undefined && subscriptions[0]) {
            history.push('/subscribe')
        }
    }, [subscriptions, history])

    const unsubscribeHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(deleteUserSubscription(userSubscription.id))
        console.log('unsubscribeHandler: subscription deleted')
    }

    const subscribeHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(getUserSubscription())
        // @ts-ignore
        dispatch(getSubscriptions())
    }

    const removalHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(deletePaymentDetails(payment.id))
    }

    return (
        <div className="py-5">
            <Row>
                <Col>
                    <Card className="h-100">
                        <Card.Header>Account</Card.Header>
                        <Card.Body>
                            {firstName ?
                                <>
                                <Card.Title>User: {firstName} {lastName} </Card.Title>
                                <Card.Text>
                                    Account: {email}
                                </Card.Text>
                                </>
                                : <></>
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="h-100">
                        <Card.Header>Subscription</Card.Header>
                        <Card.Body className="d-flex flex-column">
                            {expirationDateTime > Date.now() ?
                                <>
                                    <Card.Title>Subscription: {subscriptionName} </Card.Title>
                                    <Card.Text>
                                        Your subscription is valid till  {subscriptionValidity}
                                    </Card.Text>
                                    <Button variant="primary" className="mt-auto" onClick={unsubscribeHandler}>
                                        Unsubscribe</Button>
                                </>
                                : <>
                                    <Card.Title>Subscription: not subscribed</Card.Title>
                                    <Card.Text>
                                        Your have no any valid subscriptions
                                    </Card.Text>
                                    <Button variant="primary" className="mt-auto" onClick={subscribeHandler}>
                                        Subscribe</Button>
                                </>
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="h-100">
                        <Card.Header>Payment</Card.Header>
                        <Card.Body className="d-flex flex-column">
                        {cardNumber ?
                            <>
                            <Card.Title>Your card: {cardNumber}</Card.Title>
                            <Card.Text>
                                You can remove card if you no longer require it.
                            </Card.Text>
                            <Button variant="primary" className="mt-auto" onClick={removalHandler}>Remove card</Button>
                        </>
                        : <>
                                <Card.Title>You have no stored cards</Card.Title>
                                <Card.Text>
                                    No need to add any till subscription renewal.
                                </Card.Text>
                            </>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Account;

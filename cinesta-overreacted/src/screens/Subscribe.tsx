import React, {SyntheticEvent, useState} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {SubscriptionState} from "../reducers/subscriptionReducer";
import ContentContainer from "../components/ContentContainer";
import {useHistory} from "react-router-dom";
import PaymentService from "../services/PaymentService";
import SubscriptionService from "../services/SubscriptionService";
import {PaymentDetailsState} from "../reducers/paymentDetailsReducer";


const Subscribe = () => {

    const history = useHistory()

    const sub = useSelector<RootState, SubscriptionState>(state => state.subscription)
    const { subscriptions } = sub

    const paymentDetails = useSelector<RootState, PaymentDetailsState>(state => state.paymentDetails)
    const { payment } = paymentDetails

    const [subscriptionIndex, setSubscriptionIndex] = useState(-1)
    const [cardNumber, setCardNumber] = useState('')
    const [cardValidityDate, setCardValidityDate] = useState('')
    const [securityCode, setSecurityCode] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


    const subscriptionCards = []
    for (let i = 0; i < subscriptions.length; i++) {
        subscriptionCards.push(
            <Col key={i}>
            <Card className="h-100">
                <Card.Header>{subscriptions[i].naming}</Card.Header>
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{subscriptions[i].description}</Card.Title>
                    <Card.Text>{subscriptions[i].profilesCount} profiles</Card.Text>
                    <Card.Text>{subscriptions[i].price} EUR</Card.Text>
                    <Button variant="primary" className="mt-auto" onClick={() => setSubscriptionIndex(i)}>
                        Select</Button>
                </Card.Body>
            </Card>
            </Col>
        )
    }

    const declineHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        history.push('/')
    }

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        const dateRegex = /^((0[1-9])|(1[0-2]))\/((2022)|(20[2-3]\d))$/
        const cvcRegex = /^\d{3}$/
        const date = new Date(Number(cardValidityDate.slice(3)), Number(cardValidityDate.slice(0, 2)))
        let cardName = ''
        if(!payment.cardNumber) {
            if (cardNumber.length !== 16) {
                setError(true)
                setErrorMessage('Please check card number length')
            } else if (!(cardNumber.startsWith('5') || cardNumber.startsWith('2') || cardNumber.startsWith('4')
                || cardNumber.startsWith('3'))) {
                setError(true)
                setErrorMessage('Card is not supported')
            } else if (!dateRegex.test(cardValidityDate)) {
                setError(true)
                setErrorMessage('Date format must be MM/YYYY')
            } else if (date <= new Date(Date.now())) {
                setError(true)
                setErrorMessage('Card validity passed')
            } else if (!(cvcRegex.test(securityCode))) {
                setError(true)
                setErrorMessage('Card security code is wrong format')
            } else {
                setError(false)
                if (cardNumber.startsWith('5') || cardNumber.startsWith('2')) {
                    cardName = 'Mastercard'
                } else if (cardNumber.startsWith('4')) {
                    cardName = 'Visa'
                } else if (cardNumber.startsWith('3')) {
                    cardName = 'AmericanExpress'
                }

                const dateUtc = date.toISOString()

                const response = await PaymentService.PostPaymentDetails(cardName, cardNumber, dateUtc, securityCode)
                if (response === 201) {
                    const resSub = await SubscriptionService.PostUserSubscription(subscriptions[subscriptionIndex])
                    if (resSub === 201) {
                        history.push('/')
                    }
                }
            }
        } else {
            const resSub = await SubscriptionService.PostUserSubscription(subscriptions[subscriptionIndex])
            if (resSub === 201) {
                history.push('/')
            }
        }
    }

    return (
        <div className="py-5">

                <Row>
                    {subscriptionCards}
            </Row>
                {subscriptionIndex >= 0 ?
                    <ContentContainer>
                        <Card className="h-100">
                            <Card.Header>Payment details</Card.Header>
                            <Card.Body className="d-flex flex-column">
                                {error ? <Card.Text className="error">{errorMessage}</Card.Text> : <></>}
                                <Form className="d-flex flex-column" onSubmit={submitHandler}>
                                    {payment.cardNumber ? <><Card.Title>Card number
                                            is {payment.cardNumber.slice(0, 4)} **** **** ****</Card.Title></> :
                                        <>
                                            <Form.Group className="mb-3 my-3 mt-auto" controlId="cardNumber">
                                                <Form.Control type="cardNumber"
                                                              placeholder="Enter your credit card number"
                                                              value={cardNumber}
                                                              onChange={e => setCardNumber(e.target.value)}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3 my-3 mt-auto" controlId="cardValidityDate">
                                                <Form.Control type="cardValidityDate"
                                                              placeholder="Card validity (MM/YYYY)"
                                                              value={cardValidityDate}
                                                              onChange={e => setCardValidityDate(e.target.value)}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3 my-3 mt-auto" controlId="securityCode">
                                                <Form.Control type="securityCode" placeholder="cvc/cvv"
                                                              value={securityCode}
                                                              onChange={e => setSecurityCode(e.target.value)}/>
                                            </Form.Group>
                                        </>
                                    }
                                    <Button variant="primary" type="submit" className="mt-auto mb-3">
                                        Confirm subscription
                                    </Button>
                                    <Button variant="primary" className="mt-auto" onClick={declineHandler}>
                                        Decline
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </ContentContainer> : <></>
                }
        </div>
    )
}

export default Subscribe;

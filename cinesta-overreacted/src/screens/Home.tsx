import React from 'react';
import {Col, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {UserState} from "../reducers/userReducer";

const Home = () => {

    const userSign = useSelector<RootState, UserState>(state => state.userSign)
    const {user} = userSign
    const firstName = user ? user.name : null
    const lastName = user ? user.surname : null


    return (
        <div className="py-5">
            <Row className="text-center">
                <Col className="mb-4">
                    {firstName ? <h1 className="display-2 font-weight-bold mb-3">
                        Welcome, {firstName} {lastName}!
                    </h1> : <><h1 className="display-2 font-weight-bold mb-3">
                        Welcome to Cinesta
                    </h1>
                        <p>The project meant to collect estonian movies as precious part of Estonian culture.</p>
                    </>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default Home;

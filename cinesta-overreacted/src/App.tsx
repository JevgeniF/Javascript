import React from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from 'react-bootstrap'
import {Route} from "react-router-dom"
import Home from "./screens/Home"
import SignIn from "./screens/SignIn"
import SignUp from "./screens/SignUp"
import Account from "./screens/Account";
import Subscribe from './screens/Subscribe'

function App() {

    return (
        <div>
            <Header/>
            <main>
                <Container>
                    <Route path='/' exact component={Home}/>
                    <Route path='/account' component={Account}/>
                    <Route path='/subscribe' component={Subscribe}/>
                    <Route path='/signin' component={SignIn}/>
                    <Route path='/signup' component={SignUp}/>
                </Container>
            </main>
            <Footer/>
        </div>
    )
}

export default App;

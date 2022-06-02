import React from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from 'react-bootstrap'
import {Route} from "react-router-dom"
import Home from "./screens/Home"
import SignIn from "./screens/SignIn"
import SignUp from "./screens/SignUp"

function App() {

    return (
        <div>
            <Header/>
            <main>
                <Container>
                    <Route path='/' exact component={Home}/>
                    <Route path='/signin' component={SignIn}/>
                    <Route path='/signup' component={SignUp}/>
                </Container>
            </main>
            <Footer/>
        </div>
    )
}

export default App;

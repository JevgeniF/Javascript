import {SyntheticEvent} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {signOut} from "../actions/userAction";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {UserState} from "../reducers/userReducer";

const Header = () => {

    const dispatch = useDispatch()
    const userSign = useSelector<RootState, UserState>(state => state.userSign)
    const {user} = userSign
    const firstName = user ? user.name : null

    const signOutHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(signOut())
        console.log('signOutHandler: Signed out')
    }

    return (
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">Cinesta</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    {firstName ? <Nav className="ms-auto">
                            <Nav.Link onClick={signOutHandler}>Sign Out</Nav.Link>
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

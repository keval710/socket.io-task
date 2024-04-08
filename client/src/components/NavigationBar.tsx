import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom';

const NavigationBar = () => {

    return (
        <>
            <Navbar expand="lg" className="bg-dark navbar-dark" style={{ fontSize: "18px", padding: 15 }}>
                <Container>
                    <Navbar.Brand as={Link} to="/" style={{ paddingRight: "35%" }}>Socket Task</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Nav.Link as={Link} to="/signin" className="nav-link">
                                <Button variant="primary" style={{ fontSize: "18px" }}>Login</Button>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/signup" className="nav-link" style={{ marginLeft: 15 }}>
                                <Button variant="primary" style={{ fontSize: "18px" }}>Register</Button>
                            </Nav.Link>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </>
    );
}

export default NavigationBar;

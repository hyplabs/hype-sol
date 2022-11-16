import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { useCookies } from "react-cookie";
import UserManager from "./UserManager"


function handleCreateUser(event,navigate) {
    event.preventDefault();
    navigate("/registration");
    return false;
}

function handleFormOnchange(event,obj) {
    event.preventDefault();

}

function handleFormSubmit(event,messageCenter,navigate) {
    event.preventDefault();

    let userManager = UserManager();
    let  formData = {
        "userName" : document.getElementById("fUsername").value, 
        "password1" : document.getElementById("fPassword").value, 
        "password2" : document.getElementById("fPassword").value}

    if (userManager.loginUser(formData))
    {
        messageCenter.show("Logging in","spinner");
        setTimeout( () => {messageCenter.hide(); navigate("/loginInformation");  },1000);
    }
    else
    {
        messageCenter.show("could not sign in","danger");
    }

}
/**
 * 
         <Modal 
            show={showSpinner} 
            onHide={()=>messageCenter.hide(false)} 
            centered 
            size="sm" 
            animation={false}
        >
            <Modal.Body>
                <center> 
                <Spinner className="mb-5 mt-5" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                </center>
            </Modal.Body>                            
        </Modal>

 */
function SignInPage({messageCenter}) {
    const navigate = useNavigate();
    // const [cookies, setCookie, removeCookie] = useCookies(["user_session"]);
    // const [showSpinner,setShowSpinner] = useState(false);
    
    return( 
    
        <>
        <Container>
            <Row>
            <Col xs={1} sm={1} md={4} lg={4} ></Col>
            <Col xs={10} sm={10} md={4} lg={4} >
                <h2><p>Sign In</p></h2>
                <p>Fill out your information to log in.</p>    
                <Card>
                    <Card.Body>
                        <Tabs 
                            defaultActiveKey="view_only"
                            className="mb-3" 
                        >
                            <Tab eventKey="view_only" title="Log in " >
                                <Form>
                                    <Form.Group className="mb-3" controlId="fUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            placeholder="username"
                                            onChange={(event)=>handleFormOnchange(event)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="fPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            placeholder="password"
                                            onChange={(event)=>handleFormOnchange(event)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" 
                                                type="submit" 
                                                onClick={(event)=>handleFormSubmit(event,messageCenter,navigate)}
                                        >
                                            Log in
                                        </Button>
                                    </Form.Group>
                                    <Form.Group>
                                        <p>or you can <a href="/registration" onClick={(event)=>handleCreateUser(event,navigate)}>create a new user</a>.</p>
                                    </Form.Group>   
                                </Form>
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={1} sm={1} md={4} lg={4}></Col>  
            </Row>    
        </Container>
        </>
    
    
    );
}

export default SignInPage;
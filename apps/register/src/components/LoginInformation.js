import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import UserManager from "./UserManager"
import {copyToClipboardButton} from "./UserInformationPage"


function handleLogOut(event, userManager, navigate) {
    event.preventDefault();
    userManager.logoutUser();
    navigate("/");
}

function loggedInStatus(user) {

    if(user) {
        return("You are logged in.");
    } else {
        return("You are logged out.");
    }
}


function LoginInformation({messageCenter}) {

    const navigate=useNavigate();
    let userManager = UserManager();
    let user = userManager.getCurrentUser();
    //alert(JSON.stringify(messageCenter));
    return(  
        <Container>
          <Row>
            <Col xs={1} sm={1} md={4} lg={4} ></Col>
            <Col xs={10} sm={10} md={4} lg={4} >
              <h1>User Information</h1>  
              <p>{loggedInStatus(user)}</p>
              <Card className="mb-3">
                 <Card.Body>  
                    <p>Please copy and save your user information.</p>
                        <Button 
                            type="button" 
                            variant="light"
                            onClick={(event) => copyToClipboardButton(event,user,messageCenter)}
                        >
                            <span><FontAwesomeIcon icon={faCopy} /></span>
                        </Button> 

                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>User name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder={user ? user.userName : "" }
                                    readOnly
                                />
                            </Form.Group>                                
                             
                            <Form.Group className="mb-3" controlId="formObjectId">
                                <Form.Label>object-id</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder={user ? user.object_id : "" }
                                    readOnly
                                />
                            </Form.Group>  

                            <Button 
                                variant="primary" 
                                type="button"
                                onClick={(event)=>handleLogOut(event,userManager,navigate)}
                            >
                                Log out
                            </Button>

                        </Form>                  
                      
                </Card.Body> 
              </Card>
  
            </Col>
            <Col xs={1} sm={1} md={4} lg={4} ></Col>
          </Row> 
        </Container>   
    
    );
}

export default LoginInformation;
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
//import { faCheck } from '@fortawesome/free-solid-svg-icons';
import UserManager from "./UserManager"


async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}

export function copyToClipboardButton(event,user,messageCenter) {
    event.preventDefault();
    const clipboardObject= {
        "username": user.userName,  
        "object_id": user.object_id,
    };
    const clipboardText=JSON.stringify(clipboardObject,null,2);
    copyTextToClipboard(clipboardText);
    messageCenter.show("Copied","success",1000);
}

function closeButton(event,messageCenter,navigate) {
    event.preventDefault();
    messageCenter.hide();
    navigate('/loginInformation');
}

function UserInformationPage({messageCenter}) {

    const navigate=useNavigate();
    let userManager = UserManager();
    let user = userManager.getCurrentUser();
    return(
        <Container>
            <Row>
            <Col xs={1} sm={1} md={4} lg={4} ></Col>
            <Col xs={10} sm={10} md={4} lg={4} >
                <h1>User Information</h1>
                <p>Thank you for signing up!</p>
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
                                    placeholder={user.userName}
                                    readOnly
                                />
                            </Form.Group>                                
                            <Form.Group className="mb-3" controlId="formObjectId">
                                <Form.Label>object-id</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder={user.object_id}
                                    readOnly
                                />
                            </Form.Group>  


                            <Button 
                                variant="primary" 
                                type="button"
                                onClick={(event) => closeButton(event,messageCenter,navigate)}
                            >
                                Close
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

export default UserInformationPage;
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function goBackToMainPage(event,navigate) {
    event.preventDefault();
    navigate('/');
}


function TermsOfService() {
    
    const navigate = useNavigate();
    
    return(
    
        <Container>
            <Row> 
            <Col xs={1} sm={1} md={3} lg={3} ></Col>
            <Col xs={10} sm={10} md={6} lg={6} >    
                <h1>Terms Of Service</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <Button variant="primary" type="button" onClick={(event) => goBackToMainPage(event,navigate)}>
                    Return to Signup Form
                </Button>
            </Col>
            <Col xs={1} sm={1} md={3} lg={3} ></Col>
            </Row>
        </Container>
    
    
    
    
    );

}

export default TermsOfService;
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

function UserNavbar(){

    return(
            <Navbar>
                <Container>
                    <Navbar.Brand href="#home">
                     <h2 style={{display:"inline"}}> Hype Labs</h2>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                      <Navbar.Text>
                      </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    );
}

export default UserNavbar;
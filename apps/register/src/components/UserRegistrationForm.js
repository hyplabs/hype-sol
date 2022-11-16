import React from 'react';
import { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import UserManager from "./UserManager"

let formOps = undefined;

export function FormOps()
{
    if  (formOps) return formOps;
    function submitForm (event, formData,messageCenter, onSuccess) {
        // TODO -- any form level stuff goes here
        // NOTE -- User / Data level stuff lives in UserManager (seperating GUI | data ops)
        event.preventDefault();
        if (validateUser(formData,messageCenter) == false) // Shows error messages if required
            return false;

        let userManager = UserManager();
        if (userManager.registerUser(formData))
        {
            onSuccess();
            return true;
        }
        else
        {
            messageCenter.show("Could not register this user","danger");
        }
        return false;
    }

    function saveUserOnChange(event,messageCenter,state) {
        event.preventDefault();
        //TODO - Do anything with the user data as it changes on the form. Or not.
    }

    function validateUser(formData,messageCenter) {
        let errors = [
            ["Your User Name must be at least 6 characters long",formData.userName.length<=5],
            ["Sorry, something doesn’t seem right -- passwords do not match"+formData.password1+formData.password2,formData.password1 !== formData.password2 ],
            ["Your Password must be at least 6 characters long", formData.password1.length<=5]];
        for (const msg_condition of errors) {
            if(msg_condition[1] ) {
                messageCenter.show(msg_condition[0],"danger");
                return false;    
            }    
        }
        return true;
    }
    formOps = {submitForm,saveUserOnChange,validateUser} 
    return formOps;
}


function UserRegistrationForm({messageCenter}) {
    const formValues = () =>{
        if (document.getElementById("formPassword1"))
            return {"userName" : document.getElementById("formUserName").value, "password1" : document.getElementById("formPassword1").value, "password2" : document.getElementById("formPassword2").value}
        else
            return {"userName" : "", "password1" : "", "password2" : ""}
    };
    const navigate = useNavigate();
    return (
        <>

        <Container>
            <Row>
            <Col xs={1} sm={1} md={4} lg={4} ></Col>
            <Col xs={10} sm={10} md={4} lg={4} >
                <h1>Register a User</h1>
                <Card className="mb-3">
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formUserName">
                                <Form.Label>User name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter user name"
                                    onChange={(event) => FormOps().saveUserOnChange(event,formValues ())}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password"
                                    onChange={(event) => FormOps().saveUserOnChange(event,formValues ())}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword2">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Reenter password" 
                                    onChange={(event) => FormOps().saveUserOnChange(event,formValues ())}
                                    isInvalid={formValues().password1!==formValues().password2}
                                />
                            </Form.Group>        
                            <Button variant="primary" type="submit" onClick={(event) => FormOps().submitForm(event,formValues(),messageCenter,()=> navigate("/information"))}>
                                Sign up
                            </Button>
                            <Form.Group>
                                        <p>or you can <a href="/registration" onClick={(event)=>{event.preventDefault();navigate("/signIn");}}>go to sign-in.</a>.</p>
                            </Form.Group>                             
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={1} sm={1} md={4} lg={4} ></Col>
            </Row>
        </Container>
        </>
    );
}
export default UserRegistrationForm;
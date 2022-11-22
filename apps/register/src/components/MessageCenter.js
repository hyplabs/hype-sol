import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

let messageCenter = undefined;
function MessageCenterSetup() {
    
  const [ showMessageType, setShowMessageType ] = useState(false);
  const [ messageContent, setMessageContent ] = useState("");
  const [ messageTitle, setMessageTitle ] = useState("");     
    
  messageCenter = {};

  messageCenter.showMessageType = showMessageType;
  messageCenter.messageContent = messageContent;
  messageCenter.messageTitle = messageTitle;
  
  messageCenter.setShowMessageType = setShowMessageType;
  messageCenter.setMessageContent = setMessageContent;
  messageCenter.setMessageTitle = setMessageTitle;

  messageCenter.show = (msg,type,duration) =>{
    if (duration==undefined)
      duration = 10000;
    messageCenter.setMessageContent(msg);
    messageCenter.setShowMessageType(type);
    setTimeout( () => messageCenter.setShowMessageType(false),duration);
  }
  messageCenter.hide = () =>{
    messageCenter.setShowMessageType(false);
  }

    return messageCenter;
}

function MessageCenter({obj}) {
    const handleCloseModal = () => obj.setShowMessageType(false);    
    return(
            <div>
                <Alert
                    variant="danger" 
                    dismissible 
                    show={obj.showMessageType=="danger"}
                    onClose={() => obj.setShowMessageType(false)}
                >
                    {obj.messageContent}  
                </Alert>
                <Alert 
                    variant="success" 
                    dismissible 
                    show={obj.showMessageType=="success"}
                    onClose={() => obj.setShowMessageType(false)}
                >
                    {obj.messageContent}    
                </Alert>
                <div>
                  <Modal show={obj.showMessageType=="info"} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>{obj.messageTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {obj.messageContent}  
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Modal show={obj.showMessageType=="spinner"} onHide={handleCloseModal} centered size="sm">
                    <Modal.Body>
                        <center> 
                        <Spinner className="mb-5 mt-5" animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        </center>
                    </Modal.Body>                            
                </Modal>                   
                </div>
            </div> 
    );
}
export {MessageCenter,MessageCenterSetup};
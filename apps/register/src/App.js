import './App.css';
import MainFrame from './components/MainFrame'
//import UserRegistrationForm from './components/UserRegistrationForm';
//import UserInformationPage from './components/UserInformationPage';
import React from 'react';
import { useState } from 'react';
import UserNavbar from './components/UserNavbar';
import { MessageCenter, MessageCenterSetup } from './components/MessageCenter';
import { useCookies } from "react-cookie";
import UserManager from "./components/UserManager"

function App() {
    
    let userManager = UserManager();
    userManager.setupCookies (useCookies(["current_user"]));
    const messageCenter = MessageCenterSetup();
    
    return (
        <div className="App">   
            <UserNavbar /> 
            <MessageCenter obj={messageCenter} />
            <MainFrame messageCenter={messageCenter}/>
        </div>
    );
}

export default App;
                
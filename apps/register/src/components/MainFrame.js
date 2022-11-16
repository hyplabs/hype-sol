import React from 'react';
import { Suspense } from "react";
import {
    Route,
    Routes,
    NavLink,
    HashRouter,
    useNavigate     
  } from "react-router-dom";
import UserRegistrationForm from './UserRegistrationForm';
import UserInformationPage from './UserInformationPage';
import TermsOfService from './TermsOfService';
import SignInPage from './SignInPage';
import LoginInformation from './LoginInformation';
import LandingPage from './LandingPage';

function MainFrame({obj, messageCenter}) {

    return(

        <HashRouter>
            <div>
                <Routes>
                    <Route path="/" element={
                        <Suspense fallback={<div>suspense</div>}>
                            <LandingPage />
                        </Suspense>
                    }/>        
                    <Route path="/signIn" element={
                        <Suspense fallback={<div>suspense</div>}>
                            <SignInPage messageCenter={messageCenter} />
                        </Suspense>
                    }/>        
                    <Route path="/registration" element={
                        <Suspense fallback={<div>suspense</div>}>
                            <UserRegistrationForm messageCenter={messageCenter} />
                        </Suspense>
                    }/>
                    <Route path="/information" element={
                        <Suspense fallback={<div>suspense</div>}>
                            <UserInformationPage messageCenter={messageCenter} />
                        </Suspense>
                    }/>
                    <Route path="/loginInformation" element={
                        <Suspense fallback={<div>suspense</div>}>
                            <LoginInformation messageCenter={messageCenter}/>
                        </Suspense>
                    }/>                                                
                </Routes>
            </div>
        </HashRouter>
                
    );

}

export default MainFrame;
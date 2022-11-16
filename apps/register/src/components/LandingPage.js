import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import UserManager from "./UserManager"

function LandingPage() {
    const navigate = useNavigate();
    useEffect( ()=>{   
        if (UserManager().getCurrentUser()) {    
            navigate("/loginInformation");               
        } else {
            navigate("/signIn");
        }    
    });
    
    return (
        <>
        </>    
    );
}

export default LandingPage;
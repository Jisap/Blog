import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./register.css";

export const Register = () => {

    const [ username, setUserName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState( false );

    const handleSubmit = async( e ) =>{
        e.preventDefault();
        try {
            setError( false );
            const res = await axios.post("/auth/register", { username, email, password }); // Petición al backend de registro de un usuario
            res.data && window.location.replace("/login")                                  // Si fue bien redirección al login para que entre en la app 
        
        } catch (error) {
            console.log( error );
            setError( true )
        }
    }

    return (
        <div className="register">

        <span className="registerTitle">Register</span>
            
            <form className="registerForm" onSubmit={ handleSubmit }>
            
                <label>Username</label>
                <input 
                    type="text" 
                    placeholder="Enter your username" 
                    className="registerInput"
                    onChange={ e => setUserName( e.target.value ) }
                    />
                <label> Email</label>
                <input 
                    type="text" 
                    placeholder="Enter your email" 
                    className="registerInput"
                    onChange={ e => setEmail( e.target.value ) }
                    />
                <label> Password</label>
                <input 
                    type="password" 
                    placeholder="Enter your password" 
                    className="registerInput"
                    onChange={ e => setPassword( e.target.value ) }
                    />
            
                <button 
                    className="registerButton"
                    type="submit">
                        Register
                </button>
            
            </form>
            <button className="registerLoginButton">
                <Link className="link" to="/login">Login</Link>
            </button>
            { error && <span style={{color:"red", marginTop:"10px"}}>Algo fue mal</span> }    
        </div>
    )
}

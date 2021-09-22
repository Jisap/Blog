import axios from 'axios';
import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import "./login.css";

export const Login = () => {

    const userRef = useRef();           // Con useRef podemos crear un valor mutable que existe durante la vida útil de la instancia del componente.
    const passwordRef = useRef();       // Creamos dos referencias, una para el user y otra para la password
    const { dispatch, isFetching } = useContext( Context );// Extraemos del context el dispatch para cambiar el estado del usuario que loguea


    const handleSubmit = async( e ) => {                               // Función que maneja la autenticación del usuario 
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });                             // Disparamos la action Login_Start -> user:null, isFetching=true
        try {
            const res = await axios.post("/auth/login",{               // Petición al backend de logueo con las refs de los inputs 
                username: userRef.current.value,
                password: passwordRef.current.value,
            })
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });    // Si hubo resp satisfactoria action -> user: action.payload, isFetching=false
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE" });                       // si hubo error action -> user:null, isFetching=false 
        }
    };

    return (
        <div className="login">

        <span className="loginTitle">Login</span>
            
            <form className="loginForm" onSubmit={ handleSubmit }>
            
                <label>Username</label>
                <input 
                    type="text" 
                    placeholder="Enter your username" 
                    className="loginInput"
                    ref={ userRef }
                />
                
                <label> Password</label> 
                <input 
                    type="password"
                    placeholder="Enter your password" 
                    className="loginInput"
                    ref={ passwordRef }
                />
            
                <button 
                    className="loginButton"
                    type="submit"
                    disabled={ isFetching }>Login
                </button>
            
            </form>
            <button className="loginRegisterButton">
                <Link className="link" to="/register">Register</Link>
            </button>
        </div>
    )
}

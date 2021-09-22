import React, { useContext, useRef, useState } from 'react';
import { Sidebar } from '../../components/sidebar/Sidebar';
import "./settings.css";
import { Context } from '../../context/Context';
import axios from 'axios';

export const Settings = () => {

    const { user, dispatch } = useContext( Context );
    const PF = "http://localhost:5000/images/"

    const [ file, setFile ] = useState( null );
    const [ username, setUsername ] = useState( "" );
    const [ email, setEmail] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ success, setSuccess ] = useState( false );

    const handleSubmit = async( e ) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START"})               // isFetching:true
        const updatedUser = {                           // updateUser contiene las modificaciones del usuario logueado
            userId:user._id,                            // la id del usuario que loguea (context)
            username,                                   // el nuevo nombre
            email,                                      // el nuevo email
            password                                    // y la nueva password
        };
        if( file ){                                     // si se adjunta una imagen
            const data = new FormData();                // creamos data, instancia que recoge el contenido del formulario de la imagen
            const filename = Date.now() + file.name;    // Construimos el nombre de la imagen
            data.append( "name", filename );            // Añadimos a data ese nombre 
            data.append("file", file);                  // y el input del file seleccionado 
            updatedUser.profilePic = filename;          // Añadimos a updateUser el nombre de la foto que se halla seleccionado
            try{
                await axios.post( "/upload", data );    // Hacemos la petición de subida al backend con la data procesada (name y file), 
            }catch( err ){                              // multer necesita el nombre del archivo para realizar el upload al backend
                console.log(err);
            }  
        }
        try{                                                                   // Si todo fue bien
            const res = await axios.put(`/users/${user._id}`, updatedUser);    // Petición de actualización de un usuario con la id del usuario logueado
            setSuccess( true);                                                 // y el contenido actualizado 
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data});            // user: action.payload, isFetching:false,      
        }catch( err ){                                             
            console.log(err);
            dispatch({ type: "UPDATE_FAILURE" });                              // user:state.user, isFetching:false, error:true,
        }
    }

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update your account</span>
                    <span className="settingsDeleteTitle">Delete account</span>
                </div>
                <form className="settingsForm" onSubmit={ handleSubmit }>

                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={ file ? URL.createObjectURL(file) : PF+user.profilePic } alt="" />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon fas fa-user-circle"></i>
                        </label>
                        <input 
                            type="file" 
                            id="fileInput" 
                            style={{ display:"none" }}
                            onChange={ (e) => setFile( e.target.files[0] ) }
                            /> 
                    </div>

                    <label>Username</label>
                    <input 
                        type="text" 
                        placeholder={ user.username } 
                        onChange={ (e) => setUsername( e.target.value )}
                        />

                    
                    <label>Email</label>
                    <input 
                        type="email"
                        placeholder={ user.email }
                        onChange={ (e) => setEmail( e.target.value )}
                         />

                    
                    <label>Password</label>
                    <input 
                        type="password" 
                        onChange={ (e) => setPassword( e.target.value )}
                    />

                    <button 
                        className="settingsSubmit"
                        type="submit"
                        >Update
                    </button>
                    { success && <span style={{ color: "green", textAlign: "center", marginTop:"20px"}}>Profile has been updated</span>}
                </form>
                
            </div>
            <Sidebar />
        </div>
    )
}

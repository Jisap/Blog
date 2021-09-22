import React, { useContext, useState } from 'react';
import "./write.css";
import axios from "axios";
import { Context } from '../../context/Context';

export const Write = () => {

    const [ title, setTitle ] = useState( "" );
    const [ desc, setDesc ] = useState( "" );
    const [ file, setFile ] = useState( null );
    const { user } = useContext( Context );

    const handleSubmit = async( e ) => {
        e.preventDefault();
        const newPost = {                               // newPost es el nuevo post que creamos 
            username:user.username,                     // y contendrá el nombre del usuario que loguea
            title,                                      // el título del post del formulario
            desc,                                       // y la descripción
        };
        if( file ){                                     // si se adjunta una imagen
            const data = new FormData();                // creamos data, instancia que recoge el contenido del formulario de la imagen
            const filename = Date.now() + file.name;    // Construimos el nombre de la imagen
            data.append( "name", filename );            // Añadimos a data ese nombre 
            data.append("file", file);                  // y el input del file seleccionado 
            newPost.photo = filename;                   // Añadimos al newPost el nombre de la foto que se halla seleccionado
            try{
                await axios.post( "/upload", data );    // Hacemos la petición de subida al backend con la data procesada (name y file), 
            }catch( err ){                              // multer necesita el nombre del archivo para realizar el upload al backend
                console.log(err);
            }  
        }
        try{                                                                // Si todo fue bien
            const res = await axios.post(`/posts/${user._id}`, newPost);    // Petición de creación de un nuevo post con la id del usuario logueado
            window.location.replace("/post/" + res.data._id);               // Redirección a la pagina single post de este nuevo post
        }catch( err ){

        }
    }

    return (
        <div className="write">
            { file && (
                <img
                    className="writeImg"
                    src={ URL.createObjectURL( file ) }
                    alt=""
                />
            )}
            <form className="writeForm" onSubmit={ handleSubmit }>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input 
                        type="file" 
                        id="fileInput" 
                        style={{display:"none"}}
                        onChange={ ( e ) => setFile( e.target.files[0] )}
                        />
                    <input 
                        type="text"
                        placeholder="Title"
                        className="writeInput"
                        autoFocus={ true }
                        onChange={ ( e ) => setTitle( e.target.value )}
                        />
                </div>
                <div className="writeFormGroup">
                    <textarea 
                        placeholder="Cuenta tu historia..." 
                        type="text" 
                        className="writeInput writeText"
                        onChange={ ( e ) => setDesc( e.target.value )}>
                    </textarea>
                </div>
                <button 
                    className="writeSubmit"
                    type="submit"
                >
                    Publish
                </button>
            </form>
        </div>
    )
}

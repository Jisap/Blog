import React, { useContext, useEffect, useState } from 'react'
import "./singlePost.css"
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../context/Context'

export const SinglePost = () => {
    const PF = "http://localhost:5000/images/";      // Public folder
    const location = useLocation();                  // Nos devuelve un objeto objeto de ubicación que contiene información sobre la URL actual.   
    const path = (location.pathname.split("/")[2]);  // Seleccionamos el id del post
    const [ post, setPost ] = useState({})           // Establecemos el estado de cada post individualmente
    const { user } = useContext( Context );          // Usamos el estado del usuario logueado   
    const [ title, setTitle ] = useState("");
    const [ desc, setDesc ] = useState("");
    const [ updateMode, setUpdateMode ] = useState( false );

    useEffect(()=>{
        const getPost = async () => {
            const res = await axios.get("/posts/" + path); // Petición get según id del post 
            setPost( res.data );                           // Establecemos el estado del post como venga del backend (res.data)
            setTitle(res.data.title)                       // Hacemos lo mismo con el título y la descripción 
            setDesc(res.data.desc)
        };
        getPost()
    },[path]);                                             // Cada vez que el path de un singlepost cambie se disparará este efecto         

    const handleDelete = async()=> {                  
       try {
           await axios.delete(`/posts/${post._id}`, {      // Para borrar post, petición con la id del post 
               data: {username: user.username},            // y el nombre del usuario logueado en el body 
           });                                             // El segundo parámetro de axios.delete son las opciones y usan {data:{}} 
           window.location.replace("/");                   // y luego redirección al home
       } catch (err) {
           
       }
    }

    const handleUpdate = async() => {
        try {
           await axios.put(`/posts/${post._id}`, {      // Para actualizar post, petición con la id del post 
                username:user.username,                 // y el nombre del usuario logueado en el body
                title,                                  // el nuevo título
                desc                                    // y la nueva descripción
            ,                                           // El segundo parámetro de put.axios es el body de la solicitud
           }); 
           setUpdateMode(false)                         // Ponemos updateMode en false y el singlePost vuelve a su estado inicial pero actualizado
        } catch (err) {
           
       }
    }

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                { post.photo && (
                <img 
                    className="singlePostImg"
                    src={ PF + post.photo } 
                    alt=""
                />     
            )}{
                updateMode ? <input type="text"                         //Si updateMode = true creamos un input para actualizar el contenido del titulo
                                    value={ title }                     //con el valor que venga del backend     
                                    className="singlePostTitleInput"
                                    autoFocus
                                    onChange={ (e) => setTitle( e.target.value )}    // Si cambia el valor del input actualizamos el estado del title
                                    /> 
                                    : (                                             // Sino mostramos el contenido tal como viene del backend

                <h1 className="singlePostTitle">
                    { title }
                    { post.username === user?.username && (  // Si el nombre del usuario que viene con el post = al del usuario logueado, podremos borrar
                        <div className="singlePostEdit">
                            <i className="singlePostIcon far fa-edit"
                                onClick={ () => setUpdateMode( true )}></i> {/* Si hacemos click en el boton de actualizar updateMode = true */}
                            <i className="singlePostIcon far fa-trash-alt"
                                onClick = { handleDelete }></i>
                        </div>
                    )}
                </h1>
                ) 
            }
                
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <Link to={ `/?user=${ post.username }` } className="link">
                         <b>{ post.username }</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">{ new Date(post.createdAt).toDateString() }</span>
                </div>

                { updateMode ? (<textarea                                           // Si update es true abrimos un text-area
                                    className="singlePostDescInput" 
                                    value={ desc }                                  // con el valor inicial que venga del post
                                    onChange={ (e) => setDesc( e.target.value )}    // Si cambia el valor de ese area cambia el estado de desc
                />) : (
                    <p className="singlePostDesc">
                        { desc }
                    </p>
                )}
                { updateMode && (                           // Si update es true se mostrará el boton de actualizar
                    <button className="singlePostButton"
                            onClick={ handleUpdate }>
                        Update
                    </button>

                )}

            </div>
        </div>
    )
}

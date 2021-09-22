import React, { useEffect, useState } from 'react';
import { Header } from '../../components/header/Header';
import { Posts } from '../../components/posts/Posts';
import { Sidebar } from '../../components/sidebar/Sidebar';
import "./home.css";
import axios from "axios";
import { useLocation } from 'react-router-dom';

export const Home = () => {

    const [ posts, setPosts ] = useState([]);       // Inicializamos un estado para posts (posts que se mostrarán)
    const { search } = useLocation();               // Del objeto location desestructuramos la prop search que indica arg 
                                                    // del url de busqueda por autor o categoria si es que lo lleva.

    useEffect(() => {                                       // Al cargar Home o usar los args de busqueda   
        const fetchPost = async() => {                      // haremos una petición a http://localhost:5000/backend/posts
            const res = await axios.get("/posts" + search)  // Obtendremos una respuesta del backend
            setPosts( res.data );                           // Actualizaremos el estado de Posts con esa respuesta             
        }
        fetchPost()
    }, [ search ]);

    return (
        <>
        
            <Header />
            <div className="home">
                <Posts posts={ posts }/>          
                <Sidebar />
            </div> 
        
        </>
    )
}

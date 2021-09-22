import React, { useEffect, useState } from 'react';
import "./sidebar.css";
import aboutme from "../../assets/images/aboutme.jpg";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export const Sidebar = () => {

    const [ cats, setCats ] = useState([]);
    useEffect( () => {
        const getCats = async() => {
            const res = await axios.get("/categories")
            setCats( res.data)
        }
        getCats();
    },[])


    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img className="sidebarImg" src={ aboutme } alt="" />
                <p>lorem ipsum dolor sit amet, consectetur adip, lorem ipsum dolor
                lorem ipsum dolor lorem ipsum dolor sit amet, consectetur adip
                lorem ipsum dolor sit amet, consectetur adip, lorem ipsum dolor
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    { cats.map( (c) => (
                        <Link to={`/?cat=${ c.name }`} className="link" key={c.name + uuidv4()}>
                            <li className="sidebarListItem">{ c.name }</li>
                        </Link>
                    ))}       
                </ul>   
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>  
            </div>
        </div>
    )
}

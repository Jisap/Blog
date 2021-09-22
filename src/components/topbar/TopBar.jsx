import React, { useContext } from 'react';
import "./topbar.css";
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

export const TopBar = () => {

    const { user, dispatch } = useContext( Context );
    const PF = "http://localhost:5000/images/"

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" }); // user: null, isFetching:false
    }

    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter"></i>
                <i className="topIcon fab fa-pinterest-square"></i>
                <i className="topIcon fab fa-instagram-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/">HOME</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/">ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/">CONTACT</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/write">WRITE</Link>
                        </li>
                    <li className="topListItem"
                        onClick={ handleLogout }>{ user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="topRigth">
                {
                    user ? (
                        <Link to="/settings">
                            <img 
                                className="topImg"
                                src={ PF+user.profilePic }
                                alt="" 
                            />
                        </Link>
                    ) : (
                        <ul className="topList">
                            <li className="topListItem">
                                <Link className="link" to="/login">LOGIN</Link>
                            </li>
                            <li>
                                <Link className="link" to="/register">REGISTER</Link>
                            </li>
                        </ul>
                    )
                }
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    );
}

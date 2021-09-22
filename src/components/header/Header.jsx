import React from 'react';
import "./header.css";
import ImgHeader from '../../assets/images/ImgHeader.jpg';

//./assets/images/pexels-italo-melo-2379004.jpg

export const Header = () => {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">React & Node</span>
                <span className="headerTitleLg">Blog</span>
            </div>
            <img className="headerImg" 
                 src={ImgHeader} 
                 alt="" /> 
        </div>
    )
}

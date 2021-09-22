import React from 'react';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { SinglePost } from '../../components/singlePost/singlePost';
import "./single.css";

export const Single = () => {
    return (
        <div className="single">
            <SinglePost />
            <Sidebar />
        </div>
    )
}

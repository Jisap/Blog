import React from 'react';
import { Link } from 'react-router-dom';
import "./post.css";
import imgPost from "../../assets/images/imgPost.jpg"

export const Post = ( { post } ) => {
    const PF = "http://localhost:5000/images/"; // Public folder
    return (
        <div className="post">
            { post.photo ? (
                <img 
                    className="postImg"
                    src={ PF + post.photo } 
                    alt=""
                />

            ) : (
                <img 
                    className="postImg"
                    src={ imgPost } 
                    alt=""
                />

            )}
            <div className="postInfo">
                <div className="postCasts">
                    <span className="postCat">{
                        post.categories.map(
                            (c) => ( 
                                <span className="postCat">{ c.name }</span>

                            )
                        )
                    }</span>
                </div>
                <Link to = { `/post/${ post._id }` } className="link">
                    <span className="postTitle">{ post.title }</span>
                </Link>
                <hr />
                <span className="postDate">{ new Date(post.createdAt).toDateString() }</span>
            </div>
            <p className="postDesc">
                { post.desc }
            </p>
        </div>
    )
}

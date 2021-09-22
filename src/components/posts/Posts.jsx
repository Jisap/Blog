import React from 'react';
import { Post } from '../post/Post';
import "./posts.css";
import { v4 as uuidv4 } from 'uuid';

export const Posts = ({ posts }) => {   // Recibimos los post del backend
    return (
        <div className="posts">
            { posts.map(                                    // Mapeamos los posts y generamos un post por cada elemento
                (p) => (<Post post={p}                      // Al single post le enviamos la prop post correspondiente a toda su información interna    
                              key={ p + uuidv4()}  
                />)  
            )}      
        </div>
    )
}


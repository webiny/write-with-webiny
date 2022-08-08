import React, {useContext} from 'react'
import Image from 'next/image'
import {ProductContext} from "../../lib/context";
import Header from './header';

function Post() {
    // use context consumer to get selected post
    const post = useContext(ProductContext)
    const text = () => {
        const textContent = post.getSelectedPost.body.map(res => {
            if(res.type === "paragraph"){
                return <p className='text-prop' key={res.id}>{res.data.text}</p>
            }else if(res.type === "header"){
                return <h3 className='text-prop' key={res.id}>{res.data.text}</h3>
            }else if (res.type === "list"){
                res.data.items.map(val => {
                    return(
                        <ol className='text-prop' key={val}>
                            <li>{val}</li>
                        </ol>
                    )
                
                })
            } else {
                return <p className='text-prop'>{res.data.text}</p>
            }
        })
        return textContent;
    }
     return (
        <div className="container" >   
            <Header />
            {post.getSelectedPost && (
                <div>
                    <p className='tag'>{post.getSelectedPost?.tag[0]}</p>
                        <h1 className='title'>{post.getSelectedPost.title}</h1>

                        <div className="author-bio author-info">
                            <Image src={post.getSelectedPost.authorsPhoto} alt="avatar" className='avatar' 
                            width={40} height={40} layout="fixed" />
                            <p className='author'>{post.getSelectedPost.author}</p>
                            <p className='date'>{post.getSelectedPost.date}</p>
                        </div>
                        <div className="article-sponsor">
                            <p>DigitalOcean joining forces with CSS-Tricks! Special welcome offer: get $100 of free credit.</p>
                        </div>
                        <div className="post-content">
                                {text()}
                        </div>
                </div>
            )}
        </div>
    )
}

export default Post
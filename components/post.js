"use client"

import { useState, useEffect } from "react";

export default function PostPage({id}) {
    const [post, setPost] = useState(null);
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    useEffect(() => {
        fetch(`${BASE_URL}/api/post/${id}`)
            .then(res => res.json())
            .then(data => setPost(data.post))
    }, []);
    console.log('post', post);
    return (
        <div>
            {post && (
            <main className="container mx-auto px-4 py-6">
                <h2 className="text-4xl font-bold mb-4">{post?.title}</h2>
                <p className="text-gray-500">Published on {post?.createdAt}</p>
                <img src={post?.image} alt="Post Image" className="my-4 w-48 h-48" />
                <p>{post?.description}</p>
            </main>
            )}
        </div>
    )
}
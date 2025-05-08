/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [clicked, setClicked] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  console.log(query);
  useEffect(() => {
    try {
      if (query) {
        handleSearch();
    } else {
      fetch(`${BASE_URL}/api/posts`)
        .then(res => res.json())
        .then(data => setPosts(data.posts || []))
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  }, []);

  const handleSearch = async () => {
    setClicked(true);
      const res = await fetch(`${BASE_URL}/api/posts?query=${query}`);
      const data = await res.json();
      setPosts(data.posts || []);
  }

  return (
    <div>

      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>We are a team of passionate bloggers who love to share our thoughts and ideas with you.</p>
      </main>
      <div className="flex justify-end px-4">
        <input onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }} type="text" className="px-4 py-2 border border-gray-300 rounded-md" placeholder="Search..." onChange={(e) => setQuery(e.target.value)} />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4" onClick={handleSearch}>Search</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <Link href={`/post/${post?._id}`} key={index}>
            <div key={index} className="border border-gray-200 p-4">
              <img className="w-full h-48 object-cover mb-4" src={post?.image} alt="Post Image" />
              <h2 className="text-xl font-semibold mb-2">{post?.title}</h2>
              <p className="text-gray-600">{post?.shortDescription}</p>
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <div className="text-center text-gray-500 col-span-full h-48 flex items-center justify-center">No posts found for {query}</div>
        )}
        {/* <!-- Add more posts here --> */}
      </div>
    </div>
  );
}

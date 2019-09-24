import React, { useState, useEffect } from 'react';
import '../css/base.css';
import '../css/BlogsApp.css'
import BlogRow from './BlogRow';

function BlogsApp() {
  const [blogs, setBlogs] = useState([]);
  const [email, setEmail] = useState('');
  const [author, setAuthor] = useState('');
  const [name, setName] = useState('');
  const [id] = useState('');

  const getBlogs = (e) => {
    fetch('http://localhost:8080/blog/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(json => {
      setBlogs(json);
    })
  };

  useEffect(() => {
    getBlogs();
  }, [blogs])

  const addBlog = (e) => {
    e.preventDefault();
    setBlogs([...blogs, {'author': author, 'name': name, 'id': id}]);
    setEmail('');
    setAuthor('');
    setName('');
    
    fetch('http://localhost:8080/blog/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, author, name, id })
    })
  }

  return (
    <div id="container">
      <h2>Blogs</h2>
      <div id="blogs">
      {blogs.map((blog) => {
        return <BlogRow key={blog.id} blog={blog}/>
      })}
      </div>
      <form onSubmit={addBlog}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address"></input>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author name"></input>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Blog name"></input>
        <button>Add blog</button>
      </form>
    </div>
  );
}

export default BlogsApp;

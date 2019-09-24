import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/base.css';
import '../css/BlogPage.css';

const BlogPage = (props) => {
  const [blog, setBlog] = useState({});
  const [author, setAuthor] = useState('');
  const [name, setName] = useState('');

  const getBlog = () => {
    console.log(props)
    fetch('http://localhost:8080'+props.location.pathname, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(json => {
      console.log(json[0]);
      setBlog({'author': json[0].author, 'name': json[0].name, 'email': json[0].email, 'id': json[0].id});
      setAuthor(json[0].author);
      setName(json[0].name)
      console.log(json[0].author);
      console.log(json[0].name);
    })
  };

  const deleteBlog = (id) => {
    fetch('http://localhost:8080'+props.location.pathname, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

  const updateBlog = (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ author, name }))
    fetch('http://localhost:8080'+props.location.pathname, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ author, name })
    })
    .then(res => props.history.push('/'));
  }

  useEffect(() => {
    getBlog();
  }, [])

  return (
    <div id="container">
      <div id="information">
        <h4 id="title">{blog.author}'s Blog: {blog.name}</h4>
        <p id="contact">You can reach the author at: {blog.email}</p>
        <Link to={'/'}>Go back</Link>
      </div>
      <form onSubmit={updateBlog}>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} ></input>
        <input value={name} onChange={(e) => setName(e.target.value)} ></input>
        <button>Update blog</button>
      </form>
      <button id="delete" onClick={() => deleteBlog(blog.id)}>Delete blog</button>
    </div>
  )
}

export { BlogPage as default }
import React from 'react';
import '../css/base.css';
import '../css/BlogRow.css'
import { Link } from 'react-router-dom';

const BlogRow = ({ blog, deleteBlog }) => {
  return (
    <div class="row">
      <Link to={'/blog/'+blog.id}>{blog.name}</Link>
    </div>
  )
}

export { BlogRow as default }
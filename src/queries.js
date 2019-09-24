const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blogs',
  password: 'root',
  port: 5432,
})

const getBlogs = (req, res) => {
  const query = "SELECT * FROM blogs";
  pool.query(query,(error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
}

const createBlog = (req, res) => {
  const query = "INSERT INTO blogs (email, author, name) VALUES ('"+req.body.email+"', '"+req.body.author+"', '"+req.body.name+"')";
  pool.query(query,(error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Blog added with ID: ${res.insertId}`)
  })
}

const getBlog = (req, res) => {
  const id = parseInt(req.params.id)
  const query = "SELECT * FROM blogs WHERE id = $1";
  pool.query(query,[id],(error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)
    res.status(200).json(results.rows);
  })
}

const updateBlog = (req, res) => {
  const id = parseInt(req.params.id)
  console.log("UPDATING!");
  const query = "UPDATE blogs SET author = $1, name = $2 WHERE id = $3";
  pool.query(query,[req.body.author, req.body.name, id],(error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Blog updated with ID: ${req.body.id}`)
  })
}

const deleteBlog = (req, res) => {
  const id = parseInt(req.params.id)
  const query = "DELETE FROM blogs WHERE id = $1";
  pool.query(query,[id],(error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Blog deleted with ID: ${req.body.id}`)
  })
}

module.exports = {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog
}
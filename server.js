const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./src/queries');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/blog/', db.getBlogs);

app.post('/blog/', db.createBlog);

app.get('/blog/:id/', db.getBlog);

app.put('/blog/:id/', db.updateBlog);

app.delete('/blog/:id/', db.deleteBlog);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
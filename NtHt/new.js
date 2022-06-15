const express = require('express')
var qs = require('querystring');
var fs = require('fs');
const app = express()
const port = 3000
var temp = require('./lib/template.js');

app.get('/', (req, res) => {
  fs.readdir('./data', function (err, filelist) {
    title = 'Hello';
    var description = '헉!';
    var list = temp.List(filelist);
    var template = temp.html(title, list, description);
    res.send(template);
  })
})

app.get('/page/:pageId', (req, res) => {
  var title=req.params.pageId;
  fs.readdir('./data', function (err, filelist) {
    fs.readFile(`data/${title}`, 'utf8', function (err, description) {
      var list = temp.List(filelist);
      var template = temp.html(title, list, description);
      res.send(template);
    });
  });
})
app.get('/create', (req, res) => {
  fs.readdir('./data', function (err, filelist) {
    var title = 'CREATE';
    var description = `
      <form action="http://localhost:3000/create_Page" method="post">
      <input type="text" name="title" placeholder="title">
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
      <input type="submit">
      </p>
      </form>
      `;
    var list = temp.List(filelist);
    var template = temp.html(title, list, description);
    res.send(template);
  })
})

app.post('/create_page',(req,res)=>{
  var body = '';
  req.on('data', function (data) {
    body = body + data;
  });
  req.on('end', function () {
    var post = qs.parse(body);
    var title = post.title;
    var description = post.description;
    fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
      // res.writeHead(302, { Location: encodeURI(`/?id=${title}`), 'Content-Type': 'text/html; charset=utf-8' });
      // res.send('메롱 완료~^u^~!');
      res.redirect(`/page/${title}`)
    })
  })
})

app.get('/update/:pageId', (req, res) => {
  var title=req.params.pageId;
  fs.readdir('./data', function (err, filelist) {
    fs.readFile(`data/${title}`, 'utf8', function (err, description) {
      var update_description = description;
      description = `
      <form action="http://localhost:3000/update_Page" method="post">
      <input type="hidden" name="id" value="${title}">
      <input type="text" name="title" placeholder="title" value="${title}">
      <p>
        <textarea name="description" placeholder="description">
        ${update_description}
        </textarea>
      </p>
      <p>
      <input type="submit">
      </p>
      </form>`;
      var list = temp.List(filelist);
      var template = temp.html(title, list, description);
      res.send(template);
    });
  })
})

app.post('/update_page', (req, res) => {
  var body = '';
  req.on('data', function (data) {
    body = body + data;
  });
  req.on('end', function () {
    var post = qs.parse(body);
    var id = post.id;
    var title = post.title;
    var description = post.description;
    fs.rename(`data/${id}`, `data/${title}`, function (err) {
      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        res.redirect(`page/${title}`)
      })
    })
  })
})

app.post('/delete_page',(req,res)=>{
  var body = '';
    req.on('data', function (data) {
      body = body + data;
    });
    req.on('end', function () {
      var post = qs.parse(body);
      var id = post.id;
      fs.unlink(`data/${id}`, function (err) {
        res.redirect
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

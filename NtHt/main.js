var http = require('http');
var fs = require('fs');
var url=require('url');
var qs=require('querystring');
var temp = require('./lib/template.js');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData=url.parse(_url,true).query;
    var title=queryData.id;
    var pathname=url.parse(_url,true).pathname;
    if(pathname=='/')
    {
      if(queryData.id==undefined)
      {
        fs.readdir('./data',function(err,filelist)
        {
          title='Hello';
      //    queryData.id='Hello';
          var description='헉!';
          var list=temp.List(filelist);
          var template=temp.html(title,list,description,queryData);
              //console.log(__dirname + url);
              // response.end(fs.readFileSync(__dirname + _url));
              response.writeHead(200,{'Context-Type':'text/html; charset=utf-8'});
              response.end(template);
        })
      }
      else
      {
        fs.readdir('./data',function(err,filelist){
          fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
          var list=temp.List(filelist);
          var template=temp.html(title,list,description,queryData);
              //console.log(__dirname + url);
              // response.end(fs.readFileSync(__dirname + _url));
              response.writeHead(200,{'Context-type':'text/html; charset=utf-8'});
              response.end(template);
            });
        });
        }
      }
    else if (pathname=='/create') {
      fs.readdir('./data',function(err,filelist){
        queryData.id='CREATE';
        var description=`
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
        var list=temp.List(filelist);
        var template=temp.html(title,list,description,queryData);
            //console.log(__dirname + url);
            // response.end(fs.readFileSync(__dirname + _url));
            response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
            response.end(template);
      })
    }
    else if (pathname=='/create_Page'){
      var body='';
      request.on('data',function(data){
        body=body+data;
      });
      request.on('end',function(){
        var post=qs.parse(body);
        var title = post.title;
        var description=post.description;
        fs.writeFile(`data/${title}`,description,'utf8',function(err){
          response.writeHead(302,{Location:encodeURI(`/?id=${title}`),'Content-Type':'text/html; charset=utf-8'});
          response.end('메롱 완료~^u^~!');
        })
      })
    }
    else if(pathname=='/update')
    {
      fs.readdir('./data',function(err,filelist){
        fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
        var update_description=description;
        description=`
        <form action="http://localhost:3000/update_Page" method="post">
        <input type="hidden" name="id" value="${queryData.id}">
        <input type="text" name="title" placeholder="title" value="${queryData.id}">
        <p>
          <textarea name="description" placeholder="description">
          ${update_description}
          </textarea>
        </p>
        <p>
        <input type="submit">
        </p>
        </form>`;
        var list=temp.List(filelist);
        var template=temp.html(title,list,description,queryData);
            //console.log(__dirname + url);
            // response.end(fs.readFileSync(__dirname + _url));
            response.writeHead(200,{'Context-type':'text/html; charset=utf-8'});
            response.end(template);
          });
      })
    }
    else if(pathname=='/update_Page')
    {
      var body='';
      request.on('data',function(data){
        body=body+data;
      });
      request.on('end',function(){
        var post=qs.parse(body);
        var id = post.id;
        var title =post.title;
        console.log(title);
        var description=post.description;
        fs.rename(`data/${id}`,`data/${title}`,function(err){
          fs.writeFile(`data/${title}`,description,'utf8',function(err){
            response.writeHead(302,{Location:encodeURI(`/?id=${title}`),'Content-Type':'text/html; charset=utf-8'});
            response.end();
          })
        })
      })
    }
    else if(pathname=='/delete_page')
    {
      var body='';
      request.on('data',function(data){
        body=body+data;
      });
      request.on('end',function(){
        var post=qs.parse(body);
        var id = post.id;
        fs.unlink(`data/${id}`,function(err)
        {
          response.writeHead(302,{Location:'/','Content-Type':'text/html; charset=utf-8'});
          response.end();
        })
      })
    }
    else
      {
        response.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
        response.end('메롱 NOT FOUND');
      }
    });



app.listen(3000);

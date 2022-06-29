var express = require('express');
var router = express.Router();
var temp = require('../lib/template.js');
var fs = require('fs');
router.use(function(req,res,next){
    fs.readdir('./data', function (err, filelist) {
    req.list=filelist;
    next();
    })
})

router.get('/:pageId', (req, res,next) => {
    var title=req.params.pageId;
      fs.readFile(`data/${title}`, 'utf8', function (err, description) {
        if(err)
        {
          next(err);
        }
        else
        {
          var list = temp.List(req.list);
          var template = temp.html(title, list, description);
          res.send(template);
        }
      });
})

module.exports=router;
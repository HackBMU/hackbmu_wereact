"use strict";
const express = require('express');
const app = express();
const PythonShell = require('python-shell');
var bodyParser = require('body-parser');
const fs = require('fs');


const opn = require('opn');
var name;
var pyshell;


app.set('view engine', 'ejs');

app.get('/', function(req, res){
  
  res.send("Hello!");
});

app.get('/recognise', function(req, res){
  pyshell = new PythonShell('facerecog.py');

  pyshell.on('message', function(message){
    if(message != "[ INFO:0] Initialize OpenCL runtime...")
    {
      res.render('index', {name: message});
      
    }
 
  });
  
     

});

app.get('/admin', function(req, res){
  res.render('admin');
});

app.post('/admin', function(req, res) {
  
  var newmember = req.body.name;

  fs.readFile('members.json', function(err, data){
    var json = JSON.parse(data);
    json.members.push(newmember);
    fs.writeFile("members.json", JSON.stringify(json));
  });

}, function(){
  var pyshell=new PythonShell('register.py')
  pyshell.send(newmember);
});



app.listen(3000, () => console.log("Listening on port 3000!"));



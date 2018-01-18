const fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const appLib = require('./appLib.js');
const Item = require('./models/item.js').Item;
const User = require('./models/user.js').User;
const getFormattedTodos = require('./getFormattedTodos.js').getFormattedTodos;

const toJsonString = function(data){
  return JSON.stringify(data,null,2);
}

const getAllFileData = function(){
  try{
    return fs.readFileSync('./data/todoData.json','utf8');
  }catch(e){
    console.log(e);
  }
}

let lib = {
  registered_users : [{userName:'alok'},{userName:'nitesh'}],
  users : {},
  logRequest : (req,res)=>{
    let text = ['------------------------------',
      `${timeStamp()}`,
      `${req.method} ${req.url}`,
      `HEADERS=> ${toJsonString(req.headers)}`,
      `COOKIES=> ${toJsonString(req.cookies)}`,
      `BODY=> ${toJsonString(req.body)}`,''].join('\n');
    fs.appendFile('request.log',text,()=>{});
    console.log(`${req.method} ${req.url}`);
  },
  writeTodoDataToFile : ()=>{
    let users = JSON.stringify(this.users,null,2);
    fs.writeFileSync('./data/todoData.json',users);
  },
  loadFileData : ()=>{
    let fileData = getAllFileData();
    this.users = JSON.parse(fileData);
    let usernames = Object.keys(this.users);
    usernames.map((username)=>{
      this.users[username].__proto__ = new User().__proto__;
    });
  },
  redirectLoggedInUserToHome : (req,res)=>{
    if(req.urlIsOneOf(['/','/login']) && req.user) res.redirect('/home');
  },
  redirectLoggedOutUserToLogin : (req,res)=>{
    if(req.urlIsOneOf(['/home','/logout','/viewTodo','/createTodo','/writeItems']) && !req.user) res.redirect('/login');
  },
  loadUser : (req,res)=>{
    let sessionid = req.cookies.sessionid;
    let temp = lib.registered_users;
    let user = temp.find(u=>u.sessionid==sessionid);
    if(sessionid && user){
      req.user = user;
    }
  },
  loginAction : (req,res)=>{
    let user = lib.registered_users.find(u=>u.userName==req.body.username);
    if(!user) {
      res.setHeader('Set-Cookie',`logInFailed=true`);
      res.redirect('/login');
      return;
    }
    let sessionid = new Date().getTime();
    res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
    user.sessionid = sessionid;
    res.redirect('/home');
  },
  logoutAction : (req,res)=>{
    res.setHeader('Set-Cookie',[`loginFailed=false,Expires=${new Date(1).toUTCString()}`,`sessionid=0,Expires=${new Date(1).toUTCString()}`]);
    res.setHeader('Content-type','text/html');
    delete req.user.sessionid;
    res.redirect('/login');
  },
  addTodoData : (req,res)=>{
    let todo = req.body;
    let username = appLib.getUserName(req,lib.registered_users);
    this.users[username].addTodo(todo.title,todo.desc);
    lib.writeTodoDataToFile();
    res.redirect('/writeItems');
    res.end();
  },
  addItems : (req,res)=>{
    let todo = req.body;
    console.log(todo);
    let username = appLib.getUserName(req,lib.registered_users);
    this.users[username].addItem(todo.todoNumber,todo.item);
    lib.writeTodoDataToFile();
    res.redirect('/writeItems');
    res.end();
  },
  viewTodo : (req,res)=>{
    let viewTodo = fs.readFileSync('./public/viewTodo.html','utf8');
    let username = appLib.getUserName(req,lib.registered_users);
    console.log(username);
    userTodo = this.users[username].todos;
    let formattedTodo = getFormattedTodos(userTodo);
    viewTodo = viewTodo.replace('replacer',formattedTodo);
    res.setHeader('Content-Type','text/html');
    res.write(viewTodo);
    res.end();
  },
  serveStaticFiles : (req,res)=>{
    let htmlFiles = ['/login','/home','/createTodo','/viewTodo','/writeItems'];
    if(req.url=='/')
      req.url='/login';
    if(htmlFiles.includes(req.url))
      req.url += '.html';
    if(appLib.urlExist(req.url)) {
      res.statusCode = 200;
      res.setHeader('Content-Type',appLib.contentType(req.url));
      res.write(fs.readFileSync("./public/" + req.url));
    }else
      appLib.send404Response(res);
    res.end();
  }
}

module.exports = lib;

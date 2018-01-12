let fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const lib = require('./serverLib.js');
const create = require('./webapp').create;
let registered_users = [{userName:'alok'},{userName:'nitesh'}];
let toS = o=>JSON.stringify(o,null,2);

let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});

  console.log(`${req.method} ${req.url}`);
}
let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};
let redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/login']) && req.user) res.redirect('/home');
}
let redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/','/home','/logout']) && !req.user) res.redirect('/login');
}

let app = create();
app.use(logRequest);
app.use(loadUser);
app.use(redirectLoggedInUserToHome);
app.use(redirectLoggedOutUserToLogin);
app.get('/login',(req,res)=>{
  res.setHeader('Content-type','text/html');
  res.write('<form method="POST"> <input name="userName"><input name="place"> <input type="submit"></form>');
  res.end();
});
app.post('/login',(req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`logInFailed=true`);
    res.redirect('/login');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home');
});
app.get('/home',(req,res)=>{
  res.setHeader('Content-type','text/html');
  let home = fs.readFileSync('./public/home.html','utf8');
  res.write(home);
  res.end();
});
app.get('/logout',(req,res)=>{
  res.setHeader('Set-Cookie',[`loginFailed=false,Expires=${new Date(1).toUTCString()}`,`sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/login');
});

app.post('/addTodoData',(req,res)=>{
  let todo = req.body;
  console.log(JSON.stringify(todo));
  res.end();
});

app.get('default',(req,res)=>{
  if(lib.urlExist(req.url)) {
    res.writeHead(200,{"Content-Type":lib.contentType(req.url)});
    res.write(fs.readFileSync("./public/" + req.url));
  }else
    lib.send404Response(res);
  res.end();
});

module.exports = app;

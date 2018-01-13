const fs = require('fs');

let lib = {
  send404Response : function(res) {
    res.setHeader('Content-Type','text/plain');
    res.statusCode=404;
    res.write("Error 404: Page not found!");
  },
  urlExist : function(url){
    return fs.existsSync("./public/" + url)
  },
  contentType : function(requstUrl) {
    let urlExtension = requstUrl.substr(requstUrl.lastIndexOf("."));
    urlExtension = urlExtension.replace(".", "");
    let contentType = {
      html: "text/html",
      css: "text/css",
      js: "text/js",
      PNG: "image/PNG",
      jpeg: "image/jpeg",
      gif: "image/gif",
      jpg: "image/jpg",
      pdf: "text/pdf"
    }
    return contentType[urlExtension];
  },
  createUserTodoFile : function(username){
    let users = fs.readFileSync("./data/todoData.json","utf8");
    users = JSON.parse(users);
    if(!users[username])
      users[username] = {};
    users = JSON.stringify(users,null,2);
    fs.writeFileSync('./data/todoData.json',users);
  },
  pushTodoIntoUserFile : function(username,todo){
    let users = fs.readFileSync("./data/todoData.json","utf8");
    users = JSON.parse(users);
    users[username][todo['title']] = todo;
    users = JSON.stringify(users,null,2);
    fs.writeFileSync('./data/todoData.json',users);
  },
  pushItemsIntoUserFile : function(username,title,item){
    let users = fs.readFileSync("./data/todoData.json","utf8");
    users = JSON.parse(users);
    if(!('items' in users[username][title]))
      users[username][title]['items']=[];
    users[username][title]['items'].push(item);
    users = JSON.stringify(users,null,2);
    fs.writeFileSync('./data/todoData.json',users);
  },
  getUserTodo : function(username){
    let users = fs.readFileSync("./data/todoData.json","utf8");
    users = JSON.parse(users);
    let todo = users[username];
    return todo;
  }
}
module.exports = lib;

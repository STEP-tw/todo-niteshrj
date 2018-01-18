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
  getUserName : function(req,registered_users){
    let sessionid = req.cookies.sessionid;
    let user = registered_users.find(u=>u.sessionid==sessionid);
    let username = user.userName;
    return username;
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
  }
}
module.exports = lib;

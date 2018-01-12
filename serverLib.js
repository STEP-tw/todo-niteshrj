const fs = require('fs');
let lib = {
  send404Response : function(res) {
    res.writeHead(404, {"Content-Type":"text/plain"});
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
  }
}
module.exports = lib;

let fs = require('fs');
const create = require('./webapp').create;
const serverLib = require('./lib/serverLib.js');

serverLib.loadFileData();

let app = create();
app.use(serverLib.logRequest);
app.use(serverLib.loadUser);
app.use(serverLib.redirectLoggedInUserToHome);
app.use(serverLib.redirectLoggedOutUserToLogin);
app.post('/login',serverLib.loginAction);
app.get('/logout',serverLib.logoutAction);
app.post('/addTodoData',serverLib.addTodoData);
app.post('/addItems',serverLib.addItems);
app.get('/viewTodo',serverLib.viewTodo);
app.get('default',serverLib.serveStaticFiles);

module.exports = app;

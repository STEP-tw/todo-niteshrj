const Todo = require('./todo').Todo;

class User{
  constructor(username){
    this._username = username;
    this._todos = [];
  }
  addTodo(title,description){
    let todo = new Todo(title,description);
    this._todos.push(todo);
    return this._todos;
  }
  deleteTodo(index){
    this._todos.splice(index,1);
  }
  editTodo(index,title,description){
    this._todos[index].__proto__=new Todo().__proto__;
    let todo = this._todos[index];
    todo.updateTitle(title);
    todo.updateDescription(description);
  }
  addItem(index,item){
    let todo = this._todos[index];
    todo.__proto__=new Todo().__proto__;
    todo.addItem(item);
  }
  get todos(){
    return this._todos;
  }
  getTodo(index){
    return this._todos[index];
  }
}
exports.User = User;

const Todo = require('./todo').Todo;

class User{
  constructor(username){
    this._username = username;
    this._todos = [];
  }
  addTodo(title,description,items){
    let todo = new Todo(title,description,items);
    this._todos.push(todo);
    return this._todos;
  }
  deleteTodo(index){
    this._todos.splice(index,1);
  }
  get todos(){
    return this._todos;
  }
  getTodo(index){
    return this._todos[index];
  }
}
exports.User = User;

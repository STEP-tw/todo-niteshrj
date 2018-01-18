const User = require('../../lib/models/user.js').User;
const assert = require('chai').assert;

describe('User',()=>{
  describe('addTodo()',()=>{
    it('adds a todo having title,description',()=>{
      let user = new User("alok");
      let userTodo = user.addTodo('buy','milk');
      let expectedTodos = [{_title:'buy',_description:'milk',_items:[]}]
      assert.deepEqual(userTodo,expectedTodos);
    })
  })
  describe('addItem()',()=>{
    it('adds a item given index of todo',()=>{
      let user = new User("alok");
      let userTodo = user.addTodo('buy','milk');
      let expectedTodos = [{_title:'buy',_description:'milk',_items:[]}]
      assert.deepEqual(userTodo,expectedTodos);
      user.addItem(0,'go to shop');
      expectedTodos = [{_title:'buy',_description:'milk',_items:[{'_item':'go to shop','_done':false}]}];
      assert.deepEqual(user.todos,expectedTodos);
    })
  })
  describe('deleteTodo()',()=>{
    it('deletes the todo,given the index of the todo to delete',()=>{
      let user = new User("alok");
      user.addTodo('buy','milk',['goto shop']);
      user.deleteTodo(0);
      assert.deepEqual(user.todos,[]);
    })
  })
  describe('getTodo()',()=>{
    it('deletes the todo,given the index of the todo to delete',()=>{
      let user = new User("alok");
      user.addTodo('buy','milk',[]);
      assert.deepEqual(user.getTodo(0),{_title:'buy',_description:'milk',_items:[]});
    })
  })
  describe('EditTodo()',()=>{
    it('edits the todo,given the index of the todo and new title,description',()=>{
      let user = new User("alok");
      user.addTodo('buy','milk',[]);
      user.editTodo(0,'sell','banana');
      let expectedTodo = {_title:'sell',_description:'banana',_items:[]}
      assert.deepEqual(user.getTodo(0),expectedTodo);
    })
  })
})

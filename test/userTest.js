const User = require('../lib/user.js').User;
const assert = require('chai').assert;

describe('User',()=>{
  describe('createTodo()',()=>{
    it('creates a todo having title,description and items',()=>{
      let user = new User("alok");
      let userTodo = user.addTodo('buy','milk',['goto shop']);
      assert.deepEqual(userTodo,[{_title:'buy',_description:'milk',_items:['goto shop']}]);
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
})

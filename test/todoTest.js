const Todo = require('../todo.js').Todo;
const assert = require('chai').assert;

describe('Todo',()=>{
  describe('updateTitle()',()=>{
    it('updates the title of the todo',()=>{
      let todo = new Todo('buy milk','go to shop',[]);
      assert.equal(todo.title,'buy milk');
      todo.updateTitle('buy milk powder');
      assert.equal(todo.title,'buy milk powder');
    })
  })
  describe('updateDescription()',()=>{
    it('updates the description of the todo',()=>{
      let todo = new Todo('buy milk','go to shop',[]);
      assert.equal(todo.description,'go to shop');
      todo.updateDescription('go to the shop');
      assert.equal(todo.description,'go to the shop');
    })
  })
  describe('updateItems()',()=>{
    it('updates the items of the todo',()=>{
      let todo = new Todo('buy milk','go to shop',[]);
      assert.deepEqual(todo.items,[]);
      todo.updateItems(['give money','take milk']);
      assert.deepEqual(todo.items,['give money','take milk']);
    })
  })
})

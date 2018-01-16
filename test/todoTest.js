const Todo = require('../lib/todo.js').Todo;
const assert = require('chai').assert;

describe('Todo',()=>{
  describe('updateTitle()',()=>{
    it('updates the title of the todo',()=>{
      let todo = new Todo('buy milk','go to shop',[]);
      assert.equal(todo.title,'buy milk');
      todo.updateTitle('buy milk powder');
      assert.equal(todo.title,'buy milk powder');
      assert.equal(todo.description,'go to shop');
      assert.deepEqual(todo.items,[]);
    })
  })
  describe('addItem()',()=>{
    it('add items into the todo',()=>{
      let todo = new Todo('buy milk','go to shop',[]);
      todo.addItem('give money');
      assert.deepEqual(todo.items,['give money']);
      todo.addItem('take milk');
      assert.deepEqual(todo.items,['give money','take milk']);
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

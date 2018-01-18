const Todo = require('../../lib/models/todo.js').Todo;
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
      let expectedItems = [{_item:'give money',_done:false}];
      assert.deepEqual(todo.items,expectedItems);
      todo.addItem('take milk');
      expectedItems = [{_item:'give money',_done:false},{_item:'take milk',_done:false}];
      assert.deepEqual(todo.items,expectedItems);
    })
  })
  describe('markItemDone()',()=>{
    it('set the status as done',()=>{
      let todo = new Todo('buy milk','go to shop',[]);
      todo.addItem('give money');
      let expectedItems = [{_item:'give money',_done:false}];
      assert.deepEqual(todo.items,expectedItems);
      todo.markItemDone(0);
      expectedItems = [{_item:'give money',_done:true}];
      assert.deepEqual(todo.items,expectedItems);
    })
  })
  describe('markItemUndone()',()=>{
    it('set the status as done',()=>{
      let todo = new Todo('buy milk','go to shop',[]);
      todo.addItem('give money');
      let expectedItems = [{_item:'give money',_done:false}];
      assert.deepEqual(todo.items,expectedItems);
      todo.markItemDone(0);
      expectedItems = [{_item:'give money',_done:true}];
      assert.deepEqual(todo.items,expectedItems);
      todo.markItemUndone(0);
      expectedItems = [{_item:'give money',_done:false}];
      assert.deepEqual(todo.items,expectedItems);
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

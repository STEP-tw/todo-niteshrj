const Item = require('../item.js').Item;
const assert = require('chai').assert;

describe('Item',()=>{
  describe('get status()',()=>{
    it('gives current status of the Item as done by default',()=>{
      let item = new Item({});
      assert.notOk(item.status);
    })
    it('gives status as false of the item as undone after setting it',()=>{
      let item = new Item({});
      item.markDone();
      assert.ok(item.status);
    })
    it('gives status as true of the item as done after setting it',()=>{
      let item = new Item({});
      item.markUndone();
      assert.notOk(item.status);
    })
  })
  describe('update()',()=>{
    it('updates the item by the new given item',()=>{
      let item = new Item({});
      item.update({'title' : 'buy milk'});
      assert.deepEqual(item.item,{'title' : 'buy milk'});
    })
  })
  describe('get item()',()=>{
    it('gives the current item',()=>{
      let item = new Item({});
      assert.deepEqual(item.item,{});
    })
  })
})

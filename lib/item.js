class Item{
  constructor(item){
    this._item = item;
    this._done = false;
  }
  get item(){
    return this._item;
  }
  get status(){
    return this._done;
  }
  markDone(){
    this._done = true;
  }
  markUndone(){
    this._done = false;
  }
  update(newItem){
    this._item = newItem;
  }
}
exports.Item = Item;

class Item{
  constructor(item){
    this.item = item;
    this.done = false;
  }
  get status(){
    return this.done;
  }
  markDone(){
    this.done = true;
  }
  markUndone(){
    this.done = false;
  }
  update(newItem){
    this.item = newItem;
  }
}
exports.Item = Item;

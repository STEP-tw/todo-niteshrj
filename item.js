class Item{
  constructor(item){
    this.item = item;
    this.done = false;
  }
  get status(){
    return this.done;
  }
  done(){
    this.done = true;
  }
  undone(){
    this.done = false;
  }
  update(newItem){
    this.item = newItem;
  }
}
exports.Item = Item;

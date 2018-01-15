class Todo{
  constructor(title,description,items){
    this._title = title;
    this._description = description;
    this._items = items;
  }
  get title(){
    return this._title;
  }
  get description(){
    return this._description;
  }
  get items(){
    return this._items;
  }
  updateTitle(newTitle){
    this._title = newTitle;
  }
  updateDescription(newDescription){
    this._description = newDescription;
  }
  updateItems(newItems){
    this._items = newItems;
  }
}
exports.Todo = Todo;

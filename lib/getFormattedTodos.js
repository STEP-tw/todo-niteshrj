const getFormattedTodos = function(todos){
  // title,desc,items
  console.log(todos);
  let formattedTodo = "";
  let i = 1;
  todos.forEach(function(todo){
    let index = `<h1>Todo Number :- ${i}</h1>`
    let title = `<h2> Title :- ${todo._title} </h2>`;
    let desc = `<h3> Description :- ${todo._description} </h3>`;
    let items = `<p> Items :- ${JSON.stringify(todo._items)} </p>`;
    let line = `-------------------------------------------------`;
    formattedTodo += index+title+desc+items+line;
    i++;
  })
  return formattedTodo;
}

exports.getFormattedTodos = getFormattedTodos;

import React from 'react';

type Todo = Readonly<{
  id: number,
  text: string,
  done: boolean,
}>;

type CompletedTodo = Todo & {
  readonly done: true
}

function toggleTodo(todo: Todo): Todo {
  alert('toggle called')
  return {
    id: todo.id,
    text: todo.text,
    done: !todo.done,
  };
}

function completeAll(todos: readonly Todo[]): Todo[] {
  let arr = [];

  for (const todo of todos) {
    const newTodo = Object.assign({}, todo, { done: true });
    arr.push(newTodo);
  }

  return arr;
}

function completeAllWithCompletedTodo(todos: readonly Todo[]): CompletedTodo[] {
  // let arr = [];

  // for (const todo of todos) {
  //   const newTodo = Object.assign({}, todo, { done: true });
  //   arr.push(newTodo);
  // }

  // return arr;

  return todos.map(todo => ({
    ...todo,
    done: true
  }))
}


const TodoList = ({
  todos: items
}: {
  todos: Todo[]
}) => {

  const handleClick = (elem: Todo) => (e: any) => {
    e.preventDefault();
    toggleTodo(elem);
  }

  return (
    <>
      {items.map((item, index) => (
        <div
          key={item.id}
        >
          <span>{item.text}</span>
          <span>{item.done}</span>
          <span onClick={handleClick(item)} style={{margin: '1rem'}}>{'toggle'}</span>
        </div>
      ))}
    </>
  )
}

export default TodoList

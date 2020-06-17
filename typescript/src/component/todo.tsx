import React, { useState, useEffect } from 'react';

type Todo = Readonly<{
  id: number;
  text: string | null;
  done: boolean;
}>;

type CompletedTodo = Todo & {
  done: true;
};

function toggleTodo(todo: Todo): Todo {
  alert('toggle called');
  // todo.done = !todo.done;
  // return todo;
  return {
    id: todo.id,
    text: todo.text,
    done: !todo.done,
  };
}

function toggleAll(todos: readonly Todo[]): Todo[] {
  let arr = [];

  for (const todo of todos) {
    const newTodo = Object.assign({}, todo, { done: !todo.done });
    arr.push(newTodo);
  }

  return arr;
}

function completeAll(todos: readonly Todo[]): CompletedTodo[] {
  return todos.map((todo) => ({
    ...todo,
    done: true,
  }));
}

const TodoList = ({ todos: items }: { todos: Todo[] }) => {
  const [todoList, setTodoList] = useState<Todo[]>(items);

  useEffect(() => {
    setTimeout(() => {
      alert('delay');
    }, 100);
  }, []);

  const handleClick = (elem: Todo) => (e: any) => {
    e.preventDefault();
    toggleTodo(elem);
  };

  const handleToggleAllClick = (elem: Todo[]) => (e: any) => {
    e.preventDefault();
    const list = toggleAll(elem);
    setTodoList(list);
  };

  const handleCompleteAllClick = (elem: Todo[]) => (e: any) => {
    e.preventDefault();
    const list = completeAll(elem);
    setTodoList(list);
  };

  return (
    <>
      {todoList.map((item) => (
        <div key={item.id}>
          <span>{item.text}</span>
          <span style={{ margin: '1rem' }}>{`${item.done}`}</span>
          <span
            onClick={handleClick(Object.assign({ some: '' }, item))}
            style={{ margin: '1rem' }}
          >
            {'toggle'}
          </span>
        </div>
      ))}
      <span
        onClick={handleCompleteAllClick(todoList)}
        style={{ margin: '1rem' }}
      >
        {'completeAll'}
      </span>
      <span onClick={handleToggleAllClick(todoList)} style={{ margin: '1rem' }}>
        {'toggleAll'}
      </span>
    </>
  );
};

export default TodoList;

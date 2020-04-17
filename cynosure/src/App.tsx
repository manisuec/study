import React from 'react';
import './App.css';
import Todo from './component/todo';

function App() {
  return (
    <div className="App">
      <Todo
        todos={[
          { id: 1, text: 'todo item 1', done: false },
          { id: 1, text: 'todo item 2', done: false },
          { id: 1, text: 'todo item 3', done: false },
        ]}
      />
    </div>
  );
}

export default App;

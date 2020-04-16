import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './component/todo';

function App() {
  return (
    <div className="App">
      <Todo todos={[{ id: 1, text: 'todo item 1', done: false }]} />
    </div>
  );
}

export default App;

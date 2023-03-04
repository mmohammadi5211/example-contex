import React from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { TasksProvider } from './contexts/TasksContext';

function App() {
  return (
    <>
      <TasksProvider>
        <AddTask />
        <TaskList />
      </TasksProvider>
    </>
  );
}

export default App;

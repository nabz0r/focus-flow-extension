import React from 'react';
import ReactDOM from 'react-dom';
import { Timer } from './components/Timer/Timer';
import { TaskList } from './components/TaskList/TaskList';
import { Settings } from './components/Settings/Settings';

const Popup = () => {
  return (
    <div className="w-96 p-4">
      <h1 className="text-2xl font-bold mb-4">FocusFlow</h1>
      <Timer
        initialTime={25 * 60}
        onComplete={() => console.log('Timer complete')}
      />
      <TaskList />
      <Settings />
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));
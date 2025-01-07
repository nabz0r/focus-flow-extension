import React from 'react';
import ReactDOM from 'react-dom';
import { TimerBasic } from './components/Timer/TimerBasic';

const Popup = () => {
  return (
    <div className="min-h-screen">
      <h1 className="text-xl font-bold mb-4">FocusFlow</h1>
      <TimerBasic />
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));
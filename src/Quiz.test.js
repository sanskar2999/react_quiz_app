import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from './Quiz';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Quiz />, div);
});

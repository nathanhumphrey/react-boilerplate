import React from 'react';
import { hot } from 'react-hot-loader/root';
import { SimpleComponent } from './components/SimpleComponent.js';

const App = () => {
  return (
    <div>
      <h1>React Starter App</h1>
      <SimpleComponent />
    </div>
  );
};

export default hot(App);

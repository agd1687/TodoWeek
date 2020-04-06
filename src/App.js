import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {TaskReducer} from './redux/Reducer';
//import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Todo from './components/Todo';

function App() {
  const store = createStore(TaskReducer);
  return (
    <Provider store={store}>
      <Header />
      <Todo />
    </Provider>
  );
}

export default App;

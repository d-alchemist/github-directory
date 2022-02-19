import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Users from './pages/users/Users';
import Repos from './pages/repos/Repos';
import reducer from './store/reducers';
import { Provider } from 'react-redux';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="users" element={<Users />} />
          <Route path="repos" element={<Repos />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

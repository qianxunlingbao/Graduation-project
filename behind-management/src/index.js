import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Router,Route, Redirect, Switch,HashRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import { mainRoutes } from './routes';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/admin" render={routeProps=><App {...routeProps} />}/>
      {mainRoutes.map(route=>{
        return <Route key={route.path} {...route} />
      })}
      <Redirect to="/login"/>
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

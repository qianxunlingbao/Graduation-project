import logo from './logo.svg';
import './App.css';

import Users from './pages/Users/Users'
import Project from './pages/Project/Project'

import Login from './components/login/login'
import Search from './components/search/Search';
import { Link, NavLink, Route, Switch ,Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <Login />
      
      {/*<Search />*/}

      {/*<header className="App-header">
        <div className="App-logo">
          <img src={logo} alt="logo"  />
        </div>     
      </header>
      <div className="Text">
        <p className="Text-color">1111</p>
        <a href="http://localhost:8080/websites">11</a>
  </div>*/}
    </div>
  );
}

export default App;

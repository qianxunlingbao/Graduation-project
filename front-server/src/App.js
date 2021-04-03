import './App.css';
import 'antd/dist/antd.css';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import Whole from './pages/Whole'
import history from './components/History'
import Login from './components/login/login';
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path="/whole" component={Whole}/>
          <Redirect to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

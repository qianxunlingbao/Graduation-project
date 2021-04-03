import './App.css';
import 'antd/dist/antd.css';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { adminRoutes } from './routes';
import Frame from './components/Frame/index'

function App() {
  return (
    <Frame>
      <Switch>
        {adminRoutes.map(route=>{
          return(
            <Route
              key={route.path}
              path={route.path}
              render={
                routeProps => {
                  return <route.component {...routeProps} />;
                }
              }

            />
          )
        })}
        <Redirect to="/admin/project" />
      </Switch>





      {/*<Router history={history}>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path="/whole" component={Whole}/>
          <Route path="/check" component={Check}/>
          <Route path="/person" component={Person}/>
          <Route path="/project" component={Project}/>
          <Route path="/stu" component={Stu}/>
          <Route path="/trouble" component={Trouble}/>
          <Redirect to="/login" />
        </Switch>
  </Router>*/}
    </Frame>
  );
}

export default App;

import { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SignUpLogIn from './Pages/SignUpLogIn/SignUpLogIn';
import Dashboard from './Pages/Dashboard/Dashboard';
import AuthContext from './store/AuthContext';
import './App.css';

function App() {
  const ctx = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
            {ctx.isLoggedIn ? <Redirect to="/dashboard"/> : <Redirect to="/auth"/> }
        </Route>
        <Route path="/auth" component={SignUpLogIn} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="*">
            <h1 style={{color: 'white', fontSize: '100pt'}}>404 PAGE LATER?</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

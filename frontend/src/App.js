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
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="">
          <SignUpLogIn />
        </Route>
        <Route path="*">
            <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

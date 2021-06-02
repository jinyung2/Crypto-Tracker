import { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SignUpLogIn from './Pages/SignUpLogIn/SignUpLogIn';
import Dashboard from './Pages/Dashboard/Dashboard';
import AuthContext from './store/AuthContext';
import './App.css';
import PageNotFound from './Components/PageNotFound/PageNotFound';

function App() {
  const ctx = useContext(AuthContext);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/">
            {ctx.isLoggedIn ? <Redirect to="/dashboard"/> : <Redirect to="/auth"/> }
        </Route>
        <Route path="/auth">
            {!ctx.isLoggedIn ? <SignUpLogIn/> : <Redirect to="/dashboard" />}
        </Route>
        <Route path="/dashboard">
            {ctx.isLoggedIn ? <Dashboard /> : <Redirect to="/" />}
        </Route>
        <Route path="*">
            <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

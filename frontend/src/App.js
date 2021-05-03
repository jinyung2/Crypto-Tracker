import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signUp">
          <SignUpPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

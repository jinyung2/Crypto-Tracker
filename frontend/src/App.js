import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUpLogIn from "./Pages/SignUpLogIn/SignUpLogIn";
import Dashboard from "./Pages/Dashboard/Dashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <SignUpLogIn />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

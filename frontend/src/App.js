import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUpLogIn from "./Pages/SignUpLogIn/SignUpLogIn";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="">
          <SignUpLogIn />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

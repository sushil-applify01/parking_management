import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import NotFound from "./components/NotFound/NotFound";
import BookParking from "./components/Parking/BookParking";
import Parking from "./components/Parking/Parking";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Parking} />
        <Route path="/book-parking" component={BookParking} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

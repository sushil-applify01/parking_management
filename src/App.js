import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Category from "./components/Category/Category";
import Customers from "./components/Customers/Customers";
import NotFound from "./components/NotFound/NotFound";
import Parking from "./components/Parking/Parking";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Parking} />
        <Route path="/category" component={Category} />
        <Route path="/customers" component={Customers} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

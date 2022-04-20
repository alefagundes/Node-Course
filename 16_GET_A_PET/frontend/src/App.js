/*components*/
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

/*pages*/
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/pages/Home';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';


function App() {
  return (
    <Router>
      <Navbar/>
    <Switch>
    <Route path="/login">
              <Login />
    </Route>
    <Route path="/register">
              <Register />
    </Route>
    <Route path="/">
              <Home />
    </Route>  
    </Switch>
    <Footer/>
    </Router>
  );
}

export default App;

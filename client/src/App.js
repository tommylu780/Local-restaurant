import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import React from "react"
import Landing from './pages/Landing'
import Navbar from "./components/Navbar"
import Shop from "./pages/Shop"


const App = () => {
  return (
    <Router>
      <div>
      <Navbar />
      <Switch>
        <Route exact path ='/' component={Landing} />
        <Route exact path ='/shop' component={Shop} />
      </Switch>
      </div>
    </Router>
  );
}


export default App;



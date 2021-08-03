import {BrowserRouter as Router} from "react-router-dom"
import React from "react"
import Landing from './pages/Landing'


const App = () => {
  return (
    <Router>
      <Landing />
    </Router>
  );
}

// const Container = styled.div`
//   // background: #67bc98;
//   height: 100vh;
// `;

export default App;



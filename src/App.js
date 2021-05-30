import React from 'react'
import {BrowserRouter as Router,Route,Switch, Link} from 'react-router-dom'
import Home from './component/Home'
import LaptopRender from './component/SubHome/LaptopRender'
import 'antd/dist/antd.css'
import './App.css';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

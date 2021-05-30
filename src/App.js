import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import NormalHome from './component/NormalHome'
import ProductHome from './component/ProductHome'

import 'antd/dist/antd.css'
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/product"><ProductHome/></Route>
        <Route path="/"><NormalHome/></Route>
      </Switch>
    </Router>
  );
}

export default App;

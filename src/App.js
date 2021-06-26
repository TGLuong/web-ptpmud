import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import 'antd/dist/antd.css'
import './Style/App.css'
import {useHistory} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Dashboard from './Pages/Dashboard/Dashboard'
import AdminDashboard from './Pages/Admin/AdminDashboard'

function App() {
  const history = useHistory()
  return (
    <Router history={history}>
      <Switch>
        <Route path="/admin"><AdminDashboard/></Route>
        <Route path="/dashboard"><Dashboard/></Route>
        <Route path="/"><Home/></Route>
      </Switch>
    </Router>
  );
}

export default App;

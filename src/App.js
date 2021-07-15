import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import 'antd/dist/antd.css'
import './Style/App.css'
import {useHistory} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Dashboard from './Pages/Dashboard/Dashboard'

function App() {
  const history = useHistory()
  window.addEventListener('click', function(e){
    const cartBtn = document.getElementById('cart-btn')
    if(cartBtn&&!cartBtn.contains(e.target)){  
      const cartPopup = document.getElementById('cart-popup')
      if(cartPopup){
        if(!cartPopup.contains(e.target)){
          if(cartPopup.style.visibility==="visible") cartPopup.style.visibility="hidden"
        }
      }
    }
    const favoriteBtn = document.getElementById('favorite-btn')
    if(favoriteBtn&&!favoriteBtn.contains(e.target)){
      const favoritePopup = document.getElementById('favorite-popup')
      if(favoritePopup){
        if(!favoritePopup.contains(e.target)){
          if(favoritePopup.style.visibility==="visible") favoritePopup.style.visibility="hidden"
        }
      }
    }
  })
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/admin"><AdminDashboard/></Route> */}
        <Route path="/dashboard"><Dashboard/></Route>
        <Route path="/"><Home/></Route>
      </Switch>
    </Router>
  );
}

export default App;

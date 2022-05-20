//import de structure
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes as Switch, Navigate} from 'react-router-dom';
import axios from 'axios';

//components


//pages
import Dashboard from './pages/Dashboard'
import Client from './pages/Client'
import Prestation from './pages/Prestation';
import Facturation from './pages/Facturation';
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';
import EditClient from './pages/EditClient';
import ClientDetail from './pages/ClientDetail';
import EditPrestation from './pages/EditPrestation';
import Commande from './pages/Commande';
import BonDeLivraisonDetail from './pages/BonDeLivraisonDetail';
import FacturationDetail from './pages/FacturationDetail';
import {Navbar} from './component/navbar/Navbar';
//css
import './css/general.css'

function App() {
const [user, setUser] = useState([])

console.log(user);

useEffect(()=>{
  axios.get('/api/user/user-info').then((res)=>{
    const response = res.data;
    setUser(()=>response)
  });
},[])

  const deleteSession = async () =>{
    setUser([]);
    await axios.get("/api/user/signout");
    window.location.reload();
}
  return (
    <Router>
        {user? <Navbar delete={deleteSession} user={user}/>:<div></div>} 
    <div className="container-fluid main-view">
      <div className="row">
        <div className="col-lg-12">
      
              <Switch>
                <Route path="/" element={user?<Dashboard/>:<Navigate to="/connexion"/>}/>

                <Route path="/client" element={user?<Client/>:<Navigate to="/connexion"/>}/>

                <Route path="/prestation" element={user?<Prestation/>:<Navigate to="/connexion"/>}/>

                <Route path="/prestation/edit/:prestaId" element={user?<EditPrestation/>:<Navigate to="/connexion"/>}/>

                <Route path="/facturation" element={user?<Facturation/>:<Navigate to="/connexion"/>}/>

                <Route path="/facturation/:factuId" element={user?<FacturationDetail/>:<Navigate to="/connexion"/>}/>

                <Route path="/inscription" element={user?<Inscription/>:<Navigate to="/connexion"/>}/>

                <Route path="/client/edit/:clientId" element={user?<EditClient/>:<Navigate to="/connexion"/>}/>

                <Route path="/client/:clientId" element={user?<ClientDetail/>:<Navigate to="/connexion"/>}/>

                <Route path="/order" element={user?<Commande/>:<Navigate to="/connexion"/>}/>
                
                <Route path="/order/:orderId" element={user?<BonDeLivraisonDetail/>:<Navigate to="/connexion"/>}/>

                <Route path="/connexion" element={<Connexion/>}/>
              </Switch>
        </div>
        </div>
    </div>
   </Router>
  );
}

export default App;

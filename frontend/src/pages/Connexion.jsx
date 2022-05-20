import React from 'react'

import Logo from '../image/logo-crm-smile-color.png';

import '../css/connexion.css';
const Connexion  = () => {
  return (
    <div className="window-connexion">
       <div className="container">
        <div className="row">
            <div className="col-lg-12">
              <div className="form-content">
                  <div className="circle1"></div>
                  <div className="circle2"></div>
                  <div className="circle3"></div>
                   <form action="/api/user/signin" method="POST" id="formulaire-connexion" className="form-connexion">
                   <img src={Logo} alt="" />
                  <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" defaultValue="colettecros11@gmail.com"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" name="password" defaultValue="soleil34"/>
                  </div>
                  <button type="submit" className=" btn-form btn-1">Connexion</button>
                </form>
              </div>
            </div>
        </div>
    </div>
    </div>
   
  )
}

export default Connexion;
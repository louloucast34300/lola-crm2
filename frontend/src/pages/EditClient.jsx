//structure
import React, {useState, useEffect} from 'react';
import {useParams, Link } from 'react-router-dom';
import axios from 'axios';

//css
import '../css/editclient.css';
import {GiTireIronCross} from 'react-icons/gi'

const EditClient = () => {

const clientId = useParams().clientId;

const [dataForm, setDataForm] = useState([]);
console.log(dataForm);

useEffect(()=>{
    axios.get(`/api/clients/edit-doctor/${clientId}`).then((res)=>{
        console.log("je passe dans axios");
        const response = res.data;
        setDataForm(response);
    }).catch((err)=>{
        console.log("Erreur", err);
    })
},[])


  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-lg-12">
            <div className="header-page">
                <h3 className="header-title"> Modification du Dr.{dataForm.lastname} {dataForm.username}</h3>
                <Link  className="stop-modify-button" to="/client"> <GiTireIronCross/> Annuler les modifications </Link>
              </div>
              <div className="form-content-edit">
              <form action={`/api/clients/update-doctor/${clientId}`} method="POST" className="form-client">
                <div className="row mb-4">
                <div className="col">
                    <div className="form-outline">
                        <input 
                            type="text" 
                            id="username" 
                            className="form-control" 
                            name="username" 
                            placeholder="Prénom" 
                            defaultValue={dataForm.username}/>
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">
                        <input  
                            type="text" 
                            id="lastname" 
                            className="form-control" 
                            name="lastname" 
                            placeholder="Nom"
                            defaultValue={dataForm.lastname}/>
                    </div>
                </div>
                </div>
                <div className="form-outline mb-4">
                    <input 
                        type="text" 
                        id="n_siret" 
                        className="form-control" 
                        name="n_siret" 
                        placeholder="N° de siret du client"
                        defaultValue={dataForm.n_siret}/>
                </div>
                <div className="form-outline mb-4">
                    <input 
                        type="text" 
                        id="address" 
                        className="form-control" 
                        name="address" 
                        placeholder="Adresse postal" 
                        defaultValue={dataForm.address}/>
                </div>
                <div className="form-outline mb-4">
                    <input 
                        type="email" 
                        id="email" 
                        className="form-control"  
                        name="email" 
                        placeholder="Email"
                        defaultValue={dataForm.email}/>
                </div>
                <div className="form-outline mb-4">
                    <input 
                        type="number" 
                        id="phone" 
                        className="form-control" 
                        name="phone" 
                        placeholder="Téléphone"
                        defaultValue={dataForm.phone}/>
                </div>
                <div className="form-outline mb-4">
                    <textarea 
                    className="form-control" 
                    id="infos"  
                    name="infos" 
                    rows="4" 
                    placeholder="Informations complémentaires"
                    defaultValue={dataForm.infos}></textarea>
                </div>
                    <button type="submit" className="btn-form">Enregistrer les modifications</button>
            </form>
                </div>
            </div> 
            </div>
        </div>

  )
}

export default EditClient
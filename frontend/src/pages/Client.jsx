//structure
import React, {useState,useEffect} from 'react';
import {useLocation, Link} from 'react-router-dom';
import axios from 'axios';

//css & icons
import '../css/clients.css'
import {AiOutlinePlus} from 'react-icons/ai'
import {GiTireIronCross} from 'react-icons/gi'
import {FiEdit} from 'react-icons/fi'
import {BsEye} from 'react-icons/bs'
import {IoIosArrowForward} from 'react-icons/io'


const Client = () => {

const [popUpForm, setPopUpForm] = useState(false); // ouvrir-fermer le formulaire 
const [popUpDelet, setpopUpDelet] = useState(false); // ouvrir-fermer le pop-up delete
const [messageSuccess,setMessageSuccess] = useState("");// message dans l'URL après formulaire réussi
const [dataClient, setDataClient] = useState([]); // récupère toutes les data des clients
const [dataTargetClient, setdataTargetClient]= useState(""); // récupère le nom du client pour la popUp delete
const [dataTargetID, setDataTargetID] = useState(""); // récupère l'ID du client pour la requete delete
const [buttonName, SetButtonnName] = useState(''); // ajouter le nom dynamiquement sur le bouton du formulaire de création d'un client
const location = useLocation();// pour récupèrer le message de réussite de l'ajout d'un client dans les paramètres de l'url

console.log(dataClient);
useEffect(()=>{
    decodeQuery();
    GetData();
},[])

const activePopUp = (e) =>{ // event au click pour switch entre la liste et le formulaire (opération ternaire au niveau du rendu.)
    e.preventDefault();
    setPopUpForm(true);
}
const DesactivePopUp = (e) =>{ //event au click pour switch entre la liste et le formulaire (opération ternaire au niveau du rendu.)
    e.preventDefault();
    setPopUpForm(false);
}
const decodeQuery = () =>{ // pour récupérer le message dans l'url après validationn du formulaire
    const decode = decodeURIComponent(location.search);
    const decode2 =  decode.split("=").pop()
    setMessageSuccess(decode2)
    console.log(decode2);
}
const NameButton= (e) =>{
    e.preventDefault();
    const value = e.target.value;
    SetButtonnName(value);
}
const acitveDeletePopUp = (e) =>{ // ouvre la popup delete et fait un filtre sur la data pour cibler l'élément.
    e.preventDefault();
    setdataTargetClient("")
    const value = e.target.parentElement.id
    const findData =dataClient.filter((client)=> client._id === value);
    const result = findData[0].lastname;
    setDataTargetID(value);
    setdataTargetClient(result);
    setpopUpDelet(true)
}
const desactiveDeletePopUp = (e) =>{ // event au click de la popUp delete au niveau du bouton RETOUR 
    e.preventDefault();
    setdataTargetClient("");
    setpopUpDelet(false);
}
const GetData = () =>{ // récupère la data des clients 
    axios.get(`/api/clients`).then((res)=>{
        const response = res.data;
        setDataClient(response);
    })
}
const DeleteData = (e) =>{ // delete la data ciblé , ferme la popUp delete et recharge la page. 
    const value = e.target.value;
    axios.delete(`/api/clients/delete/${value}`);
    setpopUpDelet(false);
    window.location.reload();
}

  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-lg-12">
            {popUpDelet?
            <div className="popup-background">
           <div className="popup-content">
           <div className="popup-element">
              <p className="popup-title1">Êtes-vous sûre de vouloir supprimer le <span>Dr.{dataTargetClient}</span> de votre fichier ?</p> 
              <p className="popup-title2">Cette action est irréversible</p>
              <div className="popup-buttons">
                  <button  onClick={desactiveDeletePopUp} className="popup-button1">Retour</button>
                  <button value={dataTargetID} onClick={DeleteData} className="popup-button2">Supprimer</button>
            </div>
           </div>
        </div>
       </div>
            :
            <div>
            </div>
            }
            {popUpForm? 
            <div>
            <div className="header-page">
                <h3 className="header-title">Clients</h3>
                
                <button onClick={DesactivePopUp}> <GiTireIronCross/> Fermer formulaire </button>
              </div>
              <div className="form-content-new">
              <form action="/api/clients/new-doctor" method="POST" className="form-client">
                <div className="row mb-4">
                <div className="col">
                    <div className="form-outline">
                        <input type="text" id="username" className="form-control" name="username" placeholder="Prénom"/>
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">
                        <input onChange={NameButton} type="text" id="lastname" className="form-control" name="lastname" placeholder="Nom"/>
                    </div>
                </div>
                </div>
                <div className="form-outline mb-4">
                    <input type="text" id="n_siret" className="form-control" name="n_siret" placeholder="N° de siret du client"/>
                </div>
                <div className="form-outline mb-4">
                    <input type="text" id="address" className="form-control" name="address" placeholder="Adresse postal" />
                </div>
                <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <input type="text" id="postal_code" className="form-control" name="postal_code" placeholder="Code postal" />
                    </div>
                    </div>
                        <div className="col">
                            <div className="form-outline">
                            <input type="text" id="city" className="form-control" name="city" placeholder="Ville" />
                        </div>
                    </div>
                </div>
                <div className="form-outline mb-4">
                    <input type="email" id="email" className="form-control"  name="email" placeholder="Email"/>
                </div>
                <div className="form-outline mb-4">
                    <input type="number" id="phone" className="form-control" name="phone" placeholder="Téléphone"/>
                </div>
                <div className="form-outline mb-4">
                    <textarea className="form-control" id="infos"  name="infos" rows="4" placeholder="Informations complémentaires"></textarea>
                </div>
                    <button type="submit" className="btn-form">Enregistrer le Dr. {buttonName}</button>
            </form>
                </div>
            </div>
            : 
            <div>
                <div className="header-page">
                    <h3 className="header-title">Clients</h3>
                    <div>
                        <h3 className={messageSuccess===""?"message-success":"message-success active"}>{messageSuccess}</h3>
                    </div>
                    <button onClick={activePopUp}> <AiOutlinePlus/> Ajouter Client</button>
                </div>
                <div className="table-content">
                <div className="row table-list">
                    <div className="col-lg-3">Docteur</div>
                    <div className="col-lg-3">email</div>
                    <div className="col-lg-3">téléphone</div>
                    <div className="col-lg-3">actions</div>
                </div>
                {dataClient.map((client,index)=>{
                        return(
                        <div className="row table-item" key={index}>
                            <div className="col-lg-3">Dr. {client.lastname} {client.username}</div>
                            <div className="col-lg-3 email-col"><p>{client.email}</p></div>
                            <div className="col-lg-3 phone-col"><p>{client.phone}</p></div>
                            <div className="col-lg-2 action-col"><Link to={`/client/edit/${client._id}`}><FiEdit/></Link> <a id={client._id} onClick={acitveDeletePopUp}><GiTireIronCross/></a> <Link to={{pathname:`/client/${client._id}`}}><BsEye/></Link></div>
                            <div className="col-lg-1 arrow-col"><Link to={{pathname:`/client/${client._id}`}}><IoIosArrowForward/></Link></div>
                        </div>
                        )
                    })}
                </div>
            </div>
            }
        </div>
    </div>
    </div>
  )
}

export default Client
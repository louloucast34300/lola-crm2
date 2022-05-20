import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';

//css
import '../css/propre.css'
import '../css/clientDetail.css';

import {MdOutlineMessage} from 'react-icons/md';
import {AiOutlinePhone} from 'react-icons/ai';
import {FiEdit} from 'react-icons/fi';
import {GiTireIronCross} from 'react-icons/gi'
import {BsEye} from 'react-icons/bs'
import {IoIosArrowBack} from 'react-icons/io';

const ClientDetail = () => {
const nf = "non fournie"
const client = useParams().clientId;

const [clientData, setClientData] = useState([{
    username:nf,
    lastname:nf,
    email:nf,
    phone:nf,
    n_siret:nf,
    address:nf,
}]);

const [clientCommande,setCLientCommande] = useState([]);
const [clientFactu, setClientFactu] = useState([]);


console.log(
  clientFactu, clientData.lastname
);



useEffect(()=>{
    GetData();
    GetCommande();

},[])

const GetData = async () =>{
     await axios.get(`/api/clients/detail/${client}`).then((res)=>{
        const response = res.data;
        setClientData(response);

          axios.get(`/api/factu/get-factu-doctor/${response.lastname}`).then((res)=>{
          const response = res.data;
          setClientFactu(response);
        })
    }).catch((err)=>{
        console.log("Erreur", err);
    })
  
}
const GetCommande = async () =>{
  await axios.get(`/api/clients/commande-client/${client}`).then((res)=>{
    const response = res.data;
    setCLientCommande(response)
  })
}




  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-lg-12">
                <div className="header-client-detail">
                    <h3 className="header-title">Fiche Client</h3>
                    <div>
                        <button className="btn-style-1"> <Link className="link-version-btn"to="/client"><IoIosArrowBack/> Retour</Link></button>
                        <button className="btn-style-1"><MdOutlineMessage/> Envoyer un message</button>
                        <button className="btn-style-1"><AiOutlinePhone/> Appeler le client</button>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="left-content-client-detail">
                    <div className="left-bloc-cd">
                        <h3>{clientData.lastname} {clientData.username}</h3>
                        <p className="text-color-client-detail mt-30"><span>N°siret : </span> {clientData.n_siret}</p>
                        <p className="text-color-client-detail mt-30"><span>Email : </span> {clientData.email}</p>
                        <p className="text-color-client-detail mt-30"><span>Numéro tel 1 : </span> {clientData.phone}</p>
                        <p className="text-color-client-detail mt-30"><span>Numéro tel 2 : </span> non fournie</p>
                        <p className="text-color-client-detail mt-30"><span>Adresse : </span> {clientData.address}</p>
                        <p className="text-color-client-detail mt-30"><span>Heure locale : </span> 12:30 pm</p>
                        <div className="btn-left-bloc-cd">
                            <Link className="link-left-bloc" to={`/client/edit/${clientData._id}`}><FiEdit/> Modifier</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="right-content-client-detail">
 
  <div class="row justify-content-center ">
    <div class="col-lg-12">
      <ul class="nav nav-tab-pan-client-detail">
        <li class="nav-item">
          <a class="nav-link link-secondary active" id="commandes-tab" data-bs-toggle="tab" data-bs-target="#commande" href="#">Flux de production</a>
        </li>
        <li class="nav-item">
          <a class="nav-link link-secondary " id="attente-tab" data-bs-toggle="tab" data-bs-target="#attente" href="#">En attente</a>
        </li>
        <li class="nav-item">
          <a class="nav-link link-secondary" id="patient-tab" data-bs-toggle="tab" data-bs-target="#patient" href="#">Patients</a>
        </li>
        <li class="nav-item">
          <a class="nav-link link-secondary  " id="facture-tab" data-bs-toggle="tab" data-bs-target="#facture" href="#">Factures</a>
        </li>

      </ul>

      <div class="tab-content" id="tabContent">
        <div class="tab-pane fade show active" id="commande" role="tabpanel" aria-labelledby="commandes-tab">
          <div className="container-fluid">
            {clientCommande.map((item,index)=>{
            return(
              <Link className="presta-link"key={index} to="#">
                <div className="row row-list">
                    <div className="col-lg-2">
                        <p className="color-3 f-little">Bon de livraison</p>
                        <p className="line-0">N°{item.number_order}</p>
                    </div>
                    <div className="col-lg-2">
                        <p className="color-5 f-little">Date de livraison</p>
                        <p className="line-0 f-little">{item.date_of_creation}</p>
                    </div>
                    <div className="col-lg-4">
                        <p className="color-5 f-little ">Contenu</p>
                        <p className="line-0 f-little">{item.flux[0].presta}</p>
                    </div>
                    <div className="col-lg-2">
                        <p className="color-5 f-little margin-neg">options</p>
                    <Link to='#'><FiEdit/></Link> <a  id='#'><GiTireIronCross/></a> <Link  to={`/order/${item._id}`}><BsEye/></Link>
                    </div>
                    <div className="col-lg-2">
                        <p className="color-5 f-little">Prix</p>
                        <p className="line-0 f-medium">{item.price}€</p>
                    </div>
                </div>
            </Link>
            )
          })}
          </div>
        </div>
        <div class="tab-pane fade" id="attente" role="tabpanel" aria-labelledby="attente-tab">
        <div className="container-fluid">
               {clientFactu.filter(el => el.definitive === false && el.canceled === false).slice(0).reverse().map((item,index)=>{
            return (
              <div key={index}className="row row-list">
              <div className="col-lg-1">
                <p className={item.canceled?"color-3-cancel f-little":"color-3 f-little"}>Facture</p>
                <p className="line-30">N°{item.number_order_facture}</p>
              </div>
              <div className="col-lg-3">
                <p className={item.canceled?"color-3-cancel f-little":"color-3 f-little"}>Statut</p>
                <p className="color-1 f-medium line-30">{item.canceled? "Facture annulée": item.definitive?"Facture définitive" : "Pro forma"}</p>
              </div>
              <div className="col-lg-3">
                <p className="color-5 f-little">Date de création</p>
                <p className="line-30 f-little">{item.date_of_creation}</p>
            </div>
              <div className="col-lg-3">
                <p className={item.canceled?"color-3-cancel f-little":"color-3 f-little"}>Docteur</p>
                <p className="color-1 f-medium line-30">{item.doctor}</p>
              </div>
                <div className="col-lg-2">
                <p className={item.canceled?"color-3-cancel f-little":"color-3 f-little"}>Prix total</p>
                <p className="color-1 f-medium line-30">{item.total}€</p>
              </div>
              </div>
            )
          })}
          </div>
        </div>
        <div class="tab-pane fade" id="patient" role="tabpanel" aria-labelledby="patient-tab">
          <p>Listes des patients</p>
        </div>
        <div class="tab-pane fade " id="facture" role="tabpanel" aria-labelledby="patient-tab">
          <div className="container-fluid">
               {clientFactu.filter(el => el.definitive === true || el.canceled===true).slice(0).reverse().map((item,index)=>{
            return (
              <div key={index}className="row row-list">
              <div className="col-lg-1">
                <p className={item.canceled?"color-3-cancel f-little":"color-3 f-little"}>Facture</p>
                <p className="line-30">N°{item.number_order_facture}</p>
              </div>
              <div className="col-lg-3">
                <p className={item.canceled?"color-3-cancel f-little":"color-3 f-little"}>Statut</p>
                <p className="color-1 f-medium line-30">{item.canceled? "Facture annulée": item.definitive?"Facture définitive" : "Pro forma"}</p>
              </div>
              <div className="col-lg-3">
                <p className="color-5 f-little">Date de création</p>
                <p className="line-30 f-little">{item.date_of_creation}</p>
            </div>
              <div className="col-lg-3">
                <p className={item.canceled?"color-3-cancel f-little":"color-3 f-little"}>Docteur</p>
                <p className="color-1 f-medium line-30">{item.doctor}</p>
              </div>
                <div className="col-lg-2">
                <p className={item.canceled?"color-3-cancel f-little":"color-3 f-little"}>Prix total</p>
                <p className="color-1 f-medium line-30">{item.total}€</p>
              </div>
              </div>
            )
          })}
          </div>
       
        </div>
      </div>
    </div>
  </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default ClientDetail
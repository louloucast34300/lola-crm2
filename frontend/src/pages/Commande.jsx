import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import '../css/propre.css';
import '../css/commande.css';
import {AiOutlinePlus} from 'react-icons/ai';
import {GiTireIronCross} from 'react-icons/gi'
import {FiEdit} from 'react-icons/fi'
import {BsEye} from 'react-icons/bs'


const Commande = () => {

const [calculTotalFlux,setCalculTotalFlux] = useState(0);
const [popUpForm, setPopUpForm] = useState(false);
const [messageSuccess] = useState('')
const [presta, setPresta] = useState([])
const [client, setClient] = useState([]);
const [patient, setPatient] = useState("");
const [doctorName, setDoctorName] = useState([])
const [date, setDate] = useState('')
/* le flux de production */
const [fluxList, setFluxList] = useState([]);
const [flux, setFlux] = useState([
    {  presta:'',teintier:'', teinte:'', nbr_teeth:[], price_presta:'', remise_presta:''}
]);

const [livraisonSearch, setLivraisonSearch] = useState('');
const [doctorSearch, setDoctorSearch] = useState('');
const [patientSearch, setPatientSearch] = useState('');
const [dateSearch, setDateSearch] = useState('');
const [counterFlux, setCounterFlux] = useState(0);

//push bon de livraison pour facturation
const [verifyFluxSelected,setVerifyFluxSelected] = useState(0);
const [fluxArray, setFLuxArray] = useState([])
const [FactuType] = useState('')
const [doctorFactu, setDoctorFactu] = useState('');

// PopUp Facturation
const [activeFactu, setActiveFactu] = useState(false);
//
//const handle_change_factu = (e) =>{
   // const value = e.target.value;
   // setFactuType(value)
//}
//
const handle_change_doctor_facture = (e) =>{
    const value = e.target.value;
    setDoctorFactu(value);
}

const calculNumberFlux = (response) =>{
    let counter = 0;
    for(let i = 0; i< response.length ; i++){
        if(response[i].inside_facture === false){
            counter += 1;
        }
    }
    setCounterFlux(counter)
}


const createFacture = async () =>{
    const flux = await [...fluxArray]
    const data =[{
        doctor: doctorFactu,
        type: FactuType,
        flux: flux,
    }];
   await axios.post('/api/factu/create-factu', data);
   window.location.replace('/facturation');
}






const activePopFactu = () =>{
    setActiveFactu(true);
}
const desactivePopFactu = () =>{
    setActiveFactu(false);
}
useEffect(()=>{
    getFlux();
    getClient();
    getPresta();
    date_of_day();
},[]);



const date_of_day = () =>{
    const today = new Date();
    let jj = today.getDate();
    let mm = today.getMonth()+1;
    const aaaa = today.getFullYear()
    if(mm <10){
        mm = '0'+ mm
    }
    if(jj < 10){
        jj = '0'+ jj
    }
    const dateResult = `${jj}/${mm}/${aaaa}`
    setDate(dateResult)
    console.log(date);
}
const activePopUp = (e) =>{ // event au click pour switch entre la liste et le formulaire (opération ternaire au niveau du rendu.)
    e.preventDefault();
    setPopUpForm(true);

}
const DesactivePopUp = (e) =>{ //event au click pour switch entre la liste et le formulaire (opération ternaire au niveau du rendu.)
    e.preventDefault();
    setPopUpForm(false);
    setFLuxArray([]);
}
const getPresta = () =>{
    axios.get('/api/prestations').then((res)=>{
        const response = res.data;
        setPresta(response);
    })
}
const getClient = ()=>{
    axios.get('/api/clients').then((res)=>{
        const response = res.data;
        setClient(response)
    })
}
const getFlux = () =>{
    axios.get('/api/order').then((res)=>{
        const response  = res.data;
        calcul_total_price_flux(response);
        calculNumberFlux(response);
        setFluxList(response)
    })
}
function calcul_total_price_flux  (response) {
    let value = 0; 
    for(let i = 0; i < response.length; i++){
        if(response[i].inside_facture === false){
            value += response[i].price;
        }
    }
    setCalculTotalFlux(value)
}
async function handle_Submit(e){
    e.preventDefault();
   await axios.post('/api/order/new-order',{
        flux_de_prod:flux,
        doctor:doctorName,
        patient:patient,
        date:date,
    });
    window.location.reload();
}
const handle_Current_Doctor = (e) =>{
    e.preventDefault()
    const value = e.target.value;
    const getData = client.filter((item)=>item.lastname === value)
    setDoctorName(getData)
}
const handle_Add_Select = ()=>{
    setFlux([...flux,{presta:'',teintier:'', teinte:'', nbr_teeth:[],price_presta:'',remise_presta:''}])
}
const handle_Current_Presta = (index, e) =>{
e.preventDefault();
const element = e.target.value
console.log(element);
const getData = presta.filter((item)=>item.title_presta === element);
const data = getData[0].price_presta
flux[index].price_presta = data
const values = [...flux];
flux[index][e.target.name] = e.target.value;
setFlux(values);
}
const handle_Current_Teintier = (index,e) =>{
    e.preventDefault();
    const values = [...flux];
    flux[index][e.target.name] = e.target.value;
    setFlux(values);
}
const handle_Current_Teinte = (index,e) =>{
    e.preventDefault();
    const values = [...flux];
    flux[index][e.target.name] = e.target.value;
    setFlux(values);
}
const handle_Teeth = (index,e) =>{
    const array = flux[index][e.target.name]
    const arrayLocal = []
    const value = e.target.value
    if(e.target.checked){
        arrayLocal.push(value)
        array.push(arrayLocal[0])
    }else if(!e.target.checked ){
        for(var i = 0; i < array.length; i++){
            if ( array[i] === value) { 
                array.splice(i, 1); 
            }
        
        }
    }
setFlux([...flux],array)
}
const handle_Change_Price = (index,e) =>{
    e.preventDefault();
    const values = [...flux];
    flux[index][e.target.name] = e.target.value;
    setFlux(values);
}
const handle_Remise = (index, e) =>{
    e.preventDefault();
    const values = [...flux];
    const price = flux[index].price_presta
    const afterRemise = (Math.round(parseFloat(price)*e.target.value)/100).toFixed(2)
    const newPrice = price - afterRemise
    console.log(newPrice);
    flux[index].price_presta = newPrice;
    flux[index][e.target.name] = e.target.value;
    setFlux(values)
}
const handle_Patient_Name = (e) =>{
    const value = e.target.value;
    setPatient(value)
}
const handle_Livraison_Search = (e) =>{
    const value = e.target.value;
    setLivraisonSearch(value) 
}
const handle_doctor_Search = (e) =>{
    const value = e.target.value;
    setDoctorSearch(value) 
}
const handle_patient_Search = (e) =>{
    const value = e.target.value;
    setPatientSearch(value) 
}
const handle_date_Search = (e) =>{
    const value = e.target.value;
    setDateSearch(value) 
}
const verifyChecked = (e) =>{
    let counter = verifyFluxSelected;
    const checked = e.target.checked;
    const id = e.target.value;
    const flux = [...fluxList]
    let array = [...fluxArray];
    let element = '';
    if(checked){
       const findElement = flux.filter(t => t._id === id);
       element = findElement;
       array.push(element[0])
       counter += 1;
    }else if(!checked){
        array.splice(array.findIndex(function(i){
            return i._id === id;
        }),1)
        counter -= 1;
    }
    setFLuxArray(array.flat());
    setVerifyFluxSelected(counter);
}


  return (
      <>   
       {popUpForm?
       <div>
            <div className="header-page">
                <h3 className="header-title">Nouveau Flux de production</h3>
                <button className="btn-style-1" onClick={DesactivePopUp}> <GiTireIronCross/> Fermer formulaire </button>
              </div>
              <form className="form-margin" onSubmit={handle_Submit}>
{/*DOCTEUR*/}
<div className="container-fluid">
    <div className="row first-row-commande">
        <div className="col-lg-6">
        <select name="doctor" id="doctor"  className="form-select" onChange={handle_Current_Doctor}>
            <option value="Choisir un docteur"  >Choisir un docteur </option>
            {client.map((item,index)=>{
                return(
                    <option key={index}  value={item.lastname}>Dr. {item.lastname}</option>
                )
            })}
        </select>
        </div>
        <div className="col-lg-6 col-margin">
            <label htmlFor="patient" className="label-patient">Nom ou code Patient :</label>
            <input type="text" id="patient" className="patient-input" onChange={handle_Patient_Name}/>
        </div>
    </div>
</div>


{/*PRESTATION*/}
    {flux.map((item,index)=>{
        return(
            <div className="presta-part">
                <div className="presta-content-flex" style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <select key={index} name="presta" id="presta" className="form-select" onChange={(e)=>handle_Current_Presta(index,e)}>
                    <option  value="">Choisir une prestation</option>
                    {presta.map((item,index)=>{
                        return(
                            <option key={index} value={item.title_presta}>{item.title_presta}</option>
                        )
                    })}
                </select>
                <p className="price-info">{item.price_presta}€</p>
                </div>
                <div className="input-pesta-part">
                    <div>
                    <label className="label-input" htmlFor="teintier">Teintier : </label>
                    <input className="input-presta" name="teintier" type="text" onChange={(e) =>handle_Current_Teintier(index,e)}/>
                    </div>
                    <div>
                    <label className="label-input" htmlFor="teinte">Teintes</label>
                    <input className="input-presta" name="teinte" type="text" onChange={(e) =>handle_Current_Teinte(index,e)}/>
                    </div>
                    <div>
                    <label className="label-input" htmlFor="quantity">Quantité</label>
                    <input className="input-presta" name="quantity" type="text" defaultValue="1"/>
                    </div>
                    <div>
                    <label className="label-input" htmlFor="prix">Prix unitaire </label>
                    <input  className="input-presta" type="number" name="price_presta"defaultValue={flux.price_presta} onChange={(e)=>handle_Change_Price(index,e)} />
                    </div>
                   <div>
                    <label className="label-input" htmlFor="prix">Remise (%)</label>
                     <input className="input-presta" type="number"  name="remise_presta" onChange={(e)=>handle_Remise(index,e)}/>
                   </div>
                </div>
                <div className="teeth-part">
                    <input type="checkbox" id={`t16-${index}`} name="nbr_teeth" value="16" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t16-${index}`} className="teeth bgt16">16</label>
                    <input  type="checkbox" id={`t15-${index}`} name="nbr_teeth" value="15" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t15-${index}`} className="teeth bgt15">15</label>
                    <input type="checkbox" id={`t14-${index}`} name="nbr_teeth" value="14" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t14-${index}`} className="teeth bgt14">14</label>
                    <input type="checkbox" id={`t13-${index}`} name="nbr_teeth" value="13" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t13-${index}`} className="teeth bgt13">13</label>
                    <input type="checkbox" id={`t12-${index}`} name="nbr_teeth" value="12" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t12-${index}`} className="teeth bgt12">12</label>
                    <input type="checkbox" id={`t11-${index}`} name="nbr_teeth" value="11" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t11-${index}`} className="teeth bgt11">11</label>
                    <input type="checkbox" id={`t10-${index}`} name="nbr_teeth" value="10" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t10-${index}`} className="teeth bgt10">10</label>
                    <input type="checkbox" id={`t9-${index}`} name="nbr_teeth" value="9" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t9-${index}`} className="teeth teeth-space bgt9">09</label>
                    <input type="checkbox" id={`t8-${index}`} name="nbr_teeth" value="8" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t8-${index}`} className="teeth bgt8">08</label>
                    <input type="checkbox" id={`t7-${index}`} name="nbr_teeth" value="7" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t7-${index}`} className="teeth bgt7">07</label>
                    <input type="checkbox" id={`t6-${index}`} name="nbr_teeth" value="6" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t6-${index}`} className="teeth bgt6">06</label>
                    <input type="checkbox" id={`t5-${index}`} name="nbr_teeth" value="5" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t5-${index}`} className="teeth bgt5">05</label>
                    <input type="checkbox" id={`t4-${index}`} name="nbr_teeth" value="4" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t4-${index}`} className="teeth bgt4">04</label>
                    <input type="checkbox" id={`t3-${index}`} name="nbr_teeth" value="3" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t3-${index}`} className="teeth bgt3">03</label>
                    <input type="checkbox" id={`t2-${index}`} name="nbr_teeth" value="2" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t2-${index}`} className="teeth bgt2">02</label>
                    <input type="checkbox" id={`t1-${index}`} name="nbr_teeth" value="1" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t1-${index}`} className="teeth bgt1">01</label>
                </div>

                <div className="teeth-part teeth-bottom">
                    <input type="checkbox" id={`t17-${index}`} name="nbr_teeth" value="17" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t17-${index}`} className="teeth bgt17">17</label>
                    <input  type="checkbox" id={`t18-${index}`} name="nbr_teeth" value="18" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t18-${index}`} className="teeth bgt18">18</label>                 
                    <input type="checkbox" id={`t19-${index}`} name="nbr_teeth" value="19" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t19-${index}`} className="teeth bgt19">19</label>              
                    <input type="checkbox" id={`t20-${index}`} name="nbr_teeth" value="20" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t20-${index}`} className="teeth bgt20">20</label>           
                    <input type="checkbox" id={`t21-${index}`} name="nbr_teeth" value="21" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t21-${index}`} className="teeth bgt21">21</label>
                    <input type="checkbox" id={`t22-${index}`} name="nbr_teeth" value="22" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t22-${index}`} className="teeth bgt22">22</label>
                    <input type="checkbox" id={`t23-${index}`} name="nbr_teeth" value="23" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t23-${index}`} className="teeth bgt23">23</label>
                    <input type="checkbox" id={`t24-${index}`} name="nbr_teeth" value="24" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t24-${index}`} className="teeth teeth-space bgt24">24</label>
                    <input type="checkbox" id={`t25-${index}`} name="nbr_teeth" value="25" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t25-${index}`} className="teeth bgt25">25</label>
                    <input type="checkbox" id={`t26-${index}`} name="nbr_teeth" value="26" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t26-${index}`} className="teeth bgt26">26</label>
                    <input type="checkbox" id={`t27-${index}`} name="nbr_teeth" value="27" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t27-${index}`} className="teeth bgt27">27</label>
                    <input type="checkbox" id={`t28-${index}`} name="nbr_teeth" value="28" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t28-${index}`} className="teeth bgt28">28</label>
                    <input type="checkbox" id={`t29-${index}`} name="nbr_teeth" value="29" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t29-${index}`} className="teeth bgt29">29</label>
                    <input type="checkbox" id={`t30-${index}`} name="nbr_teeth" value="30" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t30-${index}`} className="teeth bgt30">30</label>
                    <input type="checkbox" id={`t31-${index}`} name="nbr_teeth" value="31" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t31-${index}`} className="teeth bgt31">31</label>
                    <input type="checkbox" id={`t32-${index}`} name="nbr_teeth" value="32" onChange={(e) =>handle_Teeth(index,e)}/>
                        <label htmlFor={`t32-${index}`} className="teeth bgt32">32</label>
                    </div>
                    <div>  
                </div>
            </div> 
        )
    })}
    <div className="add-presta">
        <button className="btn-style-2" type="button" onClick={handle_Add_Select}>Ajouter une prestation</button>
        <button className="btn-style-3" onClick={handle_Submit}>Valider le bon de livraison</button>
    </div>
</form>
       </div>
       :// partie list ici....
       <div className="list-part">
           {activeFactu? 
        <div className="background-popup-factu">
            <div className="popup-factu">
                <div className="form-factu">
                <div className="d-row-flex">
                    <div className="form-group">
                          <label htmlFor=""> Pour quel client voulez-vous facturer ?</label>
                    <select name="" id="" className="form-select" onChange={handle_change_doctor_facture}>
                        <option value="">Choisir un docteur</option>
                        {client.map((item,index)=>{
                            return(
                                <option key={index} value={item.lastname}>{item.lastname}</option>
                            )
                        })}
                    </select>
                    </div>
                </div>
                  
                <div className="recap-factu">
                            <h2>Récapitulatif des bons de livraison à facturer</h2>
                            {fluxArray.map((item,index)=>{
                                return(
                                    <div className="row row-list">
                                        <div className="col-lg-3">
                                            <p className="color-3 f-little">Bon de livraison</p>
                                            <p className="line-0">N°{item.number_order}</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <p className="color-5 f-little">Date de livraison</p>
                                            <p className="line-0 f-little">{item.date_of_creation}</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <p className="color-5 f-little ">Contenu</p>
                                            <p className="m-neg-10 f-little">{item.flux[0].presta}</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <p className="color-5 f-little">Prix</p>
                                            <p className="line-0 f-medium">{item.price}€</p>
                                        </div>
                                    </div>
                                )
                            })}

                    </div>
                    <div className="btn-factu">
                        <button type="submit" className="btn-style-1" onClick={createFacture}>Générer la facture</button>
                        <button className="btn-style-3" onClick={desactivePopFactu}>Revenir à la liste</button>
                    </div>
                </div>
            </div>
        </div>
           :
           <div></div>
         }
             <div className="header-page">
                    <h3 className="header-title">Flux de production</h3>
                    <div>
                        <h3 className={messageSuccess===""?"message-success":"message-success active"}>{messageSuccess}</h3>
                    </div>
                    <div className="calcul-total-flux">
                        <p>Nombre de résultat :&nbsp; <span>{counterFlux}</span> </p>
                        <p>Valeur totale :&nbsp;<span>{calculTotalFlux}€</span></p>
                    </div>
                    {verifyFluxSelected > 0?<button className="btn-style-1" onClick={activePopFactu}> <AiOutlinePlus/> Créer une facture </button>:""}
                     <button className="btn-style-1" onClick={activePopUp}> <AiOutlinePlus/> Ajouter un bon de livraison</button>
                </div>
                <div className="container-fluid commande-list m-50">
                    <div className="row radius-top bg-1 p-10">
                        <div className="col-lg-3 d-col-flex">
                            <label className="label-style-1" htmlFor="n_livraison">N° de livraison :</label>
                            <input className="input-style-1" type="text" id="n_livraison" onChange={handle_Livraison_Search} />
                        </div>
                        <div className="col-lg-3 d-col-flex">
                            <label  className="label-style-1" htmlFor="n_docteur">Docteur :</label>
                            <input  className="input-style-1" type="text" id="n_docteur" onChange={handle_doctor_Search}/>
                        </div>
                        <div className="col-lg-3 d-col-flex">
                            <label className="label-style-1" htmlFor="n_patient">Patient :</label>
                            <input className="input-style-1" type="text" id="n_patient" onChange={handle_patient_Search}/>
                        </div>
                        <div className="col-lg-3 d-col-flex">
                            <label className="label-style-1" htmlFor="n_date">Date du bon :</label>
                            <input className="input-style-1" type="text" id="n_date" onChange={handle_date_Search}/>
                        </div>
                    </div>
                        {fluxList.filter((a) => {
                            return a.doctor[0].lastname.includes(doctorSearch)
                        }).filter((a)=>{
                            return a.patient.includes(patientSearch)
                        }).filter((a)=>{
                            return a.date_of_creation.includes(dateSearch)
                        }).filter((a)=>{
                            return a.number_order.toString().includes(livraisonSearch)
                        }).filter((a)=> a.inside_facture === false)
                        .slice(0).reverse().map((item,index)=>{
                            return(
                              
                                    <div className="row row-list">
                                        <div className="col-lg-2">
                                            <p className="color-3 f-little">Bon de livraison</p>
                                            <p className="line-0">N°{item.number_order}</p>
                                            
                                        </div>
                                        <div className="col-lg-2">
                                            <p className="color-3 f-little">Docteur</p>
                                            <p className="color-1 f-medium line-0">{item.doctor[0].lastname}</p>
                                            <p className='color-5 f-little line-0'>{item.patient}</p>
                                        </div>
                                        <div className="col-lg-2">
                                            <p className="color-5 f-little">Date de livraison</p>
                                            <p className="line-0 f-little">{item.date_of_creation}</p>
                                        </div>
                                        <div className="col-lg-2">
                                            <p className="color-5 f-little ">Contenu</p>
                                            <p className="m-neg-10 f-little">{item.flux[0].presta}</p>
                                        </div>
                                        <div className="col-lg-2">
                                            <p className="color-5 f-little margin-neg">options</p>
                                       <Link to='#'><FiEdit/></Link> <a  id='#'><GiTireIronCross/></a> <Link  to={{pathname:`/order/${item._id}`}}><BsEye/></Link>
                                        </div>
                                        <div className="col-lg-2">
                                            <p className="color-5 f-little">Prix</p>
                                            <p className="line-0 f-medium">{item.price}€</p>
                                        </div>
                                        <div className="col-lg-4">
                                        <div class="demo">
                                            <label class="toggle" for={`checkbox_${item._id}`}>
                                                <input type="checkbox" class="toggle__input btn-checkbox" id={`checkbox_${item._id}`} value={item._id} onChange={verifyChecked}  />
                                                <span class="toggle-track">
                                                    <span class="toggle-indicator">
                                                        <span class="checkMark">
                                                            <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                                                <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                                            </svg>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                        }
            </>

        )
        }

export default Commande

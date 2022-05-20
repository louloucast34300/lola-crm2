import React, {useState,useEffect} from 'react';
import axios from 'axios'

import '../css/pdf.css';
import Logo from '../image/smile-art-logo-facture.png';

export const Print_BonDeLivraison = React.forwardRef((props, ref) => {
  const [date, setDate] = useState('')
  const [data, setData] = useState({
    number_order:0,
    patient:'',
    price:0,
    doctor:[
      {lastname:'', username:'', address:'', n_siret:''}
    ],
    flux:[]
  })

console.log(data);
useEffect(()=>{
  getData();
  getDate();
},[])

  
const getData = () =>{
 axios.get(`/api/order/detail/${props.id}`)
 .then((res)=>{
   const response = res.data;
  setData(response);
 })
}
const getDate = () =>{
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
    console.log(dateResult)
}
  return (
    <div ref={ref} className="view-pdf">
     <div className="first-content">
      <img src={Logo} alt="" />
      <div>
        <p><strong>Date :</strong> {date} <br></br><strong>BON DE LIVRAISON :</strong> N°{data.number_order} </p>
      </div>
     </div>
     <div className="second-content">
       <div className="expediteur">
         <p><span>Smile Art.</span><br></br>202 Rue des Voiliers<br></br>34280 LA GRANDE MOTTE <br></br>FRANCE<br></br>Tèl : 06.80.60.19.96<br></br>Email: colettecros11@gmail.com</p>
       </div>
       <div className="destinataire">
         <p><span>{data.doctor[0].username} {data.doctor[0].lastname} </span><br></br>{data.doctor[0].address}<br></br>34000 Montpellier<br></br>siret : {data.doctor[0].n_siret}</p>
       </div>
     </div>
     <div className="third-content">
       <h3>BON DE LIVRAISON</h3>
     </div>
     <div className="four-content">
         <div className="flex-title-table">
           <p>Bon N°{data.number_order} -Livraison le {date}</p>
           <p>Patient {data.patient}</p>
         </div>
         <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">N°</th>
              <th scope="col">Prestation</th>
              <th scope="col">Quantité</th>
              <th scope="col">Remise (%)</th>
              <th scope="col">Prix</th>
            </tr>
          </thead>
          <tbody >
            {data.flux.map((item,index)=>{
              return(
                <tr key={index}>
                  <td scope="row">{index +1}</td>
                  <td>{item.presta}</td>
                  <td>1</td>
                  <td>{item.remise_presta}</td>
                  <td>{item.price_presta}€</td>
                </tr>
              )
            })}
          </tbody>
        </table>
     </div>
     <div className="five-content">
        <div className="total-price-presta">
            <p>TOTAL PRESTATION</p>
            <p>{data.price}€</p>
        </div>
        <div className="total-price-presta">
            <p>TOTAL FOURNITURE</p>
            <p>0,00€</p>
        </div>
        <div className="total-price-presta line-top">
            <p>TOTAL</p>
            <p>{data.price}€</p>
        </div>
     </div>
     <div className="six-content page-break">
       <div className="declaration">
         <div className="declaration-title">
         <p>Déclaration de conformité CE de Dispositif Médical Sur Mesure</p>
         <p>(Livre II - 5ème partie du CSP)</p>
       </div>
          <p>Le laboratoire</p>
          <div className="laboratoire-detail-1">
            <p>SMILE ART<br></br>202 ruue des voiliers <br></br>34280 LA GRANDE MOTTE <br></br>FRANCE</p>
            <p>SIRET 899 846 802 00010</p>
          </div>
          <p>assure et déclare sous sa seule responsabilité que le dispositif médical sur mesure destiné à l'usage exclusif du patient <strong>{data.patient}, bon de livraison n°{data.number_order}</strong> mis sur le marché et fabriqué conformément à la <strong>prescription médicale du {date}</strong> établie par</p>
          <div className="laboratoire-detail-1">
            <p>Docteur {data.doctor[0].username} {data.doctor[0].lastname}</p>
          </div>
          <p>est conforme aux exigences en matière de sécurité et de performances énoncées à l'annexe I du règlement (UE) 2017/745 du Parlement européen et du Conseil du 5 avril 2017 relatif aux dispositifs médicaux et applicables à la fabrication des prothèses dentaires, modifiant la directive 2001/83/CE, le règlement (CE) n° 178/2002 et le règlement (CE) n° 1223/2009 et abrogeant les directives du Conseil 90/385/CEE et 93/42/CEE.</p>
          <p>Controlé à LA GRANDE MOTTE (France), le {date}<br></br> Par Colette Cros</p>
       </div>
       <div className="identification">
         <div className="identifcation-detail-1">
           <div>SMILE ART<br></br>202 Rue des voiliers<br></br>34280 LA GRANDE MOTTE<br></br>FRANCE</div>
           <div>CARTE D'INDENTIFACTION DE LA PROTHÈSE DENTAIRE <br></br> Dispositif Médical Sur Mesure Invasif (suivant les annexes VIII) <br></br> Prescription duu 12 mars 2022 <br></br> Livrée le {date}</div>
         </div>
       </div>
     </div>
  </div>
  );
});


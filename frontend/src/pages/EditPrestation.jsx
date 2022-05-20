//structure
import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

//css & icon
import {AiOutlinePlus} from 'react-icons/ai';
import {VscDash} from 'react-icons/vsc';





const EditPrestation = () => {
const value = useParams().prestaId;
const [getData, setGetData] = useState({
    product_used :[""]
});

const array = getData.product_used;
console.log(array);
array.forEach(function(product){
    console.log(product)
})




useEffect(()=>{
    axios.get(`/api/prestations/edit-presta/${value}`).then((res)=>{
        const response = res.data;
        setGetData(response);
    })

},[])

const addFields = () => {
    const survey_options = document.getElementById('survey_options');
    const newField = document.createElement('input');
        newField.setAttribute('type','text');
        newField.setAttribute('name','product_used');
        newField.setAttribute('class','form-control input-suppl');
        newField.setAttribute('type','text');
        newField.setAttribute('placeholder','Un autre produit');
        survey_options.appendChild(newField);
    }
const removeFields = () =>{
    const survey_options = document.getElementById('survey_options');
    const input_tags = survey_options.getElementsByTagName('input');
    if(input_tags.length > 1){
        survey_options.removeChild(input_tags[(input_tags.length)-1])
    }
    }

  return (
   <div className="container-fluid">
       <div className="row">
            <div className="col-lg-12">
            <div>
            <div className="header-page">
              <h3 className="header-title">Modifier la prestation</h3>
              <Link className="stop-modify-button" to="/prestation">Annuler modification</Link>
            </div>
            <div className="form-content-new">
            <form action={`/api/prestations/update-presta/${value}`} method="POST" className="form-client">
                <div className="row mb-4">
                <div className="col">
                    <div className="form-outline">
                        <select name="category" id="category">
                          <option value="prothèse adjointe résine" selected={getData.category === 'prothèse adjointe résine'?"selected" : false}>Prothèse adjointe résine</option>
                          <option value="prothèse adjointe métallique" selected={getData.category === 'prothèse adjointe métallique'?"selected" : false}>Prothèse adjointe métallique</option>
                          <option value="réparations" selected={getData.category === 'réparations'?"selected" : false}>Réparations</option>
                          <option value="divers" selected={getData.category === 'divers'?"selected" : false}>Divers</option>
                          <option value="prothèse fixe" selected={getData.category === 'prothèse fixe'?"selected" : false}>Prothèse fixe</option>
                          <option value="céramique" selected={getData.category === 'céramique'?"selected" : false}>Céramique</option>
                          <option value="zircone" selected={getData.category === 'zircone'?"selected" : false}>Zircone</option>
                          <option value="céramique pure" selected={getData.category === 'céramique pure'?"selected" : false}>Céramique pure</option>
                          <option value="implants" selected={getData.category === 'implants'?"selected" : false}>Implants</option>
                          <option value="soudures" selected={getData.category === 'soudures'?"selected" : false}>Soudures</option>
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">
                        <input type="text" id="title_presta" className="form-control" name="title_presta" placeholder="Nom de la prestation" defaultValue={getData.title_presta}/>
                    </div>
                </div>
                </div>
                <div className="row mb-4">
                <div className="col">
                <div className="form-outline mb-4" id="survey_options">
                    {getData.product_used.map((product,index)=>{
                        return(
                            <input key={index} type="text" id="survey_options[]" className="form-control input-suppl" name="product_used" placeholder="Produit utilisé" defaultValue={product}/>
                        )
                    })}
                </div>
                <div className="controls">
                  <a className="btn-add-input" href="#" id="add_more_fields" onClick={addFields}> <AiOutlinePlus/> Ajouter un produit</a>
                  <a className="btn-remove-input" href="#" id="removefields" onClick={removeFields}><VscDash/> Enlever un produit</a>
                </div>
                </div>
                <div className="col">
                  <div className="form-outline mb-4">
                      <input type="number" id="price_presta" className="form-control input-suppl" name="price_presta" placeholder="Prix de la prestation" defaultValue={getData.price_presta} />
                  </div>
              </div>
              </div>
                <div className="form-outline mb-4">
                    <textarea className="form-control" id="info_supp"  name="info_supp" rows="4" placeholder="Informations complémentaires" defaultValue={getData.info_supp}></textarea>
                </div>
                    <button type="submit" className="btn-form">Enregistrer la prestation.</button>
            </form>
            </div>
          </div>
            </div>
        </div>
    </div>
  )
}

export default EditPrestation
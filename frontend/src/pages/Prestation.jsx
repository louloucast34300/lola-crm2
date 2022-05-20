import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

import "../css/propre.css";
import "../css/prestation.css";
import { AiOutlinePlus } from "react-icons/ai";
import { VscDash } from "react-icons/vsc";
import { FiEdit } from "react-icons/fi";
import { GiTireIronCross } from "react-icons/gi";
import { BsEye } from "react-icons/bs";
const Prestation = () => {
  const [popUpForm, setPopUpForm] = useState(false); // ouvrir-fermer le formulaire
  const [dataPresta, setDataPresta] = useState([]); // data des prestations
  const [messageSuccess, setMessageSuccess] = useState(""); //message d'ajout d'une prestation
  const location = useLocation(); // pour récupèrer le message de réussite de l'ajout d'un client dans les paramètres de l'url

  const [searchPresta, setSearchPresta] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchPrice, setSearchPrice] = useState();
  console.log(dataPresta);

  useEffect(() => {
    decodeQuery();
    axios.get("/api/prestations").then((res) => {
      const response = res.data;
      setDataPresta(response);
    });
  }, []);

  const activePopUp = (e) => {
    // event au click pour switch entre la liste et le formulaire (opération ternaire au niveau du rendu.)
    e.preventDefault();
    setPopUpForm(true);
  };
  const DesactivePopUp = (e) => {
    //event au click pour switch entre la liste et le formulaire (opération ternaire au niveau du rendu.)
    e.preventDefault();
    setPopUpForm(false);
  };
  const decodeQuery = () => {
    // pour récupérer le message dans l'url après validationn du formulaire
    const decode = decodeURIComponent(location.search);
    const decode2 = decode.split("=").pop();
    setMessageSuccess(decode2);
    console.log(decode2);
  };

  const addFields = () => {
    const survey_options = document.getElementById("survey_options");
    const newField = document.createElement("input");
    newField.setAttribute("type", "text");
    newField.setAttribute("name", "product_used");
    newField.setAttribute("class", "form-control input-suppl");
    newField.setAttribute("type", "text");
    newField.setAttribute("placeholder", "Un autre produit");
    survey_options.appendChild(newField);
  };
  const removeFields = () => {
    const survey_options = document.getElementById("survey_options");
    const input_tags = survey_options.getElementsByTagName("input");
    if (input_tags.length > 1) {
      survey_options.removeChild(input_tags[input_tags.length - 1]);
    }
  };

  const handle_Search_Presta = (e) => {
    const value = e.target.value;
    setSearchPresta(value);
  };

  const handle_Search_Category = (e) => {
    const value = e.target.value;
    setSearchCategory(value);
  };

  const handle_Search_Price = (e) => {
    const value = e.target.value;
    setSearchPrice(value);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          {popUpForm ? (
            <div>
              <div className="header-page">
                <h3 className="header-title">Mes prestations</h3>
                <button onClick={DesactivePopUp}>
                  {" "}
                  <AiOutlinePlus />
                  Fermer formulaire
                </button>
              </div>
              <div className="form-content-new">
                <form
                  action="/api/prestations/new-prestation"
                  method="POST"
                  className="form-client"
                >
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <select name="category" id="category">
                          <option value="prothèse adjointe résine">
                            Prothèse adjointe résine
                          </option>
                          <option value="prothèse adjointe métallique">
                            Prothèse adjointe métallique
                          </option>
                          <option value="réparations">Réparations</option>
                          <option value="divers">Divers</option>
                          <option value="prothèse fixe">Prothèse fixe</option>
                          <option value="céramique">Céramique</option>
                          <option value="zircone">Zircone</option>
                          <option value="céramique pure">Céramique pure</option>
                          <option value="implants">Implants</option>
                          <option value="soudures">Soudures</option>
                        </select>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="title_presta"
                          className="form-control"
                          name="title_presta"
                          placeholder="Nom de la prestation"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline mb-4" id="survey_options">
                        <input
                          type="text"
                          id="survey_options[]"
                          className="form-control"
                          name="product_used"
                          placeholder="Produit utilisé"
                        />
                      </div>
                      <div className="controls">
                        <a
                          className="btn-style-2"
                          href="#"
                          id="add_more_fields"
                          onClick={addFields}
                        >
                          {" "}
                          <AiOutlinePlus /> Ajouter un produit
                        </a>
                        <a
                          className="btn-style-3"
                          href="#"
                          id="removefields"
                          onClick={removeFields}
                        >
                          <VscDash /> Enlever un produit
                        </a>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline mb-4">
                        <input
                          type="number"
                          id="price_presta"
                          className="form-control"
                          name="price_presta"
                          placeholder="Prix de la prestation"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <textarea
                      className="form-control"
                      id="info_supp"
                      name="info_supp"
                      rows="4"
                      placeholder="Informations complémentaires"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-style-2">
                    Enregistrer la prestation.
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div>
              <div className="header-page">
                <h3 className="header-title">Mes prestations</h3>
                <div>
                  <h3
                    className={
                      messageSuccess === ""
                        ? "message-success"
                        : "message-success active"
                    }
                  >
                    {messageSuccess}
                  </h3>
                </div>
                <button className="btn-style-1" onClick={activePopUp}>
                  {" "}
                  <AiOutlinePlus />
                  Ajouter une prestation
                </button>
              </div>
              <div className="container">
                <div className="row table-presta">
                  <div className="col-lg-12">
                    <div className="presta-bloc">
                      <div className="row radius-top bg-1 p-10">
                        <div className="col-lg-4 d-col-flex">
                          <label
                            className="label-style-1"
                            htmlFor="presta-search"
                          >
                            Prestation :
                          </label>
                          <input
                            className="input-style-1"
                            type="text"
                            id="presta-search"
                            onChange={handle_Search_Presta}
                          />
                        </div>
                        <div className="col-lg-4 d-col-flex">
                          <label
                            className="label-style-1"
                            htmlFor="category-search"
                          >
                            Categorie :
                          </label>
                          <input
                            className="input-style-1"
                            type="text"
                            id="category-search"
                            onChange={handle_Search_Category}
                          />
                        </div>
                        <div className="col-lg-4 d-col-flex">
                          <label
                            className="label-style-1"
                            htmlFor="price-search"
                          >
                            Prix :
                          </label>
                          <input
                            className="input-style-1"
                            type="text"
                            id="price-search"
                            onChange={handle_Search_Price}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          {dataPresta
                            .filter((item) => {
                              return item.title_presta.includes(searchPresta);
                            })
                            .filter((item) => {
                              return item.category.includes(searchCategory);
                            })
                            .map((item, index) => {
                              const id = item._id;
                              return (
                                <Link to={`/prestation/${id}`}>
                                  <div key={index} className="row row-list">
                                    <div className="col-lg-3">
                                      <p className="color-3 f-little">
                                        Prestation
                                      </p>
                                      <p className="mt-neg">
                                        {item.title_presta}
                                      </p>
                                    </div>
                                    <div className="col-lg-3">
                                      <p className="color-3 f-little">
                                        Category
                                      </p>
                                      <p className="color-1 f-medium line-0">
                                        {item.category}
                                      </p>
                                    </div>

                                    <div className="col-lg-2">
                                      <p className="color-5 f-little ">
                                        Contenu
                                      </p>
                                      <p className="line-0 f-little">
                                        {item.info_supp}
                                      </p>
                                    </div>
                                    <div className="col-lg-2">
                                      <p className="color-5 f-little margin-neg">
                                        options
                                      </p>
                                      <Link to={`/prestation/edit/${item._id}`}>
                                        <FiEdit />
                                      </Link>{" "}
                                      <a id="#">
                                        <GiTireIronCross />
                                      </a>{" "}
                                      <Link to="#">
                                        <BsEye />
                                      </Link>
                                    </div>
                                    <div className="col-lg-2">
                                      <p className="color-5 f-little">Prix</p>
                                      <p className="line-0 f-medium">
                                        {item.price_presta}€
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prestation;

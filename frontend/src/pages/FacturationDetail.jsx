import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";

import { Print_Facturation } from "../component/Print_Facturation";
import { AiFillPrinter } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
const FacturationDetail = () => {
  const id = useParams().factuId;
  const componentRef = useRef();

  return (
    <div>
      <button className="btn-style-1">
        {" "}
        <Link className="link-version-btn" to="/facturation">
          <IoIosArrowBack /> Retour
        </Link>
      </button>
      <ReactToPrint
        documentTtile="Facturation"
        onAfterPrint={() => window.location.reload()}
        trigger={() => (
          <button className="btn-style-1">
            <AiFillPrinter /> Imprimer la Facture
          </button>
        )}
        content={() => componentRef.current}
      />
      <Print_Facturation ref={componentRef} id={id} />
    </div>
  );
};

export default FacturationDetail;

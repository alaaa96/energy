import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
const Plats = () => {
  const [Plats, setPlats] = useState([]);
  useEffect(() => {
    const getNosPlats = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/plat/dataplat");
        setPlats(data.getData);
      } catch (error) {
        console.log(error);
      }
    };
    getNosPlats();
  }, []);

  return (
    <div>
      <h1> Nos Plats </h1>
      <div className="AllPlats">
        {Plats &&
          Plats.map((plat, index) => (
            <div key={index} className="onePlat">
              <h3> Nom : {plat.nom} </h3>
              <h4> Contenu : </h4>
              {plat.contenu.map((cont, i) => (
                <div key={i}>
                  {" "}
                  <span> {cont.nom} </span>{" "}
                </div>
              ))}
              <h5> {plat.taille} </h5>
              <h5> {plat.prix} dt </h5>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Plats;

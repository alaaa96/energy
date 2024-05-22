import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
const Plats = () => {
  const [Plats, setPlats] = useState([]);
  const [changeWhenDelete, setchangeWhenDelete] = useState(false);
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
  }, [changeWhenDelete]);

  const deletePlats = async (id) => {
    try {
      const { data } = await axios.delete("http://localhost:5000/plat/" + id);
      alert(data.msg);
      setchangeWhenDelete(!changeWhenDelete);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1> Nos Plats </h1>
      <div className="AllPlats">
        {Plats.length > 0 ? (
          Plats.map((plat, index) => (
            <div key={index} className="onePlat">
              <h3> Nom : {plat.nom} </h3>
              <h4> Contenu : </h4>
              {plat.contenu.length > 0 ? (
                plat.contenu.map((cont, i) => (
                  <div key={i}>
                    {" "}
                    <span> {cont.nom} </span>{" "}
                  </div>
                ))
              ) : (
                <p className="oublier">tu as oublier le cotenu du plat</p>
              )}
              <h5> {plat.taille} </h5>
              <h5> {plat.prix} dt </h5>
              <Button variant="danger" onClick={() => deletePlats(plat._id)} >
                Delete
              </Button>
            </div>
          ))
        ) : (
          <h1>
            {" "}
            SVP ajoute des plats{" "}
            <span>
              {" "}
              <Link to={"/Ingredients"}>ici</Link>{" "}
            </span>{" "}
          </h1>
        )}
      </div>
    </div>
  );
};

export default Plats;

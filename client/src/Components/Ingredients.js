import React, { useEffect, useState } from "react";
import axios from "axios";
const Ingredients = ({ Ingrs, setIngrs }) => {
  const [selectType, setselectType] = useState("");
  const [searchIngrs, setsearchIngrs] = useState("");
  const [showFPlat, setshowFPlat] = useState(true);
  const [showFPIngrs, setshowFPIngrs] = useState(false);

  useEffect(() => {
    const getIngrs = async () => {
      axios
        .get("http://localhost:5000/data")
        .then((res) => {
          setIngrs(res.data.getData);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getIngrs();
  }, []);

  return (
    <>
      <div className="searchPart">
        <button onClick={() => setshowFPlat(!showFPlat)}>Add Plats</button>
        <button onClick={() => setshowFPIngrs(!showFPIngrs)}>
          Add Ingredient
        </button>

        <select
          name=""
          id="selectTypeCss"
          onChange={(e) => setselectType(e.target.value)}
        >
          <option value="">All</option>
          <option value="crue">Crue</option>
          <option value="cuit">Cuit</option>
        </select>
        <input
          type="text"
          name="nom"
          placeholder="Search Ingredients"
          onChange={(e) => setsearchIngrs(e.target.value)}
        />
      </div>
      <div>
        {/* Formulaire d'ajout Plats */}
        {showFPlat && (
          <div className="FormPlats">
            <input type="text" name="nom" placeholder="Nom du Plat" />
            <div className="taillePlats">
              <label> Selection Taille du Plat : </label>
              <select name="" id="selectTypeCss">
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            </div>
            <input type="number" name="prix" placeholder="prix du plat" />
            <span> SVP selection le contenu du plat </span>
           
            <button>Add</button>
          </div>
        )}
        {/*  end Formulaire d'ajout Plats*/}
        {/* Formulaire d'ajout Ingredient */}

        {/*  end Formulaire d'ajout Ingredient*/}
      </div>
      <div className="Ingrs">
        {Ingrs ? (
          Ingrs.filter((el) => {
            return (
              el.nom.toLowerCase().includes(searchIngrs.toLocaleLowerCase()) &&
              (!selectType || el.type === selectType)
            );
          }).map((ingr, index) => {
            return (
              <div key={index} className="Ingr">
                {" "}
                <input type="checkbox" name="selectIngrs" id="selectIngrs" />
                <h3> Nom: {ingr.nom}</h3> <p>Protein :{ingr.protein}</p>{" "}
                <p>Carbs :{ingr.carbs}</p> <p>Fat : {ingr.fat}</p>{" "}
                <p>Kcalories : {ingr.kcalories}</p> <p> {ingr.type} </p>
              </div>
            );
          })
        ) : (
          <h1>loading</h1>
        )}
      </div>
    </>
  );
};

export default Ingredients;

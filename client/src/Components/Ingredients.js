import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
const Ingredients = ({ Ingrs, setIngrs }) => {
  const navigate = useNavigate();
  const [selectType, setselectType] = useState("");
  const [searchIngrs, setsearchIngrs] = useState("");
  const [showFPlat, setshowFPlat] = useState(false);
  const [showFPIngrs, setshowFPIngrs] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  //partie ajout plats
  const [newPlats, setnewPlats] = useState({
    nom: "",
    contenu: [],
    taille: "S",
    prix: 0,
  });
  const handleChangePlats = (event) => {
    setnewPlats({
      ...newPlats,
      [event.target.name]: +event.target.value
        ? +event.target.value
        : event.target.value,
    });
  };
  // Update newPlats.contenu whenever selectedIngredients changes
  useEffect(() => {
    setnewPlats((prevPlats) => ({
      ...prevPlats,
      contenu: selectedIngredients,
    }));
  }, [selectedIngredients]);

  // part back
  const addPlats = async () => {
    try {
      await axios
        .post("http://localhost:5000/plat/addplat", newPlats)
        .then((result) => alert(result.data.msg));
      navigate("/Plats");
    } catch (error) {
      console.log(error);
      if(error.response.data.error){
        alert("you have make some error please don't forget to add all data nom taille and prix")
      }
    }
  };

  //end

  useEffect(() => {
    const getIngrs = async () => {
      await axios
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

  const addIngrToPlats = (data)=>{
    setSelectedIngredients([...selectedIngredients,data ])
  }
  const removeIngrFromPlats = (data) => {
    setSelectedIngredients(selectedIngredients.filter(ingr => ingr !== data));
  };
 

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
            <input
              type="text"
              name="nom"
              placeholder="Nom du Plat"
              onChange={(e) => handleChangePlats(e)}
            />
            <div className="taillePlats">
              <label> Selection Taille du Plat : </label>
              <select
                name="taille"
                id="selectTypeCss"
                onChange={(e) => handleChangePlats(e)}
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            </div>
            <input
              type="number"
              name="prix"
              placeholder="prix du plat"
              onChange={(e) => handleChangePlats(e)}
            />
            <span> SVP selection le contenu du plat </span>

            <button onClick={() => addPlats()}>Add</button>
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
                <h3> Nom: {ingr.nom}</h3> <p>Protein :{ingr.protein}</p>{" "}
                <p>Carbs :{ingr.carbs}</p> <p>Fat : {ingr.fat}</p>{" "}
                <p>Kcalories : {ingr.kcalories}</p> <p> {ingr.type} </p>
                <div className="btn">
                  {selectedIngredients.includes(ingr) ? (
                    <Button onClick={()=>removeIngrFromPlats(ingr)} variant="danger">DEL</Button>
                  ) : (
                    <Button onClick={()=>addIngrToPlats(ingr)} variant="success">ADD in Plat</Button>
                  )}
                </div>
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

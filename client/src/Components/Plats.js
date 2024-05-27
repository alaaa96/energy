import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const Plats = () => {
  const navigate = useNavigate();
  const [showFPlat, setShowFPlat] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [plats, setPlats] = useState([]);
  const [changeWhenDelete, setChangeWhenDelete] = useState(false);

  // Fetch the list of plats from the server
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

  // Delete a plat from the server
  const deletePlats = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:5000/plat/${id}`);
      alert(data.msg);
      setChangeWhenDelete(!changeWhenDelete);
    } catch (error) {
      console.log(error);
    }
  };

  // State to manage the new plat form inputs
  const [newPlats, setNewPlats] = useState({
    nom: "",
    contenu: [],
    taille: "S",
    prix: 0,
  });

  // Handle changes in the new plat form inputs
  const handleChangePlats = (event) => {
    setNewPlats({
      ...newPlats,
      [event.target.name]: +event.target.value
        ? +event.target.value
        : event.target.value,
    });
  };

  // Update newPlats.contenu whenever selectedIngredients changes
  useEffect(() => {
    setNewPlats((prevPlats) => ({
      ...prevPlats,
      contenu: selectedIngredients,
    }));
  }, [selectedIngredients]);

  // Add a new plat to the server
  const addPlats = async () => {
    try {
      const result = await axios.post("http://localhost:5000/plat/addplat", newPlats);
      alert(result.data.msg);
      navigate("/Plats");
    } catch (error) {
      console.log(error);
      if (error.response.data.error) {
        alert("Please add all required data: nom, taille, and prix.");
      }
    }
  };

  // Add an ingredient to the selected ingredients list
  const addIngrToPlats = (data, quantity) => {
    const newData = {
      ...data,
      fat: +((data.fat / 100) * quantity).toFixed(2),
      carbs: +((data.carbs / 100) * quantity).toFixed(2),
      protein: +((data.protein / 100) * quantity).toFixed(2),
      kcalories: +((data.kcalories / 100) * quantity).toFixed(2),
    };
    setSelectedIngredients([...selectedIngredients, newData]);
  };

  // Remove an ingredient from the selected ingredients list
  const removeIngrFromPlats = (data) => {
    setSelectedIngredients(selectedIngredients.filter((ingr) => ingr !== data));
  };

  // State to manage ingredient search and quantity inputs
  const [filterIngr, setFilterIngr] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [ingredients, setIngredients] = useState([]);

  // Fetch the list of ingredients from the server
  useEffect(() => {
    const getIngredients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/data");
        setIngredients(res.data.getData);
      } catch (error) {
        console.log(error);
      }
    };
    getIngredients();
  }, []);

  console.log("selectedIngredients : ", selectedIngredients)

  return (
    <div>
      <h1>Nos Plats</h1>
      <div className="searchPart">
        <button onClick={() => setShowFPlat(!showFPlat)}>Add Plats</button>
      </div>
      <div>
        {/* Form to add a new plat */}
        {showFPlat && (
          <div className="FormPlats">
            <input
              type="text"
              name="nom"
              placeholder="Nom du Plat"
              onChange={handleChangePlats}
            />
            <div className="taillePlats">
              <label>Selection Taille du Plat:</label>
              <select
                name="taille"
                id="selectTypeCss"
                onChange={handleChangePlats}
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            </div>
            <input
              type="number"
              name="prix"
              placeholder="Prix du Plat"
              onChange={handleChangePlats}
            />
            <span>SVP selection le contenu du plat</span>
            <input
              type="text"
              placeholder="Search Ingredients"
              onChange={(e) => setFilterIngr(e.target.value)}
            />
            {filterIngr &&
              ingredients
                .filter((el) =>
                  el.nom.toLowerCase().includes(filterIngr.toLowerCase())
                )
                .map((item, index) => (
                  <div key={index} className="ingrFil">
                    <span>{item.nom}</span>
                    <input
                      type="number"
                      placeholder="Qte"
                      onChange={(e) => setQuantity(+e.target.value)}
                    />
                    {selectedIngredients.includes(item) ? (
                      <button
                        className="RemoveBtn"
                        onClick={() => removeIngrFromPlats(item)}
                      >
                        Remove
                      </button>
                    ) : (
                      <button onClick={() => addIngrToPlats(item, quantity)}>
                        Add to Plat
                      </button>
                    )}
                  </div>
                ))}
            <button onClick={addPlats}>Add</button>
          </div>
        )}
      </div>
      <div className="AllPlats">
        {plats.length > 0 ? (
          plats.map((plat, index) => (
            <div key={index} className="onePlat">
              <h3>Nom: {plat.nom}</h3>
              <h4>Contenu:</h4>
              {plat.contenu.length > 0 ? (
                plat.contenu.map((cont, i) => (
                  <div key={i}>
                    <span>{cont.nom}</span>
                  </div>
                ))
              ) : (
                <p className="oublier">Vous avez oublié le contenu du plat</p>
              )}
              <h5>Taille: {plat.taille}</h5>
              <h5>Prix: {plat.prix} dt</h5>
              <Button variant="danger" onClick={() => deletePlats(plat._id)}>
                Delete
              </Button>
            </div>
          ))
        ) : (
          <h1>
            SVP ajoutez des plats{" "}
            <span>
              <Link to={"/Ingredients"}>ici</Link>
            </span>
          </h1>
        )}
      </div>
    </div>
  );
};

export default Plats;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Ingredients = ({ Ingrs, setIngrs }) => {
  const [selectType, setSelectType] = useState("");
  const [searchIngrs, setSearchIngrs] = useState("");
  const [showFPIngrs, setShowFPIngrs] = useState(false);

  // Fetch ingredients from the server when the component mounts
  useEffect(() => {
    const getIngrs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/data");
        setIngrs(res.data.getData);
      } catch (error) {
        console.log(error);
      }
    };
    getIngrs();
  }, []);
  

  return (
    <>
      <div className="searchPart">
        <button onClick={() => setShowFPIngrs(!showFPIngrs)}>
          Add Ingredient
        </button>

        <select
          id="selectTypeCss"
          onChange={(e) => setSelectType(e.target.value)}
        >
          <option value="">All</option>
          <option value="crue">Crue</option>
          <option value="cuit">Cuit</option>
        </select>
        <input
          type="text"
          name="nom"
          placeholder="Search Ingredients"
          onChange={(e) => setSearchIngrs(e.target.value)}
        />
      </div>

      <div className="Ingrs">
        {Ingrs ? (
          Ingrs.filter((el) => {
            // Filter ingredients based on search term and selected type
            return (
              el.nom.toLowerCase().includes(searchIngrs.toLowerCase()) &&
              (!selectType || el.type === selectType)
            );
          }).map((ingr, index) => (
            <div key={index} className="Ingr">
              <h3>Nom: {ingr.nom}</h3>
              <p>Protein: {ingr.protein}</p>
              <p>Carbs: {ingr.carbs}</p>
              <p>Fat: {ingr.fat}</p>
              <p>Kcalories: {ingr.kcalories}</p>
              <p>Type: {ingr.type}</p>
            </div>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

export default Ingredients;

import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideoGames } from "../actions/index";
import s from "./Style/searchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameVideoGames(name)); //name mi estadolocal ...lo que esta escribiendo el usuario
  }

  return (
    <div>
      <form>
        <input
          onChange={(e) => handleInputChange(e)}
          type="text"
          placeholder="Buscar por nombre"
        />
        <button
          className={s.search_btn}
          onClick={(e) => handleSubmit(e)}
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

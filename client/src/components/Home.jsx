import React from "react";
import s from "./Style/Home.module.css";
// import fondohome from "../assest/img/fondo.jpg";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterVideogamesByGenero,
  filterCreated,
  orderByName,
  orderbyRating,
  getGeneros,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allvideogames = useSelector((state) => state.videogames);
  const allGeneros = useSelector((state) => state.generos);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setvideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allvideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // para montar
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGeneros());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault(); //para que me cargue todo de nuevo
    dispatch(getVideogames());
  }

  function handleFilterGenero(e) {
    e.preventDefault();
    dispatch(filterVideogamesByGenero(e.target.value));
  }
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  function handleRating(e) {
    e.preventDefault();
    dispatch(orderbyRating(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <div className={s.container}>
        <div className={s.home}>
          <div className={s.nav_home}>
             <SearchBar />
          <div className={s.creados} >
            <Link to="/videogames" className={s.creados}>Crear Videogames</Link>

            </div>
           
            </div>

             <div>
              <h1 className={s.text}>Bienvenidos a Videogames</h1>
              <button className={s.volver_btn} onClick={(e) => handleClick(e)}>
                volver a cargar todos los video juegos
              </button>
            </div>
          
        </div>

        <div>
          <div className={s.filt_btn}>
            <select onClick={(e) => handleSort(e)}>
              <option value="All">Alfabetico</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>

            <select onChange={(e) => handleFilterGenero(e)}>
              <option value="generos">Genero</option>
              {allGeneros?.map((e) => {
                return (
                  <option key={e.name} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>

            <select onClick={(e) => handleRating(e)}>
              <option value="All">Rating</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>

            <select onChange={(e) => handleFilterCreated(e)}>
              <option value="All">Todos</option>
              <option value="created">Creados</option>
              <option value="api">Existentes</option>
            </select>
          </div>
          <Paginado
            videogamesPerPage={videogamesPerPage}
            allvideogames={allvideogames.length}
            paginado={paginado}
          />
         
          <div className={s.cards}>
          {currentVideogames?.map((c) => {
            return (
              <Card
                key={c.id}
                id={c.id}
                name={c.name}
                imagen={c.imagen}
                generos={c.generos}
                rating={c.rating}
              />
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
} //ACTUALIZADO

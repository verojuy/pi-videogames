import React from "react";
import { Link } from "react-router-dom";
import s from "./Style/Card.module.css";

export default function Card({ name, imagen, generos, id, rating }) {
  return (
    <div key={id}>
      <div className={s.card_btn}>
        <Link to={`/videogames/${id}`} className={s.nombre_card}>
          <h3>{name}</h3>
        </Link>

        <img src={imagen} alt="img not found" width="250px" height="150px" />
        <div className={s.datos_card}>
        <h4> Puntuacion: {rating}</h4>
        <h4> Generos: {generos}</h4>
      </div>
      </div>
    </div>
  );
}

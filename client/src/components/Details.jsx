import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";
import s from "./Style/detalle.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const myVideo = useSelector((state) => state.detail); // me traigo el estado detail

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>

      {myVideo && (
        <div>
          {/* Titulo */}
          <h1>{myVideo.name}</h1>
          {/* Imagen */}
          <img src={myVideo.imagen} alt={myVideo.name} width="40%"  />
          <div className={s.datos_detalles}>
         
          {"Puntuacion"}
          <p>{myVideo.rating}</p>

          {"Fecha de lanzamiento"}
          <p>{myVideo.released}</p>
         <div className={s.gen_plat}>
          <div className={s.gen}>
          <h4> Generos</h4>
          <p>{myVideo.generos}</p>
          </div>
          <div className={s.plat}>
          <h4> Plataformas </h4>
          <ul >
            {myVideo.plataformas
              ? myVideo.plataformas.map((element) => {
                  return <li className={s.plat_ul_li}>{element}</li>;
                })
              : null}
          </ul>
          </div>
          </div>
          </div>
          <div className={s.descripcion}>
          {"Descripcion"}
          <p> {myVideo.description}</p>
          </div>
          <Link to="/home">
            <button>Volver</button>
          </Link>
        </div>
      )}
    </div>
  );
}
// ACTUALIZADO

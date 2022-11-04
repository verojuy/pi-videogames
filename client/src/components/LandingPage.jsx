import React from "react";
import { Link } from "react-router-dom";
import s from "./Style/LandingPage.module.css";
import foto from "../assest/img/foto.avif";

export default function LandingPage() {
  return (
    
      <div className={s.container}>
      <h1 className={s.title}>PI Videogames</h1>

       
      <Link to="/home">
        <button className={s.btn}>START </button>
      </Link>
      </div>
      
    
  

  );
}

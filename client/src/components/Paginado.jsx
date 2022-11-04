import React from "react";
import s from "./Style/paginado.module.css";

export default function Paginado({
  videogamesPerPage,
  allvideogames,
  paginado,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allvideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    
      <nav>
        <ul className={s.paginado}>
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li>
                <a onClick={() => paginado(number)} className={s.btn_paginado}>{number}</a>
              </li>
            ))}
        </ul>
      </nav>

  );
}

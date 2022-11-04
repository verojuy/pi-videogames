import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGeneros, getVideogames } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import s from "./Style/Home.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere un nombre";
  } else if (!input.description) {
    errors.description = "Se requiere una descripcion";
  } else if (!input.released) {
    errors.released = "Ingresar una fecha ";
  } else if (input.rating >5 || input.rating< 0) {
    errors.rating = "Puntuacion entre 0 y 5";
  } else if (input.plataformas.length ===0) {
    errors.plataformas = "Ingresar una Plataformas";
  } else if (input.genero.length === 0) {
    errors.genero = "Ingresar Generos";
  } else if (
    input.image &&
    !(
      input.image.match(
        /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim
      ) !== null
    )
  ) {
    errors.image = "The link provided is not an image";
  }
  return errors;
}

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const generos = useSelector((state) => state.generos);
  const plat = ["PS3", "Ps4", "PS5", "Nintendo Switch", "X-BOX", "Wii"];
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    imagen: "",
    description: "",
    released: "",
    rating: "",
    plataformas: [],
    genero: [],
  });
  console.log(input);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSelectPlat(e) {
    setInput({
      ...input,
      plataformas: [...input.plataformas, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSelect(e) {
    setInput({
      ...input,
      genero: [...input.genero, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postVideogame(input));
    alert("Videogame creado con exito!");
    setInput({
      name: "",
      imagen: "",
      description: "",
      released: "",
      rating: "",
      plataformas: [],
      genero: [],
    });

    history.push("/home");
  }
  function handleDelet(el) {
    setInput({
      ...input,
      plataformas: input.plataformas.filter((p) => p !== el),
    });
  }
  function handleDeletG(el) {
    setInput({
      ...input,
      genero: input.genero.filter((g) => g !== el),
    });
  }
  useEffect(() => {
    dispatch(getGeneros());
  }, [dispatch]);

  return (
    <div>
      <div>
        <Link to="/home">
          <button>Volver</button>
        </Link>
      </div>
      <div className={s.text}>
        <h1>Crea tu videogames!!</h1>
        <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label className={s.label}>Nombre : </label>
            <input
              type="text"
              value={input.name}
              name="name"
              placeholder="Nombre..."
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <label className={s.label}>Imagen : </label>
            <input
              type="text"
              value={input.imagen}
              name="imagen"
              placeholder="imagen..."
              onChange={(e) => handleChange(e)}
            />
            {errors.imagen && <p>{errors.imagen}</p>}
          </div>
          <div>
            <label className={s.label}>Descripcion : </label>
            <input
              type="text"
              value={input.description}
              name="description"
              placeholder="Descripcion...."
              onChange={(e) => handleChange(e)}
            />
            {errors.description && <p>{errors.description}</p>}
          </div>
          <div>
            <label className={s.label}>Fecha de lanzamiento : </label>
            <input
              type="date"
              value={input.released}
              name="released"
              onChange={(e) => handleChange(e)}
            />
            {errors.released && <p>{errors.released}</p>}
          </div>
          <div>
            <label className={s.label}>Puntuacion : </label>
            <input
              type="number"
              value={input.rating}
              name="rating"
              placeholder="Puntuacion 0-5"
              onChange={(e) => handleChange(e)}
            />
            {errors.rating && <p>{errors.rating}</p>}
          </div>
          <div>
            <label className={s.label}>Plataformas</label>
            <select
              onChange={(e) => handleSelectPlat(e)}
              placeholder="Plataformas ..."
            >
              {plat?.map((p) => (
                <option value={p}>{p}</option>
              ))}
            </select>
            <ul>
              <li>{input.plataformas?.map((e) => e + ",")}</li>
              {errors.plataformas && <p>{errors.plataformas}</p>}
            </ul>
          </div>
          <div>
            <label className={s.label}>Generos : </label>
            <select onChange={(e) => handleSelect(e)}>
              {generos?.map((g) => (
                <option value={g.name}>{g.name}</option>
              ))}
            </select>
            <ul>
              <li>{input.genero.map((el) => el + " , ")}</li>
            </ul>
            {errors.genero && <p>{errors.genero}</p>}
          </div>
          <div className={s.btn}>
            <button
              type="submit"
              disabled={!input.name || !input.description || !input.released}
              className={s.btn}
            >
              Crear videogames
            </button>
          </div>
        </form>
        {input.plataformas.map((el) => (
          <div>
            <p>{el}</p>
            <button onClick={() => handleDelet(el)}>X</button>
          </div>
        ))}

        {input.genero.map((el) => (
          <div>
            <p>{el}</p>
            <button onClick={() => handleDeletG(el)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}

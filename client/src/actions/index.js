import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/videogames", {      
    }); 
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export const getNameVideoGames = (name) => {
  return async function (dispatch) {
    return fetch(`http://localhost:3001/videogames?name=${name}`)
      .then((respuesta) => respuesta.json())
      .then((gameName) => {
        dispatch({ type: "GET_NAME_VIDEOGAMES", payload: gameName });
      });
  };
};
export function orderbyRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function getGeneros() {
  return async function (dispatch) {
    var info = await axios.get("http://localhost:3001/genres", {});
    return dispatch({
      type: "GET_GENEROS",
      payload: info.data,
    });
  };
}
export function postVideogame(payload) {
  return async function () {
    const data = await axios.post("http://localhost:3001/videogames", payload);
    return data;
  };
}

export function filterVideogamesByGenero(payload) {
  return {
    type: "FILTER_BY_GENERO",
    payload,
  };
}
export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/videogame/${id}`);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

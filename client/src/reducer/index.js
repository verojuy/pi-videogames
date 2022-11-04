const initialState = {
  videogames: [],
  allVideogames: [],
  generos: [],
  detail: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case "GET_NAME_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };
    case "GET_GENEROS":
      return {
        ...state,
        generos: action.payload,
      };
    case "FILTER_BY_GENERO":
      const allVideogames = state.allVideogames;

      const generoFiltered =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((el) => el.generos?.includes(action.payload));
      return {
        ...state,
        videogames: generoFiltered,
      };
    case "POST_VIDEOGAME":
      return {
        ...state,
      };
    case "FILTER_CREATED":
      const allVideog = state.allVideogames;
      const createdFilter =
        action.payload === "created"
          ? allVideog.filter((el) => el.createdInDb)
          : allVideog.filter((el) => !el.createdInDb);
      return {
        ...state,
        videogames:
          action.payload === "All" ? state.allVideogames : createdFilter,
      };
    case "ORDER_BY_RATING":
      let array =
        action.payload === "asc"
          ? state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        rating: array,
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.videogames.sort(function (a, b) {
              // sort para ordenar compara el que encuentra primero con el que encuentra segundo
              //lo acomoda delante o detras del arreglo
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortedArr,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;

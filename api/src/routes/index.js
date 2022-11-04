const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
//const Videogame = require('../models/Videogame');
//const Genero = require('../models/Genero');
const { Op } = require("sequelize");
const { Videogame, Genero } = require("../db");
const e = require("express");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getRutaPrincipal = async () => {
  const getApiUrl = await axios.get(
    `https://api.rawg.io/api/games?key=bce5247a1a6648a2ac14491f70e0a82d&page_size2`
  );
  const getApiUrl2 = await axios.get(getApiUrl.data.next);
  const getApiUrl3 = await axios.get(getApiUrl2.data.next);
  const getApiUrl4 = await axios.get(getApiUrl3.data.next);
  const getApiUrl5 = await axios.get(getApiUrl4.data.next);

  const allData = getApiUrl.data.results
    .concat(getApiUrl2.data.results)
    .concat(getApiUrl3.data.results)
    .concat(getApiUrl4.data.results)
    .concat(getApiUrl5.data.results);

  const rutaInfo = await allData.map((el) => {
    return {
      id: el.id,
      name: el.name,
      imagen: el.background_image,
      generos: el.genres.map((el) => el.name),
      rating: el.rating,
    };
  });
  return rutaInfo;
};
const getDbVideogames = async () => {
  const dbVg = await Videogame.findAll({
    include: {
      model: Genero,
      attribute: ["name"],
    },
    through: {
      attributes: [],
    },
  });

  const dbHome = dbVg.map((e) => {
    return {
      id: e.id,
      name: e.name,
      imagen: e.imagen,
      rating: e.rating,
      generos: e.Generos?.map((e) => e.name),
      createdInDb: e.createdInDb,
    };
  });
  return dbHome;
};
//api + data base
const getAllVideogames = async () => {
  const apiInfo = await getRutaPrincipal();
  const dbInfo = await getDbVideogames();
  const infoTotal = dbInfo.concat(apiInfo);
  return infoTotal;
};


const getApiInfo = async (name) => {
  console.log(name);
  const getApiUrl = await axios.get(
    `https://api.rawg.io/api/games?search=${name}&key=bce5247a1a6648a2ac14491f70e0a82d&page_size=15`
  );
  const apiData = await getApiUrl.data.results;
  console.log(apiData[1]);
  const apiInfo = await apiData.map((el) => {
    return {
      id: el.id,
      name: el.name,
      rating: el.rating,
      released: el.released,
      imagen: el.background_image,
      plataformas: el.platforms.map((el) => el.platform.name),
      generos: el.genres.map((el) => el.name),
    };
  });

  return apiInfo;
};

const getDbInfo = async (name) => {
  return await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: "%" + name + "%",
      },
    },
    include: Genero,
  });
};
//api + data base
const getAllName = async (name) => {
  const apisInfo = await getApiInfo(name);
  const dbInfo = await getDbInfo(name);
  const infoTotal = apisInfo.concat(dbInfo);
  return infoTotal;
};

///////////////////////////////////RUTAS!!/////////////////////////////////////


router.get("/videogames", async (req, res) => {
  try {
    const { name } = req.query;

    if (name) {
      let nameTotal = await getAllName(name);
      const videoName = nameTotal.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      videoName.length
        ? res.status(200).send(videoName)
        : res.status(404).send("No existe el videojuego");
    } else {
      let videogamesTotal = await getAllVideogames();
      res.status(200).send(videogamesTotal);
    }
  } catch (error) {
    res.status(404).send("error en ruta query");
  }
});

router.get("/", async (req, res) => {
  res.status(200).send("hola");
});

///////////////////////////// busca pOR ID  y Ruta ////////////////////////////////////////////////////

const getId = async (id) => {
  console.log(id);
  if (id.length > 10) {
    const idBaseDatos = await Videogame.findOne({
      where: {
        id: id,
      },
      include: {
        model: Genero,
        attribute: ["name"],
      },
    });
    const idVideogame = {
      id: idBaseDatos.id,
      imagen: idBaseDatos.imagen,
      name: idBaseDatos.name,
      generos: idBaseDatos.Generos?.map((el) => el.name),
      description: idBaseDatos.description,
      rating: idBaseDatos.rating,
      released: idBaseDatos.released,
      plataformas: idBaseDatos.plataformas,
    };
    console.log(idVideogame);

    return idVideogame;
  } else {
    const apiInfo = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=bce5247a1a6648a2ac14491f70e0a82d`
    );
    const idData = await apiInfo.data;

    const idVideogame = {
      id: idData.id,
      name: idData.name,
      imagen: idData.background_image,
      generos: idData.genres.map((el) => el.name),
      description: idData.description_raw,
      rating: idData.rating,
      released: idData.released,
      plataformas: idData.platforms.map((el) => el.platform.name),
    };
    console.log(idVideogame);
    return idVideogame;
  }
};
router.get("/videogame/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const videogamesTotal = await getId(id);
    res.status(200).send(videogamesTotal);
  } catch (error) {
    res.status(404).send("error en el id");
  }
});

/////////////////////////////////////////// busqueda por genero y ruta //////////////////
const getGenres = async () => {
  try {
    const dataB = await Genero.findAll();
    if (dataB.length) {
      return dataB;
    } else {
      const llamadaApi = await axios.get(
        "https://api.rawg.io/api/genres?key=bce5247a1a6648a2ac14491f70e0a82d"
      );
      const generData = await llamadaApi.data.results;
      const generoInfo = await generData.map((el) => {
        return {
          name: el.name,
        };
      });

      generoInfo.forEach(async (el) => {
        await Genero.findOrCreate({
          where: {
            name: el.name,
          },
        });
      });
      return generoInfo;
    }
  } catch (error) {
    res.status(404).send("falla en genres");
  }
};

router.get("/genres", async (req, res) => {
  try {
    const rutaGenres = await getGenres();
    res.status(200).send(rutaGenres);
  } catch (error) {
    res.status(404).send("problemas para cargar los generos");
  }
});

///////////////////////////////////////////////// post ////////////////////////77//////////////
router.post("/videogames", async (req, res) => {
  const { name, description, released, imagen, rating, plataformas, genero } =
    req.body;

  try {
    if (!name || !description || !plataformas || !genero ||!released) {
      return res.status(404).send("no se ingresaron todos los datos");
    }

    const gameCreado = await Videogame.create({
      name,
      imagen,
      description,
      released,
      rating,
      plataformas,
    });
    const genersDb = await Genero.findAll({
      where: {
        name: genero,
      },
    });
    gameCreado.addGenero(genersDb);
    console.log(gameCreado, "post");
    res.send("Videogames creado con exito");
  } catch (error) {
    res.status(404).send("error en post", error);
  }
});


module.exports = router;

const axios = require("axios")
const dotenv = require("dotenv");
dotenv.config()
const urlApi = process.env.API_URL

const pokapiInfo = async ()=>{
  try {
    const pokemones =  await axios.get(`${urlApi}/pokemon?offset=0&limit=150`);  //obtine la lista de pokemon hasta el pj 200
    const pokemonUrl = pokemones.data.results //extrae la url de cada pokemon 
    const pokemonInfo = await axios.all( // realizo multiples peticiones simultaneas para traer la info que necesito de cada pokemon
      pokemonUrl.map(async (poke) =>{
      let pushInf = await axios.get(poke.url)
      return{
        id: pushInf.data.id,
        name: pushInf.data.name,
        hp: pushInf.data.stats[0].base_stat,
        attack: pushInf.data.stats[1].base_stat,
        defense: pushInf.data.stats[2].base_stat,
        speed: pushInf.data.stats[5].base_stat, 
        height: pushInf.data.height,
        weight: pushInf.data.weight,
        image: pushInf.data.sprites.other.dream_world.front_default,
        types: pushInf.data.types.map((type) => type.type.name), 
      }
    }))
    return pokemonInfo;
    
}    catch (error) {
    console.log({error:"Error when bringing the pokemons"});
}

}

module.exports = {pokapiInfo};


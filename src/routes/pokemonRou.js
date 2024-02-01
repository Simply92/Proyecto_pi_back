const {Router} = require('express')
const {allPokemons} = require('../controllers/allPokemones');
const router = Router();
const newPokemons = require('../controllers/createPokemon')

router.get('/', async (req,res) => {
    const {name} = req.query
    try {
        const pokemons = await allPokemons()
        if(name){
            const select = await pokemons.filter((pok) => pok.name.toLowerCase().startsWith(name.toLowerCase()))
            if(select.length > 0){
                res.status(200).json(select)
            }else{
                res.status(404).send("Not found")
            }
            
        }else{
            return res.json(pokemons)
        }
    } catch (error) {
       return res.status(500).json({error: error.message})
    }
})

router.get('/:id', async (req,res) => {
    const {id} = req.params;
    try {
        const listPokemons = await allPokemons()
        if(id){
            const selectPoke = await listPokemons.filter((pok) => pok.id == id)
            if(selectPoke.length > 0){
                res.status(200).json(selectPoke)
            }else{
                res.status(400).send(`the id does not exist`)
            }
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


router.post('/', async (req, res) => {
  try {
    const data = req.body; 
    await newPokemons(data); 
    res.status(201).send('Pokemon successfully created');
  } catch (error) {
    
    res.status(500).send('Internal server error');
  }
});




module.exports= router;
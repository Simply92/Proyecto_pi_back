const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRou = require('./pokemonRou')
const typesRou = require('./typesRou')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('pokemons', pokemonRou)
router.use('pokemons/:id', pokemonRou)
router.use('/pokemons/name/?name=', pokemonRou)
router.use('/types', typesRou)


module.exports = router;

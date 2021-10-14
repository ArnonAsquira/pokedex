const searchButton = document.querySelector('.btn, .btn-success');
const searchInput = document.querySelector('.form-group > input');
searchButton.addEventListener('click', searchPokemon);
async function searchPokemon() {
    const pokemonName = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto');
    console.log(pokemonName.data)
}

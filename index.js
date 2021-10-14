const nameSearchButton = document.getElementById('search-name');
const idSearchButton = document.getElementById('search-id')
const searchByNameInput = document.querySelector('.search-by-name');
const searchByIdInput = document.querySelector('.search-by-id');
const pokemonNameDiv = document.getElementById('pokemon-name');
const pokemonHeightDiv = document.getElementById('pokemon-height');
const pokemonWeightDiv = document.getElementById('pokemon-weight');
const pokemonImg = document.getElementById('pokemon-img');
const submitionDiv = document.querySelector('.form-group');
//event listener for search buttons
nameSearchButton.addEventListener('click', searchPokemon);
idSearchButton.addEventListener('click', searchPokemon);
// search pokemon function
async function searchPokemon(e) {
    const identifier = e.target.previousElementSibling.value;
    console.log(identifier);
    if(!identifier){
        alert('please enter a text');
    }else{
        submitionDiv.lastElementChild.classList.add('loader');
        try{
            const pokemonObj = await axios.get(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
            updatePOkemonToDom(pokemonObj.data);
            submitionDiv.lastElementChild.classList.remove('loader');
        }catch (error){
            submitionDiv.lastElementChild.classList.remove('loader');
            alert('no such pokemon. maybe in the next generation')
        }
    }
}

function updatePOkemonToDom(response) {
     pokemonNameDiv.innerText = `name: ${response['name']}`;
     pokemonHeightDiv.innerText = `height: ${response['height']}`;
     pokemonWeightDiv.innerText = `weight: ${response['weight']}`;
     pokemonImg.src = `${response['sprites']['front_default']}`;
}
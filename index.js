const nameSearchButton = document.getElementById('search-name');
const idSearchButton = document.getElementById('search-id')
const searchByNameInput = document.querySelector('.search-by-name');
const searchByIdInput = document.querySelector('.search-by-id');
const pokemonNameDiv = document.getElementById('pokemon-name');
const pokemonHeightDiv = document.getElementById('pokemon-height');
const pokemonWeightDiv = document.getElementById('pokemon-weight');
const pokemonImg = document.getElementById('pokemon-img');
const submitionDiv = document.querySelector('.form-group');
const pokemonType = document.getElementById('pokemon-type');
const type1 = document.getElementById('type1');
const type2 = document.getElementById('type2');
//event listener for search buttons
nameSearchButton.addEventListener('click', searchPokemon);
idSearchButton.addEventListener('click', searchPokemon);
// search pokemon function
async function searchPokemon(e) {
    let identifier;
    if(e.target.tagName === 'BUTTON'){
        identifier = e.target.previousElementSibling.value;
    }else if(e.target.tagName === 'SELECT'){
            identifier =  e.target.value;
       }
    console.log(identifier);
    if(!identifier){
        alert('please enter a text');
    }else{
        submitionDiv.lastElementChild.classList.add('loader');
        try{
            const pokemonObj = await axios.get(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
            updatePOkemonToDom(pokemonObj.data);
            const backImg = pokemonObj.data['sprites']['back_default'];
            function changeToBackSprite(e) {
                    e.target.src = backImg;
            }
            function defaultImg(e) {
                e.target.src = pokemonObj.data['sprites']['front_default']
            }
            pokemonImg.addEventListener('mouseenter', changeToBackSprite);
            pokemonImg.addEventListener('mouseleave', defaultImg);
            submitionDiv.lastElementChild.classList.remove('loader');
        }catch (error){
            submitionDiv.lastElementChild.classList.remove('loader');
            alert('no such pokemon. maybe in the next generation')
            throw error;
        }
    }
}

function updatePOkemonToDom(response) {
     pokemonNameDiv.innerText = `name: ${response['name']}`;
     pokemonHeightDiv.innerText = `height: ${response['height']}`;
     pokemonWeightDiv.innerText = `weight: ${response['weight']}`;
     pokemonImg.src = `${response['sprites']['front_default']}`;
     pokemonType.innerText = 'type: '
     type1.innerText = response['types'][0]['type']['name'];
     try{
        type2.innerText = response['types'][1]['type']['name'];
     } catch (error){
         type2.innerText = '';
     }
}

async function getPokemonByType(e) {
    if(e.target.tagName !== 'P'){
      return;
    }
   const type = e.target.innerText;
   submitionDiv.lastElementChild.classList.add('loader');
        try{
            const pokemonObj = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
            showListbyType(pokemonObj.data, e.target);
            submitionDiv.lastElementChild.classList.remove('loader');
        }catch (error){
            submitionDiv.lastElementChild.classList.remove('loader');
            throw error;
        }
}

function showListbyType(response,target) {
    const typeList = document.createElement('select');
    const pokemonArray = response['pokemon'];
    pokemonArray.forEach(pokemon => {
        const option = document.createElement('option');
        option.innerText = pokemon['pokemon']['name'];
        typeList.appendChild(option);
    });
    target.appendChild(typeList);
    typeList.addEventListener('change', searchPokemon);
}


function removeTypeList(e) {
   if(e.target.tagName !== 'SELECT'){
       if(type1.firstElementChild){
        type1.firstElementChild.remove();
       }
       if(type2.firstElementChild){
           type2.firstElementChild.remove();
       }
   }
}

type1.addEventListener('click', getPokemonByType);
type2.addEventListener('click', getPokemonByType);
document.body.addEventListener('click', removeTypeList);
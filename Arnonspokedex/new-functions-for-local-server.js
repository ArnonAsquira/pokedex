import * as global from './global-variables-for-inedx';
import  * as updateToDom from './updatingToDom';
import Swal from 'sweetalert2';

let pokemonID;

let config = {
    headers: {
      username: "Arnon"
    }
  }

const localServerUrl = 'http://localhost:3000'; 
// add loader function
function addLoader() {
    global.submitionDiv.lastElementChild.classList.add('loader');
}
// remove loader function
function removeLoader() {
    global.submitionDiv.lastElementChild.classList.remove('loader');
}
// change to back sprite function
function changesprite(target, img) {
   target.src = img;
}


export async function innerFetch(req) {
    addLoader();
    try{
        let pokemonObj;
        if(Number(req)) {
            pokemonObj = await axios.get(`${localServerUrl}/pokemon/get/${req}`, config);
        } else{
            pokemonObj = await axios.get(`${localServerUrl}/pokemon/get/${req}`, config)
        }
        pokemonID = pokemonObj.data.id;
        updateToDom.updatePOkemonToDom(pokemonObj.data);
        function changeToBackSprite(e) {
            changesprite(e.target, pokemonObj.data['back_pic']);
        }
            function defaultImg(e){
            changesprite(e.target, pokemonObj.data['front_pic']);
        }
        global.pokemonImg.addEventListener('mouseenter', changeToBackSprite);
        global.pokemonImg.addEventListener('mouseleave', defaultImg);
        global.cathcPokemonBtn.addEventListener('click', catchPokemon);
        global.realeasPokemonBtn.addEventListener('click', releasePokemon);
        removeLoader();
    } catch (error) {
        Swal.fire({
            titleText: 'pokemon not found',
            icon: 'error'
        })
        removeLoader();
    }
}

async function catchPokemon(e) {
    addLoader();
    try {
        await axios.put(`${localServerUrl}/pokemon/catch/${pokemonID}`, {}, config);
        Swal.fire({titleText: 'pokemon caught'});
        removeLoader();
    }catch(error) {
        Swal.fire({
            titleText: 'pokemon could not be caught',
            icon: 'error'
    })
       removeLoader();
    }
}

async function releasePokemon(e) {
    addLoader();
    try {
        await axios.delete(`${localServerUrl}/pokemon/release/${pokemonID}`, config);
        Swal.fire({
            titleText: 'pokemon released'
        });
        removeLoader();
    }catch(error) {
        Swal.fire({
            titleText: 'pokemon was not caught',
            icon: 'error'
        });

       removeLoader();
    }
}

export async function showCaughtPokemons(e) {
    try{
        let caughtPokemons = await axios.get(`${localServerUrl}/pokemon/`, config);
        caughtPokemons = caughtPokemons.data
        Array.from(document.querySelector('.caught-pokemons-div').children).forEach(child =>{
            child.remove();
        });
        caughtPokemons.forEach(pokeOBJ => {
            newCreatePokeImgCard(JSON.parse(pokeOBJ)['front_pic'], JSON.parse(pokeOBJ)['name'])
        });
    } catch(error) {
        console.log(error);
    }
}

function newCreatePokeImgCard(url, name) {
    const pokeImg = updateToDom.createElement('img', [], [], {src:`${url}`});
    const card = updateToDom.createElement('div', [pokeImg], ['pokeImg-card', 'col-sm'], {['data-name']: name});
    card.addEventListener('click', searchByImg);
    document.querySelector('.caught-pokemons-div').appendChild(card);
}


// search pokemon by image card function
async function searchByImg(e) {
    let target;
    if(e.target.tagName === 'IMG'){
        target = e.target.parentElement
    }else{
        target = e.target;
    }
    const pokemonName = target.getAttribute(['data-name']);
    try{
      const pokeObj = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      updateToDom.updatePOkemonToDom(pokeObj.data);
    }catch(error){
        Swal.fire({
            titleText: 'request was denied',
            icon: 'warning'
        })
        throw(error + 'nooooooooo');
    }
}
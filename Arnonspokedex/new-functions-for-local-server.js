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
            pokemonObj = await fetch(`${localServerUrl}/pokemon/query`,{
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  'username': 'Arnon'
                },
                body: JSON.stringify(req) // body data type must match "Content-Type" header
              })
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
    // card.addEventListener('click', searchByImg);
    document.querySelector('.caught-pokemons-div').appendChild(card);
}
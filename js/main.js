const listaPokemon = document.querySelector("#listaPokemon");
const listaTipos = document.querySelector(".nav-list");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/generation/1/";
let URL_TYPES = "https://pokeapi.co/api/v2/type/";

(()=>{
    fetch(URL)
    .then((response)=>response.json())
    .then(data => mostrarPokedex(data,"ver-todos"));
})();

function mostrarPokedex(pokedex, tipo){

    let tipos = {};
    let pokes;
    if(tipo === "ver-todos"){
        pokes=pokedex['pokemon_species'];
    } else {
        pokes=pokedex['pokemon'];
    }

    /*pokedex.types.map(type =>{
        tipos[type.name] = `<p class="${type.id} type">${type.name}</p>`;
    });*/

    pokes.forEach(async poke => {
        const div = document.createElement("div");
        div.classList.add("pokemon");

        console.log(poke);

        let pkmName = poke.name || poke.pokemon.name;

        let response = await fetch('https://pokeapi.co/api/v2/pokemon/'+pkmName);
        let pokeDetail = await response.json();

        //let pokeTypes = pokeDetail.types.map(type => tipos[type.type.name]); 
        let pokeID = pokeDetail.id.toString().padStart(3, '0'); 
        
        // Extract the latest cry URL from the API response
        const cryLatestURL = pokeDetail.cries?.latest || '';

        div.innerHTML = `
        <div class="pokemon">
                    <p class="pokemon-id-bg">${pokeDetail.id}</p>
                    <div class="pokemon-img">
                        <img src="${pokeDetail.sprites.other["official-artwork"].front_default}"
                        alt="${pokeDetail.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="name-bx">
                            <p class="pokemon-id">${pokeID}</p>
                            <h2 class="pokemon-name">${pokeDetail.name}</h2>
                        </div>
                        <div class="pokemon-types">
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${pokeDetail.height / 10}ft</p>
                            <p class="stat">${pokeDetail.weight / 10}lbs</p>
                        </div>
                        <div class="pokemon-cry">
                            <button class="btn-cry" onclick="playCry(${pokeDetail.id})">Rugido</button>
                            <audio id="cry-${pokeDetail.id}" src="${cryLatestURL}"></audio>
                        </div>
                    </div>
                </div>
            `;
            listaPokemon.append(div);
    });
}

function playCry(pokeId) {
    const audio = document.getElementById(`cry-${pokeId}`);
    if (audio) {
        audio.play();
    }
}

botonesHeader.forEach(boton => boton.addEventListener("click",(event)=>{
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    let url = "https://pokeapi.co/api/v2/type/"+botonId;
    if(botonId==="ver-todos"){
        url = URL;
    }

    fetch(url)
        .then((response)=>response.json())
        .then(data => {
            mostrarPokedex(data, botonId);
        });
}));
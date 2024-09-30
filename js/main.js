const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/generation/1/";

fetch(URL)
    .then((response)=>response.json())
    .then(data => mostrarPokemon(data))

function mostrarPokemon(poke){

    let pokes = poke['pokemon_species'];

    let tipos = {};
    poke.types.map(type =>{
        tipos[type.name] = `<p class="${type.name} type">${type.name}</p>`;
    });

    /*let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }*/

    // @TODO: la api no restorna la info completa
    pokes.forEach(async poke => {
        const div = document.createElement("div");
        div.classList.add("pokemon");

        let response = await fetch('https://pokeapi.co/api/v2/pokemon/'+poke.name)
        let pokeDetail = await response.json();

        let pokeTypes = pokeDetail.types.map(type => tipos[type.type.name]); 
        
        // Extract the latest cry URL from the API response
        const cryLatestURL = poke.cries?.latest || '';

        div.innerHTML = `
        <div class="pokemon">
                    <p class="pokemon-id-bg">${poke.id}</p>
                    <div class="pokemon-img">
                        <img src="${pokeDetail.sprites.other["official-artwork"].front_default}"
                        alt="${pokeDetail.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="name-bx">
                            <p class="pokemon-id">${poke.id}</p>
                            <h2 class="pokemon-name">${poke.name}</h2>
                        </div>
                        <div class="pokemon-types">
                           ${pokeTypes}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${pokeDetail.height / 10}ft</p>
                            <p class="stat">${pokeDetail.weight / 10}lbs</p>
                        </div>
                        <div class="pokemon-cry">
                            <button class="btn-cry" onclick="playCry(${poke.id})">Rugido</button>
                            <audio id="cry-${poke.id}" src="${cryLatestURL}"></audio>
                        </div>
                    </div>
                </div>
            `;
            listaPokemon.append(div);
    });
    listaPokemon.append(div);
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

    for(let i = 1; i <= 151; i++){
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos"){
                    mostrarPokemon(data);
                }else{
                    const tipos = data.types.map(type => type.type.name);
                    if(tipos.some(tipo => tipo.includes(botonId))){
                        mostrarPokemon(data);
                    }
                }
            })
    } 
}))
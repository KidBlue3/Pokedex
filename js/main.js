const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for(let i = 1; i <= 151; i++){
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
} 

function mostrarPokemon(poke){

    let tipos = poke.types.map((type) =>`<p class="${type.type.name} type">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if(pokeId.length === 1){
        pokeId = "00" + pokeId;
    } else if(
        pokeId.length === 2
    ){
        pokeId = "0"+pokeId;
    }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <div class="pokemon">
                <p class="pokemon-id-bg">#${pokeId}</p>
                <div class="pokemon-img">
                    <img src="${poke.sprites.other["official-artwork"].front_default}"
                    alt="${poke.name}">
                </div>
                <div class="pokemon-info">
                    <div class="name-bx">
                        <p class="pokemon-id">#${pokeId}</p>
                        <h2 class="pokemon-name">${poke.name}</h2>
                    </div>
                    <div class="pokemon-types">
                       ${tipos}
                    </div>
                    <div class="pokemon-stats">
                        <p class="stat">${poke.height}ft</p>
                        <p class="stat">${poke.weight}lbs</p>
                    </div>
                </div>
            </div>
        `;
        listaPokemon.append(div);
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
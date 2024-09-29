const listaPokemon = document.querySelector("#listaPokemon");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for(let i = 1; i <= 151; i++){
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
} 

function mostrarPokemon(poke){
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <div class="pokemon">
                <p class="pokemon-id-bg">${poke.id}</p>
                <div class="pokemon-img">
                    <img src="${poke.sprites.other["official-artwork"].front_default}"
                    alt="${poke.name}">
                </div>
                <div class="pokemon-info">
                    <div class="name-bx">
                        <p class="pokemon-id">${poke.id}</p>
                        <h2 class="pokemon-name">${poke.name}</h2>
                    </div>
                    <div class="pokemon-types">
                        <p class="type electric">Electric</p>
                        <p class="type fighting">Fighting</p>
                    </div>
                    <div class="pokemon-stats">
                        <p class="stat">${poke.height}</p>
                        <p class="stat">${poke.weight}</p>
                    </div>
                </div>
            </div>
        `;
        listaPokemon.append(div);
}
// API Fetch 

const poke_container = document.getElementById('poke-container')
const pokemon_count = 200
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#F4E7DA',
    rock: '#D5D5D4',
    fairy: '#FCEAFF',
    poison: '#98D7A5',
    bug: '#F8D5A3',
    dragon: '#97B3E6',
    psychic: '#EAEDA1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const main_types = Object.keys(colors)
// console.log(main_types)

async function fetchPokemon() {
    for (let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokeCards(data)
}

fetchPokemon()

function createPokeCards(pokemon) {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, '0')

    // console.log(pokemon.types)

    const pokeTypes = pokemon.types.map(type => type.type.name)

    const type = main_types.find(type => pokeTypes.indexOf(type) > -1)

    const type_name = type[0].toUpperCase() + type.slice(1)

    const color = colors[type]

    pokemonEl.style.backgroundColor = color
    // console.log(pokeTypes)

    const pokemonInnerTemplate = `
        <div class="img-container">
          <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="">
        </div>
        <div class="info">
          <span class="number">#${id}</span>
          <h3 class="name">${name}</h3>
          <small class="type">Type: <span>${type_name}</span></small>
        </div>
    `

    pokemonEl.innerHTML = pokemonInnerTemplate

    poke_container.appendChild(pokemonEl)

}
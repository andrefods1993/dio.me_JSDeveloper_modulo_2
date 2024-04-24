const section__pokemon = document.getElementById('section__pokemon');

const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('pokemonId');

function loadPokemon(pokemonId) {
	pokeApi.getPokemonEvolutions(pokemonId).then((results) => {
		const pokemons = createEvolutions(results);

		for (let i = 0; i < pokemons.length; i++) {
			pokeApi.getPokemon(pokemons[i]).then((pokemon) => {
				const contentEvolutionContainer = document.querySelector(
					'.content__evolution'
				);
				const evolutionContent = createEvolutionContent(pokemon);
				contentEvolutionContainer.appendChild(evolutionContent);
			});
		}
	});

	pokeApi.getPokemon(pokemonId).then((pokemon) => {
		const hpPercentage = (parseInt(pokemon.hp) / 250) * 100;
		const attackPercentage = (parseInt(pokemon.attack) / 200) * 100;
		const defensePercentage = (parseInt(pokemon.defense) / 250) * 100;
		const spAtackPercentage = (parseInt(pokemon.specialAttack) / 200) * 100;
		const spDefensePercentage = (parseInt(pokemon.specialDefense) / 250) * 100;
		const speedPercentage = (parseInt(pokemon.speed) / 200) * 100;
		const pokemon_content = `
      <!-- Background Ellipse -->
      <div class="bg--pokemon pokemon--${pokemon.mainType}"></div>
      <!-- Pokemon -->
      <h1 class="pokemon--name">${pokemon.name}</h1>
      <div class="pokemon__photo">
        <img
          class="pokemon__photo--img"
          src="${pokemon.photo}"
          alt="Bulbasaur" />
      </div>
      <div class="pokemon--type">
        <span class="pokemon--type--name pokemon__card--type--${pokemon.mainType}"
          >${pokemon.mainType}</span
        >
      </div>

      <div class="content__stats">
        <!-- Pokémon Stats -->
        <div class="pokemon__stats">
          <table>
            <tr>
              <td class="pokemon__stats--name">HP</td>
              <td class="pokemon__stats--value" id="hp--value">${pokemon.hp}</td>
              <td class="pokemon__stats--progress">
                <div class="progress-bar-container">
                  <div
                    class="progress-bar pokemon__card--type--${pokemon.mainType}"
                    style="width: ${hpPercentage}%"></div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="pokemon__stats--name">Ataque</td>
              <td class="pokemon__stats--value" id="attack--value">${pokemon.attack}</td>
              <td class="pokemon__stats--progress">
                <div class="progress-bar-container">
                  <div
                    class="progress-bar pokemon__card--type--${pokemon.mainType}"
                    style="width: ${attackPercentage}%"></div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="pokemon__stats--name">Defesa</td>
              <td class="pokemon__stats--value" id="defense--value">${pokemon.defense}</td>
              <td class="pokemon__stats--progress">
                <div class="progress-bar-container">
                  <div
                    class="progress-bar pokemon__card--type--${pokemon.mainType}"
                    style="width: ${defensePercentage}%"></div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="pokemon__stats--name">Ataque Es.</td>
              <td class="pokemon__stats--value" id="spAttack--value">${pokemon.specialAttack}</td>
              <td class="pokemon__stats--progress">
                <div class="progress-bar-container">
                  <div
                    class="progress-bar pokemon__card--type--${pokemon.mainType}"
                    style="width: ${spAtackPercentage}%"></div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="pokemon__stats--name">Defesa Es.</td>
              <td class="pokemon__stats--value" id="spDefense--value">${pokemon.specialDefense}</td>
              <td class="pokemon__stats--progress">
                <div class="progress-bar-container">
                  <div
                    class="progress-bar pokemon__card--type--${pokemon.mainType}"
                    style="width: ${spDefensePercentage}%"></div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="pokemon__stats--name">Velocidade</td>
              <td class="pokemon__stats--value" id="speed--value">${pokemon.speed}</td>
              <td class="pokemon__stats--progress">
                <div class="progress-bar-container">
                  <div
                    class="progress-bar pokemon__card--type--${pokemon.mainType}"
                    style="width: ${speedPercentage}%"></div>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <!-- Pokémon Evolution -->
        <div if="contentEvo">
          <h2 class="pokemon__evolution--h2">Evolução</h2>
          <div class="content__evolution">


          </div>
        </div>
        </div>
      </div>`;
		section__pokemon.innerHTML = pokemon_content;
	});
}

function createEvolutionContent(pokemon) {
	const pokemonEvolution = document.createElement('div');
	pokemonEvolution.classList.add('pokemon__evolution');

	const pokemonEvolutionPhoto = document.createElement('div');
	pokemonEvolutionPhoto.classList.add('pokemon__evolution__photo');

	const spanNome = document.createElement('span');
	spanNome.textContent = pokemon.name;
	pokemonEvolutionPhoto.appendChild(spanNome);

	const imgPokemon = document.createElement('img');
	imgPokemon.classList.add('pokemon__evolution__photo--img');
	imgPokemon.src = pokemon.photo;
	imgPokemon.alt = pokemon.name;
	pokemonEvolutionPhoto.appendChild(imgPokemon);

	pokemonEvolution.appendChild(pokemonEvolutionPhoto);

	const separationLine = document.createElement('div');
	separationLine.classList.add('separation--line');
	pokemonEvolution.appendChild(separationLine);

	return pokemonEvolution;
}

loadPokemon(pokemonId);

function btnPrevius(pokemonId) {
	const idAtual = parseInt(pokemonId);
	const pokemonIdPrevius = idAtual - 1;
	const btnPrevious = document.getElementById('btn--previous');

	if (idAtual === 10001) {
		btnPrevious.addEventListener('click', () => {
			window.location.href = `pokemon-page.html?pokemonId=${1025}`;
			loadPokemon(pokemonIdPrevius);
		});
	} else if (idAtual > 1) {
		btnPrevious.addEventListener('click', () => {
			window.location.href = `pokemon-page.html?pokemonId=${pokemonIdPrevius}`;
			loadPokemon(pokemonIdPrevius);
		});
	}
	console.log(idAtual);
}

function btnNext(pokemonId) {
	const idAtual = parseInt(pokemonId);
	const pokemonIdNext = idAtual + 1;
	const btnNext = document.getElementById('btn--next');

	if (idAtual === 1025) {
		btnNext.addEventListener('click', () => {
			window.location.href = `pokemon-page.html?pokemonId=${10001}`;
			loadPokemon(pokemonIdNext);
		});
	} else if (idAtual < 10263) {
		btnNext.addEventListener('click', () => {
			window.location.href = `pokemon-page.html?pokemonId=${pokemonIdNext}`;
			loadPokemon(pokemonIdNext);
		});
	}
}

btnPrevius(pokemonId);
btnNext(pokemonId);

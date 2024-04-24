// Seleciona a lista de Pokémon na página pelo ID
const ol_pokemonsList = document.getElementById('pokemonsList');

// Define a variável de deslocamento inicial e o limite de Pokémon a serem carregados
let offset = 0;
const limit = 6;

// Função para carregar cards de Pokémon na lista com base no deslocamento e limite fornecidos
function loadPokemonCard(offset, limit) {
	// Obtém os detalhes dos Pokémon da API com base no deslocamento e limite
	pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
		// Atualiza o conteúdo da lista de Pokémon na página com os cards gerados dinamicamente
		ol_pokemonsList.innerHTML = pokemons
			.map(
				(pokemon) => `
        <li class="pokemon__card pokemon--${
					pokemon.mainType
				}" value="${parseInt(pokemon.id, 10)}">
            <div class="bg--card">
                <div class="pokemon__card__identification">
                    <span class="pokemon__card--name">${pokemon.name}</span>
                    <span class="pokemon__card--number">#${pokemon.id}</span>
                </div>

                <div class="pokemon__card__detail">
                    <ol class="pokemon__card--types">
                        ${pokemon.types
													.map(
														(type) =>
															`<li class="pokemon__card--type pokemon__card--type--${pokemon.mainType}">${type}</li>`
													)
													.join('')}
                    </ol>

                    <img
                        class="pokemon__card--img"
                        src="${pokemon.photo}"
                        alt="${pokemon.name}" />
                </div>
            </div>
        </li>
    `
			)
			.join('');
	});
}

// Criar uma pagina do pokémon selecionado
function createPokemonPage() {
	document.addEventListener('DOMContentLoaded', function () {
		document.addEventListener('click', function (event) {
			// @ts-ignore
			let targetCard = event.target.closest('.pokemon__card');
			if (targetCard) {
				const pokemonId = targetCard.getAttribute('value');
				window.location.href = `pokemon-page.html?pokemonId=${pokemonId}`;
			}
		});
	});
}

// Carrega os cards de Pokémon na lista inicialmente
loadPokemonCard(offset, limit);

// Chama a função para adicionar itens de página à paginação
addPageItens(offset, limit);

// Adiciona eventos de clique para navegação na paginação
li_btnPagePrevius.addEventListener('click', arrowPageNavigation);
li_btnPageNext.addEventListener('click', arrowPageNavigation);

// Adiciona evento de clique para interação com itens de página na lista
document.addEventListener('click', itemPageNavigation);

// Permite escolher uma página específica ao pressionar Enter no campo de número de página
chooseItemPage();

// Chama a função para criar a pagina pokémon
createPokemonPage();

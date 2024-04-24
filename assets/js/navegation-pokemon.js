// Seleciona elementos da página
const li_btnPagePrevius = document.getElementById('btnPagePrevius');
const a_linkPagePrevius = document.getElementById('linkPagePrevius');
const li_btnPageNext = document.getElementById('btnPageNext');
const a_linkPageNext = document.getElementById('linkPageNext');
const input_pageNumber = document.getElementById('inputPageNumber');

// Adiciona itens de página à paginação
function addPageItens(offset, limit) {
	const ul_pagination = document.querySelector('.pagination');
	const li_pageItem = document.querySelectorAll('.btnPage');

	// Remove todos os itens de página existentes
	li_pageItem.forEach((element) => element.remove());

	const firstItem = offset / limit + 1;
	const lastItem = firstItem + 4;

	// Verifica se o primeiro item está dentro do limite total de páginas (213 no exemplo)
	if (firstItem <= 213) {
		for (let i = firstItem; i <= lastItem; i++) {
			const listItem = document.createElement('li');
			listItem.classList.add('page__item', 'btnPage');

			const link = document.createElement('a');
			link.classList.add('page__item--link');
			link.setAttribute('value', `${i}`);
			link.textContent = `${i}`;

			listItem.appendChild(link);
			ul_pagination.insertBefore(
				listItem,
				document.getElementById('pageNumber')
			);
		}
	}
}

// Navegação ao clicar em itens de página
function itemPageNavigation(event) {
	const itemClicked = event.target;
	let pageNumber;

	if (
		itemClicked instanceof HTMLLIElement &&
		itemClicked.classList.contains('btnPage')
	) {
		const linkInsideLi = itemClicked.querySelector('.page__item--link');
		if (linkInsideLi) {
			const linkValue = linkInsideLi.getAttribute('value');
			pageNumber = parseInt(linkValue);
			offset = limit * (pageNumber - 1);
			loadPokemonCard(offset, limit);
			addPageItens(offset, limit);
		}
	} else if (
		itemClicked instanceof HTMLAnchorElement &&
		itemClicked.classList.contains('page__item--link')
	) {
		const linkValue = itemClicked.getAttribute('value');
		pageNumber = parseInt(linkValue);
		offset = limit * (pageNumber - 1);
		loadPokemonCard(offset, limit);
		addPageItens(offset, limit);
	}
}

// Navegação ao clicar nas setas de página
function arrowPageNavigation(event) {
	if (
		event.target === li_btnPagePrevius ||
		event.target === a_linkPagePrevius
	) {
		if (offset > 5) {
			offset -= limit;
			loadPokemonCard(offset, limit);
			addPageItens(offset, limit);
		}
	} else if (
		event.target === li_btnPageNext ||
		event.target === a_linkPageNext
	) {
		offset += limit;
		loadPokemonCard(offset, limit);
		addPageItens(offset, limit);
	}
}

// Seleção de página ao pressionar Enter no campo de input
function chooseItemPage() {
	input_pageNumber.addEventListener('keydown', function (event) {
		if (input_pageNumber instanceof HTMLInputElement) {
			const inputVal = parseInt(input_pageNumber.value, 10);
			if (inputVal <= parseInt(input_pageNumber.max)) {
				if (event.key === 'Enter') {
					offset = limit * inputVal;
					loadPokemonCard(offset, limit);
					addPageItens(offset, limit);
				}
			} else {
				if (event.key === 'Enter') {
					offset = limit * 213;
					loadPokemonCard(offset, limit);
					addPageItens(offset, limit);
				}
			}
		}
	});
}

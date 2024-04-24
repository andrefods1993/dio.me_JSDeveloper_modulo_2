/*
  Slide Menu Function
*/

// IIFE (Immediately Invoked Function Expression) para encapsular o código e evitar poluição do escopo global
(function () {
	// Seleciona o elemento que aciona o menu
	const menuTrigger = document.querySelector('.menu-trigger');

	// Verifica se o elemento existe antes de adicionar um evento
	if (!menuTrigger) return;

	// Adiciona um evento de clique ao menuTrigger
	menuTrigger.addEventListener('click', () => {
		// Alterna a classe 'menu-active' no elemento <body> para mostrar ou ocultar o menu
		document.body.classList.toggle('menu-active');
	});
})();

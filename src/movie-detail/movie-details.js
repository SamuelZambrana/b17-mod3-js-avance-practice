import { viewSelectElem, moviesCategoriesElem } from '../util/dom.js';

// Recuperar el elemento de selección de vista y lo ocultamos
const viewIconsButton = viewSelectElem();
viewIconsButton.setAttribute('hidden', true);

// Recuperar el elemento de selección de categorías y lo ocultamos
const categoriesSelect = moviesCategoriesElem();
categoriesSelect.setAttribute('hidden', true);



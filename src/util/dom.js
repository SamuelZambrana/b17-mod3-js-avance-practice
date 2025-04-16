export function getAppElem() {
    return getElementBySelector('#app')
}

export function movieTypeSelectElem() {
    return getElementBySelector('#movie-type-select')
}

export function viewSelectElem() {
    return getElementBySelector('.view-type-select')
}

export function gridViewElem() {
    return getElementBySelector('#movie-grid')
}

export function listViewElem() {
    return getElementBySelector('#movie-list')
}

export function moviesCategoriesElem() {
    return getElementBySelector('.movies-categories')
}

export function createDivElementWithClass(className) {
    const divElem = document.createElement('div');
    className.forEach((className) => {
        divElem.classList.add(className);
    });
    return divElem;
}

function getElementBySelector(selector) {
    const elem = document.querySelector(selector);

    if (elem === null) {
        throw new Error(`No se encontró el elemento con selector: ${selector}`);
    }
    return elem;
}


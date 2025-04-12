export function getAppElem() {
    return getElementBySelector('#app')
}

export function movieTypeSelectElem() {
    return getElementBySelector('#movie-type-select')
}

function getElementBySelector(selector) {
    const elem = document.querySelector(selector);

    if (elem === null) {
        throw new Error(`No se encontró el elemento con selector: ${selector}`);
    }
    return elem;
}
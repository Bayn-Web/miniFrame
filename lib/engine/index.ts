import { createEffect } from "../reactive/data";

let container: Element | undefined = undefined
let renderFunc: Function | undefined = undefined;

/**
 * Start the engine
 * @param render - The render function
 * @param el - The element to render to
*/
const startEngine = (render: () => Element, el?: string) => {
    container = el ? document.querySelector(el)! : document.getElementById('container')!
    createEffect(() => {
        renderFunc = render
        if (container!.firstElementChild) {
            container!.firstElementChild.replaceWith(renderFunc())
        } else {
            container!.appendChild(renderFunc())
        }
    })
}

export {
    startEngine,
    container
}
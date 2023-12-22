import { createEffect } from "../reactive/data";

let container: Element | undefined = undefined
let renderFunc: Function | undefined = undefined;

/**
 * Start the engine
 * @param render - The render function
 * @param el - The element to render to
*/
const startEngine = (render: () => [Element, HTMLStyleElement], el?: string) => {
    container = el ? document.querySelector(el)! : document.getElementById('container')!
    createEffect(() => {
        renderFunc = render
        if (container!.firstElementChild) {
            container!.childNodes.forEach(child => child.remove())
            container!.firstElementChild.replaceWith(renderFunc()[0], renderFunc()[1])
        } else {
            container!.appendChild(renderFunc()[0])
            container!.appendChild(renderFunc()[1])
        }
    })
}

export {
    startEngine,
    container
}
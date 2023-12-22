import { createEffect } from "../reactive/data";

let container: Element | undefined = undefined

/**
 * Start the engine
 * @param render - The render function
 * @param el - The element to render to
*/
const startEngine = (render: () => [Element, HTMLStyleElement], el?: string) => {
    container = el ? document.querySelector(el)! : document.getElementById('container')!
    createEffect(() => {
        let dom = render()
        if (container!.firstElementChild) {
            container!.childNodes.forEach(child => child.remove())
            container!.firstElementChild.replaceWith(dom[0], dom[1])
        } else {
            container!.appendChild(dom[0])
            container!.appendChild(dom[1])
        }
    })
}

export {
    startEngine,
    container
}
import { createEffect } from "../reactive/data";
import { htmlCompile } from "../compiler";

let container: Element | undefined = undefined

/**
 * Start the engine
 * @param render - The render function
 * @param el - The element to render to
*/
const startEngine = (render: () => [string, HTMLStyleElement], el?: string) => {
    container = el ? document.querySelector(el)! : document.getElementById('container')!
    createEffect(() => {
        let dom = render()
        let html = htmlCompile(dom[0])
        if (container!.firstElementChild) {
            container!.childNodes.forEach(child => child.remove())
            container!.firstElementChild.replaceWith(html!, dom[1])
        } else {
            container!.appendChild(html!)
            container!.appendChild(dom[1])
        }
    })
}

export {
    startEngine,
    container
}
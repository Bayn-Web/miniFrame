import { transcss2dom } from "./css/index"
const propsToEffects: any = {}
const dirtyEffects: any = []
let queued = false
let currentEffect: Function | undefined = undefined;

/**
 * @description reative data, can refresh dom.
*/
const data: any = new Proxy(({} as any), {
    get(obj, prop) {
        onGet(prop)
        return obj[prop]
    },
    set(obj, prop, value) {
        obj[prop] = value
        onSet(prop)
        return true
    }
})

/**
 * @description get data
 * @param {string} prop
*/
function onGet(prop: any) {
    if (currentEffect) {
        const effects = propsToEffects[prop] ?? (propsToEffects[prop] = [])
        effects.push(currentEffect)
    }
}

/**
 * @description flush effects queue
*/
function flush() {
    while (dirtyEffects.length) {
        (dirtyEffects as Function[]).shift()!()
    }
}

/**
 * @description set data
 * @param {string} prop
*/
function onSet(prop: any) {
    if (propsToEffects[prop]) {
        dirtyEffects.push(...propsToEffects[prop])
        if (!queued) {
            queued = true
            queueMicrotask(() => {
                queued = false
                flush()
            })
        }
    }
}

/**
 * @description create effect
 * @param {Function} effect
*/
function createEffect(effect: Function) {
    currentEffect = effect
    effect()
    currentEffect = undefined
}

// HTML rendering

let container: Element | undefined = undefined
let template: HTMLTemplateElement | undefined = undefined;

/**
 * @description get string into template
 * @param {string} htmlString
*/
function trans2Template(htmlString: string) {
    const template = document.createElement('template')
    template.innerHTML = htmlString
    return template
}

/**
 * @description Render HTML
 * @param tokens TemplateStringsArray
 * @param expressions any[]
*/
function html(tokens: TemplateStringsArray, ...expressions: any) {
    const replaceStubs = (string: string) => {
        return string.replaceAll(/__stub-(\d+)__/g, (_, i) => {
            return expressions[i]
        })
    }
    // get or create the template
    if (!template) {
        const stubs = expressions.map((_: any, i: string) => `__stub-${i}__`)
        const allTokens = tokens.map((token, i) => (stubs[i - 1] ?? '') + token)
        const htmlString = allTokens.join('')
        template = trans2Template(htmlString)
        // clone and update bindings
    }
    const cloned = (template.content.cloneNode(true) as HTMLElement).firstElementChild

    /**
     * @param node
     * @description trans all children
     * nodeType 1 means need to trans attributes
     * nodeType 3 means need to trans text
    */
    function transChild(node: any) {
        if (node.nodeType == 1) {
            for (const { name, value } of node.attributes) {
                node.setAttribute(name, replaceStubs(value))
            }
        } else if (node.nodeType == 3) {
            node.textContent = replaceStubs(node.textContent)
        }
        if (node.childNodes.length > 0) {
            (Array.from(node.childNodes as Element[])).forEach((child: Element, index: number, self: any[]) => {
                self[index] = transChild(child)
            })
        }
        return node
    }
    return transChild(cloned)
}

const css = (tokens: TemplateStringsArray, ...expressions: (string | number)[]) => {
    container?.appendChild(transcss2dom(tokens, ...expressions))
}


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
    data,
    startEngine,
    html,
    css,
    createEffect
}
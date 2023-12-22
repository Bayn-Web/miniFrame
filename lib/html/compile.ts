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


export {
    html
}
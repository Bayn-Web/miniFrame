import { container } from "../engine";

/**
 * @description Render css
 * @param tokens TemplateStringsArray
 * @param expressions (string|number)[]
*/
function transcss2dom(tokens: TemplateStringsArray, ...expressions: (string | number)[]) {
    const cssString = tokens.map((token, index) => {
        return (expressions[index - 1] ?? '') + token;
    }).join('');

    let styleDom = document.createElement('style')
    styleDom.textContent = cssString;
    return styleDom;
}

const css = (tokens: TemplateStringsArray, ...expressions: (string | number)[]) => {
    container?.appendChild(transcss2dom(tokens, ...expressions))
}

export {
    css
}
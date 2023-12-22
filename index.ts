import { startEngine, html, data, createEffect, css, makeFunc } from "./lib/index"
// Tying it all together

data.color = 'blue'
data.a = 1;

createEffect(() => {
    data.textColor = data.color === 'blue' ? 'red' : 'blue'
})

startEngine(function render() {
    return html`
    <div class="${data.color}">
        <div class="${data.textColor}" id='my'>
            ${data.color}
        </div>
        ${data.a}
        <button onclick="switchColor()">switchColor</button>
    </div>
    `
})

css`
   .blue {
        color: blue;
    }
    .red {
        color: ${data.textColor};
    }
`;

makeFunc('switchColor', () => {
    data.color = 'red'
})
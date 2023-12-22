import { startEngine, html, data, createEffect, css, makeFunc } from "./lib/index"
// Tying it all together

data.color = 'blue'
data.a = 1;

createEffect(() => {
    data.textColor = data.color === 'blue' ? 'red' : 'blue'
})

startEngine(function render() {
    return [html`
    <div>
        <div class="${data.color}">
            color:${data.color}
        </div>
        <div class="${data.textColor}">
            color:${data.textColor}
        </div>
        <label>
            <div class="round">    
            </div>
        </label>
        <button onclick="switchColor()">switchColor</button>
    </div>
    `,
    css`
    .blue {
         color: ${data.color};
     }
     .red {
         color: ${data.textColor};
     }
     .round {
         background: radial-gradient(#e66465, ${data.textColor});
         height: 100px;
         width: 100px;
         border-radius: 50%;
     }
 `]
})


makeFunc('switchColor', () => {
    data.color = data.color == 'red' ? 'blue' : 'red';
})
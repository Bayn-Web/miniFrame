import { startEngine, html, data, createEffect, css, makeFunc } from "@bayn/miniframe"
// Tying it all together

data.color = 'blue'
data.a = 1;

createEffect(() => {
    data.textColor = data.color === 'blue' ? 'red' : 'blue'
})

startEngine(() => [html`
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
        <a onclick="switchColor()">switchColor</a>
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
         background: radial-gradient(${data.color}, ${data.textColor});
         height: 100px;
         width: 100px;
         border-radius: 50%;
     }
     a{
        cursor: pointer;
     }
 `]
)


makeFunc('switchColor', () => {
    data.color = data.color == 'red' ? 'blue' : 'red';
})
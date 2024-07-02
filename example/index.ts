import { startEngine, data, createEffect, css, makeFunc } from "../lib/index"

data.color = 'blue'
data.a = 1;

createEffect(() => {
    data.textColor = data.color === 'blue' ? 'red' : 'blue'
})

makeFunc('switchColor', () => {
    data.color = data.color == 'red' ? 'blue' : 'red';
})


startEngine(() => [`
<div>
    <div class="$color">
        color:$color
    </div>
    <div class="$textColor">
        textColor:$textColor
    </div>
    <label>
        <div class="round">
            color:$textColor 
        </div>
    </label>
    <button click="switchColor">switchColor</button>
</div>`,
    css`
    .blue {
         color: ${data.color};
     }
     .red {
         color: ${data.textColor};
     }
     .round {
         background: radial-gradient(${data.color}, ${data.textColor});
         display: flex;
         justify-content: center;
         align-items: center;
         height: 100px;
         width: 100px;
         border-radius: 50%;
         color: white;
     }
 `]
)
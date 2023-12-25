import { startEngine, data, createEffect, css, makeFunc } from "./lib/index"
// Tying it all together

data.color = 'blue'
data.a = 1;

createEffect(() => {
    data.textColor = data.color === 'blue' ? 'red' : 'blue'
})


makeFunc('switchColor', () => {
    data.color = data.color == 'red' ? 'blue' : 'red';
})


startEngine(() => [`<div>
<div class="$color">
    color:$color
</div>
<div class="$textColor">
    color:$textColor
</div>
<label>
    <div class="round">   
    color:$textColor 
    </div>
</label>
<a click="switchColor">switchColor</a>
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
     a{
        cursor: pointer;
     }
 `]
)
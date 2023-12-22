declare module '@bayn/miniframe' {
    function css(tokens: TemplateStringsArray, ...expressions: (string | number)[]): HTMLStyleElement;
    function html(tokens: TemplateStringsArray, ...expressions: (string | number)[]): HTMLElement;
    function startEngine(render: () => [Element, HTMLStyleElement], el?: string);
    function createEffect(effect: Function);
    function makeFunc(name: keyof Global, cb: Function);
    const data: data;
}
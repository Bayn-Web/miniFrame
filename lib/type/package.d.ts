declare module '@bayn/miniframe' {
    function css(tokens: TemplateStringsArray, ...expressions: (string | number)[]): HTMLStyleElement;
    function startEngine(render: () => [Element, HTMLStyleElement], el?: string);
    function createEffect(effect: Function);
    function makeFunc(name: string, cb: clickEvent);
    const data: data;
}
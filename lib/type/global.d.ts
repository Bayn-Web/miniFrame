type clickEvent = (this: GlobalEventHandlers, ev: MouseEvent) => any

type data = {
    func: {
        [key: string]: (this: GlobalEventHandlers, ev: MouseEvent) => any;
    }
} & {
    [key: string]: dataParams;
};

type dataParams = string | number | Date | boolean | null | undefined | Function | (() => void)


export {
    clickEvent,
    data,
    dataParams
}
import { error } from "../common"
import type { Global } from "../type/globalThis"
const makeFunc = (name: keyof Global, cb: Function) => {
    //判断name在不在globalthis原有属性上
    if (name in globalThis) {
        error('param ' + name + ' aganst origin globalThis params')
        return
    }
    (globalThis as Global)[name] = (...args: any[]) => {
        return cb(...args)
    }
}

export {
    makeFunc
}
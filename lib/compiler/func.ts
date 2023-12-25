import { data } from "../index"
import type { clickEvent } from "../type/global"
const makeFunc = (name: string, cb: clickEvent) => {
    data.func[name] = cb;
}

export {
    makeFunc
}
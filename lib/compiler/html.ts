import { data } from "../index"

const htmlCompile = (htmlString: string) => {
    const parser = new DOMParser();
    const replaceAttrs = ['class', 'id', 'click']
    // should replace frame own func
    const dom = parser.parseFromString(htmlString, 'text/html');
    // have to be
    let target = dom.childNodes[0].childNodes[1].childNodes[0]
    const replaceParms = (target: HTMLElement) => {
        (target.childNodes as unknown as HTMLElement[]).forEach((res) => {
            if (res.nodeType === 3 && res.textContent?.trim() == '') return;
            if (res.nodeType === 3) {
                (res.textContent as string | undefined) = res.textContent?.replace(/\$(.*?)\s/g, (match) => {
                    return String(data[match.slice(1, match.length - 1)])
                })
            }
            if (res.nodeType === 1) {
                replaceAttrs.forEach((attr) => {
                    if (res.getAttribute(attr)) {
                        res.setAttribute(attr, res.getAttribute(attr)!.replace(/\$(.*?)\s/g, (match) => {
                            return String(data[match.slice(1, match.length - 1)])
                        }))
                        if (attr === 'click') {
                            res.onclick = data.func[res.getAttribute(attr)!]
                        }
                    }
                })
            }
            replaceParms(res)
        })
    }
    replaceParms(target as HTMLElement)
    return target
}

export {
    htmlCompile
}
import { data } from "../index"

const htmlCompile = (htmlString: string) => {
    const parser = new DOMParser();
    const replaceAttrs = ['class', 'id', 'click']
    // 解析HTML字符串为DOM对象
    const dom = parser.parseFromString(htmlString, 'text/html');
    let target = dom.childNodes[0].childNodes[1].childNodes[0]
    const replaceParms = (target: HTMLElement) => {
        target.childNodes.forEach((res) => {
            if (res.nodeType === 3 && res.textContent?.trim() == '') return;
            if (res.nodeType === 3) {
                (res.textContent as string | undefined) = res.textContent?.replace(/\$(.*?)\s/g, (match) => {
                    return String(data[match.slice(1, match.length - 1)])
                })
            }
            if (res.nodeType === 1) {
                replaceAttrs.forEach((attr) => {
                    if ((res as HTMLElement).getAttribute(attr)) {
                        (res as HTMLElement).setAttribute(attr, (res as HTMLElement).getAttribute(attr)!.replace(/\$(.*?)\s/g, (match) => {
                            return String(data[match.slice(1, match.length - 1)])
                        }))
                        if (attr === 'click') {
                            (res as HTMLElement).onclick = data.func[(res as HTMLElement).getAttribute(attr)!]
                        }
                    }
                })
            }
            replaceParms(res as HTMLElement)
        })
    }
    replaceParms(target as HTMLElement)
    return target
}

export {
    htmlCompile
}
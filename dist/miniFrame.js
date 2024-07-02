function A(t, ...e) {
  const c = t.map((l, s) => (e[s - 1] ?? "") + l).join("");
  let o = document.createElement("style");
  return o.textContent = c, o;
}
const u = {}, h = [];
let a = !1, d;
const f = new Proxy({ func: {} }, {
  get(t, e) {
    return y(e), t[e];
  },
  set(t, e, c) {
    return t[e] = c, x(e), !0;
  }
});
function y(t) {
  d && (u[t] ?? (u[t] = [])).push(d);
}
function C() {
  for (; h.length; )
    h.shift()();
}
function x(t) {
  u[t] && (h.push(...u[t]), a || (a = !0, queueMicrotask(() => {
    a = !1, C();
  })));
}
function S(t) {
  d = t, t(), d = void 0;
}
const k = (t) => {
  const e = new DOMParser(), c = ["class", "id", "click"];
  let l = e.parseFromString(t, "text/html").childNodes[0].childNodes[1].childNodes[0];
  const s = (E) => {
    E.childNodes.forEach((n) => {
      var m, g;
      n.nodeType === 3 && ((m = n.textContent) == null ? void 0 : m.trim()) == "" || (n.nodeType === 3 && (n.textContent = (g = n.textContent) == null ? void 0 : g.replace(/\$(.*?)\s/g, (i) => String(f[i.slice(1, i.length - 1)]))), n.nodeType === 1 && c.forEach((i) => {
        n.getAttribute(i) && (n.setAttribute(i, n.getAttribute(i).replace(/\$(.*?)\s/g, (p) => String(f[p.slice(1, p.length - 1)]))), i === "click" && (n.onclick = f.func[n.getAttribute(i)]));
      }), s(n));
    });
  };
  return s(l), l;
}, N = (t, e) => {
  f.func[t] = e;
};
let r;
const b = (t, e) => {
  r = e ? document.querySelector(e) : document.getElementById("container"), S(() => {
    let c = t(), o = k(c[0]);
    r.firstElementChild ? (r.childNodes.forEach((l) => l.remove()), r.firstElementChild.replaceWith(o, c[1])) : (r.appendChild(o), r.appendChild(c[1]));
  });
};
export {
  r as container,
  S as createEffect,
  A as css,
  f as data,
  k as htmlCompile,
  N as makeFunc,
  b as startEngine
};

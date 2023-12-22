function C(t, ...e) {
  const r = t.map((c, n) => (e[n - 1] ?? "") + c).join("");
  let s = document.createElement("style");
  return s.textContent = r, s;
}
const a = {}, p = [];
let h = !1, f;
const v = new Proxy({}, {
  get(t, e) {
    return E(e), t[e];
  },
  set(t, e, r) {
    return t[e] = r, T(e), !0;
  }
});
function E(t) {
  f && (a[t] ?? (a[t] = [])).push(f);
}
function g() {
  for (; p.length; )
    p.shift()();
}
function T(t) {
  a[t] && (p.push(...a[t]), h || (h = !0, queueMicrotask(() => {
    h = !1, g();
  })));
}
function _(t) {
  f = t, t(), f = void 0;
}
let i;
const S = (t, e) => {
  i = e ? document.querySelector(e) : document.getElementById("container"), _(() => {
    let r = t();
    i.firstElementChild ? (i.childNodes.forEach((s) => s.remove()), i.firstElementChild.replaceWith(r[0], r[1])) : (i.appendChild(r[0]), i.appendChild(r[1]));
  });
}, b = (t) => {
  throw new Error(t + " ----from [miniFrame]");
}, k = (t, e) => {
  if (t in globalThis) {
    b("param " + t + " aganst origin globalThis params");
    return;
  }
  globalThis[t] = (...r) => e(...r);
};
let d;
function y(t) {
  const e = document.createElement("template");
  return e.innerHTML = t, e;
}
function w(t, ...e) {
  const r = (n) => n.replaceAll(/__stub-(\d+)__/g, (l, o) => e[o]);
  if (!d) {
    const n = e.map((u, m) => `__stub-${m}__`), o = t.map((u, m) => (n[m - 1] ?? "") + u).join("");
    d = y(o);
  }
  const s = d.content.cloneNode(!0).firstElementChild;
  function c(n) {
    if (n.nodeType == 1)
      for (const { name: l, value: o } of n.attributes)
        n.setAttribute(l, r(o));
    else
      n.nodeType == 3 && (n.textContent = r(n.textContent));
    return n.childNodes.length > 0 && Array.from(n.childNodes).forEach((l, o, u) => {
      u[o] = c(l);
    }), n;
  }
  return c(s);
}
export {
  i as container,
  _ as createEffect,
  C as css,
  v as data,
  w as html,
  k as makeFunc,
  S as startEngine
};

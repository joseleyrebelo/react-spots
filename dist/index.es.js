import { jsx as d } from "react/jsx-runtime";
import S, { useState as l, useRef as C, useCallback as b, useEffect as m, createContext as p } from "react";
import { objKeys as a, capitalize as w, isString as x } from "ts-util";
function P(c) {
  const [e, o] = l(c), n = C(void 0), s = b((r, t) => {
    n.current = t, o(r);
  }, []);
  return m(() => {
    n.current && (n.current(e), n.current = void 0);
  }, [e]), [e, s];
}
const R = (c, e) => {
  const o = p(f(c, e)), n = j(o, c, e);
  return { Spot: o, SpotBounds: n, useSpot: (t) => S.useContext(t || o), clone: () => R(c, e) };
}, j = (c, e, o) => function({
  children: s,
  ...r
}) {
  return a(r).forEach((t) => {
    x(t) && (e.states && t in e.states ? e.states[t] = r[t] : e.data && t in e.data ? e.data[t] = r[t] : e.middleware && t in e.middleware && (e.middleware[t] = r[t]));
  }), /* @__PURE__ */ d(c.Provider, { value: f(e, o, !0), children: s });
}, f = (c, e, o = !1) => {
  const { states: n, middleware: s } = c;
  return {
    ...c,
    ...e,
    ...n && a(n).reduce(
      (r, t) => {
        let i = n[t], u = () => {
        };
        return o && ([i, u] = P(n[t])), {
          ...r,
          states: { ...r.states, [t]: i },
          setStates: {
            ...r.setStates,
            // @todo Correct usage of 'as string'
            [`set${w(t)}`]: u
          }
        };
      },
      {}
    ),
    ...s && a(s).reduce(
      (r, t) => ({
        ...r,
        [t]: s[t]
      }),
      {}
    ),
    ...e && a(e).reduce(
      (r, t) => ({
        ...r,
        // @todo Correct usage of 'any[]'
        [t]: function(...i) {
          return e[t](
            this,
            ...i
          );
        }
      }),
      {}
    ),
    isLive: o
  };
};
export {
  R as newSpot
};

!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports,require("react")):"function"==typeof define&&define.amd?define(["exports","react"],r):r((e="undefined"!=typeof globalThis?globalThis:e||self)["react-spots"]={},e.React)}(this,(function(e,r){"use strict";var t,n={exports:{}},o={};var a,i={};
/**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */"production"===process.env.NODE_ENV?n.exports=function s(){if(t)return o;t=1;var e=r,n=Symbol.for("react.element"),a=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,s=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function u(e,r,t){var o,a={},u=null,l=null;for(o in void 0!==t&&(u=""+t),void 0!==r.key&&(u=""+r.key),void 0!==r.ref&&(l=r.ref),r)i.call(r,o)&&!c.hasOwnProperty(o)&&(a[o]=r[o]);if(e&&e.defaultProps)for(o in r=e.defaultProps)void 0===a[o]&&(a[o]=r[o]);return{$$typeof:n,type:e,key:u,ref:l,props:a,_owner:s.current}}return o.Fragment=a,o.jsx=u,o.jsxs=u,o}():n.exports=function c(){return a||(a=1,"production"!==process.env.NODE_ENV&&function(){var e=r,t=Symbol.for("react.element"),n=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),c=Symbol.for("react.provider"),u=Symbol.for("react.context"),l=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),p=Symbol.for("react.suspense_list"),y=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),m=Symbol.iterator,b="@@iterator",g=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function h(e){for(var r=arguments.length,t=new Array(r>1?r-1:0),n=1;n<r;n++)t[n-1]=arguments[n];!function o(e,r,t){var n=g.ReactDebugCurrentFrame.getStackAddendum();""!==n&&(r+="%s",t=t.concat([n]));var o=t.map((function(e){return String(e)}));o.unshift("Warning: "+r),Function.prototype.apply.call(console[e],console,o)}("error",e,t)}var _,k=!1,w=!1,S=!1,j=!1,O=!1;function R(e){return e.displayName||"Context"}function E(e){if(null==e)return null;if("number"==typeof e.tag&&h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),"function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case o:return"Fragment";case n:return"Portal";case s:return"Profiler";case a:return"StrictMode";case f:return"Suspense";case p:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case u:return R(e)+".Consumer";case c:return R(e._context)+".Provider";case l:return function n(e,r,t){var n=e.displayName;if(n)return n;var o=r.displayName||r.name||"";return""!==o?t+"("+o+")":t}(e,e.render,"ForwardRef");case y:var r=e.displayName||null;return null!==r?r:E(e.type)||"Memo";case d:var t=e,i=t._payload,v=t._init;try{return E(v(i))}catch(m){return null}}return null}_=Symbol.for("react.module.reference");var x,P,T,C,$,N,D,F=Object.assign,I=0;function L(){}L.__reactDisabledLog=!0;var U,A=g.ReactCurrentDispatcher;function W(e,r,t){if(void 0===U)try{throw Error()}catch(o){var n=o.stack.trim().match(/\n( *(at )?)/);U=n&&n[1]||""}return"\n"+U+e}var z,M=!1,Y="function"==typeof WeakMap?WeakMap:Map;function B(e,r){if(!e||M)return"";var t,n=z.get(e);if(void 0!==n)return n;M=!0;var o,a=Error.prepareStackTrace;Error.prepareStackTrace=void 0,o=A.current,A.current=null,function i(){if(0===I){x=console.log,P=console.info,T=console.warn,C=console.error,$=console.group,N=console.groupCollapsed,D=console.groupEnd;var e={configurable:!0,enumerable:!0,value:L,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}I++}();try{if(r){var s=function(){throw Error()};if(Object.defineProperty(s.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(s,[])}catch(v){t=v}Reflect.construct(e,[],s)}else{try{s.call()}catch(v){t=v}e.call(s.prototype)}}else{try{throw Error()}catch(v){t=v}e()}}catch(m){if(m&&t&&"string"==typeof m.stack){for(var c=m.stack.split("\n"),u=t.stack.split("\n"),l=c.length-1,f=u.length-1;l>=1&&f>=0&&c[l]!==u[f];)f--;for(;l>=1&&f>=0;l--,f--)if(c[l]!==u[f]){if(1!==l||1!==f)do{if(l--,--f<0||c[l]!==u[f]){var p="\n"+c[l].replace(" at new "," at ");return e.displayName&&p.includes("<anonymous>")&&(p=p.replace("<anonymous>",e.displayName)),"function"==typeof e&&z.set(e,p),p}}while(l>=1&&f>=0);break}}}finally{M=!1,A.current=o,function e(){if(0==--I){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:F({},e,{value:x}),info:F({},e,{value:P}),warn:F({},e,{value:T}),error:F({},e,{value:C}),group:F({},e,{value:$}),groupCollapsed:F({},e,{value:N}),groupEnd:F({},e,{value:D})})}I<0&&h("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}(),Error.prepareStackTrace=a}var y=e?e.displayName||e.name:"",d=y?W(y):"";return"function"==typeof e&&z.set(e,d),d}function V(e,r,t){if(null==e)return"";if("function"==typeof e)return B(e,function n(e){var r=e.prototype;return!(!r||!r.isReactComponent)}(e));if("string"==typeof e)return W(e);switch(e){case f:return W("Suspense");case p:return W("SuspenseList")}if("object"==typeof e)switch(e.$$typeof){case l:return function n(e,r,t){return B(e,!1)}(e.render);case y:return V(e.type,r,t);case d:var o=e,a=o._payload,i=o._init;try{return V(i(a),r,t)}catch(s){}}return""}z=new Y;var q=Object.prototype.hasOwnProperty,H={},J=g.ReactDebugCurrentFrame;function X(e){if(e){var r=e._owner,t=V(e.type,e._source,r?r.type:null);J.setExtraStackFrame(t)}else J.setExtraStackFrame(null)}var G=Array.isArray;function K(e){return G(e)}function Q(e){return""+e}function Z(e){if(function r(e){try{return Q(e),!1}catch(r){return!0}}(e))return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",function t(e){return"function"==typeof Symbol&&Symbol.toStringTag&&e[Symbol.toStringTag]||e.constructor.name||"Object"}(e)),Q(e)}var ee,re,te,ne=g.ReactCurrentOwner,oe={key:!0,ref:!0,__self:!0,__source:!0};te={};var ae=function(e,r,n,o,a,i,s){var c={$$typeof:t,type:e,key:r,ref:n,props:s,_owner:i,_store:{}};return Object.defineProperty(c._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(c,"_self",{configurable:!1,enumerable:!1,writable:!1,value:o}),Object.defineProperty(c,"_source",{configurable:!1,enumerable:!1,writable:!1,value:a}),Object.freeze&&(Object.freeze(c.props),Object.freeze(c)),c};function ie(e,r,t,n,o){var a,i={},s=null,c=null;for(a in void 0!==t&&(Z(t),s=""+t),function f(e){if(q.call(e,"key")){var r=Object.getOwnPropertyDescriptor(e,"key").get;if(r&&r.isReactWarning)return!1}return void 0!==e.key}(r)&&(Z(r.key),s=""+r.key),function p(e){if(q.call(e,"ref")){var r=Object.getOwnPropertyDescriptor(e,"ref").get;if(r&&r.isReactWarning)return!1}return void 0!==e.ref}(r)&&(c=r.ref,function y(e,r){if("string"==typeof e.ref&&ne.current&&r&&ne.current.stateNode!==r){var t=E(ne.current.type);te[t]||(h('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',E(ne.current.type),e.ref),te[t]=!0)}}(r,o)),r)q.call(r,a)&&!oe.hasOwnProperty(a)&&(i[a]=r[a]);if(e&&e.defaultProps){var u=e.defaultProps;for(a in u)void 0===i[a]&&(i[a]=u[a])}if(s||c){var l="function"==typeof e?e.displayName||e.name||"Unknown":e;s&&function r(e,t){var n=function(){ee||(ee=!0,h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",t))};n.isReactWarning=!0,Object.defineProperty(e,"key",{get:n,configurable:!0})}(i,l),c&&function t(e,r){var t=function(){re||(re=!0,h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",r))};t.isReactWarning=!0,Object.defineProperty(e,"ref",{get:t,configurable:!0})}(i,l)}return ae(e,s,c,o,n,ne.current,i)}var se,ce=g.ReactCurrentOwner,ue=g.ReactDebugCurrentFrame;function le(e){if(e){var r=e._owner,t=V(e.type,e._source,r?r.type:null);ue.setExtraStackFrame(t)}else ue.setExtraStackFrame(null)}function fe(e){return"object"==typeof e&&null!==e&&e.$$typeof===t}function pe(){if(ce.current){var e=E(ce.current.type);if(e)return"\n\nCheck the render method of `"+e+"`."}return""}se=!1;var ye={};function de(e,r){if(e._store&&!e._store.validated&&null==e.key){e._store.validated=!0;var t=function o(e){var r=pe();if(!r){var t="string"==typeof e?e:e.displayName||e.name;t&&(r="\n\nCheck the top-level render call using <"+t+">.")}return r}(r);if(!ye[t]){ye[t]=!0;var n="";e&&e._owner&&e._owner!==ce.current&&(n=" It was passed a child from "+E(e._owner.type)+"."),le(e),h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',t,n),le(null)}}}function ve(e,r){if("object"==typeof e)if(K(e))for(var t=0;t<e.length;t++){var n=e[t];fe(n)&&de(n,r)}else if(fe(e))e._store&&(e._store.validated=!0);else if(e){var o=function t(e){if(null===e||"object"!=typeof e)return null;var r=m&&e[m]||e[b];return"function"==typeof r?r:null}(e);if("function"==typeof o&&o!==e.entries)for(var a,i=o.call(e);!(a=i.next()).done;)fe(a.value)&&de(a.value,r)}}function me(e){var r,t=e.type;if(null!=t&&"string"!=typeof t){if("function"==typeof t)r=t.propTypes;else{if("object"!=typeof t||t.$$typeof!==l&&t.$$typeof!==y)return;r=t.propTypes}if(r){var n=E(t);!function o(e,r,t,n,a){var i=Function.call.bind(q);for(var s in e)if(i(e,s)){var c=void 0;try{if("function"!=typeof e[s]){var u=Error((n||"React class")+": "+t+" type `"+s+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[s]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw u.name="Invariant Violation",u}c=e[s](r,s,n,t,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(l){c=l}!c||c instanceof Error||(X(a),h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",n||"React class",t,s,typeof c),X(null)),c instanceof Error&&!(c.message in H)&&(H[c.message]=!0,X(a),h("Failed %s type: %s",t,c.message),X(null))}}(r,e.props,"prop",n,e)}else void 0===t.PropTypes||se||(se=!0,h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",E(t)||"Unknown"));"function"!=typeof t.getDefaultProps||t.getDefaultProps.isReactClassApproved||h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function be(e,r,n,i,m,b){var g=function R(e){return"string"==typeof e||"function"==typeof e||!!(e===o||e===s||O||e===a||e===f||e===p||j||e===v||k||w||S)||"object"==typeof e&&null!==e&&(e.$$typeof===d||e.$$typeof===y||e.$$typeof===c||e.$$typeof===u||e.$$typeof===l||e.$$typeof===_||void 0!==e.getModuleId)}(e);if(!g){var x="";(void 0===e||"object"==typeof e&&null!==e&&0===Object.keys(e).length)&&(x+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var P,T=function r(e){return void 0!==e?"\n\nCheck your code at "+e.fileName.replace(/^.*[\\\/]/,"")+":"+e.lineNumber+".":""}(m);x+=T||pe(),null===e?P="null":K(e)?P="array":void 0!==e&&e.$$typeof===t?(P="<"+(E(e.type)||"Unknown")+" />",x=" Did you accidentally export a JSX literal instead of a component?"):P=typeof e,h("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",P,x)}var C=ie(e,r,n,m,b);if(null==C)return C;if(g){var $=r.children;if(void 0!==$)if(i)if(K($)){for(var N=0;N<$.length;N++)ve($[N],e);Object.freeze&&Object.freeze($)}else h("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else ve($,e)}return e===o?function D(e){for(var r=Object.keys(e.props),t=0;t<r.length;t++){var n=r[t];if("children"!==n&&"key"!==n){le(e),h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",n),le(null);break}}null!==e.ref&&(le(e),h("Invalid attribute `ref` supplied to `React.Fragment`."),le(null))}(C):me(C),C}var ge=function he(e,r,t){return be(e,r,t,!1)},_e=function ke(e,r,t){return be(e,r,t,!0)};i.Fragment=o,i.jsx=ge,i.jsxs=_e}()),i}();var u=n.exports;const l=e=>Object.keys(e);var f;f={string:e=>e===e+"",object:e=>"object"==typeof e,boolean:e=>"boolean"==typeof e,array:e=>e instanceof Array,date:e=>e instanceof Date,number:e=>"number"==typeof e},Object.keys(f).reduce(((e,r)=>{return{...e,["is"+(t=r,t.charAt(0).toUpperCase()+t.slice(1))]:f[r]};var t}),{});const p=(e,r)=>{const{values:t,methods:n}=r;return({children:r,...o})=>(l(o).forEach((e=>{t.states&&e in t.states?t.states[e]=o[e]:t.data&&e in t.data?t.data[e]=o[e]:t.middleware&&e in t.middleware&&(t.middleware[e]=o[e])})),u.jsx(e.Provider,{value:y(t,n,!0),children:r}))},y=(e,t,n=!1)=>{const{states:o}=e;return{...e,...t,...o&&l(o).reduce(((e,t)=>{let a=o[t],i=()=>{};return n&&([a,i]=function s(e){const[t,n]=r.useState(e),o=r.useRef(void 0),a=r.useCallback(((e,r)=>{o.current=r,n(e)}),[]);return r.useEffect((()=>{o.current&&(o.current(t),o.current=void 0)}),[t]),[t,a]}(o[t])),{...e,states:{...e.states,[t]:a},setStates:{...e.setStates,[`set${c=t,c.charAt(0).toUpperCase()+c.slice(1)}`]:i}};var c}),{}),...t&&l(t).reduce(((e,r)=>({...e,[r]:function(...e){return t[r](this,...e)}})),{})}};e.newSpot=(e,t)=>{const n=r.createContext(y(e,t)),o=p(n,{values:e,methods:t});return{Context:n,ContextProvider:o,useContext:()=>r.useContext(n)}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));

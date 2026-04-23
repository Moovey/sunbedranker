import { jsx } from "react/jsx-runtime";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
async function resolvePageComponent(path, pages) {
  for (const p2 of Array.isArray(path) ? path : [path]) {
    const page = pages[p2];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
function r(r4, t2) {
  for (var n2 = 0; n2 < t2.length; n2++) {
    var e2 = t2[n2];
    e2.enumerable = e2.enumerable || false, e2.configurable = true, "value" in e2 && (e2.writable = true), Object.defineProperty(r4, u(e2.key), e2);
  }
}
function t(t2, n2, e2) {
  return n2 && r(t2.prototype, n2), Object.defineProperty(t2, "prototype", { writable: false }), t2;
}
function n() {
  return n = Object.assign ? Object.assign.bind() : function(r4) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var e2 in n2) ({}).hasOwnProperty.call(n2, e2) && (r4[e2] = n2[e2]);
    }
    return r4;
  }, n.apply(null, arguments);
}
function e(r4) {
  return e = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r5) {
    return r5.__proto__ || Object.getPrototypeOf(r5);
  }, e(r4);
}
function o() {
  try {
    var r4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (r5) {
  }
  return (o = function() {
    return !!r4;
  })();
}
function i(r4, t2) {
  return i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r5, t3) {
    return r5.__proto__ = t3, r5;
  }, i(r4, t2);
}
function u(r4) {
  var t2 = (function(r5) {
    if ("object" != typeof r5 || !r5) return r5;
    var t3 = r5[Symbol.toPrimitive];
    if (void 0 !== t3) {
      var n2 = t3.call(r5, "string");
      if ("object" != typeof n2) return n2;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(r5);
  })(r4);
  return "symbol" == typeof t2 ? t2 : t2 + "";
}
function f(r4) {
  var t2 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
  return f = function(r5) {
    if (null === r5 || !(function(r6) {
      try {
        return -1 !== Function.toString.call(r6).indexOf("[native code]");
      } catch (t3) {
        return "function" == typeof r6;
      }
    })(r5)) return r5;
    if ("function" != typeof r5) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== t2) {
      if (t2.has(r5)) return t2.get(r5);
      t2.set(r5, n2);
    }
    function n2() {
      return (function(r6, t3, n3) {
        if (o()) return Reflect.construct.apply(null, arguments);
        var e2 = [null];
        e2.push.apply(e2, t3);
        var u2 = new (r6.bind.apply(r6, e2))();
        return n3 && i(u2, n3.prototype), u2;
      })(r5, arguments, e(this).constructor);
    }
    return n2.prototype = Object.create(r5.prototype, { constructor: { value: n2, enumerable: false, writable: true, configurable: true } }), i(n2, r5);
  }, f(r4);
}
var a = String.prototype.replace, c = /%20/g, l = "RFC3986", s = { default: l, formatters: { RFC1738: function(r4) {
  return a.call(r4, c, "+");
}, RFC3986: function(r4) {
  return String(r4);
} }, RFC1738: "RFC1738" }, v = Object.prototype.hasOwnProperty, p = Array.isArray, y = (function() {
  for (var r4 = [], t2 = 0; t2 < 256; ++t2) r4.push("%" + ((t2 < 16 ? "0" : "") + t2.toString(16)).toUpperCase());
  return r4;
})(), d = function(r4, t2) {
  for (var n2 = t2 && t2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, e2 = 0; e2 < r4.length; ++e2) void 0 !== r4[e2] && (n2[e2] = r4[e2]);
  return n2;
}, b = { arrayToObject: d, assign: function(r4, t2) {
  return Object.keys(t2).reduce(function(r5, n2) {
    return r5[n2] = t2[n2], r5;
  }, r4);
}, combine: function(r4, t2) {
  return [].concat(r4, t2);
}, compact: function(r4) {
  for (var t2 = [{ obj: { o: r4 }, prop: "o" }], n2 = [], e2 = 0; e2 < t2.length; ++e2) for (var o2 = t2[e2], i2 = o2.obj[o2.prop], u2 = Object.keys(i2), f2 = 0; f2 < u2.length; ++f2) {
    var a2 = u2[f2], c2 = i2[a2];
    "object" == typeof c2 && null !== c2 && -1 === n2.indexOf(c2) && (t2.push({ obj: i2, prop: a2 }), n2.push(c2));
  }
  return (function(r5) {
    for (; r5.length > 1; ) {
      var t3 = r5.pop(), n3 = t3.obj[t3.prop];
      if (p(n3)) {
        for (var e3 = [], o3 = 0; o3 < n3.length; ++o3) void 0 !== n3[o3] && e3.push(n3[o3]);
        t3.obj[t3.prop] = e3;
      }
    }
  })(t2), r4;
}, decode: function(r4, t2, n2) {
  var e2 = r4.replace(/\+/g, " ");
  if ("iso-8859-1" === n2) return e2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(e2);
  } catch (r5) {
    return e2;
  }
}, encode: function(r4, t2, n2, e2, o2) {
  if (0 === r4.length) return r4;
  var i2 = r4;
  if ("symbol" == typeof r4 ? i2 = Symbol.prototype.toString.call(r4) : "string" != typeof r4 && (i2 = String(r4)), "iso-8859-1" === n2) return escape(i2).replace(/%u[0-9a-f]{4}/gi, function(r5) {
    return "%26%23" + parseInt(r5.slice(2), 16) + "%3B";
  });
  for (var u2 = "", f2 = 0; f2 < i2.length; ++f2) {
    var a2 = i2.charCodeAt(f2);
    45 === a2 || 46 === a2 || 95 === a2 || 126 === a2 || a2 >= 48 && a2 <= 57 || a2 >= 65 && a2 <= 90 || a2 >= 97 && a2 <= 122 || o2 === s.RFC1738 && (40 === a2 || 41 === a2) ? u2 += i2.charAt(f2) : a2 < 128 ? u2 += y[a2] : a2 < 2048 ? u2 += y[192 | a2 >> 6] + y[128 | 63 & a2] : a2 < 55296 || a2 >= 57344 ? u2 += y[224 | a2 >> 12] + y[128 | a2 >> 6 & 63] + y[128 | 63 & a2] : (a2 = 65536 + ((1023 & a2) << 10 | 1023 & i2.charCodeAt(f2 += 1)), u2 += y[240 | a2 >> 18] + y[128 | a2 >> 12 & 63] + y[128 | a2 >> 6 & 63] + y[128 | 63 & a2]);
  }
  return u2;
}, isBuffer: function(r4) {
  return !(!r4 || "object" != typeof r4 || !(r4.constructor && r4.constructor.isBuffer && r4.constructor.isBuffer(r4)));
}, isRegExp: function(r4) {
  return "[object RegExp]" === Object.prototype.toString.call(r4);
}, maybeMap: function(r4, t2) {
  if (p(r4)) {
    for (var n2 = [], e2 = 0; e2 < r4.length; e2 += 1) n2.push(t2(r4[e2]));
    return n2;
  }
  return t2(r4);
}, merge: function r2(t2, n2, e2) {
  if (!n2) return t2;
  if ("object" != typeof n2) {
    if (p(t2)) t2.push(n2);
    else {
      if (!t2 || "object" != typeof t2) return [t2, n2];
      (e2 && (e2.plainObjects || e2.allowPrototypes) || !v.call(Object.prototype, n2)) && (t2[n2] = true);
    }
    return t2;
  }
  if (!t2 || "object" != typeof t2) return [t2].concat(n2);
  var o2 = t2;
  return p(t2) && !p(n2) && (o2 = d(t2, e2)), p(t2) && p(n2) ? (n2.forEach(function(n3, o3) {
    if (v.call(t2, o3)) {
      var i2 = t2[o3];
      i2 && "object" == typeof i2 && n3 && "object" == typeof n3 ? t2[o3] = r2(i2, n3, e2) : t2.push(n3);
    } else t2[o3] = n3;
  }), t2) : Object.keys(n2).reduce(function(t3, o3) {
    var i2 = n2[o3];
    return t3[o3] = v.call(t3, o3) ? r2(t3[o3], i2, e2) : i2, t3;
  }, o2);
} }, h = Object.prototype.hasOwnProperty, g = { brackets: function(r4) {
  return r4 + "[]";
}, comma: "comma", indices: function(r4, t2) {
  return r4 + "[" + t2 + "]";
}, repeat: function(r4) {
  return r4;
} }, m = Array.isArray, j = String.prototype.split, w = Array.prototype.push, O = function(r4, t2) {
  w.apply(r4, m(t2) ? t2 : [t2]);
}, E = Date.prototype.toISOString, R = s.default, S = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: b.encode, encodeValuesOnly: false, format: R, formatter: s.formatters[R], indices: false, serializeDate: function(r4) {
  return E.call(r4);
}, skipNulls: false, strictNullHandling: false }, k = function r3(t2, n2, e2, o2, i2, u2, f2, a2, c2, l2, s2, v2, p2, y2) {
  var d2, h2 = t2;
  if ("function" == typeof f2 ? h2 = f2(n2, h2) : h2 instanceof Date ? h2 = l2(h2) : "comma" === e2 && m(h2) && (h2 = b.maybeMap(h2, function(r4) {
    return r4 instanceof Date ? l2(r4) : r4;
  })), null === h2) {
    if (o2) return u2 && !p2 ? u2(n2, S.encoder, y2, "key", s2) : n2;
    h2 = "";
  }
  if ("string" == typeof (d2 = h2) || "number" == typeof d2 || "boolean" == typeof d2 || "symbol" == typeof d2 || "bigint" == typeof d2 || b.isBuffer(h2)) {
    if (u2) {
      var g2 = p2 ? n2 : u2(n2, S.encoder, y2, "key", s2);
      if ("comma" === e2 && p2) {
        for (var w2 = j.call(String(h2), ","), E2 = "", R2 = 0; R2 < w2.length; ++R2) E2 += (0 === R2 ? "" : ",") + v2(u2(w2[R2], S.encoder, y2, "value", s2));
        return [v2(g2) + "=" + E2];
      }
      return [v2(g2) + "=" + v2(u2(h2, S.encoder, y2, "value", s2))];
    }
    return [v2(n2) + "=" + v2(String(h2))];
  }
  var k2, T2 = [];
  if (void 0 === h2) return T2;
  if ("comma" === e2 && m(h2)) k2 = [{ value: h2.length > 0 ? h2.join(",") || null : void 0 }];
  else if (m(f2)) k2 = f2;
  else {
    var $2 = Object.keys(h2);
    k2 = a2 ? $2.sort(a2) : $2;
  }
  for (var x2 = 0; x2 < k2.length; ++x2) {
    var N2 = k2[x2], C2 = "object" == typeof N2 && void 0 !== N2.value ? N2.value : h2[N2];
    if (!i2 || null !== C2) {
      var A2 = m(h2) ? "function" == typeof e2 ? e2(n2, N2) : n2 : n2 + (c2 ? "." + N2 : "[" + N2 + "]");
      O(T2, r3(C2, A2, e2, o2, i2, u2, f2, a2, c2, l2, s2, v2, p2, y2));
    }
  }
  return T2;
}, T = Object.prototype.hasOwnProperty, $ = Array.isArray, x = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: b.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, N = function(r4) {
  return r4.replace(/&#(\d+);/g, function(r5, t2) {
    return String.fromCharCode(parseInt(t2, 10));
  });
}, C = function(r4, t2) {
  return r4 && "string" == typeof r4 && t2.comma && r4.indexOf(",") > -1 ? r4.split(",") : r4;
}, A = function(r4, t2, n2, e2) {
  if (r4) {
    var o2 = n2.allowDots ? r4.replace(/\.([^.[]+)/g, "[$1]") : r4, i2 = /(\[[^[\]]*])/g, u2 = n2.depth > 0 && /(\[[^[\]]*])/.exec(o2), f2 = u2 ? o2.slice(0, u2.index) : o2, a2 = [];
    if (f2) {
      if (!n2.plainObjects && T.call(Object.prototype, f2) && !n2.allowPrototypes) return;
      a2.push(f2);
    }
    for (var c2 = 0; n2.depth > 0 && null !== (u2 = i2.exec(o2)) && c2 < n2.depth; ) {
      if (c2 += 1, !n2.plainObjects && T.call(Object.prototype, u2[1].slice(1, -1)) && !n2.allowPrototypes) return;
      a2.push(u2[1]);
    }
    return u2 && a2.push("[" + o2.slice(u2.index) + "]"), (function(r5, t3, n3, e3) {
      for (var o3 = e3 ? t3 : C(t3, n3), i3 = r5.length - 1; i3 >= 0; --i3) {
        var u3, f3 = r5[i3];
        if ("[]" === f3 && n3.parseArrays) u3 = [].concat(o3);
        else {
          u3 = n3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var a3 = "[" === f3.charAt(0) && "]" === f3.charAt(f3.length - 1) ? f3.slice(1, -1) : f3, c3 = parseInt(a3, 10);
          n3.parseArrays || "" !== a3 ? !isNaN(c3) && f3 !== a3 && String(c3) === a3 && c3 >= 0 && n3.parseArrays && c3 <= n3.arrayLimit ? (u3 = [])[c3] = o3 : "__proto__" !== a3 && (u3[a3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    })(a2, t2, n2, e2);
  }
}, D = function(r4, t2) {
  var n2 = /* @__PURE__ */ (function(r5) {
    return x;
  })();
  if ("" === r4 || null == r4) return n2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var e2 = "string" == typeof r4 ? (function(r5, t3) {
    var n3, e3 = {}, o3 = (t3.ignoreQueryPrefix ? r5.replace(/^\?/, "") : r5).split(t3.delimiter, Infinity === t3.parameterLimit ? void 0 : t3.parameterLimit), i3 = -1, u3 = t3.charset;
    if (t3.charsetSentinel) for (n3 = 0; n3 < o3.length; ++n3) 0 === o3[n3].indexOf("utf8=") && ("utf8=%E2%9C%93" === o3[n3] ? u3 = "utf-8" : "utf8=%26%2310003%3B" === o3[n3] && (u3 = "iso-8859-1"), i3 = n3, n3 = o3.length);
    for (n3 = 0; n3 < o3.length; ++n3) if (n3 !== i3) {
      var f3, a3, c2 = o3[n3], l2 = c2.indexOf("]="), s2 = -1 === l2 ? c2.indexOf("=") : l2 + 1;
      -1 === s2 ? (f3 = t3.decoder(c2, x.decoder, u3, "key"), a3 = t3.strictNullHandling ? null : "") : (f3 = t3.decoder(c2.slice(0, s2), x.decoder, u3, "key"), a3 = b.maybeMap(C(c2.slice(s2 + 1), t3), function(r6) {
        return t3.decoder(r6, x.decoder, u3, "value");
      })), a3 && t3.interpretNumericEntities && "iso-8859-1" === u3 && (a3 = N(a3)), c2.indexOf("[]=") > -1 && (a3 = $(a3) ? [a3] : a3), e3[f3] = T.call(e3, f3) ? b.combine(e3[f3], a3) : a3;
    }
    return e3;
  })(r4, n2) : r4, o2 = n2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(e2), u2 = 0; u2 < i2.length; ++u2) {
    var f2 = i2[u2], a2 = A(f2, e2[f2], n2, "string" == typeof r4);
    o2 = b.merge(o2, a2, n2);
  }
  return b.compact(o2);
}, P = /* @__PURE__ */ (function() {
  function r4(r5, t2, n3) {
    var e2, o2;
    this.name = r5, this.definition = t2, this.bindings = null != (e2 = t2.bindings) ? e2 : {}, this.wheres = null != (o2 = t2.wheres) ? o2 : {}, this.config = n3;
  }
  var n2 = r4.prototype;
  return n2.matchesUrl = function(r5) {
    var t2, n3 = this;
    if (!this.definition.methods.includes("GET")) return false;
    var e2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, function(r6, t3, e3, o3) {
      var i3, u3 = "(?<" + e3 + ">" + ((null == (i3 = n3.wheres[e3]) ? void 0 : i3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+") + ")";
      return o3 ? "(" + t3 + u3 + ")?" : "" + t3 + u3;
    }).replace(/^\w+:\/\//, ""), o2 = r5.replace(/^\w+:\/\//, "").split("?"), i2 = o2[0], u2 = o2[1], f2 = null != (t2 = new RegExp("^" + e2 + "/?$").exec(i2)) ? t2 : new RegExp("^" + e2 + "/?$").exec(decodeURI(i2));
    if (f2) {
      for (var a2 in f2.groups) f2.groups[a2] = "string" == typeof f2.groups[a2] ? decodeURIComponent(f2.groups[a2]) : f2.groups[a2];
      return { params: f2.groups, query: D(u2) };
    }
    return false;
  }, n2.compile = function(r5) {
    var t2 = this;
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, function(n3, e2, o2) {
      var i2, u2;
      if (!o2 && [null, void 0].includes(r5[e2])) throw new Error("Ziggy error: '" + e2 + "' parameter is required for route '" + t2.name + "'.");
      if (t2.wheres[e2] && !new RegExp("^" + (o2 ? "(" + t2.wheres[e2] + ")?" : t2.wheres[e2]) + "$").test(null != (u2 = r5[e2]) ? u2 : "")) throw new Error("Ziggy error: '" + e2 + "' parameter '" + r5[e2] + "' does not match required format '" + t2.wheres[e2] + "' for route '" + t2.name + "'.");
      return encodeURI(null != (i2 = r5[e2]) ? i2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }, t(r4, [{ key: "template", get: function() {
    var r5 = (this.origin + "/" + this.definition.uri).replace(/\/+$/, "");
    return "" === r5 ? "/" : r5;
  } }, { key: "origin", get: function() {
    return this.config.absolute ? this.definition.domain ? "" + this.config.url.match(/^\w+:\/\//)[0] + this.definition.domain + (this.config.port ? ":" + this.config.port : "") : this.config.url : "";
  } }, { key: "parameterSegments", get: function() {
    var r5, t2;
    return null != (r5 = null == (t2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : t2.map(function(r6) {
      return { name: r6.replace(/{|\??}/g, ""), required: !/\?}$/.test(r6) };
    })) ? r5 : [];
  } }]);
})(), I = /* @__PURE__ */ (function(r4) {
  function e2(t2, e3, o3, i2) {
    var u3;
    if (void 0 === o3 && (o3 = true), (u3 = r4.call(this) || this).t = null != i2 ? i2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, u3.t = n({}, u3.t, { absolute: o3 }), t2) {
      if (!u3.t.routes[t2]) throw new Error("Ziggy error: route '" + t2 + "' is not in the route list.");
      u3.i = new P(t2, u3.t.routes[t2], u3.t), u3.u = u3.l(e3);
    }
    return u3;
  }
  var o2, u2;
  u2 = r4, (o2 = e2).prototype = Object.create(u2.prototype), o2.prototype.constructor = o2, i(o2, u2);
  var f2 = e2.prototype;
  return f2.toString = function() {
    var r5 = this, t2 = Object.keys(this.u).filter(function(t3) {
      return !r5.i.parameterSegments.some(function(r6) {
        return r6.name === t3;
      });
    }).filter(function(r6) {
      return "_query" !== r6;
    }).reduce(function(t3, e3) {
      var o3;
      return n({}, t3, ((o3 = {})[e3] = r5.u[e3], o3));
    }, {});
    return this.i.compile(this.u) + (function(r6, t3) {
      var n2, e3 = r6, o3 = (function(r7) {
        if (!r7) return S;
        if (null != r7.encoder && "function" != typeof r7.encoder) throw new TypeError("Encoder has to be a function.");
        var t4 = r7.charset || S.charset;
        if (void 0 !== r7.charset && "utf-8" !== r7.charset && "iso-8859-1" !== r7.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var n3 = s.default;
        if (void 0 !== r7.format) {
          if (!h.call(s.formatters, r7.format)) throw new TypeError("Unknown format option provided.");
          n3 = r7.format;
        }
        var e4 = s.formatters[n3], o4 = S.filter;
        return ("function" == typeof r7.filter || m(r7.filter)) && (o4 = r7.filter), { addQueryPrefix: "boolean" == typeof r7.addQueryPrefix ? r7.addQueryPrefix : S.addQueryPrefix, allowDots: void 0 === r7.allowDots ? S.allowDots : !!r7.allowDots, charset: t4, charsetSentinel: "boolean" == typeof r7.charsetSentinel ? r7.charsetSentinel : S.charsetSentinel, delimiter: void 0 === r7.delimiter ? S.delimiter : r7.delimiter, encode: "boolean" == typeof r7.encode ? r7.encode : S.encode, encoder: "function" == typeof r7.encoder ? r7.encoder : S.encoder, encodeValuesOnly: "boolean" == typeof r7.encodeValuesOnly ? r7.encodeValuesOnly : S.encodeValuesOnly, filter: o4, format: n3, formatter: e4, serializeDate: "function" == typeof r7.serializeDate ? r7.serializeDate : S.serializeDate, skipNulls: "boolean" == typeof r7.skipNulls ? r7.skipNulls : S.skipNulls, sort: "function" == typeof r7.sort ? r7.sort : null, strictNullHandling: "boolean" == typeof r7.strictNullHandling ? r7.strictNullHandling : S.strictNullHandling };
      })(t3);
      "function" == typeof o3.filter ? e3 = (0, o3.filter)("", e3) : m(o3.filter) && (n2 = o3.filter);
      var i2 = [];
      if ("object" != typeof e3 || null === e3) return "";
      var u3 = g[t3 && t3.arrayFormat in g ? t3.arrayFormat : t3 && "indices" in t3 ? t3.indices ? "indices" : "repeat" : "indices"];
      n2 || (n2 = Object.keys(e3)), o3.sort && n2.sort(o3.sort);
      for (var f3 = 0; f3 < n2.length; ++f3) {
        var a2 = n2[f3];
        o3.skipNulls && null === e3[a2] || O(i2, k(e3[a2], a2, u3, o3.strictNullHandling, o3.skipNulls, o3.encode ? o3.encoder : null, o3.filter, o3.sort, o3.allowDots, o3.serializeDate, o3.format, o3.formatter, o3.encodeValuesOnly, o3.charset));
      }
      var c2 = i2.join(o3.delimiter), l2 = true === o3.addQueryPrefix ? "?" : "";
      return o3.charsetSentinel && (l2 += "iso-8859-1" === o3.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), c2.length > 0 ? l2 + c2 : "";
    })(n({}, t2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: function(r6, t3) {
      return "boolean" == typeof r6 ? Number(r6) : t3(r6);
    } });
  }, f2.v = function(r5) {
    var t2 = this;
    r5 ? this.t.absolute && r5.startsWith("/") && (r5 = this.p().host + r5) : r5 = this.h();
    var e3 = {}, o3 = Object.entries(this.t.routes).find(function(n2) {
      return e3 = new P(n2[0], n2[1], t2.t).matchesUrl(r5);
    }) || [void 0, void 0];
    return n({ name: o3[0] }, e3, { route: o3[1] });
  }, f2.h = function() {
    var r5 = this.p(), t2 = r5.pathname, n2 = r5.search;
    return (this.t.absolute ? r5.host + t2 : t2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + n2;
  }, f2.current = function(r5, t2) {
    var e3 = this.v(), o3 = e3.name, i2 = e3.params, u3 = e3.query, f3 = e3.route;
    if (!r5) return o3;
    var a2 = new RegExp("^" + r5.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$").test(o3);
    if ([null, void 0].includes(t2) || !a2) return a2;
    var c2 = new P(o3, f3, this.t);
    t2 = this.l(t2, c2);
    var l2 = n({}, i2, u3);
    if (Object.values(t2).every(function(r6) {
      return !r6;
    }) && !Object.values(l2).some(function(r6) {
      return void 0 !== r6;
    })) return true;
    var s2 = function(r6, t3) {
      return Object.entries(r6).every(function(r7) {
        var n2 = r7[0], e4 = r7[1];
        return Array.isArray(e4) && Array.isArray(t3[n2]) ? e4.every(function(r8) {
          return t3[n2].includes(r8);
        }) : "object" == typeof e4 && "object" == typeof t3[n2] && null !== e4 && null !== t3[n2] ? s2(e4, t3[n2]) : t3[n2] == e4;
      });
    };
    return s2(t2, l2);
  }, f2.p = function() {
    var r5, t2, n2, e3, o3, i2, u3 = "undefined" != typeof window ? window.location : {}, f3 = u3.host, a2 = u3.pathname, c2 = u3.search;
    return { host: null != (r5 = null == (t2 = this.t.location) ? void 0 : t2.host) ? r5 : void 0 === f3 ? "" : f3, pathname: null != (n2 = null == (e3 = this.t.location) ? void 0 : e3.pathname) ? n2 : void 0 === a2 ? "" : a2, search: null != (o3 = null == (i2 = this.t.location) ? void 0 : i2.search) ? o3 : void 0 === c2 ? "" : c2 };
  }, f2.has = function(r5) {
    return this.t.routes.hasOwnProperty(r5);
  }, f2.l = function(r5, t2) {
    var e3 = this;
    void 0 === r5 && (r5 = {}), void 0 === t2 && (t2 = this.i), null != r5 || (r5 = {}), r5 = ["string", "number"].includes(typeof r5) ? [r5] : r5;
    var o3 = t2.parameterSegments.filter(function(r6) {
      return !e3.t.defaults[r6.name];
    });
    if (Array.isArray(r5)) r5 = r5.reduce(function(r6, t3, e4) {
      var i3, u3;
      return n({}, r6, o3[e4] ? ((i3 = {})[o3[e4].name] = t3, i3) : "object" == typeof t3 ? t3 : ((u3 = {})[t3] = "", u3));
    }, {});
    else if (1 === o3.length && !r5[o3[0].name] && (r5.hasOwnProperty(Object.values(t2.bindings)[0]) || r5.hasOwnProperty("id"))) {
      var i2;
      (i2 = {})[o3[0].name] = r5, r5 = i2;
    }
    return n({}, this.m(t2), this.j(r5, t2));
  }, f2.m = function(r5) {
    var t2 = this;
    return r5.parameterSegments.filter(function(r6) {
      return t2.t.defaults[r6.name];
    }).reduce(function(r6, e3, o3) {
      var i2, u3 = e3.name;
      return n({}, r6, ((i2 = {})[u3] = t2.t.defaults[u3], i2));
    }, {});
  }, f2.j = function(r5, t2) {
    var e3 = t2.bindings, o3 = t2.parameterSegments;
    return Object.entries(r5).reduce(function(r6, t3) {
      var i2, u3, f3 = t3[0], a2 = t3[1];
      if (!a2 || "object" != typeof a2 || Array.isArray(a2) || !o3.some(function(r7) {
        return r7.name === f3;
      })) return n({}, r6, ((u3 = {})[f3] = a2, u3));
      if (!a2.hasOwnProperty(e3[f3])) {
        if (!a2.hasOwnProperty("id")) throw new Error("Ziggy error: object passed as '" + f3 + "' parameter is missing route model binding key '" + e3[f3] + "'.");
        e3[f3] = "id";
      }
      return n({}, r6, ((i2 = {})[f3] = a2[e3[f3]], i2));
    }, {});
  }, f2.valueOf = function() {
    return this.toString();
  }, t(e2, [{ key: "params", get: function() {
    var r5 = this.v();
    return n({}, r5.params, r5.query);
  } }, { key: "routeParams", get: function() {
    return this.v().params;
  } }, { key: "queryParams", get: function() {
    return this.v().query;
  } }]);
})(/* @__PURE__ */ f(String));
function Z(r4, t2, n2, e2) {
  var o2 = new I(r4, t2, n2, e2);
  return r4 ? o2.toString() : o2;
}
const appName = "Laravel";
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(
      `./Pages/${name}.jsx`,
      /* @__PURE__ */ Object.assign({ "./Pages/Admin/Claims/HotelierPerformance.jsx": () => import("./assets/HotelierPerformance-BmCOXtWN.js"), "./Pages/Admin/Claims/Index.jsx": () => import("./assets/Index-Q2O9-ic6.js"), "./Pages/Admin/Claims/Show.jsx": () => import("./assets/Show-Bt1eQAUh.js"), "./Pages/Admin/Content/CreatePost.jsx": () => import("./assets/CreatePost-BVEsokZu.js"), "./Pages/Admin/Content/EditPost.jsx": () => import("./assets/EditPost-pSeQrVnO.js"), "./Pages/Admin/Content/Index.jsx": () => import("./assets/Index-CI41-VgB.js"), "./Pages/Admin/Dashboard.jsx": () => import("./assets/Dashboard-DiOE4og4.js"), "./Pages/Admin/Destinations/Edit.jsx": () => import("./assets/Edit-BO_GyKcw.js"), "./Pages/Admin/Destinations/Index.jsx": () => import("./assets/Index-D8_PPY9w.js"), "./Pages/Admin/Directory/Index.jsx": () => import("./assets/Index-Dp4HvIwZ.js"), "./Pages/Admin/Hotels/Create.jsx": () => import("./assets/Create-Dx1jjXeW.js"), "./Pages/Admin/Hotels/Edit.jsx": () => import("./assets/Edit-Bzt3XQoo.js"), "./Pages/Admin/Hotels/Index.jsx": () => import("./assets/Index-B7BzLSV9.js"), "./Pages/Admin/Profile.jsx": () => import("./assets/Profile-CLujniWm.js"), "./Pages/Admin/Scoring/Index.jsx": () => import("./assets/Index-mxui57zE.js"), "./Pages/Admin/Users/Edit.jsx": () => import("./assets/Edit-CvdA_Srv.js"), "./Pages/Admin/Users/Index.jsx": () => import("./assets/Index-OoiQgLMV.js"), "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-DAaitNbg.js"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-D6hz4j3u.js"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-hvuEweRM.js"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-Ct3lKrjR.js"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-COLRyy41.js"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-CzxLleJc.js"), "./Pages/Blog/Index.jsx": () => import("./assets/Index-Smp7EHsQ.js"), "./Pages/Blog/Show.jsx": () => import("./assets/Show-Ixjx2at4.js"), "./Pages/Dashboard.jsx": () => import("./assets/Dashboard-BTra3IDG.js"), "./Pages/Destinations/Index.jsx": () => import("./assets/Index-zedj7D4G.js"), "./Pages/Destinations/Show.jsx": () => import("./assets/Show-C14JLZWE.js"), "./Pages/Home.jsx": () => import("./assets/Home-Cywubr9H.js").then((n2) => n2.a), "./Pages/Hotelier/Analytics.jsx": () => import("./assets/Analytics-irCzyHeE.js"), "./Pages/Hotelier/BillingHistory.jsx": () => import("./assets/BillingHistory-B78X_3t6.js"), "./Pages/Hotelier/ClaimHotel.jsx": () => import("./assets/ClaimHotel-ENPNtJtb.js"), "./Pages/Hotelier/Claims/Index.jsx": () => import("./assets/Index-CO4ieLcc.js"), "./Pages/Hotelier/Claims/ManageHotel.jsx": () => import("./assets/ManageHotel-BZgTYKtz.js"), "./Pages/Hotelier/Claims/Verify.jsx": () => import("./assets/Verify-DDXWUwF8.js"), "./Pages/Hotelier/Dashboard.jsx": () => import("./assets/Dashboard-DHEdrTjU.js"), "./Pages/Hotelier/Profile.jsx": () => import("./assets/Profile-CANcSPH9.js"), "./Pages/Hotelier/Subscription.jsx": () => import("./assets/Subscription-D9A9U1Hj.js"), "./Pages/Hotelier/SubscriptionCheckout.jsx": () => import("./assets/SubscriptionCheckout-B7Xv4w6n.js"), "./Pages/Hotelier/SubscriptionPayment.jsx": () => import("./assets/SubscriptionPayment-DDXrV5Be.js"), "./Pages/Hotels/Compare.jsx": () => import("./assets/Compare-BI2URCBX.js"), "./Pages/Hotels/Show.jsx": () => import("./assets/Show-hGG7nqVv.js").then((n2) => n2.S), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-_ezHv5db.js"), "./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-BJf3_d3K.js"), "./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-DYAhYpPm.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-tm6O3633.js"), "./Pages/Search/Results.jsx": () => import("./assets/Results-CkfSim3T.js"), "./Pages/Static/About.jsx": () => import("./assets/About-CiaWqQkb.js"), "./Pages/Static/AffiliateDisclosure.jsx": () => import("./assets/AffiliateDisclosure-DcxyYhp0.js"), "./Pages/Static/Contact.jsx": () => import("./assets/Contact-Co07lYI7.js"), "./Pages/Static/CookiesInfo.jsx": () => import("./assets/CookiesInfo-BxnUganl.js"), "./Pages/Static/EditorialPolicy.jsx": () => import("./assets/EditorialPolicy-DsORbT_n.js"), "./Pages/Static/HowWeRate.jsx": () => import("./assets/HowWeRate-BSvi1p12.js"), "./Pages/Static/PrivacyInfo.jsx": () => import("./assets/PrivacyInfo-CAvCQG04.js"), "./Pages/Static/TermsOfService.jsx": () => import("./assets/TermsOfService-B_eNVOFC.js"), "./Pages/User/Profile.jsx": () => import("./assets/Profile-CBBf8LbT.js"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-ByNhCfvu.js") })
    ),
    setup: ({ App, props }) => {
      global.route = (name, params, absolute) => Z(name, params, absolute, {
        ...page.props.ziggy,
        location: new URL(page.props.ziggy.location)
      });
      return /* @__PURE__ */ jsx(App, { ...props });
    }
  })
);

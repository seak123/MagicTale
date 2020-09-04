define("assets/miniprogram_npm/engine/index.js", function(require, module, exports, process){ var engine = GameGlobal.engine;
module.exports = engine
});
define("assets/miniprogram_npm/eventemitter3/index.js", function(require, module, exports, process){ 
module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1596118829011, function(require, module, exports) {


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if ('undefined' !== typeof module) {
  module.exports = EventEmitter;
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1596118829011);
})()
// none
// none
});
define("assets/miniprogram_npm/tslib/index.js", function(require, module, exports, process){ 
module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1596118829012, function(require, module, exports) {
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global global, define, System, Reflect, Promise */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __spreadArrays;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
var __classPrivateFieldGet;
var __classPrivateFieldSet;
(function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", { value: true });
            }
            else {
                exports.__esModule = true;
            }
        }
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})
(function (exporter) {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    __extends = function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };

    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };

    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };

    __awaiter = function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    __exportStar = function (m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    };

    __values = function (o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };

    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };

    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };

    __spreadArrays = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    };

    __asyncValues = function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    };

    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    __importStar = function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };

    __importDefault = function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };

    __classPrivateFieldGet = function (receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    };

    __classPrivateFieldSet = function (receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
    exporter("__classPrivateFieldGet", __classPrivateFieldGet);
    exporter("__classPrivateFieldSet", __classPrivateFieldSet);
});

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1596118829012);
})()
// none
// none
});
define("assets/Scripts/commons/collider.js", function(require, module, exports, process){ 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var COLLIDE_STATE = {
    NO: 0,
    INTERSECT: 1,
    INSIDE: 2,
};
var isIntersected = function (arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                return true;
            }
        }
    }
    return false;
};
var Collider = (function () {
    function Collider() {
        this.updateNum = 0;
        this.state = {
            x: COLLIDE_STATE.NO,
            y: COLLIDE_STATE.NO,
            z: COLLIDE_STATE.NO,
        };
        this.compMap = new Map();
        this.groupPair = [];
    }
    Collider.prototype.onUpdate = function (dt) {
        this.updateNum++;
        if (this.updateNum % 3 === 0) {
            this._walkComp();
        }
    };
    Collider.prototype.watchGroup = function (group1, group2) {
        this.groupPair.push([group1, group2]);
    };
    Collider.prototype.watch = function (comp, groups) {
        if (groups === void 0) { groups = []; }
        var g = this.compMap.get(comp);
        if (g) {
            groups = groups.concat(g);
        }
        this.compMap.set(comp, groups);
    };
    Collider.prototype.unwatch = function (comp) {
        this.compMap.delete(comp);
    };
    Collider.prototype._walkComp = function () {
        var _this = this;
        var triggerComps = [];
        this.groupPair.forEach(function (pair) {
            var g1 = pair[0];
            var g2 = pair[1];
            _this.compMap.forEach(function (groups1, comp1) {
                if (!comp1) {
                    return;
                }
                _this.compMap.forEach(function (groups2, comp2) {
                    if (!comp2) {
                        return;
                    }
                    if (comp1 === comp2) {
                        return;
                    }
                    if ((groups1.indexOf(g1) > -1 && groups2.indexOf(g2) > -1)
                        ||
                            (groups1.indexOf(g2) > -1 && groups2.indexOf(g1) > -1)) {
                        if (_this._isCollided(comp1, comp2)) {
                            triggerComps.push([comp1, comp2]);
                        }
                    }
                });
            });
        });
        triggerComps.forEach(function (comps) {
            comps[0].onCollide && comps[0].onCollide(comps[1]);
        });
    };
    Collider.prototype._isCollided = function (comp1, comp2) {
        var p1 = comp1.entity.transform.worldPosition;
        var p2 = comp2.entity.transform.worldPosition;
        var b1 = comp1.bound;
        var b2 = comp2.bound;
        this.state = {
            x: COLLIDE_STATE.NO,
            y: COLLIDE_STATE.NO,
            z: COLLIDE_STATE.NO,
        };
        for (var k in this.state) {
            var front1 = p1[k] + b1[k];
            var back1 = p1[k] - b1[k];
            var front2 = p2[k] + b2[k];
            var back2 = p2[k] - b2[k];
            if ((front1 >= back2 && back1 < back2) ||
                (back1 <= front2 && front1 > front2)) {
                this.state[k] = COLLIDE_STATE.INTERSECT;
            }
            if (front1 <= front2 &&
                back1 >= back2) {
                this.state[k] = COLLIDE_STATE.INSIDE;
            }
            if (this.state[k] === COLLIDE_STATE.NO) {
                return false;
            }
        }
        return this.state.x && this.state.y && this.state.z;
    };
    return Collider;
}());
exports.default = new Collider();
// none
// none
});
define("assets/Scripts/commons/dataCenter.js", function(require, module, exports, process){ 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataCenter = (function () {
    function DataCenter() {
        this.playerEntity = null;
        this.playerComp = null;
        this.cameraComp = null;
        this.worldEntity = null;
    }
    return DataCenter;
}());
GameGlobal.DataCenter = new DataCenter();
exports.default = GameGlobal.DataCenter;
// none
// none
});
define("assets/Scripts/commons/eventCenter.js", function(require, module, exports, process){ 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var EventEmitter = require("eventemitter3");
var EventEmitterCenter = (function (_super) {
    tslib_1.__extends(EventEmitterCenter, _super);
    function EventEmitterCenter() {
        var _this = _super.call(this) || this;
        _this.TOUCH_MOVE = 'TOUCH_MOVE';
        _this.START_SHOOT = 'START_SHOOT';
        _this.END_SHOOT = 'END_SHOOT';
        _this.ADD_PLAYER = 'ADD_PLAYER';
        _this.ADD_ENEMY = 'ADD_ENEMY';
        _this.MOVE_PLAYER = 'MOVE_PLAYER';
        _this.HURT_PLAYER = 'HURT_PLAYER';
        _this.GET_SCORE = 'GET_SCORE';
        console.log('ee');
        return _this;
    }
    return EventEmitterCenter;
}(EventEmitter));
exports.EventCenter = new EventEmitterCenter();
exports.default = exports.EventCenter;
// none
// none
});
define("assets/Scripts/components/d2Move.js", function(require, module, exports, process){ 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var eventCenter_js_1 = require("../commons/eventCenter.js");
var SCREEN_WIDTH = engine_1.default.device.screenWidth;
var SCREEN_HEIGHT = engine_1.default.device.screenHeight;
var GAME_WIDTH = engine_1.default.adaptation.frameWidth;
var GAME_HEIGHT = engine_1.default.adaptation.frameHeight;
var D2Move = (function (_super) {
    tslib_1.__extends(D2Move, _super);
    function D2Move(entity) {
        var _this = _super.call(this, entity) || this;
        _this.entity = entity;
        _this.buttonPos = engine_1.default.Vector2.ZERO.clone();
        _this.buttonRadius = { x: 0, y: 0 };
        _this.direction = engine_1.default.Vector2.ZERO.clone();
        _this.uisprite = null;
        _this.uiInput = null;
        _this.onTouchStart = _this.onTouchStart.bind(_this);
        _this.onTouchEnter = _this.onTouchEnter.bind(_this);
        _this.onTouchMove = _this.onTouchMove.bind(_this);
        _this.onTouchEnd = _this.onTouchEnd.bind(_this);
        _this.onTouchLeave = _this.onTouchLeave.bind(_this);
        return _this;
    }
    D2Move.prototype.onAwake = function () {
        this.uisprite = this.entity.getComponent(engine_1.default.UISprite);
        this.buttonPos = this.entity.transform2D.worldPosition.clone();
        this.buttonRadius = { x: this.entity.transform2D.size.x / 2, y: this.entity.transform2D.size.y / 2 };
    };
    D2Move.prototype.onEnable = function () {
        this.uiInput = this.getComponent(engine_1.default.TouchInputComponent);
        if (this.uiInput) {
            this.uiInput.onTouchStart.add(this.onTouchStart);
            this.uiInput.onTouchEnter.add(this.onTouchEnter);
            this.uiInput.onTouchEnd.add(this.onTouchEnd);
            this.uiInput.onTouchLeave.add(this.onTouchLeave);
            this.uiInput.onTouchMove.add(this.onTouchMove);
        }
    };
    D2Move.prototype.onDisable = function () {
        if (this.uiInput) {
            this.uiInput.onTouchStart.remove(this.onTouchStart);
            this.uiInput.onTouchEnter.remove(this.onTouchEnter);
            this.uiInput.onTouchEnd.remove(this.onTouchEnd);
            this.uiInput.onTouchLeave.remove(this.onTouchLeave);
            this.uiInput.onTouchMove.remove(this.onTouchMove);
        }
    };
    D2Move.prototype.onTouchStart = function (s, e) {
        this.setAlpha(200);
        this.handleTouch(e);
    };
    D2Move.prototype.onTouchEnter = function (s, e) {
        this.setAlpha(200);
        this.handleTouch(e);
    };
    D2Move.prototype.onTouchMove = function (s, e) {
        this.handleTouch(e);
    };
    D2Move.prototype.onTouchLeave = function (s, e) {
        this.setAlpha(255);
        this.emitDirection({ x: 0, y: 0, z: 0 });
    };
    D2Move.prototype.onTouchEnd = function (s, e) {
        this.setAlpha(255);
        this.emitDirection({ x: 0, y: 0, z: 0 });
    };
    D2Move.prototype.handleTouch = function (e) {
        this.direction.x = e.touches[0].position.x / this.buttonRadius.x;
        this.direction.y = e.touches[0].position.y / this.buttonRadius.y;
        this.emitDirection({ x: this.direction.x, y: 0, z: -this.direction.y });
    };
    D2Move.prototype.setAlpha = function (val) {
        var c = this.uisprite.color.clone();
        c.a = val;
        this.uisprite.color = c;
    };
    D2Move.prototype.emitDirection = function (direction) {
        eventCenter_js_1.default.emit(eventCenter_js_1.default.TOUCH_MOVE, direction);
    };
    D2Move.prototype.gamePosToScreen = function (pos) {
        var p = engine_1.default.Vector2.ZERO.clone();
        p.x = SCREEN_WIDTH / GAME_WIDTH * pos.x;
        p.y = SCREEN_HEIGHT / GAME_HEIGHT * pos.y;
        return p;
    };
    D2Move.prototype.canvasPosToScreen = function (pos) {
        pos.x = pos.x - SCREEN_WIDTH / 2;
        pos.y = -pos.y + SCREEN_HEIGHT / 2;
        return pos;
    };
    D2Move = tslib_1.__decorate([
        engine_1.default.decorators.serialize("D2Move")
    ], D2Move);
    return D2Move;
}(engine_1.default.Script));
exports.default = D2Move;
// none
// none
});
define("assets/Scripts/components/d2Score.js", function(require, module, exports, process){ 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var eventCenter_js_1 = require("../commons/eventCenter.js");
var D2Score = (function (_super) {
    tslib_1.__extends(D2Score, _super);
    function D2Score() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.score = 0;
        _this.uilabel = null;
        return _this;
    }
    D2Score.prototype.onAwake = function () {
        var _this = this;
        this.uilabel = this.entity.getComponent(engine_1.default.UILabel);
        this.uilabel.text = "000";
        eventCenter_js_1.default.on(eventCenter_js_1.default.GET_SCORE, function (getScore) {
            _this.score += Number(getScore);
            if (_this.score < 0) {
                _this.score = 0;
            }
            var str = _this.score + "";
            if (_this.score < 10) {
                str = "0" + str;
            }
            if (_this.score < 100) {
                str = "0" + str;
            }
            _this.uilabel.text = str;
        });
    };
    D2Score = tslib_1.__decorate([
        engine_1.default.decorators.serialize("D2Score")
    ], D2Score);
    return D2Score;
}(engine_1.default.Script));
exports.default = D2Score;
// none
// none
});
define("assets/Scripts/components/d2Shoot.js", function(require, module, exports, process){ 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var eventCenter_js_1 = require("../commons/eventCenter.js");
var D2Shoot = (function (_super) {
    tslib_1.__extends(D2Shoot, _super);
    function D2Shoot(entity) {
        var _this = _super.call(this, entity) || this;
        _this.entity = entity;
        _this.uisprite = null;
        _this.uiInput = null;
        _this.onTouchStart = _this.onTouchStart.bind(_this);
        _this.onTouchEnter = _this.onTouchEnter.bind(_this);
        _this.onTouchEnd = _this.onTouchEnd.bind(_this);
        _this.onTouchLeave = _this.onTouchLeave.bind(_this);
        return _this;
    }
    D2Shoot.prototype.onAwake = function () {
        this.uisprite = this.entity.getComponent(engine_1.default.UISprite);
    };
    D2Shoot.prototype.onEnable = function () {
        this.uiInput = this.getComponent(engine_1.default.TouchInputComponent);
        if (this.uiInput) {
            this.uiInput.onTouchStart.add(this.onTouchStart);
            this.uiInput.onTouchEnter.add(this.onTouchEnter);
            this.uiInput.onTouchEnd.add(this.onTouchEnd);
            this.uiInput.onTouchLeave.add(this.onTouchLeave);
        }
    };
    D2Shoot.prototype.onDisable = function () {
        if (this.uiInput) {
            this.uiInput.onTouchStart.remove(this.onTouchStart);
            this.uiInput.onTouchEnter.remove(this.onTouchEnter);
            this.uiInput.onTouchEnd.remove(this.onTouchEnd);
            this.uiInput.onTouchLeave.remove(this.onTouchLeave);
        }
    };
    D2Shoot.prototype.onTouchStart = function (s, e) {
        var c = this.uisprite.color.clone();
        c.a = 200;
        this.uisprite.color = c;
        eventCenter_js_1.default.emit(eventCenter_js_1.default.START_SHOOT);
    };
    D2Shoot.prototype.onTouchEnter = function (s, e) {
        var c = this.uisprite.color.clone();
        c.a = 200;
        this.uisprite.color = c;
        eventCenter_js_1.default.emit(eventCenter_js_1.default.START_SHOOT);
    };
    D2Shoot.prototype.onTouchEnd = function (s, e) {
        var c = this.uisprite.color.clone();
        c.a = 255;
        this.uisprite.color = c;
        eventCenter_js_1.default.emit(eventCenter_js_1.default.END_SHOOT);
    };
    D2Shoot.prototype.onTouchLeave = function (s, e) {
        var c = this.uisprite.color.clone();
        c.a = 255;
        this.uisprite.color = c;
        eventCenter_js_1.default.emit(eventCenter_js_1.default.END_SHOOT);
    };
    D2Shoot = tslib_1.__decorate([
        engine_1.default.decorators.serialize("D2Shoot")
    ], D2Shoot);
    return D2Shoot;
}(engine_1.default.Script));
exports.default = D2Shoot;
// none
// none
});
define("assets/Scripts/components/d3Bullet.js", function(require, module, exports, process){ 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var collider_js_1 = require("../commons/collider.js");
var D3Bullet = (function (_super) {
    tslib_1.__extends(D3Bullet, _super);
    function D3Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.direction = engine_1.default.Vector3.ZERO.clone();
        _this.speed = 8;
        _this.sumTime = 0;
        _this.maxTime = 5;
        _this.attack = 1;
        _this.bound = engine_1.default.Vector3.createFromNumber(0.15 / 2, 0.15 / 2, 0.15 / 2);
        return _this;
    }
    D3Bullet.prototype.onAwake = function () {
        collider_js_1.default.watch(this, ["bullet"]);
    };
    D3Bullet.prototype.onUpdate = function (dt) {
        if (this.sumTime < this.maxTime) {
            this.sumTime += dt;
            this.entity.transform.position.x += this.direction.x * this.speed * dt;
            this.entity.transform.position.y += this.direction.y * this.speed * dt;
            this.entity.transform.position.z += this.direction.z * this.speed * dt;
        }
        else {
            this.removeSelf();
        }
    };
    D3Bullet.prototype.onCollide = function (comp) {
        this.removeSelf();
    };
    D3Bullet.prototype.onDestroy = function () {
    };
    D3Bullet.prototype.removeSelf = function () {
        if (this.entity.transform && this.entity.transform.parent) {
            var parentTransform = this.entity.transform.parent;
            parentTransform.removeChild(this.entity.transform);
            collider_js_1.default.unwatch(this);
            this.entity.destroy();
        }
    };
    D3Bullet = tslib_1.__decorate([
        engine_1.default.decorators.serialize("D3Bullet")
    ], D3Bullet);
    return D3Bullet;
}(engine_1.default.Script));
exports.default = D3Bullet;
// none
// none
});
define("assets/Scripts/components/d3Camera.js", function(require, module, exports, process){ 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var dataCenter_js_1 = require("../commons/dataCenter.js");
var eventCenter_js_1 = require("../commons/eventCenter.js");
var POS_LIMIT = {
    x: [-26, 26],
    z: [-44, 13],
};
var D3Camera = (function (_super) {
    tslib_1.__extends(D3Camera, _super);
    function D3Camera() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.camera = null;
        return _this;
    }
    D3Camera.prototype.onAwake = function () {
        var _this = this;
        this.camera = this.entity.getComponent(engine_1.default.Camera);
        dataCenter_js_1.default.cameraComp = this.camera;
        console.log("onAwake D3Camera");
        eventCenter_js_1.default.on(eventCenter_js_1.default.ADD_PLAYER, function () {
        });
        eventCenter_js_1.default.on(eventCenter_js_1.default.MOVE_PLAYER, function (move) {
            var pos = dataCenter_js_1.default.playerEntity.transform.position;
            for (var k in POS_LIMIT) {
                if (pos[k] + move[k] >= POS_LIMIT[k][0]
                    &&
                        pos[k] + move[k] <= POS_LIMIT[k][1]) {
                    _this.camera.entity.transform.position[k] += move[k];
                }
            }
        });
    };
    D3Camera.prototype.onUpdate = function (dt) {
    };
    D3Camera = tslib_1.__decorate([
        engine_1.default.decorators.serialize("D3Camera")
    ], D3Camera);
    return D3Camera;
}(engine_1.default.Script));
exports.default = D3Camera;
// none
// none
});
define("assets/Scripts/components/d3Enemy.js", function(require, module, exports, process){ 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var collider_js_1 = require("../commons/collider.js");
var eventCenter_js_1 = require("../commons/eventCenter.js");
var d3Bullet_js_1 = require("./d3Bullet.js");
var d3Player_js_1 = require("./d3Player.js");
var randomBetween = function (min, max) {
    return Math.random() * (max - min) + min;
};
var D3Enemy = (function (_super) {
    tslib_1.__extends(D3Enemy, _super);
    function D3Enemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.direction = engine_1.default.Vector3.ZERO.clone();
        _this.speed = randomBetween(3, 6);
        _this.sumTime = 0;
        _this.maxTime = 15;
        _this.hp = 5;
        _this.score = {
            collide: -2,
            dead: 1,
        };
        _this.rotationY = (Math.random() < 0.5 ? -1 : 1) * 0.05;
        _this.hurtParticle = null;
        _this.bound = engine_1.default.Vector3.createFromNumber(0.9 / 2, 0.5 / 2, 0.9 / 2);
        return _this;
    }
    D3Enemy_1 = D3Enemy;
    D3Enemy.prototype.onAwake = function () {
        this.direction.z = 1;
        this.hurtParticle = this.entity.transform._children[0].findChildByName("Hurt").entity.getComponent(engine_1.default.Particle);
        collider_js_1.default.watch(this, ["enemy"]);
    };
    D3Enemy.prototype.onUpdate = function (dt) {
        if (this.sumTime < this.maxTime) {
            this.sumTime += dt;
            this.entity.transform.position.x += this.direction.x * this.speed * dt;
            this.entity.transform.position.y += this.direction.y * this.speed * dt;
            this.entity.transform.position.z += this.direction.z * this.speed * dt;
            this.entity.transform.euler.y += this.rotationY;
        }
        else {
            this.removeEnemy();
        }
    };
    D3Enemy.prototype.onCollide = function (comp) {
        if (comp instanceof d3Player_js_1.default) {
            eventCenter_js_1.default.emit(eventCenter_js_1.default.HURT_PLAYER);
            eventCenter_js_1.default.emit(eventCenter_js_1.default.GET_SCORE, this.score.collide);
            this.removeEnemy();
        }
        else if (comp instanceof d3Bullet_js_1.default) {
            this.hp -= comp.attack;
            this.hurtParticle.emitter.start = true;
            if (this.hp <= 0) {
                eventCenter_js_1.default.emit(eventCenter_js_1.default.GET_SCORE, this.score.dead);
                this.removeEnemy();
            }
        }
    };
    D3Enemy.prototype.removeEnemy = function () {
        if (this.entity.transform) {
            var parentTransform = this.entity.transform.parent;
            parentTransform.removeChild(this.entity.transform);
            collider_js_1.default.unwatch(this);
            this.entity.destroy();
            D3Enemy_1.enemyCount--;
        }
    };
    D3Enemy.prototype.onDestroy = function () {
    };
    var D3Enemy_1;
    D3Enemy.enemyCount = 0;
    D3Enemy = D3Enemy_1 = tslib_1.__decorate([
        engine_1.default.decorators.serialize("D3Enemy")
    ], D3Enemy);
    return D3Enemy;
}(engine_1.default.Script));
exports.default = D3Enemy;
// none
// none
});
define("assets/Scripts/components/d3Main.js", function(require, module, exports, process){ 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var collider_js_1 = require("../commons/collider.js");
var dataCenter_js_1 = require("../commons/dataCenter.js");
var d3Enemy_js_1 = require("./d3Enemy.js");
var d3Player_js_1 = require("./d3Player.js");
var ENEMY_INTERVAL = 0.5;
var randomBetween = function (min, max) {
    return Math.random() * (max - min) + min;
};
var D3Main = (function (_super) {
    tslib_1.__extends(D3Main, _super);
    function D3Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.world = null;
        _this.enemyTime = 0;
        _this.enemyPrefab = null;
        return _this;
    }
    D3Main.prototype.onAwake = function () {
        console.log("onAwake D3Main");
        this.world = this.entity.transform.parent.entity;
        dataCenter_js_1.default.worldEntity = this.world;
        collider_js_1.default.watchGroup("enemy", "player");
        collider_js_1.default.watchGroup("enemy", "bullet");
        this.initPlayer();
        this.initEnemy();
    };
    D3Main.prototype.onUpdate = function (dt) {
        collider_js_1.default.onUpdate(dt);
        this.enemyTime += dt;
        if (this.enemyTime >= ENEMY_INTERVAL) {
            this.addEnemy();
            this.enemyTime -= ENEMY_INTERVAL;
        }
    };
    D3Main.prototype.initPlayer = function () {
        var _this = this;
        engine_1.default.loader.load("resource/Aircraft.prefab").promise.then(function (prefab) {
            var entity = prefab.instantiate();
            entity.addComponent(d3Player_js_1.default);
            entity.transform.position.y += 1;
            entity.transform.position.z = 8;
            _this.world.transform.addChild(entity.transform);
        });
    };
    D3Main.prototype.initEnemy = function () {
        var _this = this;
        engine_1.default.loader.load("resource/Enemy01.prefab").promise.then(function (prefab) {
            _this.enemyPrefab = prefab;
        });
    };
    D3Main.prototype.addEnemy = function () {
        if (!this.enemyPrefab) {
            return;
        }
        if (d3Enemy_js_1.default.enemyCount >= 20) {
            return;
        }
        var entity = this.enemyPrefab.instantiate();
        var script = entity.addComponent(d3Enemy_js_1.default);
        entity.transform.position.x = randomBetween(-26, 26);
        entity.transform.position.y += 1;
        entity.transform.position.z = randomBetween(-50, -20);
        this.world.transform.addChild(entity.transform);
        d3Enemy_js_1.default.enemyCount++;
    };
    D3Main = tslib_1.__decorate([
        engine_1.default.decorators.serialize("D3Main")
    ], D3Main);
    return D3Main;
}(engine_1.default.Script));
exports.default = D3Main;
// none
// none
});
define("assets/Scripts/components/d3Player.js", function(require, module, exports, process){ 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var collider_js_1 = require("../commons/collider.js");
var dataCenter_js_1 = require("../commons/dataCenter.js");
var eventCenter_js_1 = require("../commons/eventCenter.js");
var d3Bullet_js_1 = require("./d3Bullet.js");
var POS_LIMIT = {
    x: [-30, 30],
    z: [-54, 14.3],
};
var D3Player = (function (_super) {
    tslib_1.__extends(D3Player, _super);
    function D3Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.bulletInterval = 0.3;
        _this.bulletTime = 0;
        _this.player = null;
        _this.hurtParticle = null;
        _this.speed = 10;
        _this.direction = engine_1.default.Vector3.ZERO.clone();
        _this.rotation = engine_1.default.Vector3.ZERO.clone();
        _this.bound = engine_1.default.Vector3.createFromNumber(2.75 / 2, 0.46 / 2, 0.5 / 2);
        return _this;
    }
    D3Player.prototype.onAwake = function () {
        console.log("onAwake D3Player");
        this.player = this.entity;
        dataCenter_js_1.default.playerEntity = this.player;
        dataCenter_js_1.default.playerComp = this;
        this.hurtParticle = this.player.transform._children[0].findChildByName("Hurt").entity.getComponent(engine_1.default.Particle);
        this.initEvent();
        this.initPrefab();
        collider_js_1.default.watch(this, ["player"]);
        eventCenter_js_1.default.emit(eventCenter_js_1.default.ADD_PLAYER);
    };
    D3Player.prototype.onUpdate = function (dt) {
        if (this.player) {
            this.updateMove(dt);
            this.updateBullet(dt);
        }
    };
    D3Player.prototype.initPrefab = function () {
        var _this = this;
        engine_1.default.loader.load("resource/Bullet.prefab").promise.then(function (prefab) {
            _this.bulletPrefab = prefab;
        });
    };
    D3Player.prototype.initEvent = function () {
        var _this = this;
        eventCenter_js_1.default.on(eventCenter_js_1.default.TOUCH_MOVE, function (direction) {
            _this.direction.x = direction.x;
            _this.direction.y = direction.y;
            _this.direction.z = direction.z;
            if (direction.x === 0) {
                _this.rotation.x = 0;
                _this.rotation.z = 0;
            }
            else {
                _this.rotation.x = 0.01;
                _this.rotation.z = direction.x < 0 ? 0.01 : -0.01;
            }
        });
        eventCenter_js_1.default.on(eventCenter_js_1.default.HURT_PLAYER, function () {
            _this.hurtParticle.emitter.start = true;
        });
        eventCenter_js_1.default.on(eventCenter_js_1.default.START_SHOOT, function () {
            _this.bulletInterval = 0.1;
        });
        eventCenter_js_1.default.on(eventCenter_js_1.default.END_SHOOT, function () {
            _this.bulletInterval = 0.3;
        });
    };
    D3Player.prototype.updateMove = function (dt) {
        for (var k in POS_LIMIT) {
            if (this.rotation[k] === 0) {
                this.player.transform.euler[k] = 0;
            }
            else {
                this.player.transform.euler[k] += this.rotation[k];
                if (this.player.transform.euler[k] > 0.2) {
                    this.player.transform.euler[k] = 0.2;
                }
                else if (this.player.transform.euler[k] < -0.2) {
                    this.player.transform.euler[k] = -0.2;
                }
            }
        }
        var move = {
            x: this.speed * this.direction.x * dt,
            y: this.speed * this.direction.y * dt,
            z: this.speed * this.direction.z * dt,
        };
        var pos = this.player.transform.position;
        for (var k in POS_LIMIT) {
            if (pos[k] + move[k] < POS_LIMIT[k][0]
                ||
                    pos[k] + move[k] > POS_LIMIT[k][1]) {
                move[k] = 0;
            }
            this.player.transform.position[k] += move[k];
        }
        if (move.x !== 0 || move.y !== 0 || move.z !== 0) {
            eventCenter_js_1.default.emit(eventCenter_js_1.default.MOVE_PLAYER, move);
        }
    };
    D3Player.prototype.updateBullet = function (dt) {
        if (!this.bulletPrefab) {
            return;
        }
        this.bulletTime += dt;
        if (this.bulletTime >= this.bulletInterval) {
            var entity = this.bulletPrefab.instantiate();
            var script = entity.addComponent(d3Bullet_js_1.default);
            entity.transform.position = this.player.transform.position.clone();
            script.direction.z = -1;
            dataCenter_js_1.default.worldEntity.transform.addChild(entity.transform);
            this.bulletTime -= this.bulletInterval;
        }
    };
    D3Player = tslib_1.__decorate([
        engine_1.default.decorators.serialize("D3Player")
    ], D3Player);
    return D3Player;
}(engine_1.default.Script));
exports.default = D3Player;
// none
// none
});
define("assets/Scripts/GameBase/Debug/MLogger.js", function(require, module, exports, process){ 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var MLogger = (function () {
    function MLogger() {
    }
    MLogger.Log = function (param0, param1, param2, param3, param4, param5, param6) {
        var args = Array.from(arguments);
        console.log.apply(console, tslib_1.__spreadArrays(["[log]"], args));
    };
    return MLogger;
}());
exports.default = MLogger;
// none
// none
});
define("assets/Scripts/GameCore/GameRoot.js", function(require, module, exports, process){ 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var MLogger_1 = require("../GameBase/Debug/MLogger");
var GameRoot = (function (_super) {
    tslib_1.__extends(GameRoot, _super);
    function GameRoot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameRoot.prototype.onAwake = function () {
        MLogger_1.default.Log("Magic Story begin here", "hello world", "glhf");
    };
    GameRoot = tslib_1.__decorate([
        engine_1.default.decorators.serialize("GameRoot")
    ], GameRoot);
    return GameRoot;
}(engine_1.default.Script));
exports.default = GameRoot;
// none
// none
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwidHNsaWIuanMiLCJTY3JpcHRzL2NvbW1vbnMvY29sbGlkZXIudHMiLCJTY3JpcHRzL2NvbW1vbnMvZGF0YUNlbnRlci50cyIsIlNjcmlwdHMvY29tbW9ucy9ldmVudENlbnRlci50cyIsIlNjcmlwdHMvY29tcG9uZW50cy9kMk1vdmUudHMiLCJTY3JpcHRzL2NvbXBvbmVudHMvZDJTY29yZS50cyIsIlNjcmlwdHMvY29tcG9uZW50cy9kMlNob290LnRzIiwiU2NyaXB0cy9jb21wb25lbnRzL2QzQnVsbGV0LnRzIiwiU2NyaXB0cy9jb21wb25lbnRzL2QzQ2FtZXJhLnRzIiwiU2NyaXB0cy9jb21wb25lbnRzL2QzRW5lbXkudHMiLCJTY3JpcHRzL2NvbXBvbmVudHMvZDNNYWluLnRzIiwiU2NyaXB0cy9jb21wb25lbnRzL2QzUGxheWVyLnRzIiwiU2NyaXB0cy9HYW1lQmFzZS9EZWJ1Zy9NTG9nZ2VyLnRzIiwiU2NyaXB0cy9HYW1lQ29yZS9HYW1lUm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNoVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwUkEs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QUFHLEdBQVYsVUFDRSxNQUFZLEVBQ1osTUFBWSxFQUNaLE1BQVksRUFDWixNQUFZLEVBQ1osTUFBWSxFQUNaLE1BQVksRUFDWixNQUFZO1FBRVosSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxPQUFPLENBQUMsR0FBRyxPQUFYLE9BQU8sMEJBQUssT0FBTyxHQUFLLElBQUksR0FBRTtJQUNoQyxDQUFDO0lBQ0gsY0FBQztBQUFELENBYkEsQUFhQyxJQUFBOzs7Ozs7Ozs7QUNiRCxpQ0FBNEI7QUFDNUIscURBQWdEO0FBS2hEO0lBQXNDLG9DQUFhO0lBQW5EOztJQUtBLENBQUM7SUFKQywwQkFBTyxHQUFQO1FBRUUsaUJBQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFKa0IsUUFBUTtRQUQ1QixnQkFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO09BQ25CLFFBQVEsQ0FLNUI7SUFBRCxlQUFDO0NBTEQsQUFLQyxDQUxxQyxnQkFBTSxDQUFDLE1BQU0sR0FLbEQ7a0JBTG9CLFFBQVEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG4gICwgcHJlZml4ID0gJ34nO1xuXG4vKipcbiAqIENvbnN0cnVjdG9yIHRvIGNyZWF0ZSBhIHN0b3JhZ2UgZm9yIG91ciBgRUVgIG9iamVjdHMuXG4gKiBBbiBgRXZlbnRzYCBpbnN0YW5jZSBpcyBhIHBsYWluIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBldmVudCBuYW1lcy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIEV2ZW50cygpIHt9XG5cbi8vXG4vLyBXZSB0cnkgdG8gbm90IGluaGVyaXQgZnJvbSBgT2JqZWN0LnByb3RvdHlwZWAuIEluIHNvbWUgZW5naW5lcyBjcmVhdGluZyBhblxuLy8gaW5zdGFuY2UgaW4gdGhpcyB3YXkgaXMgZmFzdGVyIHRoYW4gY2FsbGluZyBgT2JqZWN0LmNyZWF0ZShudWxsKWAgZGlyZWN0bHkuXG4vLyBJZiBgT2JqZWN0LmNyZWF0ZShudWxsKWAgaXMgbm90IHN1cHBvcnRlZCB3ZSBwcmVmaXggdGhlIGV2ZW50IG5hbWVzIHdpdGggYVxuLy8gY2hhcmFjdGVyIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBidWlsdC1pbiBvYmplY3QgcHJvcGVydGllcyBhcmUgbm90XG4vLyBvdmVycmlkZGVuIG9yIHVzZWQgYXMgYW4gYXR0YWNrIHZlY3Rvci5cbi8vXG5pZiAoT2JqZWN0LmNyZWF0ZSkge1xuICBFdmVudHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAvL1xuICAvLyBUaGlzIGhhY2sgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIGBfX3Byb3RvX19gIHByb3BlcnR5IGlzIHN0aWxsIGluaGVyaXRlZCBpblxuICAvLyBzb21lIG9sZCBicm93c2VycyBsaWtlIEFuZHJvaWQgNCwgaVBob25lIDUuMSwgT3BlcmEgMTEgYW5kIFNhZmFyaSA1LlxuICAvL1xuICBpZiAoIW5ldyBFdmVudHMoKS5fX3Byb3RvX18pIHByZWZpeCA9IGZhbHNlO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIGEgc2luZ2xlIGV2ZW50IGxpc3RlbmVyLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvbmNlPWZhbHNlXSBTcGVjaWZ5IGlmIHRoZSBsaXN0ZW5lciBpcyBhIG9uZS10aW1lIGxpc3RlbmVyLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFRShmbiwgY29udGV4dCwgb25jZSkge1xuICB0aGlzLmZuID0gZm47XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMub25jZSA9IG9uY2UgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogQWRkIGEgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcihlbWl0dGVyLCBldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lciA9IG5ldyBFRShmbiwgY29udGV4dCB8fCBlbWl0dGVyLCBvbmNlKVxuICAgICwgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdKSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IGxpc3RlbmVyLCBlbWl0dGVyLl9ldmVudHNDb3VudCsrO1xuICBlbHNlIGlmICghZW1pdHRlci5fZXZlbnRzW2V2dF0uZm4pIGVtaXR0ZXIuX2V2ZW50c1tldnRdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlIGVtaXR0ZXIuX2V2ZW50c1tldnRdID0gW2VtaXR0ZXIuX2V2ZW50c1tldnRdLCBsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIGVtaXR0ZXI7XG59XG5cbi8qKlxuICogQ2xlYXIgZXZlbnQgYnkgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gZW1pdHRlciBSZWZlcmVuY2UgdG8gdGhlIGBFdmVudEVtaXR0ZXJgIGluc3RhbmNlLlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2dCBUaGUgRXZlbnQgbmFtZS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNsZWFyRXZlbnQoZW1pdHRlciwgZXZ0KSB7XG4gIGlmICgtLWVtaXR0ZXIuX2V2ZW50c0NvdW50ID09PSAwKSBlbWl0dGVyLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gIGVsc2UgZGVsZXRlIGVtaXR0ZXIuX2V2ZW50c1tldnRdO1xufVxuXG4vKipcbiAqIE1pbmltYWwgYEV2ZW50RW1pdHRlcmAgaW50ZXJmYWNlIHRoYXQgaXMgbW9sZGVkIGFnYWluc3QgdGhlIE5vZGUuanNcbiAqIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgbGlzdGluZyB0aGUgZXZlbnRzIGZvciB3aGljaCB0aGUgZW1pdHRlciBoYXMgcmVnaXN0ZXJlZFxuICogbGlzdGVuZXJzLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgdmFyIG5hbWVzID0gW11cbiAgICAsIGV2ZW50c1xuICAgICwgbmFtZTtcblxuICBpZiAodGhpcy5fZXZlbnRzQ291bnQgPT09IDApIHJldHVybiBuYW1lcztcblxuICBmb3IgKG5hbWUgaW4gKGV2ZW50cyA9IHRoaXMuX2V2ZW50cykpIHtcbiAgICBpZiAoaGFzLmNhbGwoZXZlbnRzLCBuYW1lKSkgbmFtZXMucHVzaChwcmVmaXggPyBuYW1lLnNsaWNlKDEpIDogbmFtZSk7XG4gIH1cblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHJldHVybiBuYW1lcy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhldmVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBuYW1lcztcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFRoZSByZWdpc3RlcmVkIGxpc3RlbmVycy5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGhhbmRsZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKCFoYW5kbGVycykgcmV0dXJuIFtdO1xuICBpZiAoaGFuZGxlcnMuZm4pIHJldHVybiBbaGFuZGxlcnMuZm5dO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gaGFuZGxlcnMubGVuZ3RoLCBlZSA9IG5ldyBBcnJheShsKTsgaSA8IGw7IGkrKykge1xuICAgIGVlW2ldID0gaGFuZGxlcnNbaV0uZm47XG4gIH1cblxuICByZXR1cm4gZWU7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbnVtYmVyIG9mIGxpc3RlbmVycyBsaXN0ZW5pbmcgdG8gYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIGxpc3RlbmVycy5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24gbGlzdGVuZXJDb3VudChldmVudCkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudFxuICAgICwgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybiAwO1xuICBpZiAobGlzdGVuZXJzLmZuKSByZXR1cm4gMTtcbiAgcmV0dXJuIGxpc3RlbmVycy5sZW5ndGg7XG59O1xuXG4vKipcbiAqIENhbGxzIGVhY2ggb2YgdGhlIGxpc3RlbmVycyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGV2ZW50IGhhZCBsaXN0ZW5lcnMsIGVsc2UgYGZhbHNlYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiBmYWxzZTtcblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF1cbiAgICAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGFyZ3NcbiAgICAsIGk7XG5cbiAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgIGlmIChsaXN0ZW5lcnMub25jZSkgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzLmZuLCB1bmRlZmluZWQsIHRydWUpO1xuXG4gICAgc3dpdGNoIChsZW4pIHtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSksIHRydWU7XG4gICAgICBjYXNlIDM6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCksIHRydWU7XG4gICAgICBjYXNlIDY6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQsIGE1KSwgdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGkgPCBsZW47IGkrKykge1xuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZuLmFwcGx5KGxpc3RlbmVycy5jb250ZXh0LCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aFxuICAgICAgLCBqO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyc1tpXS5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgICAgc3dpdGNoIChsZW4pIHtcbiAgICAgICAgY2FzZSAxOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCk7IGJyZWFrO1xuICAgICAgICBjYXNlIDI6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSk7IGJyZWFrO1xuICAgICAgICBjYXNlIDM6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSwgYTIpOyBicmVhaztcbiAgICAgICAgY2FzZSA0OiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyLCBhMyk7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICghYXJncykgZm9yIChqID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaiAtIDFdID0gYXJndW1lbnRzW2pdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpc3RlbmVyc1tpXS5mbi5hcHBseShsaXN0ZW5lcnNbaV0uY29udGV4dCwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBhZGRMaXN0ZW5lcih0aGlzLCBldmVudCwgZm4sIGNvbnRleHQsIGZhbHNlKTtcbn07XG5cbi8qKlxuICogQWRkIGEgb25lLXRpbWUgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBbY29udGV4dD10aGlzXSBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UoZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBhZGRMaXN0ZW5lcih0aGlzLCBldmVudCwgZm4sIGNvbnRleHQsIHRydWUpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGxpc3RlbmVycyBvZiBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIE9ubHkgcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdGhhdCBtYXRjaCB0aGlzIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IE9ubHkgcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdGhhdCBoYXZlIHRoaXMgY29udGV4dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBPbmx5IHJlbW92ZSBvbmUtdGltZSBsaXN0ZW5lcnMuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XSkgcmV0dXJuIHRoaXM7XG4gIGlmICghZm4pIHtcbiAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgIGlmIChcbiAgICAgIGxpc3RlbmVycy5mbiA9PT0gZm4gJiZcbiAgICAgICghb25jZSB8fCBsaXN0ZW5lcnMub25jZSkgJiZcbiAgICAgICghY29udGV4dCB8fCBsaXN0ZW5lcnMuY29udGV4dCA9PT0gY29udGV4dClcbiAgICApIHtcbiAgICAgIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGV2ZW50cyA9IFtdLCBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChcbiAgICAgICAgbGlzdGVuZXJzW2ldLmZuICE9PSBmbiB8fFxuICAgICAgICAob25jZSAmJiAhbGlzdGVuZXJzW2ldLm9uY2UpIHx8XG4gICAgICAgIChjb250ZXh0ICYmIGxpc3RlbmVyc1tpXS5jb250ZXh0ICE9PSBjb250ZXh0KVxuICAgICAgKSB7XG4gICAgICAgIGV2ZW50cy5wdXNoKGxpc3RlbmVyc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBSZXNldCB0aGUgYXJyYXksIG9yIHJlbW92ZSBpdCBjb21wbGV0ZWx5IGlmIHdlIGhhdmUgbm8gbW9yZSBsaXN0ZW5lcnMuXG4gICAgLy9cbiAgICBpZiAoZXZlbnRzLmxlbmd0aCkgdGhpcy5fZXZlbnRzW2V2dF0gPSBldmVudHMubGVuZ3RoID09PSAxID8gZXZlbnRzWzBdIDogZXZlbnRzO1xuICAgIGVsc2UgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzLCBvciB0aG9zZSBvZiB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBbZXZlbnRdIFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyhldmVudCkge1xuICB2YXIgZXZ0O1xuXG4gIGlmIChldmVudCkge1xuICAgIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG4gICAgaWYgKHRoaXMuX2V2ZW50c1tldnRdKSBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9cbi8vIEFsaWFzIG1ldGhvZHMgbmFtZXMgYmVjYXVzZSBwZW9wbGUgcm9sbCBsaWtlIHRoYXQuXG4vL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5cbi8vXG4vLyBFeHBvc2UgdGhlIHByZWZpeC5cbi8vXG5FdmVudEVtaXR0ZXIucHJlZml4ZWQgPSBwcmVmaXg7XG5cbi8vXG4vLyBBbGxvdyBgRXZlbnRFbWl0dGVyYCB0byBiZSBpbXBvcnRlZCBhcyBtb2R1bGUgbmFtZXNwYWNlLlxuLy9cbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5pZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBtb2R1bGUpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXG5cblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8qIGdsb2JhbCBnbG9iYWwsIGRlZmluZSwgU3lzdGVtLCBSZWZsZWN0LCBQcm9taXNlICovXG52YXIgX19leHRlbmRzO1xudmFyIF9fYXNzaWduO1xudmFyIF9fcmVzdDtcbnZhciBfX2RlY29yYXRlO1xudmFyIF9fcGFyYW07XG52YXIgX19tZXRhZGF0YTtcbnZhciBfX2F3YWl0ZXI7XG52YXIgX19nZW5lcmF0b3I7XG52YXIgX19leHBvcnRTdGFyO1xudmFyIF9fdmFsdWVzO1xudmFyIF9fcmVhZDtcbnZhciBfX3NwcmVhZDtcbnZhciBfX3NwcmVhZEFycmF5cztcbnZhciBfX2F3YWl0O1xudmFyIF9fYXN5bmNHZW5lcmF0b3I7XG52YXIgX19hc3luY0RlbGVnYXRvcjtcbnZhciBfX2FzeW5jVmFsdWVzO1xudmFyIF9fbWFrZVRlbXBsYXRlT2JqZWN0O1xudmFyIF9faW1wb3J0U3RhcjtcbnZhciBfX2ltcG9ydERlZmF1bHQ7XG52YXIgX19jbGFzc1ByaXZhdGVGaWVsZEdldDtcbnZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0O1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgdmFyIHJvb3QgPSB0eXBlb2YgZ2xvYmFsID09PSBcIm9iamVjdFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgPyBzZWxmIDogdHlwZW9mIHRoaXMgPT09IFwib2JqZWN0XCIgPyB0aGlzIDoge307XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShcInRzbGliXCIsIFtcImV4cG9ydHNcIl0sIGZ1bmN0aW9uIChleHBvcnRzKSB7IGZhY3RvcnkoY3JlYXRlRXhwb3J0ZXIocm9vdCwgY3JlYXRlRXhwb3J0ZXIoZXhwb3J0cykpKTsgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGZhY3RvcnkoY3JlYXRlRXhwb3J0ZXIocm9vdCwgY3JlYXRlRXhwb3J0ZXIobW9kdWxlLmV4cG9ydHMpKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmYWN0b3J5KGNyZWF0ZUV4cG9ydGVyKHJvb3QpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlRXhwb3J0ZXIoZXhwb3J0cywgcHJldmlvdXMpIHtcbiAgICAgICAgaWYgKGV4cG9ydHMgIT09IHJvb3QpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGlkLCB2KSB7IHJldHVybiBleHBvcnRzW2lkXSA9IHByZXZpb3VzID8gcHJldmlvdXMoaWQsIHYpIDogdjsgfTtcbiAgICB9XG59KVxuKGZ1bmN0aW9uIChleHBvcnRlcikge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG5cbiAgICBfX2V4dGVuZHMgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG5cbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuXG4gICAgX19yZXN0ID0gZnVuY3Rpb24gKHMsIGUpIHtcbiAgICAgICAgdmFyIHQgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG5cbiAgICBfX2RlY29yYXRlID0gZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG4gICAgfTtcblxuICAgIF9fcGFyYW0gPSBmdW5jdGlvbiAocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxuICAgIH07XG5cbiAgICBfX21ldGFkYXRhID0gZnVuY3Rpb24gKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XG4gICAgfTtcblxuICAgIF9fYXdhaXRlciA9IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICAgICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgX19nZW5lcmF0b3IgPSBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgICAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgICAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICAgICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgX19leHBvcnRTdGFyID0gZnVuY3Rpb24gKG0sIGV4cG9ydHMpIHtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xuICAgIH07XG5cbiAgICBfX3ZhbHVlcyA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gICAgICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgICAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICB9O1xuXG4gICAgX19yZWFkID0gZnVuY3Rpb24gKG8sIG4pIHtcbiAgICAgICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgICAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgICAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXI7XG4gICAgfTtcblxuICAgIF9fc3ByZWFkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgICAgICAgcmV0dXJuIGFyO1xuICAgIH07XG5cbiAgICBfX3NwcmVhZEFycmF5cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgICAgICAgIHJba10gPSBhW2pdO1xuICAgICAgICByZXR1cm4gcjtcbiAgICB9O1xuXG4gICAgX19hd2FpdCA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xuICAgIH07XG5cbiAgICBfX2FzeW5jR2VuZXJhdG9yID0gZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xuICAgICAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xuICAgICAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gICAgICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxuICAgICAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgIH1cbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxuICAgICAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XG4gICAgICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cbiAgICB9O1xuXG4gICAgX19hc3luY0RlbGVnYXRvciA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHZhciBpLCBwO1xuICAgICAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICAgICAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XG4gICAgfTtcblxuICAgIF9fYXN5bmNWYWx1ZXMgPSBmdW5jdGlvbiAobykge1xuICAgICAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xuICAgICAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XG4gICAgICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cbiAgICAgICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxuICAgIH07XG5cbiAgICBfX21ha2VUZW1wbGF0ZU9iamVjdCA9IGZ1bmN0aW9uIChjb29rZWQsIHJhdykge1xuICAgICAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxuICAgICAgICByZXR1cm4gY29va2VkO1xuICAgIH07XG5cbiAgICBfX2ltcG9ydFN0YXIgPSBmdW5jdGlvbiAobW9kKSB7XG4gICAgICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcbiAgICAgICAgcmVzdWx0W1wiZGVmYXVsdFwiXSA9IG1vZDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgX19pbXBvcnREZWZhdWx0ID0gZnVuY3Rpb24gKG1vZCkge1xuICAgICAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbiAgICB9O1xuXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCA9IGZ1bmN0aW9uIChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xuICAgICAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByaXZhdGVNYXAuZ2V0KHJlY2VpdmVyKTtcbiAgICB9O1xuXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCA9IGZ1bmN0aW9uIChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gc2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xuICAgICAgICB9XG4gICAgICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBleHBvcnRlcihcIl9fZXh0ZW5kc1wiLCBfX2V4dGVuZHMpO1xuICAgIGV4cG9ydGVyKFwiX19hc3NpZ25cIiwgX19hc3NpZ24pO1xuICAgIGV4cG9ydGVyKFwiX19yZXN0XCIsIF9fcmVzdCk7XG4gICAgZXhwb3J0ZXIoXCJfX2RlY29yYXRlXCIsIF9fZGVjb3JhdGUpO1xuICAgIGV4cG9ydGVyKFwiX19wYXJhbVwiLCBfX3BhcmFtKTtcbiAgICBleHBvcnRlcihcIl9fbWV0YWRhdGFcIiwgX19tZXRhZGF0YSk7XG4gICAgZXhwb3J0ZXIoXCJfX2F3YWl0ZXJcIiwgX19hd2FpdGVyKTtcbiAgICBleHBvcnRlcihcIl9fZ2VuZXJhdG9yXCIsIF9fZ2VuZXJhdG9yKTtcbiAgICBleHBvcnRlcihcIl9fZXhwb3J0U3RhclwiLCBfX2V4cG9ydFN0YXIpO1xuICAgIGV4cG9ydGVyKFwiX192YWx1ZXNcIiwgX192YWx1ZXMpO1xuICAgIGV4cG9ydGVyKFwiX19yZWFkXCIsIF9fcmVhZCk7XG4gICAgZXhwb3J0ZXIoXCJfX3NwcmVhZFwiLCBfX3NwcmVhZCk7XG4gICAgZXhwb3J0ZXIoXCJfX3NwcmVhZEFycmF5c1wiLCBfX3NwcmVhZEFycmF5cyk7XG4gICAgZXhwb3J0ZXIoXCJfX2F3YWl0XCIsIF9fYXdhaXQpO1xuICAgIGV4cG9ydGVyKFwiX19hc3luY0dlbmVyYXRvclwiLCBfX2FzeW5jR2VuZXJhdG9yKTtcbiAgICBleHBvcnRlcihcIl9fYXN5bmNEZWxlZ2F0b3JcIiwgX19hc3luY0RlbGVnYXRvcik7XG4gICAgZXhwb3J0ZXIoXCJfX2FzeW5jVmFsdWVzXCIsIF9fYXN5bmNWYWx1ZXMpO1xuICAgIGV4cG9ydGVyKFwiX19tYWtlVGVtcGxhdGVPYmplY3RcIiwgX19tYWtlVGVtcGxhdGVPYmplY3QpO1xuICAgIGV4cG9ydGVyKFwiX19pbXBvcnRTdGFyXCIsIF9faW1wb3J0U3Rhcik7XG4gICAgZXhwb3J0ZXIoXCJfX2ltcG9ydERlZmF1bHRcIiwgX19pbXBvcnREZWZhdWx0KTtcbiAgICBleHBvcnRlcihcIl9fY2xhc3NQcml2YXRlRmllbGRHZXRcIiwgX19jbGFzc1ByaXZhdGVGaWVsZEdldCk7XG4gICAgZXhwb3J0ZXIoXCJfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0XCIsIF9fY2xhc3NQcml2YXRlRmllbGRTZXQpO1xufSk7XG4iLCJjb25zdCBDT0xMSURFX1NUQVRFID0ge1xuICBOTzogMCwgLy8g5rKh56Kw5pKeXG4gIElOVEVSU0VDVDogMSwgLy8g55u45LqkXG4gIElOU0lERTogMiwgLy8g5Zyo5YaFXG59O1xuY29uc3QgaXNJbnRlcnNlY3RlZCA9IChhcnIxLCBhcnIyKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyMS5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYXJyMi5sZW5ndGg7IGorKykge1xuICAgICAgaWYgKGFycjFbaV0gPT09IGFycjJbal0pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNsYXNzIENvbGxpZGVyIHtcbiAgdXBkYXRlTnVtID0gMDtcbiAgc3RhdGUgPSB7XG4gICAgeDogQ09MTElERV9TVEFURS5OTyxcbiAgICB5OiBDT0xMSURFX1NUQVRFLk5PLFxuICAgIHo6IENPTExJREVfU1RBVEUuTk8sXG4gIH07XG5cbiAgY29tcE1hcCA9IG5ldyBNYXAoKTsgLy8gY29tcDogW2dyb3VwMSwgZ3JvdXAyLCAuLi5dXG4gIGdyb3VwUGFpciA9IFtdO1xuICAgIFxuICBvblVwZGF0ZShkdCkge1xuICAgIHRoaXMudXBkYXRlTnVtKys7XG5cbiAgICBpZiAodGhpcy51cGRhdGVOdW0gJSAzID09PSAwKSB7IC8vIOiKgua1gVxuICAgICAgdGhpcy5fd2Fsa0NvbXAoKTtcbiAgICB9XG4gIH1cblxuICB3YXRjaEdyb3VwKGdyb3VwMSwgZ3JvdXAyKSB7XG4gICAgdGhpcy5ncm91cFBhaXIucHVzaChbZ3JvdXAxLCBncm91cDJdKTtcbiAgfVxuXG4gIHdhdGNoKGNvbXAsIGdyb3VwcyA9IFtdKSB7XG4gICAgY29uc3QgZyA9IHRoaXMuY29tcE1hcC5nZXQoY29tcCk7XG4gICAgaWYgKGcpIHtcbiAgICAgIGdyb3VwcyA9IGdyb3Vwcy5jb25jYXQoZyk7XG4gICAgfVxuICAgIHRoaXMuY29tcE1hcC5zZXQoY29tcCwgZ3JvdXBzKTtcbiAgfVxuXG4gIHVud2F0Y2goY29tcCkge1xuICAgIHRoaXMuY29tcE1hcC5kZWxldGUoY29tcCk7XG4gIH1cblxuICBfd2Fsa0NvbXAoKSB7XG4gICAgY29uc3QgdHJpZ2dlckNvbXBzID0gW107XG4gICAgdGhpcy5ncm91cFBhaXIuZm9yRWFjaCgocGFpcikgPT4ge1xuICAgICAgY29uc3QgZzEgPSBwYWlyWzBdO1xuICAgICAgY29uc3QgZzIgPSBwYWlyWzFdO1xuICAgICAgdGhpcy5jb21wTWFwLmZvckVhY2goKGdyb3VwczEsIGNvbXAxKSA9PiB7XG4gICAgICAgIGlmICghY29tcDEpIHsgcmV0dXJuOyB9XG4gICAgICAgIHRoaXMuY29tcE1hcC5mb3JFYWNoKChncm91cHMyLCBjb21wMikgPT4ge1xuICAgICAgICAgIGlmICghY29tcDIpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgaWYgKGNvbXAxID09PSBjb21wMikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIC8vIOWcqGdyb3VwUGFpcuWGheeahOaJjeeisOaSnlxuICAgICAgICAgICAgKGdyb3VwczEuaW5kZXhPZihnMSkgPiAtMSAmJiBncm91cHMyLmluZGV4T2YoZzIpID4gLTEpXG4gICAgICAgICAgICB8fFxuICAgICAgICAgICAgKGdyb3VwczEuaW5kZXhPZihnMikgPiAtMSAmJiBncm91cHMyLmluZGV4T2YoZzEpID4gLTEpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNDb2xsaWRlZChjb21wMSwgY29tcDIpKSB7XG4gICAgICAgICAgICAgIHRyaWdnZXJDb21wcy5wdXNoKFtjb21wMSwgY29tcDJdKTsgLy8g5Y+q6Kem5Y+RY29tcDEub25Db2xsaWRl5Zue6LCD77yMY29tcDLnmoTkvJrlnKjlkI7nu63pgY3ljobkuK3lpITnkIbliLBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdHJpZ2dlckNvbXBzLmZvckVhY2goKGNvbXBzKSA9PiB7XG4gICAgICBjb21wc1swXS5vbkNvbGxpZGUgJiYgY29tcHNbMF0ub25Db2xsaWRlKGNvbXBzWzFdKTtcbiAgICB9KTtcbiAgfVxuXG4gIF9pc0NvbGxpZGVkKGNvbXAxLCBjb21wMikge1xuICAgIGNvbnN0IHAxID0gY29tcDEuZW50aXR5LnRyYW5zZm9ybS53b3JsZFBvc2l0aW9uO1xuICAgIGNvbnN0IHAyID0gY29tcDIuZW50aXR5LnRyYW5zZm9ybS53b3JsZFBvc2l0aW9uO1xuICAgIGNvbnN0IGIxID0gY29tcDEuYm91bmQ7XG4gICAgY29uc3QgYjIgPSBjb21wMi5ib3VuZDtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB4OiBDT0xMSURFX1NUQVRFLk5PLFxuICAgICAgeTogQ09MTElERV9TVEFURS5OTyxcbiAgICAgIHo6IENPTExJREVfU1RBVEUuTk8sXG4gICAgfTtcbiAgICBmb3IgKGxldCBrIGluIHRoaXMuc3RhdGUpIHtcbiAgICAgIGNvbnN0IGZyb250MSA9IHAxW2tdICsgYjFba107IC8vIHDngrnnmoTliY3ovrnnlYxcbiAgICAgIGNvbnN0IGJhY2sxID0gcDFba10gLSBiMVtrXTsgLy8gcOeCueeahOWQjui+ueeVjFxuICAgICAgY29uc3QgZnJvbnQyID0gcDJba10gKyBiMltrXTtcbiAgICAgIGNvbnN0IGJhY2syID0gcDJba10gLSBiMltrXTtcbiAgICAgIGlmIChcbiAgICAgICAgKGZyb250MSA+PSBiYWNrMiAmJiBiYWNrMSA8IGJhY2syKSB8fFxuICAgICAgICAoYmFjazEgPD0gZnJvbnQyICYmIGZyb250MSA+IGZyb250MilcbiAgICAgICkge1xuICAgICAgICB0aGlzLnN0YXRlW2tdID0gQ09MTElERV9TVEFURS5JTlRFUlNFQ1Q7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgZnJvbnQxIDw9IGZyb250MiAmJlxuICAgICAgICBiYWNrMSA+PSBiYWNrMlxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuc3RhdGVba10gPSBDT0xMSURFX1NUQVRFLklOU0lERTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKHRoaXMuc3RhdGVba10gPT09IENPTExJREVfU1RBVEUuTk8pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyDkuInkuKrovbTpg73mnInnorDmkp7miY3nrpfnorDmkp7vvIzoi6XlhbbkuK3kuIDkuKrmsqHnorDvvIzpgqPnm7TmjqXov5Tlm57vvIzoioLnuqborqHnrpdcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb25zb2xlLmxvZyhzdGF0ZSk7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUueCAmJiB0aGlzLnN0YXRlLnkgJiYgdGhpcy5zdGF0ZS56OyAvLyDkuInkuKrovbTpg73mnInnorDmkp7miY3nrpfnorDmkp5cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQ29sbGlkZXIoKTsiLCJkZWNsYXJlIGNvbnN0IEdhbWVHbG9iYWw6IGFueTtcblxuY2xhc3MgRGF0YUNlbnRlciB7XG4gIHBsYXllckVudGl0eSA9IG51bGw7XG4gIHBsYXllckNvbXAgPSBudWxsO1xuICBjYW1lcmFDb21wID0gbnVsbDtcbiAgd29ybGRFbnRpdHkgPSBudWxsO1xufSAgIFxuIFxuR2FtZUdsb2JhbC5EYXRhQ2VudGVyID0gbmV3IERhdGFDZW50ZXIoKTtcbmV4cG9ydCBkZWZhdWx0IEdhbWVHbG9iYWwuRGF0YUNlbnRlcjsiLCJpbXBvcnQgKiBhcyBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRlbWl0dGVyMyc7XG5cbmNsYXNzIEV2ZW50RW1pdHRlckNlbnRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIHB1YmxpYyBUT1VDSF9NT1ZFID0gJ1RPVUNIX01PVkUnO1xuICBwdWJsaWMgU1RBUlRfU0hPT1QgPSAnU1RBUlRfU0hPT1QnO1xuICBwdWJsaWMgRU5EX1NIT09UID0gJ0VORF9TSE9PVCc7XG4gIFxuICBwdWJsaWMgQUREX1BMQVlFUiA9ICdBRERfUExBWUVSJztcbiAgcHVibGljIEFERF9FTkVNWSA9ICdBRERfRU5FTVknO1xuICBwdWJsaWMgTU9WRV9QTEFZRVIgPSAnTU9WRV9QTEFZRVInO1xuICBwdWJsaWMgSFVSVF9QTEFZRVIgPSAnSFVSVF9QTEFZRVInO1xuICBwdWJsaWMgR0VUX1NDT1JFID0gJ0dFVF9TQ09SRSc7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zb2xlLmxvZygnZWUnKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgRXZlbnRDZW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyQ2VudGVyKCk7XG5leHBvcnQgZGVmYXVsdCBFdmVudENlbnRlcjsiLCIvLyBpbXBvcnQgZW5naW5lIGZyb20gJ2VuZ2luZSc7XG5pbXBvcnQgZW5naW5lIGZyb20gXCJlbmdpbmVcIjtcbmRlY2xhcmUgdHlwZSBWZWN0b3IyID0gaW1wb3J0KFwiZW5naW5lL2VuZ2luZVwiKS5WZWN0b3IyO1xuZGVjbGFyZSB0eXBlIFRvdWNoSW5wdXRFdmVudCA9IGltcG9ydChcImVuZ2luZS9pbnB1dC90b3VjaFwiKS5Ub3VjaElucHV0RXZlbnQ7XG5kZWNsYXJlIHR5cGUgRW50aXR5MkQgPSBpbXBvcnQoXCJlbmdpbmUvc2NlbmUvc2NlbmVcIikuRW50aXR5MkQ7XG5pbXBvcnQgRXZlbnRDZW50ZXIgZnJvbSBcIi4uL2NvbW1vbnMvZXZlbnRDZW50ZXIuanNcIjtcblxuY29uc3QgU0NSRUVOX1dJRFRIID0gZW5naW5lLmRldmljZS5zY3JlZW5XaWR0aDtcbmNvbnN0IFNDUkVFTl9IRUlHSFQgPSBlbmdpbmUuZGV2aWNlLnNjcmVlbkhlaWdodDtcbmNvbnN0IEdBTUVfV0lEVEggPSBlbmdpbmUuYWRhcHRhdGlvbi5mcmFtZVdpZHRoO1xuY29uc3QgR0FNRV9IRUlHSFQgPSBlbmdpbmUuYWRhcHRhdGlvbi5mcmFtZUhlaWdodDtcblxuQGVuZ2luZS5kZWNvcmF0b3JzLnNlcmlhbGl6ZShcIkQyTW92ZVwiKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRDJNb3ZlIGV4dGVuZHMgZW5naW5lLlNjcmlwdCB7XG4gIHB1YmxpYyBidXR0b25Qb3MgPSBlbmdpbmUuVmVjdG9yMi5aRVJPLmNsb25lKCk7IC8vIOaMiemSrueahGNhbnZhc+WdkOagh1xuICBwdWJsaWMgYnV0dG9uUmFkaXVzID0geyB4OiAwLCB5OiAwIH07XG4gIHB1YmxpYyBkaXJlY3Rpb24gPSBlbmdpbmUuVmVjdG9yMi5aRVJPLmNsb25lKCk7XG4gIHB1YmxpYyB1aXNwcml0ZSA9IG51bGw7XG4gIHB1YmxpYyB1aUlucHV0OiBlbmdpbmUuVG91Y2hJbnB1dENvbXBvbmVudCB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlbnRpdHk6IEVudGl0eTJEKSB7XG4gICAgc3VwZXIoZW50aXR5KTtcbiAgICB0aGlzLm9uVG91Y2hTdGFydCA9IHRoaXMub25Ub3VjaFN0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblRvdWNoRW50ZXIgPSB0aGlzLm9uVG91Y2hFbnRlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25Ub3VjaE1vdmUgPSB0aGlzLm9uVG91Y2hNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblRvdWNoRW5kID0gdGhpcy5vblRvdWNoRW5kLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblRvdWNoTGVhdmUgPSB0aGlzLm9uVG91Y2hMZWF2ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIG9uQXdha2UoKSB7XG4gICAgdGhpcy51aXNwcml0ZSA9IHRoaXMuZW50aXR5LmdldENvbXBvbmVudChlbmdpbmUuVUlTcHJpdGUpO1xuICAgIHRoaXMuYnV0dG9uUG9zID0gdGhpcy5lbnRpdHkudHJhbnNmb3JtMkQud29ybGRQb3NpdGlvbi5jbG9uZSgpO1xuICAgIHRoaXMuYnV0dG9uUmFkaXVzID0geyB4OiB0aGlzLmVudGl0eS50cmFuc2Zvcm0yRC5zaXplLnggLyAyLCB5OiB0aGlzLmVudGl0eS50cmFuc2Zvcm0yRC5zaXplLnkgLyAyIH07XG4gIH1cblxuICBwdWJsaWMgb25FbmFibGUoKTogdm9pZCB7XG4gICAgdGhpcy51aUlucHV0ID0gdGhpcy5nZXRDb21wb25lbnQ8ZW5naW5lLlRvdWNoSW5wdXRDb21wb25lbnQ+KGVuZ2luZS5Ub3VjaElucHV0Q29tcG9uZW50KTtcbiAgICBpZiAodGhpcy51aUlucHV0KSB7XG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaFN0YXJ0LmFkZCh0aGlzLm9uVG91Y2hTdGFydCk7XG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaEVudGVyLmFkZCh0aGlzLm9uVG91Y2hFbnRlcik7XG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaEVuZC5hZGQodGhpcy5vblRvdWNoRW5kKTtcbiAgICAgIHRoaXMudWlJbnB1dC5vblRvdWNoTGVhdmUuYWRkKHRoaXMub25Ub3VjaExlYXZlKTtcbiAgICAgIHRoaXMudWlJbnB1dC5vblRvdWNoTW92ZS5hZGQodGhpcy5vblRvdWNoTW92ZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uRGlzYWJsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51aUlucHV0KSB7XG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaFN0YXJ0LnJlbW92ZSh0aGlzLm9uVG91Y2hTdGFydCk7XG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaEVudGVyLnJlbW92ZSh0aGlzLm9uVG91Y2hFbnRlcik7XG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaEVuZC5yZW1vdmUodGhpcy5vblRvdWNoRW5kKTtcbiAgICAgIHRoaXMudWlJbnB1dC5vblRvdWNoTGVhdmUucmVtb3ZlKHRoaXMub25Ub3VjaExlYXZlKTtcbiAgICAgIHRoaXMudWlJbnB1dC5vblRvdWNoTW92ZS5yZW1vdmUodGhpcy5vblRvdWNoTW92ZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uVG91Y2hTdGFydChzOiBlbmdpbmUuVG91Y2hJbnB1dENvbXBvbmVudCwgZTogVG91Y2hJbnB1dEV2ZW50KSB7XG4gICAgdGhpcy5zZXRBbHBoYSgyMDApO1xuICAgIHRoaXMuaGFuZGxlVG91Y2goZSk7XG4gIH1cblxuICBwdWJsaWMgb25Ub3VjaEVudGVyKHM6IGVuZ2luZS5Ub3VjaElucHV0Q29tcG9uZW50LCBlOiBUb3VjaElucHV0RXZlbnQpIHtcbiAgICB0aGlzLnNldEFscGhhKDIwMCk7XG4gICAgdGhpcy5oYW5kbGVUb3VjaChlKTtcbiAgfVxuXG4gIHB1YmxpYyBvblRvdWNoTW92ZShzOiBlbmdpbmUuVG91Y2hJbnB1dENvbXBvbmVudCwgZTogVG91Y2hJbnB1dEV2ZW50KSB7XG4gICAgdGhpcy5oYW5kbGVUb3VjaChlKTtcbiAgfVxuXG4gIHB1YmxpYyBvblRvdWNoTGVhdmUoczogZW5naW5lLlRvdWNoSW5wdXRDb21wb25lbnQsIGU6IFRvdWNoSW5wdXRFdmVudCkge1xuICAgIHRoaXMuc2V0QWxwaGEoMjU1KTtcbiAgICB0aGlzLmVtaXREaXJlY3Rpb24oeyB4OiAwLCB5OiAwLCB6OiAwIH0pO1xuICB9XG5cbiAgcHVibGljIG9uVG91Y2hFbmQoczogZW5naW5lLlRvdWNoSW5wdXRDb21wb25lbnQsIGU6IFRvdWNoSW5wdXRFdmVudCkge1xuICAgIHRoaXMuc2V0QWxwaGEoMjU1KTtcbiAgICB0aGlzLmVtaXREaXJlY3Rpb24oeyB4OiAwLCB5OiAwLCB6OiAwIH0pO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZVRvdWNoKGU6IFRvdWNoSW5wdXRFdmVudCkge1xuICAgIHRoaXMuZGlyZWN0aW9uLnggPSBlLnRvdWNoZXNbMF0ucG9zaXRpb24ueCAvIHRoaXMuYnV0dG9uUmFkaXVzLng7XG4gICAgdGhpcy5kaXJlY3Rpb24ueSA9IGUudG91Y2hlc1swXS5wb3NpdGlvbi55IC8gdGhpcy5idXR0b25SYWRpdXMueTtcbiAgICB0aGlzLmVtaXREaXJlY3Rpb24oeyB4OiB0aGlzLmRpcmVjdGlvbi54LCB5OiAwLCB6OiAtdGhpcy5kaXJlY3Rpb24ueSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRBbHBoYSh2YWw6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGMgPSB0aGlzLnVpc3ByaXRlLmNvbG9yLmNsb25lKCk7XG4gICAgYy5hID0gdmFsO1xuICAgIHRoaXMudWlzcHJpdGUuY29sb3IgPSBjO1xuICB9XG5cbiAgcHVibGljIGVtaXREaXJlY3Rpb24oZGlyZWN0aW9uOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyOyB6OiBudW1iZXI7IH0pOiB2b2lkIHtcbiAgICBFdmVudENlbnRlci5lbWl0KEV2ZW50Q2VudGVyLlRPVUNIX01PVkUsIGRpcmVjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZ2FtZVBvc1RvU2NyZWVuKHBvczogVmVjdG9yMik6IFZlY3RvcjIge1xuICAgIGNvbnN0IHAgPSBlbmdpbmUuVmVjdG9yMi5aRVJPLmNsb25lKCk7XG4gICAgcC54ID0gU0NSRUVOX1dJRFRIIC8gR0FNRV9XSURUSCAqIHBvcy54O1xuICAgIHAueSA9IFNDUkVFTl9IRUlHSFQgLyBHQU1FX0hFSUdIVCAqIHBvcy55O1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgcHVibGljIGNhbnZhc1Bvc1RvU2NyZWVuKHBvcykge1xuICAgIC8vIGNvbnNvbGUubG9nKHBvcyk7XG4gICAgcG9zLnggPSBwb3MueCAtIFNDUkVFTl9XSURUSCAvIDI7XG4gICAgcG9zLnkgPSAtcG9zLnkgKyBTQ1JFRU5fSEVJR0hUIC8gMjtcbiAgICByZXR1cm4gcG9zO1xuICB9XG59XG4iLCJpbXBvcnQgZW5naW5lIGZyb20gXCJlbmdpbmVcIjtcbmltcG9ydCBFdmVudENlbnRlciBmcm9tIFwiLi4vY29tbW9ucy9ldmVudENlbnRlci5qc1wiO1xuXG5AZW5naW5lLmRlY29yYXRvcnMuc2VyaWFsaXplKFwiRDJTY29yZVwiKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRDJTY29yZSBleHRlbmRzIGVuZ2luZS5TY3JpcHQge1xuICBwdWJsaWMgc2NvcmUgPSAwO1xuICBwdWJsaWMgdWlsYWJlbCA9IG51bGw7XG5cbiAgcHVibGljIG9uQXdha2UoKSB7XG4gICAgdGhpcy51aWxhYmVsID0gdGhpcy5lbnRpdHkuZ2V0Q29tcG9uZW50KGVuZ2luZS5VSUxhYmVsKTtcbiAgICB0aGlzLnVpbGFiZWwudGV4dCA9IFwiMDAwXCI7XG5cbiAgICBFdmVudENlbnRlci5vbihFdmVudENlbnRlci5HRVRfU0NPUkUsIChnZXRTY29yZSkgPT4ge1xuICAgICAgdGhpcy5zY29yZSArPSBOdW1iZXIoZ2V0U2NvcmUpO1xuICAgICAgaWYgKHRoaXMuc2NvcmUgPCAwKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgfVxuICAgICAgbGV0IHN0ciA9IHRoaXMuc2NvcmUgKyBcIlwiO1xuICAgICAgaWYgKHRoaXMuc2NvcmUgPCAxMCkge1xuICAgICAgICBzdHIgPSBcIjBcIiArIHN0cjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNjb3JlIDwgMTAwKSB7XG4gICAgICAgIHN0ciA9IFwiMFwiICsgc3RyO1xuICAgICAgfVxuICAgICAgdGhpcy51aWxhYmVsLnRleHQgPSBzdHI7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBlbmdpbmUgZnJvbSBcImVuZ2luZVwiO1xuZGVjbGFyZSB0eXBlIFRvdWNoSW5wdXRFdmVudCA9IGltcG9ydChcImVuZ2luZS9pbnB1dC90b3VjaFwiKS5Ub3VjaElucHV0RXZlbnQ7XG5kZWNsYXJlIHR5cGUgRW50aXR5MkQgPSBpbXBvcnQoXCJlbmdpbmUvc2NlbmUvc2NlbmVcIikuRW50aXR5MkQ7XG5pbXBvcnQgRUMgZnJvbSBcIi4uL2NvbW1vbnMvZXZlbnRDZW50ZXIuanNcIjtcblxuQGVuZ2luZS5kZWNvcmF0b3JzLnNlcmlhbGl6ZShcIkQyU2hvb3RcIilcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEQyU2hvb3QgZXh0ZW5kcyBlbmdpbmUuU2NyaXB0IHtcbiAgcHVibGljIHVpc3ByaXRlOiBlbmdpbmUuVUlTcHJpdGUgfCBudWxsID0gbnVsbDtcbiAgcHVibGljIHVpSW5wdXQ6IGVuZ2luZS5Ub3VjaElucHV0Q29tcG9uZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGVudGl0eTogRW50aXR5MkQpIHtcbiAgICBzdXBlcihlbnRpdHkpO1xuICAgIHRoaXMub25Ub3VjaFN0YXJ0ID0gdGhpcy5vblRvdWNoU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uVG91Y2hFbnRlciA9IHRoaXMub25Ub3VjaEVudGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblRvdWNoRW5kID0gdGhpcy5vblRvdWNoRW5kLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblRvdWNoTGVhdmUgPSB0aGlzLm9uVG91Y2hMZWF2ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIG9uQXdha2UoKSB7XG4gICAgdGhpcy51aXNwcml0ZSA9IHRoaXMuZW50aXR5LmdldENvbXBvbmVudDxlbmdpbmUuVUlTcHJpdGU+KGVuZ2luZS5VSVNwcml0ZSk7XG4gIH1cblxuICBwdWJsaWMgb25FbmFibGUoKTogdm9pZCB7XG4gICAgdGhpcy51aUlucHV0ID0gdGhpcy5nZXRDb21wb25lbnQ8ZW5naW5lLlRvdWNoSW5wdXRDb21wb25lbnQ+KGVuZ2luZS5Ub3VjaElucHV0Q29tcG9uZW50KTtcbiAgICBpZiAodGhpcy51aUlucHV0KSB7XG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaFN0YXJ0LmFkZCh0aGlzLm9uVG91Y2hTdGFydCk7XG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaEVudGVyLmFkZCh0aGlzLm9uVG91Y2hFbnRlcik7XG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaEVuZC5hZGQodGhpcy5vblRvdWNoRW5kKTtcbiAgICAgIHRoaXMudWlJbnB1dC5vblRvdWNoTGVhdmUuYWRkKHRoaXMub25Ub3VjaExlYXZlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25EaXNhYmxlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnVpSW5wdXQpIHtcbiAgICAgIHRoaXMudWlJbnB1dC5vblRvdWNoU3RhcnQucmVtb3ZlKHRoaXMub25Ub3VjaFN0YXJ0KTtcbiAgICAgIHRoaXMudWlJbnB1dC5vblRvdWNoRW50ZXIucmVtb3ZlKHRoaXMub25Ub3VjaEVudGVyKTtcbiAgICAgIHRoaXMudWlJbnB1dC5vblRvdWNoRW5kLnJlbW92ZSh0aGlzLm9uVG91Y2hFbmQpO1xuICAgICAgdGhpcy51aUlucHV0Lm9uVG91Y2hMZWF2ZS5yZW1vdmUodGhpcy5vblRvdWNoTGVhdmUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvblRvdWNoU3RhcnQoczogZW5naW5lLlRvdWNoSW5wdXRDb21wb25lbnQsIGU6IFRvdWNoSW5wdXRFdmVudCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdvblRvdWNoU3RhcnQgRDJTaG9vdCcpO1xuICAgIGNvbnN0IGMgPSB0aGlzLnVpc3ByaXRlLmNvbG9yLmNsb25lKCk7XG4gICAgYy5hID0gMjAwO1xuICAgIHRoaXMudWlzcHJpdGUuY29sb3IgPSBjO1xuICAgIEVDLmVtaXQoRUMuU1RBUlRfU0hPT1QpO1xuICB9XG5cbiAgcHVibGljIG9uVG91Y2hFbnRlcihzOiBlbmdpbmUuVG91Y2hJbnB1dENvbXBvbmVudCwgZTogVG91Y2hJbnB1dEV2ZW50KSB7XG4gICAgY29uc3QgYyA9IHRoaXMudWlzcHJpdGUuY29sb3IuY2xvbmUoKTtcbiAgICBjLmEgPSAyMDA7XG4gICAgdGhpcy51aXNwcml0ZS5jb2xvciA9IGM7XG4gICAgRUMuZW1pdChFQy5TVEFSVF9TSE9PVCk7XG4gIH1cblxuICBwdWJsaWMgb25Ub3VjaEVuZChzOiBlbmdpbmUuVG91Y2hJbnB1dENvbXBvbmVudCwgZTogVG91Y2hJbnB1dEV2ZW50KSB7XG4gICAgLy8gY29uc29sZS5sb2coJ29uVG91Y2hFbmQgRDJTaG9vdCcpO1xuICAgIGNvbnN0IGMgPSB0aGlzLnVpc3ByaXRlLmNvbG9yLmNsb25lKCk7XG4gICAgYy5hID0gMjU1O1xuICAgIHRoaXMudWlzcHJpdGUuY29sb3IgPSBjO1xuICAgIEVDLmVtaXQoRUMuRU5EX1NIT09UKTtcbiAgfVxuXG4gIHB1YmxpYyBvblRvdWNoTGVhdmUoczogZW5naW5lLlRvdWNoSW5wdXRDb21wb25lbnQsIGU6IFRvdWNoSW5wdXRFdmVudCkge1xuICAgIGNvbnN0IGMgPSB0aGlzLnVpc3ByaXRlLmNvbG9yLmNsb25lKCk7XG4gICAgYy5hID0gMjU1O1xuICAgIHRoaXMudWlzcHJpdGUuY29sb3IgPSBjO1xuICAgIEVDLmVtaXQoRUMuRU5EX1NIT09UKTtcbiAgfVxufVxuIiwiaW1wb3J0IGVuZ2luZSBmcm9tIFwiZW5naW5lXCI7XG5pbXBvcnQgQ29sbGlkZXIgZnJvbSBcIi4uL2NvbW1vbnMvY29sbGlkZXIuanNcIjtcblxuQGVuZ2luZS5kZWNvcmF0b3JzLnNlcmlhbGl6ZShcIkQzQnVsbGV0XCIpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEM0J1bGxldCBleHRlbmRzIGVuZ2luZS5TY3JpcHQge1xuICBwdWJsaWMgZGlyZWN0aW9uID0gZW5naW5lLlZlY3RvcjMuWkVSTy5jbG9uZSgpO1xuICBwdWJsaWMgc3BlZWQgPSA4O1xuICBwdWJsaWMgc3VtVGltZSA9IDA7XG4gIHB1YmxpYyBtYXhUaW1lID0gNTtcbiAgcHVibGljIGF0dGFjayA9IDE7XG4gIHB1YmxpYyBib3VuZCA9IGVuZ2luZS5WZWN0b3IzLmNyZWF0ZUZyb21OdW1iZXIoMC4xNSAvIDIsIDAuMTUgLyAyLCAwLjE1IC8gMik7XG5cbiAgcHVibGljIG9uQXdha2UoKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJvbkF3YWtlIEQzQnVsbGV0XCIsIHRoaXMuZGlyZWN0aW9uLngsIHRoaXMuZGlyZWN0aW9uLnksIHRoaXMuZGlyZWN0aW9uLnopO1xuICAgIENvbGxpZGVyLndhdGNoKHRoaXMsIFtcImJ1bGxldFwiXSk7XG4gIH1cblxuICBwdWJsaWMgb25VcGRhdGUoZHQpIHtcbiAgICBpZiAodGhpcy5zdW1UaW1lIDwgdGhpcy5tYXhUaW1lKSB7XG5cbiAgICAgIHRoaXMuc3VtVGltZSArPSBkdDtcbiAgICAgIHRoaXMuZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi54ICs9IHRoaXMuZGlyZWN0aW9uLnggKiB0aGlzLnNwZWVkICogZHQ7XG4gICAgICB0aGlzLmVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueSArPSB0aGlzLmRpcmVjdGlvbi55ICogdGhpcy5zcGVlZCAqIGR0O1xuICAgICAgdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnogKz0gdGhpcy5kaXJlY3Rpb24ueiAqIHRoaXMuc3BlZWQgKiBkdDtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25Db2xsaWRlKGNvbXApIHtcbiAgICB0aGlzLnJlbW92ZVNlbGYoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkRlc3Ryb3koKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ29uRGVzdHJveSBidWxsZXQnKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVTZWxmKCkge1xuICAgIGlmICh0aGlzLmVudGl0eS50cmFuc2Zvcm0gJiYgdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBhcmVudCkge1xuICAgICAgY29uc3QgcGFyZW50VHJhbnNmb3JtID0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBhcmVudCBhcyBUcmFuc2Zvcm0zRFxuICAgICAgcGFyZW50VHJhbnNmb3JtLnJlbW92ZUNoaWxkKHRoaXMuZW50aXR5LnRyYW5zZm9ybSk7XG4gICAgICBDb2xsaWRlci51bndhdGNoKHRoaXMpO1xuICAgICAgdGhpcy5lbnRpdHkuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IGVuZ2luZSBmcm9tIFwiZW5naW5lXCI7XG5pbXBvcnQgRGF0YUNlbnRlciBmcm9tIFwiLi4vY29tbW9ucy9kYXRhQ2VudGVyLmpzXCI7XG5pbXBvcnQgRXZlbnRDZW50ZXIgZnJvbSBcIi4uL2NvbW1vbnMvZXZlbnRDZW50ZXIuanNcIjtcblxuY29uc3QgUE9TX0xJTUlUID0ge1xuICB4OiBbLTI2LCAyNl0sXG4gIC8vIHk6IFstMTAwLCAxMDBdLFxuICB6OiBbLTQ0LCAxM10sXG59O1xuXG5AZW5naW5lLmRlY29yYXRvcnMuc2VyaWFsaXplKFwiRDNDYW1lcmFcIilcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEQzQ2FtZXJhIGV4dGVuZHMgZW5naW5lLlNjcmlwdCB7XG5cbiAgcHVibGljIGNhbWVyYSA9IG51bGw7XG5cbiAgcHVibGljIG9uQXdha2UoKSB7XG4gICAgdGhpcy5jYW1lcmEgPSB0aGlzLmVudGl0eS5nZXRDb21wb25lbnQoZW5naW5lLkNhbWVyYSk7XG4gICAgRGF0YUNlbnRlci5jYW1lcmFDb21wID0gdGhpcy5jYW1lcmE7XG4gICAgY29uc29sZS5sb2coXCJvbkF3YWtlIEQzQ2FtZXJhXCIpO1xuXG4gICAgRXZlbnRDZW50ZXIub24oRXZlbnRDZW50ZXIuQUREX1BMQVlFUiwgKCkgPT4ge1xuICAgICAgLy8gdGhpcy5jYW1lcmEudGFyZ2V0VHJhbnNmb3JtID0gRGF0YUNlbnRlci5wbGF5ZXIudHJhbnNmb3JtO1xuICAgIH0pO1xuICAgIEV2ZW50Q2VudGVyLm9uKEV2ZW50Q2VudGVyLk1PVkVfUExBWUVSLCAobW92ZSkgPT4ge1xuICAgICAgY29uc3QgcG9zID0gRGF0YUNlbnRlci5wbGF5ZXJFbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uO1xuICAgICAgZm9yIChjb25zdCBrIGluIFBPU19MSU1JVCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgcG9zW2tdICsgbW92ZVtrXSA+PSBQT1NfTElNSVRba11bMF1cbiAgICAgICAgICAmJlxuICAgICAgICAgIHBvc1trXSArIG1vdmVba10gPD0gUE9TX0xJTUlUW2tdWzFdXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2FtZXJhLmVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb25ba10gKz0gbW92ZVtrXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gY29uc29sZS5sb2coRGF0YUNlbnRlci5wbGF5ZXJFbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLngsIERhdGFDZW50ZXIucGxheWVyRW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi55LCBEYXRhQ2VudGVyLnBsYXllckVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueik7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgb25VcGRhdGUoZHQpIHtcblxuICB9XG59XG4iLCJpbXBvcnQgZW5naW5lIGZyb20gXCJlbmdpbmVcIjtcbmltcG9ydCBDb2xsaWRlciBmcm9tIFwiLi4vY29tbW9ucy9jb2xsaWRlci5qc1wiO1xuaW1wb3J0IERhdGFDZW50ZXIgZnJvbSBcIi4uL2NvbW1vbnMvZGF0YUNlbnRlci5qc1wiO1xuaW1wb3J0IEV2ZW50Q2VudGVyIGZyb20gXCIuLi9jb21tb25zL2V2ZW50Q2VudGVyLmpzXCI7XG5pbXBvcnQgRDNCdWxsZXQgZnJvbSBcIi4vZDNCdWxsZXQuanNcIjtcbmltcG9ydCBEM1BsYXllciBmcm9tIFwiLi9kM1BsYXllci5qc1wiO1xuXG5jb25zdCByYW5kb21CZXR3ZWVuID0gKG1pbiwgbWF4KSA9PiB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG59O1xuXG5cbkBlbmdpbmUuZGVjb3JhdG9ycy5zZXJpYWxpemUoXCJEM0VuZW15XCIpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEM0VuZW15IGV4dGVuZHMgZW5naW5lLlNjcmlwdCB7XG5cbiAgcHVibGljIHN0YXRpYyBlbmVteUNvdW50ID0gMDtcbiAgcHVibGljIGRpcmVjdGlvbiA9IGVuZ2luZS5WZWN0b3IzLlpFUk8uY2xvbmUoKTtcbiAgcHVibGljIHNwZWVkID0gcmFuZG9tQmV0d2VlbigzLCA2KTtcbiAgcHVibGljIHN1bVRpbWUgPSAwO1xuICBwdWJsaWMgbWF4VGltZSA9IDE1O1xuICBwdWJsaWMgaHAgPSA1O1xuICBwdWJsaWMgc2NvcmUgPSB7XG4gICAgY29sbGlkZTogLTIsXG4gICAgZGVhZDogMSxcbiAgfTtcbiAgcHVibGljIHJvdGF0aW9uWSA9IChNYXRoLnJhbmRvbSgpIDwgMC41ID8gLTEgOiAxKSAqIDAuMDU7XG4gIHB1YmxpYyBodXJ0UGFydGljbGUgPSBudWxsO1xuICBwdWJsaWMgYm91bmQgPSBlbmdpbmUuVmVjdG9yMy5jcmVhdGVGcm9tTnVtYmVyKDAuOSAvIDIsIDAuNSAvIDIsIDAuOSAvIDIpO1xuXG4gIHB1YmxpYyBvbkF3YWtlKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwib25Bd2FrZSBEM0VuZW15XCIpO1xuICAgIHRoaXMuZGlyZWN0aW9uLnogPSAxO1xuICAgIHRoaXMuaHVydFBhcnRpY2xlID0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLl9jaGlsZHJlblswXS5maW5kQ2hpbGRCeU5hbWUoXCJIdXJ0XCIpLmVudGl0eS5nZXRDb21wb25lbnQoZW5naW5lLlBhcnRpY2xlKTtcbiAgICBDb2xsaWRlci53YXRjaCh0aGlzLCBbXCJlbmVteVwiXSk7XG4gIH1cblxuICBwdWJsaWMgb25VcGRhdGUoZHQpIHtcbiAgICBpZiAodGhpcy5zdW1UaW1lIDwgdGhpcy5tYXhUaW1lKSB7XG5cbiAgICAgIHRoaXMuc3VtVGltZSArPSBkdDtcblxuICAgICAgLy8gY29uc3QgcGxheWVyID0gRGF0YUNlbnRlci5wbGF5ZXJFbnRpdHk7XG4gICAgICAvLyB0aGlzLmRpcmVjdGlvbi54ID0gcGxheWVyLnRyYW5zZm9ybS5wb3NpdGlvbi54IC0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLng7XG4gICAgICAvLyB0aGlzLmRpcmVjdGlvbi55ID0gcGxheWVyLnRyYW5zZm9ybS5wb3NpdGlvbi55IC0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnk7XG4gICAgICAvLyB0aGlzLmRpcmVjdGlvbi56ID0gcGxheWVyLnRyYW5zZm9ybS5wb3NpdGlvbi56IC0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLno7XG4gICAgICAvLyB0aGlzLmRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uLm5vcm1hbGl6ZSgpO1xuXG4gICAgICB0aGlzLmVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueCArPSB0aGlzLmRpcmVjdGlvbi54ICogdGhpcy5zcGVlZCAqIGR0O1xuICAgICAgdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnkgKz0gdGhpcy5kaXJlY3Rpb24ueSAqIHRoaXMuc3BlZWQgKiBkdDtcbiAgICAgIHRoaXMuZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi56ICs9IHRoaXMuZGlyZWN0aW9uLnogKiB0aGlzLnNwZWVkICogZHQ7XG5cbiAgICAgIHRoaXMuZW50aXR5LnRyYW5zZm9ybS5ldWxlci55ICs9IHRoaXMucm90YXRpb25ZO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZUVuZW15KCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uQ29sbGlkZShjb21wKSB7XG4gICAgaWYgKGNvbXAgaW5zdGFuY2VvZiBEM1BsYXllcikge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2lzQ29sbGlkZWQgZW5lbXkgcGxheWVyJyk7XG4gICAgICBFdmVudENlbnRlci5lbWl0KEV2ZW50Q2VudGVyLkhVUlRfUExBWUVSKTtcbiAgICAgIEV2ZW50Q2VudGVyLmVtaXQoRXZlbnRDZW50ZXIuR0VUX1NDT1JFLCB0aGlzLnNjb3JlLmNvbGxpZGUpO1xuICAgICAgdGhpcy5yZW1vdmVFbmVteSgpO1xuXG4gICAgfSBlbHNlIGlmIChjb21wIGluc3RhbmNlb2YgRDNCdWxsZXQpIHtcbiAgICAgIHRoaXMuaHAgLT0gY29tcC5hdHRhY2s7XG4gICAgICB0aGlzLmh1cnRQYXJ0aWNsZS5lbWl0dGVyLnN0YXJ0ID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLmhwIDw9IDApIHtcbiAgICAgICAgRXZlbnRDZW50ZXIuZW1pdChFdmVudENlbnRlci5HRVRfU0NPUkUsIHRoaXMuc2NvcmUuZGVhZCk7XG4gICAgICAgIHRoaXMucmVtb3ZlRW5lbXkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlRW5lbXkoKSB7XG4gICAgaWYgKHRoaXMuZW50aXR5LnRyYW5zZm9ybSkge1xuICAgICAgY29uc3QgcGFyZW50VHJhbnNmb3JtID0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBhcmVudDtcbiAgICAgIHBhcmVudFRyYW5zZm9ybS5yZW1vdmVDaGlsZCh0aGlzLmVudGl0eS50cmFuc2Zvcm0pO1xuICAgICAgQ29sbGlkZXIudW53YXRjaCh0aGlzKTtcbiAgICAgIHRoaXMuZW50aXR5LmRlc3Ryb3koKTtcbiAgICAgIEQzRW5lbXkuZW5lbXlDb3VudC0tO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkRlc3Ryb3koKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ29uRGVzdHJveSBlbmVteScpO1xuICB9XG59XG4iLCJpbXBvcnQgZW5naW5lIGZyb20gXCJlbmdpbmVcIjtcbmltcG9ydCBDb2xsaWRlciBmcm9tIFwiLi4vY29tbW9ucy9jb2xsaWRlci5qc1wiO1xuaW1wb3J0IERhdGFDZW50ZXIgZnJvbSBcIi4uL2NvbW1vbnMvZGF0YUNlbnRlci5qc1wiO1xuaW1wb3J0IEQzRW5lbXkgZnJvbSBcIi4vZDNFbmVteS5qc1wiO1xuaW1wb3J0IEQzUGxheWVyIGZyb20gXCIuL2QzUGxheWVyLmpzXCI7XG5cbmNvbnN0IEVORU1ZX0lOVEVSVkFMID0gMC41O1xuY29uc3QgcmFuZG9tQmV0d2VlbiA9IChtaW4sIG1heCkgPT4ge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xufTtcblxuQGVuZ2luZS5kZWNvcmF0b3JzLnNlcmlhbGl6ZShcIkQzTWFpblwiKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRDNNYWluIGV4dGVuZHMgZW5naW5lLlNjcmlwdCB7XG4gIHB1YmxpYyB3b3JsZDogbnVsbCB8IGVuZ2luZS5FbnRpdHkgPSBudWxsOyAvLyB3b3JsZCBlbnRpdHlcbiAgcHVibGljIGVuZW15VGltZTogbnVtYmVyID0gMDtcbiAgcHVibGljIGVuZW15UHJlZmFiOiBlbmdpbmUuUHJlZmFiIHwgbnVsbCA9IG51bGw7XG5cbiAgcHVibGljIG9uQXdha2UoKSB7XG4gICAgY29uc29sZS5sb2coXCJvbkF3YWtlIEQzTWFpblwiKTtcbiAgICB0aGlzLndvcmxkID0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBhcmVudC5lbnRpdHk7XG4gICAgRGF0YUNlbnRlci53b3JsZEVudGl0eSA9IHRoaXMud29ybGQ7XG4gICAgXG4gICAgQ29sbGlkZXIud2F0Y2hHcm91cChcImVuZW15XCIsIFwicGxheWVyXCIpO1xuICAgIENvbGxpZGVyLndhdGNoR3JvdXAoXCJlbmVteVwiLCBcImJ1bGxldFwiKTtcblxuICAgIHRoaXMuaW5pdFBsYXllcigpO1xuICAgIHRoaXMuaW5pdEVuZW15KCk7XG4gIH1cblxuICBwdWJsaWMgb25VcGRhdGUoZHQ6IG51bWJlcikge1xuICAgIENvbGxpZGVyLm9uVXBkYXRlKGR0KTtcbiAgICB0aGlzLmVuZW15VGltZSArPSBkdDtcbiAgICBpZiAodGhpcy5lbmVteVRpbWUgPj0gRU5FTVlfSU5URVJWQUwpIHtcbiAgICAgIHRoaXMuYWRkRW5lbXkoKTtcbiAgICAgIHRoaXMuZW5lbXlUaW1lIC09IEVORU1ZX0lOVEVSVkFMO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpbml0UGxheWVyKCkge1xuICAgIGVuZ2luZS5sb2FkZXIubG9hZDxlbmdpbmUuUHJlZmFiPihcInJlc291cmNlL0FpcmNyYWZ0LnByZWZhYlwiKS5wcm9taXNlLnRoZW4oKHByZWZhYikgPT4ge1xuICAgICAgY29uc3QgZW50aXR5ID0gcHJlZmFiLmluc3RhbnRpYXRlKCk7XG4gICAgICBlbnRpdHkuYWRkQ29tcG9uZW50KEQzUGxheWVyKTtcbiAgICAgIGVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueSArPSAxO1xuICAgICAgZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi56ID0gODtcbiAgICAgIHRoaXMud29ybGQudHJhbnNmb3JtLmFkZENoaWxkKGVudGl0eS50cmFuc2Zvcm0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGluaXRFbmVteSgpIHtcbiAgICBlbmdpbmUubG9hZGVyLmxvYWQ8ZW5naW5lLlByZWZhYj4oXCJyZXNvdXJjZS9FbmVteTAxLnByZWZhYlwiKS5wcm9taXNlLnRoZW4oKHByZWZhYikgPT4ge1xuICAgICAgdGhpcy5lbmVteVByZWZhYiA9IHByZWZhYjtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRFbmVteSgpIHtcbiAgICBpZiAoIXRoaXMuZW5lbXlQcmVmYWIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKEQzRW5lbXkuZW5lbXlDb3VudCA+PSAyMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBlbnRpdHkgPSB0aGlzLmVuZW15UHJlZmFiLmluc3RhbnRpYXRlKCk7XG4gICAgY29uc3Qgc2NyaXB0ID0gZW50aXR5LmFkZENvbXBvbmVudChEM0VuZW15KTtcbiAgICBlbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnggPSByYW5kb21CZXR3ZWVuKC0yNiwgMjYpO1xuICAgIGVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueSArPSAxO1xuICAgIGVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueiA9IHJhbmRvbUJldHdlZW4oLTUwLCAtMjApO1xuICAgIC8vIGVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueCA9IHJhbmRvbUJldHdlZW4oLTEwLCAxMCk7XG4gICAgLy8gZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi56ID0gcmFuZG9tQmV0d2VlbigxMCwgMSk7XG4gICAgdGhpcy53b3JsZC50cmFuc2Zvcm0uYWRkQ2hpbGQoZW50aXR5LnRyYW5zZm9ybSk7XG4gICAgRDNFbmVteS5lbmVteUNvdW50Kys7XG4gICAgLy8gY29uc29sZS5sb2coJ0FkZCBFbmVteScsIEQzRW5lbXkuZW5lbXlDb3VudCk7XG4gIH1cbn1cbiIsImltcG9ydCBlbmdpbmUgZnJvbSAnZW5naW5lJztcbmltcG9ydCBDb2xsaWRlciBmcm9tICcuLi9jb21tb25zL2NvbGxpZGVyLmpzJztcbmltcG9ydCBEYXRhQ2VudGVyIGZyb20gJy4uL2NvbW1vbnMvZGF0YUNlbnRlci5qcyc7XG5pbXBvcnQgRXZlbnRDZW50ZXIgZnJvbSAnLi4vY29tbW9ucy9ldmVudENlbnRlci5qcyc7XG5pbXBvcnQgRDNCdWxsZXQgZnJvbSAnLi9kM0J1bGxldC5qcyc7XG5cbmNvbnN0IFBPU19MSU1JVCA9IHtcbiAgeDogWy0zMCwgMzBdLFxuICAvLyB5OiBbLTEwMCwgMTAwXSxcbiAgejogWy01NCwgMTQuM10sXG59O1xuXG5AZW5naW5lLmRlY29yYXRvcnMuc2VyaWFsaXplKFwiRDNQbGF5ZXJcIilcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEQzUGxheWVyIGV4dGVuZHMgZW5naW5lLlNjcmlwdCB7XG4gIHB1YmxpYyBidWxsZXRQcmVmYWIgPSBudWxsO1xuICBwdWJsaWMgYnVsbGV0SW50ZXJ2YWwgPSAwLjM7XG4gIHB1YmxpYyBidWxsZXRUaW1lID0gMDtcbiAgcHVibGljIHBsYXllciA9IG51bGw7XG4gIHB1YmxpYyBodXJ0UGFydGljbGUgPSBudWxsO1xuICBwdWJsaWMgc3BlZWQgPSAxMDtcbiAgcHVibGljIGRpcmVjdGlvbiA9IGVuZ2luZS5WZWN0b3IzLlpFUk8uY2xvbmUoKTtcbiAgcHVibGljIHJvdGF0aW9uID0gZW5naW5lLlZlY3RvcjMuWkVSTy5jbG9uZSgpO1xuICBwdWJsaWMgYm91bmQgPSBlbmdpbmUuVmVjdG9yMy5jcmVhdGVGcm9tTnVtYmVyKDIuNzUgLyAyLCAwLjQ2IC8gMiwgMC41IC8gMik7XG5cbiAgcHVibGljIG9uQXdha2UoKSB7XG4gICAgY29uc29sZS5sb2coXCJvbkF3YWtlIEQzUGxheWVyXCIpO1xuICAgIC8vIHRoaXMuaW5pdEVudGl0eSgpO1xuXG4gICAgdGhpcy5wbGF5ZXIgPSB0aGlzLmVudGl0eTtcbiAgICBEYXRhQ2VudGVyLnBsYXllckVudGl0eSA9IHRoaXMucGxheWVyO1xuICAgIERhdGFDZW50ZXIucGxheWVyQ29tcCA9IHRoaXM7XG5cbiAgICB0aGlzLmh1cnRQYXJ0aWNsZSA9IHRoaXMucGxheWVyLnRyYW5zZm9ybS5fY2hpbGRyZW5bMF0uZmluZENoaWxkQnlOYW1lKFwiSHVydFwiKS5lbnRpdHkuZ2V0Q29tcG9uZW50KGVuZ2luZS5QYXJ0aWNsZSk7XG4gICAgLy8gdGhpcy5odXJ0UGFydGljbGUuZW1pdHRlci5zdGFydCA9IHRydWU7XG5cbiAgICB0aGlzLmluaXRFdmVudCgpO1xuICAgIHRoaXMuaW5pdFByZWZhYigpO1xuICAgIENvbGxpZGVyLndhdGNoKHRoaXMsIFtcInBsYXllclwiXSk7XG5cbiAgICBFdmVudENlbnRlci5lbWl0KEV2ZW50Q2VudGVyLkFERF9QTEFZRVIpO1xuICB9XG5cbiAgcHVibGljIG9uVXBkYXRlKGR0KSB7XG4gICAgaWYgKHRoaXMucGxheWVyKSB7XG4gICAgICB0aGlzLnVwZGF0ZU1vdmUoZHQpO1xuICAgICAgdGhpcy51cGRhdGVCdWxsZXQoZHQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpbml0UHJlZmFiKCkge1xuICAgIGVuZ2luZS5sb2FkZXIubG9hZChcInJlc291cmNlL0J1bGxldC5wcmVmYWJcIikucHJvbWlzZS50aGVuKChwcmVmYWIpID0+IHtcbiAgICAgIHRoaXMuYnVsbGV0UHJlZmFiID0gcHJlZmFiO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGluaXRFdmVudCgpIHtcbiAgICBFdmVudENlbnRlci5vbihFdmVudENlbnRlci5UT1VDSF9NT1ZFLCAoZGlyZWN0aW9uKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnZ2V0IDJkIE9OX1RPVUNIX01PVkUnLCBkaXJlY3Rpb24ueCwgZGlyZWN0aW9uLnksIGRpcmVjdGlvbi56KTtcbiAgICAgIHRoaXMuZGlyZWN0aW9uLnggPSBkaXJlY3Rpb24ueDtcbiAgICAgIHRoaXMuZGlyZWN0aW9uLnkgPSBkaXJlY3Rpb24ueTtcbiAgICAgIHRoaXMuZGlyZWN0aW9uLnogPSBkaXJlY3Rpb24uejtcblxuICAgICAgaWYgKGRpcmVjdGlvbi54ID09PSAwKSB7XG4gICAgICAgIHRoaXMucm90YXRpb24ueCA9IDA7XG4gICAgICAgIHRoaXMucm90YXRpb24ueiA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJvdGF0aW9uLnggPSAwLjAxO1xuICAgICAgICB0aGlzLnJvdGF0aW9uLnogPSBkaXJlY3Rpb24ueCA8IDAgPyAwLjAxIDogLTAuMDE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBFdmVudENlbnRlci5vbihFdmVudENlbnRlci5IVVJUX1BMQVlFUiwgKCkgPT4ge1xuICAgICAgdGhpcy5odXJ0UGFydGljbGUuZW1pdHRlci5zdGFydCA9IHRydWU7XG4gICAgfSk7XG5cbiAgICBFdmVudENlbnRlci5vbihFdmVudENlbnRlci5TVEFSVF9TSE9PVCwgKCkgPT4ge1xuICAgICAgdGhpcy5idWxsZXRJbnRlcnZhbCA9IDAuMTtcbiAgICB9KTtcbiAgICBFdmVudENlbnRlci5vbihFdmVudENlbnRlci5FTkRfU0hPT1QsICgpID0+IHtcbiAgICAgIHRoaXMuYnVsbGV0SW50ZXJ2YWwgPSAwLjM7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTW92ZShkdCkge1xuICAgIGZvciAoY29uc3QgayBpbiBQT1NfTElNSVQpIHtcbiAgICAgIGlmICh0aGlzLnJvdGF0aW9uW2tdID09PSAwKSB7XG4gICAgICAgIHRoaXMucGxheWVyLnRyYW5zZm9ybS5ldWxlcltrXSA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBsYXllci50cmFuc2Zvcm0uZXVsZXJba10gKz0gdGhpcy5yb3RhdGlvbltrXTtcbiAgICAgICAgaWYgKHRoaXMucGxheWVyLnRyYW5zZm9ybS5ldWxlcltrXSA+IDAuMikge1xuICAgICAgICAgIHRoaXMucGxheWVyLnRyYW5zZm9ybS5ldWxlcltrXSA9IDAuMjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBsYXllci50cmFuc2Zvcm0uZXVsZXJba10gPCAtMC4yKSB7XG4gICAgICAgICAgdGhpcy5wbGF5ZXIudHJhbnNmb3JtLmV1bGVyW2tdID0gLTAuMjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyB0aGlzLmVudGl0eS50cmFuc2Zvcm0uZXVsZXIueSArPSAwLjAzO1xuXG5cbiAgICBjb25zdCBtb3ZlID0ge1xuICAgICAgeDogdGhpcy5zcGVlZCAqIHRoaXMuZGlyZWN0aW9uLnggKiBkdCxcbiAgICAgIHk6IHRoaXMuc3BlZWQgKiB0aGlzLmRpcmVjdGlvbi55ICogZHQsXG4gICAgICB6OiB0aGlzLnNwZWVkICogdGhpcy5kaXJlY3Rpb24ueiAqIGR0LFxuICAgIH07XG4gICAgY29uc3QgcG9zID0gdGhpcy5wbGF5ZXIudHJhbnNmb3JtLnBvc2l0aW9uO1xuICAgIGZvciAoY29uc3QgayBpbiBQT1NfTElNSVQpIHtcbiAgICAgIGlmIChcbiAgICAgICAgcG9zW2tdICsgbW92ZVtrXSA8IFBPU19MSU1JVFtrXVswXVxuICAgICAgICB8fFxuICAgICAgICBwb3Nba10gKyBtb3ZlW2tdID4gUE9TX0xJTUlUW2tdWzFdXG4gICAgICApIHtcbiAgICAgICAgbW92ZVtrXSA9IDA7XG4gICAgICB9XG4gICAgICB0aGlzLnBsYXllci50cmFuc2Zvcm0ucG9zaXRpb25ba10gKz0gbW92ZVtrXTtcbiAgICB9XG4gICAgaWYgKG1vdmUueCAhPT0gMCB8fCBtb3ZlLnkgIT09IDAgfHwgbW92ZS56ICE9PSAwKSB7XG4gICAgICBFdmVudENlbnRlci5lbWl0KEV2ZW50Q2VudGVyLk1PVkVfUExBWUVSLCBtb3ZlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQnVsbGV0KGR0KSB7XG4gICAgaWYgKCF0aGlzLmJ1bGxldFByZWZhYikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmJ1bGxldFRpbWUgKz0gZHQ7XG4gICAgaWYgKHRoaXMuYnVsbGV0VGltZSA+PSB0aGlzLmJ1bGxldEludGVydmFsKSB7XG4gICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLmJ1bGxldFByZWZhYi5pbnN0YW50aWF0ZSgpO1xuICAgICAgY29uc3Qgc2NyaXB0ID0gZW50aXR5LmFkZENvbXBvbmVudChEM0J1bGxldCk7XG4gICAgICBlbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uID0gdGhpcy5wbGF5ZXIudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XG4gICAgICAvLyBzY3JpcHQuZGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb24uY2xvbmUoKTtcbiAgICAgIC8vIGlmICh0aGlzLmRpcmVjdGlvbi5pc1plcm8oKSkge1xuICAgICAgLy8gICBzY3JpcHQuZGlyZWN0aW9uLnogPSAtMTtcbiAgICAgIC8vIH1cbiAgICAgIHNjcmlwdC5kaXJlY3Rpb24ueiA9IC0xO1xuXG4gICAgICBEYXRhQ2VudGVyLndvcmxkRW50aXR5LnRyYW5zZm9ybS5hZGRDaGlsZChlbnRpdHkudHJhbnNmb3JtKTtcblxuICAgICAgdGhpcy5idWxsZXRUaW1lIC09IHRoaXMuYnVsbGV0SW50ZXJ2YWw7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNTG9nZ2VyIHtcclxuICBzdGF0aWMgTG9nKFxyXG4gICAgcGFyYW0wPzogYW55LFxyXG4gICAgcGFyYW0xPzogYW55LFxyXG4gICAgcGFyYW0yPzogYW55LFxyXG4gICAgcGFyYW0zPzogYW55LFxyXG4gICAgcGFyYW00PzogYW55LFxyXG4gICAgcGFyYW01PzogYW55LFxyXG4gICAgcGFyYW02PzogYW55XHJcbiAgKSB7XHJcbiAgICBjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG4gICAgY29uc29sZS5sb2coXCJbbG9nXVwiLCAuLi5hcmdzKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IGVuZ2luZSBmcm9tIFwiZW5naW5lXCI7XHJcbmltcG9ydCBNTG9nZ2VyIGZyb20gXCIuLi9HYW1lQmFzZS9EZWJ1Zy9NTG9nZ2VyXCI7XHJcblxyXG5kZWNsYXJlIGNvbnN0IHd4O1xyXG5cclxuQGVuZ2luZS5kZWNvcmF0b3JzLnNlcmlhbGl6ZShcIkdhbWVSb290XCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVSb290IGV4dGVuZHMgZW5naW5lLlNjcmlwdCB7XHJcbiAgb25Bd2FrZSgpIHtcclxuICAgIC8vc3VwZXIub25Bd2FrZSgpO1xyXG4gICAgTUxvZ2dlci5Mb2coXCJNYWdpYyBTdG9yeSBiZWdpbiBoZXJlXCIsIFwiaGVsbG8gd29ybGRcIiwgXCJnbGhmXCIpO1xyXG4gIH1cclxufVxyXG4iXX0=
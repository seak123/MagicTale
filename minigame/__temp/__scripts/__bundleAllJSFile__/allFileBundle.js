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
__DEFINE__(1599365205975, function(require, module, exports) {


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
return __REQUIRE__(1599365205975);
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
__DEFINE__(1599365205976, function(require, module, exports) {
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
return __REQUIRE__(1599365205976);
})()
// none
// none
});
define("assets/Scripts/G.js", function(require, module, exports, process){ 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var _window = window;
exports.E = engine_1.default;
exports.Loader = exports.E.loader;
exports.TouchManager = engine_1.default.game.rootUICamera.touchManager;
var Ett = (function (_super) {
    tslib_1.__extends(Ett, _super);
    function Ett() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Ett;
}(engine_1.default.Entity));
exports.Ett = Ett;
var Prefab = (function (_super) {
    tslib_1.__extends(Prefab, _super);
    function Prefab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Prefab;
}(engine_1.default.Prefab));
exports.Prefab = Prefab;
var v2 = (function (_super) {
    tslib_1.__extends(v2, _super);
    function v2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    v2.UP = v2.createFromNumber(0, 1);
    v2.DOWN = v2.createFromNumber(0, -1);
    v2.LEFT = v2.createFromNumber(-1, 0);
    v2.RIGHT = v2.createFromNumber(1, 0);
    return v2;
}(engine_1.default.Vector2));
exports.v2 = v2;
var v3 = (function (_super) {
    tslib_1.__extends(v3, _super);
    function v3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return v3;
}(engine_1.default.Vector3));
exports.v3 = v3;
var v4 = (function (_super) {
    tslib_1.__extends(v4, _super);
    function v4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return v4;
}(engine_1.default.Vector4));
exports.v4 = v4;
var Point = (function (_super) {
    tslib_1.__extends(Point, _super);
    function Point() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Point;
}(v2));
exports.Point = Point;
var Quat = (function (_super) {
    tslib_1.__extends(Quat, _super);
    function Quat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Quat;
}(engine_1.default.Quaternion));
exports.Quat = Quat;
var M4 = (function (_super) {
    tslib_1.__extends(M4, _super);
    function M4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return M4;
}(engine_1.default.Matrix4));
exports.M4 = M4;
var SP3D = (function (_super) {
    tslib_1.__extends(SP3D, _super);
    function SP3D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SP3D;
}(engine_1.default.Entity));
exports.SP3D = SP3D;
var Tf2D = (function (_super) {
    tslib_1.__extends(Tf2D, _super);
    function Tf2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Tf2D;
}(engine_1.default.Transform2D));
exports.Tf2D = Tf2D;
var Tf3D = (function (_super) {
    tslib_1.__extends(Tf3D, _super);
    function Tf3D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Tf3D;
}(engine_1.default.Transform3D));
exports.Tf3D = Tf3D;
var Mask = (function (_super) {
    tslib_1.__extends(Mask, _super);
    function Mask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Mask;
}(engine_1.default.UIMask));
exports.Mask = Mask;
var Button = (function (_super) {
    tslib_1.__extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Button;
}(engine_1.default.UIButton));
exports.Button = Button;
var Toggle = (function (_super) {
    tslib_1.__extends(Toggle, _super);
    function Toggle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Toggle;
}(engine_1.default.UIToggle));
exports.Toggle = Toggle;
var ToggleGroup = (function (_super) {
    tslib_1.__extends(ToggleGroup, _super);
    function ToggleGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ToggleGroup;
}(engine_1.default.UIToggleGroup));
exports.ToggleGroup = ToggleGroup;
var Input = (function (_super) {
    tslib_1.__extends(Input, _super);
    function Input() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Input;
}(engine_1.default.UITextInput));
exports.Input = Input;
var RichText = (function (_super) {
    tslib_1.__extends(RichText, _super);
    function RichText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RichText;
}(engine_1.default.UIRichText));
exports.RichText = RichText;
var Game = (function (_super) {
    tslib_1.__extends(Game, _super);
    function Game() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Game;
}(engine_1.default.Game));
exports.Game = Game;
var MeshRenderer = (function (_super) {
    tslib_1.__extends(MeshRenderer, _super);
    function MeshRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MeshRenderer;
}(engine_1.default.MeshRenderer));
exports.MeshRenderer = MeshRenderer;
var SkinnedMeshRenderer = (function (_super) {
    tslib_1.__extends(SkinnedMeshRenderer, _super);
    function SkinnedMeshRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SkinnedMeshRenderer;
}(engine_1.default.SkinnedMeshRenderer));
exports.SkinnedMeshRenderer = SkinnedMeshRenderer;
var LineRenderer = (function (_super) {
    tslib_1.__extends(LineRenderer, _super);
    function LineRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LineRenderer;
}(engine_1.default.LineRenderer));
exports.LineRenderer = LineRenderer;
var Particle = (function (_super) {
    tslib_1.__extends(Particle, _super);
    function Particle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Particle;
}(engine_1.default.Particle));
exports.Particle = Particle;
var SpFrame = (function (_super) {
    tslib_1.__extends(SpFrame, _super);
    function SpFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SpFrame;
}(engine_1.default.SpriteFrame));
exports.SpFrame = SpFrame;
var Tex2D = (function (_super) {
    tslib_1.__extends(Tex2D, _super);
    function Tex2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Tex2D;
}(engine_1.default.Texture2D));
exports.Tex2D = Tex2D;
var Rect = (function (_super) {
    tslib_1.__extends(Rect, _super);
    function Rect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Rect;
}(engine_1.default.Rect));
exports.Rect = Rect;
var Animator = (function (_super) {
    tslib_1.__extends(Animator, _super);
    function Animator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Animator;
}(engine_1.default.Animator));
exports.Animator = Animator;
var AnimationClip = (function (_super) {
    tslib_1.__extends(AnimationClip, _super);
    function AnimationClip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AnimationClip;
}(engine_1.default.AnimationClip));
exports.AnimationClip = AnimationClip;
var Animation = (function (_super) {
    tslib_1.__extends(Animation, _super);
    function Animation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Animation;
}(engine_1.default.Animation));
exports.Animation = Animation;
var AnimatorController = (function (_super) {
    tslib_1.__extends(AnimatorController, _super);
    function AnimatorController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AnimatorController;
}(engine_1.default.AnimatorController));
exports.AnimatorController = AnimatorController;
var Material = (function (_super) {
    tslib_1.__extends(Material, _super);
    function Material() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Material;
}(engine_1.default.Material));
exports.Material = Material;
var Effect = (function (_super) {
    tslib_1.__extends(Effect, _super);
    function Effect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Effect;
}(engine_1.default.Effect));
exports.Effect = Effect;
var Anchor = (function (_super) {
    tslib_1.__extends(Anchor, _super);
    function Anchor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Anchor;
}(engine_1.default.UIAnchor));
exports.Anchor = Anchor;
var PostProcessComponent = (function (_super) {
    tslib_1.__extends(PostProcessComponent, _super);
    function PostProcessComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PostProcessComponent;
}(engine_1.default.PostProcessComponent));
exports.PostProcessComponent = PostProcessComponent;
var Color = (function (_super) {
    tslib_1.__extends(Color, _super);
    function Color() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Color.RED = new Color(255, 0, 0, 255);
    Color.GREEN = new Color(0, 255, 0, 255);
    Color.BLUE = new Color(0, 0, 255, 255);
    Color.YELLOW = new Color(255, 235, 4, 255);
    Color.CYAN = new Color(0, 255, 255, 255);
    Color.MAGENTA = new Color(255, 0, 255, 255);
    Color.PURPLE = new Color(255, 192, 203, 255);
    Color.ORANGE = new Color(255, 97, 0, 255);
    Color.GRAY = new Color(128, 128, 128, 255);
    Color.GREY = new Color(128, 128, 128, 255);
    Color.CLEAR = new Color(0, 0, 0, 0);
    Color.QUALITY_COLOR = [
        Color.WHITE,
        new Color(19, 232, 50, 255),
        new Color(15, 174, 255, 255),
        new Color(204, 59, 239, 255),
        new Color(255, 129, 0, 255),
        new Color(255, 255, 2, 255)
    ];
    return Color;
}(engine_1.default.Color));
exports.Color = Color;
var UISpriteFlipType;
(function (UISpriteFlipType) {
    UISpriteFlipType[UISpriteFlipType["Nothing"] = 0] = "Nothing";
    UISpriteFlipType[UISpriteFlipType["Horizontally"] = 1] = "Horizontally";
    UISpriteFlipType[UISpriteFlipType["Vertically"] = 2] = "Vertically";
    UISpriteFlipType[UISpriteFlipType["Both"] = 3] = "Both";
})(UISpriteFlipType = exports.UISpriteFlipType || (exports.UISpriteFlipType = {}));
var Script = (function (_super) {
    tslib_1.__extends(Script, _super);
    function Script() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Script.prototype, "owner", {
        get: function () {
            return this.entity;
        },
        enumerable: true,
        configurable: true
    });
    return Script;
}(engine_1.default.Script));
exports.Script = Script;
var Wgt = (function (_super) {
    tslib_1.__extends(Wgt, _super);
    function Wgt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Wgt;
}(engine_1.default.UIWidget));
exports.Wgt = Wgt;
var Sp = (function (_super) {
    tslib_1.__extends(Sp, _super);
    function Sp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Sp;
}(engine_1.default.UISprite));
exports.Sp = Sp;
var Font = (function (_super) {
    tslib_1.__extends(Font, _super);
    function Font() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Font;
}(engine_1.default.Font));
exports.Font = Font;
var Label = (function (_super) {
    tslib_1.__extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Label;
}(engine_1.default.UILabel));
exports.Label = Label;
var ScrollView = (function (_super) {
    tslib_1.__extends(ScrollView, _super);
    function ScrollView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ScrollView;
}(engine_1.default.UIScrollView));
exports.ScrollView = ScrollView;
var Grid = (function (_super) {
    tslib_1.__extends(Grid, _super);
    function Grid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Grid;
}(engine_1.default.UIGrid));
exports.Grid = Grid;
var RenderTexture = (function (_super) {
    tslib_1.__extends(RenderTexture, _super);
    function RenderTexture() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RenderTexture;
}(engine_1.default.RenderTexture));
exports.RenderTexture = RenderTexture;
var Graphic = (function (_super) {
    tslib_1.__extends(Graphic, _super);
    function Graphic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Graphic;
}(engine_1.default.UIGraphic));
exports.Graphic = Graphic;
var Cam = (function (_super) {
    tslib_1.__extends(Cam, _super);
    function Cam() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Cam;
}(engine_1.default.Camera));
exports.Cam = Cam;
var Dl = (function (_super) {
    tslib_1.__extends(Dl, _super);
    function Dl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dl;
}(engine_1.default.DirectionalLight));
exports.Dl = Dl;
var Touchable = (function (_super) {
    tslib_1.__extends(Touchable, _super);
    function Touchable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Touchable;
}(engine_1.default.Touchable));
exports.Touchable = Touchable;
var TouchInputComponent = (function (_super) {
    tslib_1.__extends(TouchInputComponent, _super);
    function TouchInputComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TouchInputComponent;
}(engine_1.default.TouchInputComponent));
exports.TouchInputComponent = TouchInputComponent;
var KeyboardInputComponent = (function (_super) {
    tslib_1.__extends(KeyboardInputComponent, _super);
    function KeyboardInputComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return KeyboardInputComponent;
}(engine_1.default.KeyboardInputComponent));
exports.KeyboardInputComponent = KeyboardInputComponent;
var RayCaster = (function (_super) {
    tslib_1.__extends(RayCaster, _super);
    function RayCaster() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RayCaster;
}(engine_1.default.Raycaster));
exports.RayCaster = RayCaster;
var ColorUtils = (function () {
    function ColorUtils() {
    }
    ColorUtils.rgbToHex = function (r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };
    ColorUtils.HexToColor = function (hex) {
        var hexStr = hex.slice(1);
        var red = hexStr.slice(0, 2);
        var green = hexStr.slice(2, 4);
        var blue = hexStr.slice(4, 6);
        var alpha = "FF";
        if (hexStr.length > 6) {
            alpha = hexStr.slice(6, 8);
        }
        var hexNum = parseInt(alpha + blue + green + red, 16);
        return engine_1.default.Color.fromHex(hexNum);
    };
    ColorUtils.Grayscale = function (color) {
        if (color) {
            return 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
        }
        return 0;
    };
    return ColorUtils;
}());
exports.ColorUtils = ColorUtils;
function ScreenPosToGlob(screenPos, createNewPoint) {
    var stageX = screenPos.x;
    var stageY = screenPos.y;
    var result = screenPos;
    if (createNewPoint) {
        result = new Point();
    }
    result.x = stageX;
    result.y = stageY;
    return result;
}
exports.ScreenPosToGlob = ScreenPosToGlob;
function getComponentsIncludeChild(node, clas) {
    if (!node)
        return;
    var result = [];
    var components = node.getComponents(clas);
    if (components) {
        components.forEach(function (component) {
            result.push(component);
        });
    }
    if (node.transform && node.transform.childrenCount > 0) {
        node.transform.travelChild(function (child) {
            if (child !== node.transform) {
                var childComponents = getComponentsIncludeChild(child.entity, clas);
                if (childComponents && childComponents.length) {
                    childComponents.forEach(function (component) {
                        result.push(component);
                    });
                }
            }
        });
    }
    return result;
}
exports.getComponentsIncludeChild = getComponentsIncludeChild;
function getComponentsIncludeChild2D(node, clas) {
    var result = [];
    if (!node)
        return result;
    var components = node.getComponents(clas);
    if (components) {
        components.forEach(function (component) {
            result.push(component);
        });
    }
    if (node.transform2D && node.transform2D.childrenCount > 0) {
        node.transform2D.travelChild(function (child) {
            if (child !== node.transform2D) {
                var childComponents = getComponentsIncludeChild2D(child.entity, clas);
                if (childComponents && childComponents.length) {
                    childComponents.forEach(function (component) {
                        result.push(component);
                    });
                }
            }
        });
    }
    return result;
}
exports.getComponentsIncludeChild2D = getComponentsIncludeChild2D;
function getComponentInParent(node, clas) {
    var component = node.getComponent(clas);
    if (component) {
        return component;
    }
    else {
        var parent = node.transform.parent;
        if (parent) {
            return getComponentInParent(parent.entity, clas);
        }
        else {
            return null;
        }
    }
}
exports.getComponentInParent = getComponentInParent;
var LoopIndicator = (function () {
    function LoopIndicator() {
    }
    return LoopIndicator;
}());
exports.LoopIndicator = LoopIndicator;
function StartLoop(caller, method) {
    var localCaller = caller;
    var indicator = new LoopIndicator();
    var loopFunc = function () {
        var inkey = window.requestAnimationFrame(loopFunc);
        indicator.t = inkey;
        method.apply(localCaller);
    };
    var outKey = window.requestAnimationFrame(loopFunc);
    indicator.t = outKey;
    return indicator;
}
exports.StartLoop = StartLoop;
function EndLoop(loopIndicator) {
    if (loopIndicator) {
        window.cancelAnimationFrame(loopIndicator.t);
        loopIndicator = null;
    }
}
exports.EndLoop = EndLoop;
var BaseUrl;
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
define("assets/Scripts/GameBase/Asset/AssetManager.js", function(require, module, exports, process){ 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AssetManager = (function () {
    function AssetManager() {
    }
    AssetManager.LoadAssetAsync = function (path) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, engine.loader.load(path).promise];
            });
        });
    };
    return AssetManager;
}());
exports.default = AssetManager;
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
var AssetManager_1 = require("../GameBase/Asset/AssetManager");
var GameRoot = (function (_super) {
    tslib_1.__extends(GameRoot, _super);
    function GameRoot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameRoot.prototype.onAwake = function () {
        this.m_game = engine_1.default.game;
    };
    GameRoot.prototype.onStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nodeRoot, entity;
            return tslib_1.__generator(this, function (_a) {
                nodeRoot = this.m_game.createEntity3D("Node3DRoot");
                this.m_game.activeScene.root.transform.addChild(nodeRoot.transform);
                this.m_game.markAsPersist(nodeRoot);
                entity = this.m_game.createEntity3D("Monster");
                nodeRoot.transform.addChild(entity.transform);
                AssetManager_1.default.LoadAssetAsync("Assets/Resources/Modle/Monster_1/Prefab/Monster_1.prefab").then(function (prefab) {
                    var p = prefab.instantiate();
                    nodeRoot.transform.addChild(p.transform);
                });
                return [2];
            });
        });
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
define("assets/Scripts/GameCore/Battle/BattleSession.js", function(require, module, exports, process){ 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BattleSession = (function () {
    function BattleSession() {
    }
    return BattleSession;
}());
exports.default = BattleSession;
// none
// none
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwidHNsaWIuanMiLCJTY3JpcHRzL0cudHMiLCJTY3JpcHRzL2NvbW1vbnMvY29sbGlkZXIudHMiLCJTY3JpcHRzL2NvbW1vbnMvZGF0YUNlbnRlci50cyIsIlNjcmlwdHMvY29tbW9ucy9ldmVudENlbnRlci50cyIsIlNjcmlwdHMvY29tcG9uZW50cy9kMk1vdmUudHMiLCJTY3JpcHRzL2NvbXBvbmVudHMvZDJTY29yZS50cyIsIlNjcmlwdHMvY29tcG9uZW50cy9kMlNob290LnRzIiwiU2NyaXB0cy9jb21wb25lbnRzL2QzQnVsbGV0LnRzIiwiU2NyaXB0cy9jb21wb25lbnRzL2QzQ2FtZXJhLnRzIiwiU2NyaXB0cy9jb21wb25lbnRzL2QzRW5lbXkudHMiLCJTY3JpcHRzL2NvbXBvbmVudHMvZDNNYWluLnRzIiwiU2NyaXB0cy9jb21wb25lbnRzL2QzUGxheWVyLnRzIiwiU2NyaXB0cy9HYW1lQmFzZS9Bc3NldC9Bc3NldE1hbmFnZXIudHMiLCJTY3JpcHRzL0dhbWVCYXNlL0RlYnVnL01Mb2dnZXIudHMiLCJTY3JpcHRzL0dhbWVDb3JlL0dhbWVSb290LnRzIiwiU2NyaXB0cy9HYW1lQ29yZS9CYXR0bGUvQmF0dGxlU2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNoVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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UyxDQUFDLENBQUM7Z0JBQzlDLHNCQUFZLENBQUMsY0FBYyxDQUFDLDBEQUEwRCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBZ0I7b0JBQzVHLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDN0IsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDLENBQUMsQ0FBQzs7OztLQUNKO0lBaENrQixRQUFRO1FBRDVCLGdCQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7T0FDbkIsUUFBUSxDQWlDNUI7SUFBRCxlQUFDO0NBakNELEFBaUNDLENBakNxQyxnQkFBTSxDQUFDLE1BQU0sR0FpQ2xEO2tCQWpDb0IsUUFBUTs7Ozs7OztBQ1I3QjtJQUFBO0lBRUEsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FGQSxBQUVDLElBQUEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxyXG4gICwgcHJlZml4ID0gJ34nO1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdG9yIHRvIGNyZWF0ZSBhIHN0b3JhZ2UgZm9yIG91ciBgRUVgIG9iamVjdHMuXHJcbiAqIEFuIGBFdmVudHNgIGluc3RhbmNlIGlzIGEgcGxhaW4gb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIGV2ZW50IG5hbWVzLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIEV2ZW50cygpIHt9XHJcblxyXG4vL1xyXG4vLyBXZSB0cnkgdG8gbm90IGluaGVyaXQgZnJvbSBgT2JqZWN0LnByb3RvdHlwZWAuIEluIHNvbWUgZW5naW5lcyBjcmVhdGluZyBhblxyXG4vLyBpbnN0YW5jZSBpbiB0aGlzIHdheSBpcyBmYXN0ZXIgdGhhbiBjYWxsaW5nIGBPYmplY3QuY3JlYXRlKG51bGwpYCBkaXJlY3RseS5cclxuLy8gSWYgYE9iamVjdC5jcmVhdGUobnVsbClgIGlzIG5vdCBzdXBwb3J0ZWQgd2UgcHJlZml4IHRoZSBldmVudCBuYW1lcyB3aXRoIGFcclxuLy8gY2hhcmFjdGVyIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBidWlsdC1pbiBvYmplY3QgcHJvcGVydGllcyBhcmUgbm90XHJcbi8vIG92ZXJyaWRkZW4gb3IgdXNlZCBhcyBhbiBhdHRhY2sgdmVjdG9yLlxyXG4vL1xyXG5pZiAoT2JqZWN0LmNyZWF0ZSkge1xyXG4gIEV2ZW50cy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG5cclxuICAvL1xyXG4gIC8vIFRoaXMgaGFjayBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgYF9fcHJvdG9fX2AgcHJvcGVydHkgaXMgc3RpbGwgaW5oZXJpdGVkIGluXHJcbiAgLy8gc29tZSBvbGQgYnJvd3NlcnMgbGlrZSBBbmRyb2lkIDQsIGlQaG9uZSA1LjEsIE9wZXJhIDExIGFuZCBTYWZhcmkgNS5cclxuICAvL1xyXG4gIGlmICghbmV3IEV2ZW50cygpLl9fcHJvdG9fXykgcHJlZml4ID0gZmFsc2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBldmVudCBsaXN0ZW5lci5cclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxyXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvbmNlPWZhbHNlXSBTcGVjaWZ5IGlmIHRoZSBsaXN0ZW5lciBpcyBhIG9uZS10aW1lIGxpc3RlbmVyLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIEVFKGZuLCBjb250ZXh0LCBvbmNlKSB7XHJcbiAgdGhpcy5mbiA9IGZuO1xyXG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgdGhpcy5vbmNlID0gb25jZSB8fCBmYWxzZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gZW1pdHRlciBSZWZlcmVuY2UgdG8gdGhlIGBFdmVudEVtaXR0ZXJgIGluc3RhbmNlLlxyXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cclxuICogQHBhcmFtIHsqfSBjb250ZXh0IFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cclxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIFNwZWNpZnkgaWYgdGhlIGxpc3RlbmVyIGlzIGEgb25lLXRpbWUgbGlzdGVuZXIuXHJcbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcihlbWl0dGVyLCBldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcclxuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcbiAgfVxyXG5cclxuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgZW1pdHRlciwgb25jZSlcclxuICAgICwgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcclxuXHJcbiAgaWYgKCFlbWl0dGVyLl9ldmVudHNbZXZ0XSkgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBsaXN0ZW5lciwgZW1pdHRlci5fZXZlbnRzQ291bnQrKztcclxuICBlbHNlIGlmICghZW1pdHRlci5fZXZlbnRzW2V2dF0uZm4pIGVtaXR0ZXIuX2V2ZW50c1tldnRdLnB1c2gobGlzdGVuZXIpO1xyXG4gIGVsc2UgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBbZW1pdHRlci5fZXZlbnRzW2V2dF0sIGxpc3RlbmVyXTtcclxuXHJcbiAgcmV0dXJuIGVtaXR0ZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDbGVhciBldmVudCBieSBuYW1lLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gZW1pdHRlciBSZWZlcmVuY2UgdG8gdGhlIGBFdmVudEVtaXR0ZXJgIGluc3RhbmNlLlxyXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZ0IFRoZSBFdmVudCBuYW1lLlxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gY2xlYXJFdmVudChlbWl0dGVyLCBldnQpIHtcclxuICBpZiAoLS1lbWl0dGVyLl9ldmVudHNDb3VudCA9PT0gMCkgZW1pdHRlci5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xyXG4gIGVsc2UgZGVsZXRlIGVtaXR0ZXIuX2V2ZW50c1tldnRdO1xyXG59XHJcblxyXG4vKipcclxuICogTWluaW1hbCBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UgdGhhdCBpcyBtb2xkZWQgYWdhaW5zdCB0aGUgTm9kZS5qc1xyXG4gKiBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UuXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XHJcbiAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xyXG4gIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhbiBhcnJheSBsaXN0aW5nIHRoZSBldmVudHMgZm9yIHdoaWNoIHRoZSBlbWl0dGVyIGhhcyByZWdpc3RlcmVkXHJcbiAqIGxpc3RlbmVycy5cclxuICpcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xyXG4gIHZhciBuYW1lcyA9IFtdXHJcbiAgICAsIGV2ZW50c1xyXG4gICAgLCBuYW1lO1xyXG5cclxuICBpZiAodGhpcy5fZXZlbnRzQ291bnQgPT09IDApIHJldHVybiBuYW1lcztcclxuXHJcbiAgZm9yIChuYW1lIGluIChldmVudHMgPSB0aGlzLl9ldmVudHMpKSB7XHJcbiAgICBpZiAoaGFzLmNhbGwoZXZlbnRzLCBuYW1lKSkgbmFtZXMucHVzaChwcmVmaXggPyBuYW1lLnNsaWNlKDEpIDogbmFtZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xyXG4gICAgcmV0dXJuIG5hbWVzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGV2ZW50cykpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5hbWVzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cclxuICogQHJldHVybnMge0FycmF5fSBUaGUgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMuXHJcbiAqIEBwdWJsaWNcclxuICovXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50KSB7XHJcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcclxuICAgICwgaGFuZGxlcnMgPSB0aGlzLl9ldmVudHNbZXZ0XTtcclxuXHJcbiAgaWYgKCFoYW5kbGVycykgcmV0dXJuIFtdO1xyXG4gIGlmIChoYW5kbGVycy5mbikgcmV0dXJuIFtoYW5kbGVycy5mbl07XHJcblxyXG4gIGZvciAodmFyIGkgPSAwLCBsID0gaGFuZGxlcnMubGVuZ3RoLCBlZSA9IG5ldyBBcnJheShsKTsgaSA8IGw7IGkrKykge1xyXG4gICAgZWVbaV0gPSBoYW5kbGVyc1tpXS5mbjtcclxuICB9XHJcblxyXG4gIHJldHVybiBlZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgbGlzdGVuaW5nIHRvIGEgZ2l2ZW4gZXZlbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cclxuICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWJlciBvZiBsaXN0ZW5lcnMuXHJcbiAqIEBwdWJsaWNcclxuICovXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIGxpc3RlbmVyQ291bnQoZXZlbnQpIHtcclxuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudFxyXG4gICAgLCBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZ0XTtcclxuXHJcbiAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybiAwO1xyXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHJldHVybiAxO1xyXG4gIHJldHVybiBsaXN0ZW5lcnMubGVuZ3RoO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhbGxzIGVhY2ggb2YgdGhlIGxpc3RlbmVycyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIGV2ZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGV2ZW50IGhhZCBsaXN0ZW5lcnMsIGVsc2UgYGZhbHNlYC5cclxuICogQHB1YmxpY1xyXG4gKi9cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XHJcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XHJcblxyXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiBmYWxzZTtcclxuXHJcbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdXHJcbiAgICAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcclxuICAgICwgYXJnc1xyXG4gICAgLCBpO1xyXG5cclxuICBpZiAobGlzdGVuZXJzLmZuKSB7XHJcbiAgICBpZiAobGlzdGVuZXJzLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVycy5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcclxuXHJcbiAgICBzd2l0Y2ggKGxlbikge1xyXG4gICAgICBjYXNlIDE6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCksIHRydWU7XHJcbiAgICAgIGNhc2UgMjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSksIHRydWU7XHJcbiAgICAgIGNhc2UgMzogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIpLCB0cnVlO1xyXG4gICAgICBjYXNlIDQ6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMyksIHRydWU7XHJcbiAgICAgIGNhc2UgNTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCksIHRydWU7XHJcbiAgICAgIGNhc2UgNjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCwgYTUpLCB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoaSA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xyXG4gICAgfVxyXG5cclxuICAgIGxpc3RlbmVycy5mbi5hcHBseShsaXN0ZW5lcnMuY29udGV4dCwgYXJncyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoXHJcbiAgICAgICwgajtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbaV0uZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XHJcblxyXG4gICAgICBzd2l0Y2ggKGxlbikge1xyXG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcclxuICAgICAgICBjYXNlIDI6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSk7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMik7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNDogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMiwgYTMpOyBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgaWYgKCFhcmdzKSBmb3IgKGogPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGogPCBsZW47IGorKykge1xyXG4gICAgICAgICAgICBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2ldLmNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cclxuICpcclxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXHJcbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxyXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXHJcbiAqIEBwdWJsaWNcclxuICovXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudCwgZm4sIGNvbnRleHQpIHtcclxuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCBmYWxzZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkIGEgb25lLXRpbWUgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxyXG4gKiBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cclxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKGV2ZW50LCBmbiwgY29udGV4dCkge1xyXG4gIHJldHVybiBhZGRMaXN0ZW5lcih0aGlzLCBldmVudCwgZm4sIGNvbnRleHQsIHRydWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgbGlzdGVuZXJzIG9mIGEgZ2l2ZW4gZXZlbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gT25seSByZW1vdmUgdGhlIGxpc3RlbmVycyB0aGF0IG1hdGNoIHRoaXMgZnVuY3Rpb24uXHJcbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgaGF2ZSB0aGlzIGNvbnRleHQuXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBPbmx5IHJlbW92ZSBvbmUtdGltZSBsaXN0ZW5lcnMuXHJcbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cclxuICogQHB1YmxpY1xyXG4gKi9cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKGV2ZW50LCBmbiwgY29udGV4dCwgb25jZSkge1xyXG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xyXG5cclxuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSByZXR1cm4gdGhpcztcclxuICBpZiAoIWZuKSB7XHJcbiAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZ0XTtcclxuXHJcbiAgaWYgKGxpc3RlbmVycy5mbikge1xyXG4gICAgaWYgKFxyXG4gICAgICBsaXN0ZW5lcnMuZm4gPT09IGZuICYmXHJcbiAgICAgICghb25jZSB8fCBsaXN0ZW5lcnMub25jZSkgJiZcclxuICAgICAgKCFjb250ZXh0IHx8IGxpc3RlbmVycy5jb250ZXh0ID09PSBjb250ZXh0KVxyXG4gICAgKSB7XHJcbiAgICAgIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGV2ZW50cyA9IFtdLCBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gfHxcclxuICAgICAgICAob25jZSAmJiAhbGlzdGVuZXJzW2ldLm9uY2UpIHx8XHJcbiAgICAgICAgKGNvbnRleHQgJiYgbGlzdGVuZXJzW2ldLmNvbnRleHQgIT09IGNvbnRleHQpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGV2ZW50cy5wdXNoKGxpc3RlbmVyc1tpXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL1xyXG4gICAgLy8gUmVzZXQgdGhlIGFycmF5LCBvciByZW1vdmUgaXQgY29tcGxldGVseSBpZiB3ZSBoYXZlIG5vIG1vcmUgbGlzdGVuZXJzLlxyXG4gICAgLy9cclxuICAgIGlmIChldmVudHMubGVuZ3RoKSB0aGlzLl9ldmVudHNbZXZ0XSA9IGV2ZW50cy5sZW5ndGggPT09IDEgPyBldmVudHNbMF0gOiBldmVudHM7XHJcbiAgICBlbHNlIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzLCBvciB0aG9zZSBvZiB0aGUgc3BlY2lmaWVkIGV2ZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gW2V2ZW50XSBUaGUgZXZlbnQgbmFtZS5cclxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyhldmVudCkge1xyXG4gIHZhciBldnQ7XHJcblxyXG4gIGlmIChldmVudCkge1xyXG4gICAgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcclxuICAgIGlmICh0aGlzLl9ldmVudHNbZXZ0XSkgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aGlzLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XHJcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8vXHJcbi8vIEFsaWFzIG1ldGhvZHMgbmFtZXMgYmVjYXVzZSBwZW9wbGUgcm9sbCBsaWtlIHRoYXQuXHJcbi8vXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XHJcblxyXG4vL1xyXG4vLyBFeHBvc2UgdGhlIHByZWZpeC5cclxuLy9cclxuRXZlbnRFbWl0dGVyLnByZWZpeGVkID0gcHJlZml4O1xyXG5cclxuLy9cclxuLy8gQWxsb3cgYEV2ZW50RW1pdHRlcmAgdG8gYmUgaW1wb3J0ZWQgYXMgbW9kdWxlIG5hbWVzcGFjZS5cclxuLy9cclxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcclxuXHJcbi8vXHJcbi8vIEV4cG9zZSB0aGUgbW9kdWxlLlxyXG4vL1xyXG5pZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBtb2R1bGUpIHtcclxuICBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcclxufVxyXG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgZ2xvYmFsLCBkZWZpbmUsIFN5c3RlbSwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG52YXIgX19leHRlbmRzO1xyXG52YXIgX19hc3NpZ247XHJcbnZhciBfX3Jlc3Q7XHJcbnZhciBfX2RlY29yYXRlO1xyXG52YXIgX19wYXJhbTtcclxudmFyIF9fbWV0YWRhdGE7XHJcbnZhciBfX2F3YWl0ZXI7XHJcbnZhciBfX2dlbmVyYXRvcjtcclxudmFyIF9fZXhwb3J0U3RhcjtcclxudmFyIF9fdmFsdWVzO1xyXG52YXIgX19yZWFkO1xyXG52YXIgX19zcHJlYWQ7XHJcbnZhciBfX3NwcmVhZEFycmF5cztcclxudmFyIF9fYXdhaXQ7XHJcbnZhciBfX2FzeW5jR2VuZXJhdG9yO1xyXG52YXIgX19hc3luY0RlbGVnYXRvcjtcclxudmFyIF9fYXN5bmNWYWx1ZXM7XHJcbnZhciBfX21ha2VUZW1wbGF0ZU9iamVjdDtcclxudmFyIF9faW1wb3J0U3RhcjtcclxudmFyIF9faW1wb3J0RGVmYXVsdDtcclxudmFyIF9fY2xhc3NQcml2YXRlRmllbGRHZXQ7XHJcbnZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0O1xyXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcclxuICAgIHZhciByb290ID0gdHlwZW9mIGdsb2JhbCA9PT0gXCJvYmplY3RcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiID8gc2VsZiA6IHR5cGVvZiB0aGlzID09PSBcIm9iamVjdFwiID8gdGhpcyA6IHt9O1xyXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICAgICAgZGVmaW5lKFwidHNsaWJcIiwgW1wiZXhwb3J0c1wiXSwgZnVuY3Rpb24gKGV4cG9ydHMpIHsgZmFjdG9yeShjcmVhdGVFeHBvcnRlcihyb290LCBjcmVhdGVFeHBvcnRlcihleHBvcnRzKSkpOyB9KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgZmFjdG9yeShjcmVhdGVFeHBvcnRlcihyb290LCBjcmVhdGVFeHBvcnRlcihtb2R1bGUuZXhwb3J0cykpKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGZhY3RvcnkoY3JlYXRlRXhwb3J0ZXIocm9vdCkpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRXhwb3J0ZXIoZXhwb3J0cywgcHJldmlvdXMpIHtcclxuICAgICAgICBpZiAoZXhwb3J0cyAhPT0gcm9vdCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGlkLCB2KSB7IHJldHVybiBleHBvcnRzW2lkXSA9IHByZXZpb3VzID8gcHJldmlvdXMoaWQsIHYpIDogdjsgfTtcclxuICAgIH1cclxufSlcclxuKGZ1bmN0aW9uIChleHBvcnRlcikge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcblxyXG4gICAgX19leHRlbmRzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcblxyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuXHJcbiAgICBfX3Jlc3QgPSBmdW5jdGlvbiAocywgZSkge1xyXG4gICAgICAgIHZhciB0ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIF9fZGVjb3JhdGUgPSBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgICAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgICAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG4gICAgfTtcclxuXHJcbiAgICBfX3BhcmFtID0gZnVuY3Rpb24gKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG4gICAgfTtcclxuXHJcbiAgICBfX21ldGFkYXRhID0gZnVuY3Rpb24gKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgX19hd2FpdGVyID0gZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9fZ2VuZXJhdG9yID0gZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgICAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX19leHBvcnRTdGFyID0gZnVuY3Rpb24gKG0sIGV4cG9ydHMpIHtcclxuICAgICAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbiAgICB9O1xyXG5cclxuICAgIF9fdmFsdWVzID0gZnVuY3Rpb24gKG8pIHtcclxuICAgICAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBfX3JlYWQgPSBmdW5jdGlvbiAobywgbikge1xyXG4gICAgICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgICAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXI7XHJcbiAgICB9O1xyXG5cclxuICAgIF9fc3ByZWFkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICAgICAgcmV0dXJuIGFyO1xyXG4gICAgfTtcclxuXHJcbiAgICBfX3NwcmVhZEFycmF5cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9O1xyXG5cclxuICAgIF9fYXdhaXQgPSBmdW5jdGlvbiAodikge1xyXG4gICAgICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG4gICAgfTtcclxuXHJcbiAgICBfX2FzeW5jR2VuZXJhdG9yID0gZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgICAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICAgICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgIH1cclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxuICAgIH07XHJcblxyXG4gICAgX19hc3luY0RlbGVnYXRvciA9IGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgdmFyIGksIHA7XHJcbiAgICAgICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgICAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9fYXN5bmNWYWx1ZXMgPSBmdW5jdGlvbiAobykge1xyXG4gICAgICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgICAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICAgICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxuICAgIH07XHJcblxyXG4gICAgX19tYWtlVGVtcGxhdGVPYmplY3QgPSBmdW5jdGlvbiAoY29va2VkLCByYXcpIHtcclxuICAgICAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgICAgIHJldHVybiBjb29rZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIF9faW1wb3J0U3RhciA9IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgICAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgICAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgICAgIHJlc3VsdFtcImRlZmF1bHRcIl0gPSBtb2Q7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcblxyXG4gICAgX19pbXBvcnREZWZhdWx0ID0gZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0ID0gZnVuY3Rpb24gKHJlY2VpdmVyLCBwcml2YXRlTWFwKSB7XHJcbiAgICAgICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbiAgICB9O1xyXG5cclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQgPSBmdW5jdGlvbiAocmVjZWl2ZXIsIHByaXZhdGVNYXAsIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydGVyKFwiX19leHRlbmRzXCIsIF9fZXh0ZW5kcyk7XHJcbiAgICBleHBvcnRlcihcIl9fYXNzaWduXCIsIF9fYXNzaWduKTtcclxuICAgIGV4cG9ydGVyKFwiX19yZXN0XCIsIF9fcmVzdCk7XHJcbiAgICBleHBvcnRlcihcIl9fZGVjb3JhdGVcIiwgX19kZWNvcmF0ZSk7XHJcbiAgICBleHBvcnRlcihcIl9fcGFyYW1cIiwgX19wYXJhbSk7XHJcbiAgICBleHBvcnRlcihcIl9fbWV0YWRhdGFcIiwgX19tZXRhZGF0YSk7XHJcbiAgICBleHBvcnRlcihcIl9fYXdhaXRlclwiLCBfX2F3YWl0ZXIpO1xyXG4gICAgZXhwb3J0ZXIoXCJfX2dlbmVyYXRvclwiLCBfX2dlbmVyYXRvcik7XHJcbiAgICBleHBvcnRlcihcIl9fZXhwb3J0U3RhclwiLCBfX2V4cG9ydFN0YXIpO1xyXG4gICAgZXhwb3J0ZXIoXCJfX3ZhbHVlc1wiLCBfX3ZhbHVlcyk7XHJcbiAgICBleHBvcnRlcihcIl9fcmVhZFwiLCBfX3JlYWQpO1xyXG4gICAgZXhwb3J0ZXIoXCJfX3NwcmVhZFwiLCBfX3NwcmVhZCk7XHJcbiAgICBleHBvcnRlcihcIl9fc3ByZWFkQXJyYXlzXCIsIF9fc3ByZWFkQXJyYXlzKTtcclxuICAgIGV4cG9ydGVyKFwiX19hd2FpdFwiLCBfX2F3YWl0KTtcclxuICAgIGV4cG9ydGVyKFwiX19hc3luY0dlbmVyYXRvclwiLCBfX2FzeW5jR2VuZXJhdG9yKTtcclxuICAgIGV4cG9ydGVyKFwiX19hc3luY0RlbGVnYXRvclwiLCBfX2FzeW5jRGVsZWdhdG9yKTtcclxuICAgIGV4cG9ydGVyKFwiX19hc3luY1ZhbHVlc1wiLCBfX2FzeW5jVmFsdWVzKTtcclxuICAgIGV4cG9ydGVyKFwiX19tYWtlVGVtcGxhdGVPYmplY3RcIiwgX19tYWtlVGVtcGxhdGVPYmplY3QpO1xyXG4gICAgZXhwb3J0ZXIoXCJfX2ltcG9ydFN0YXJcIiwgX19pbXBvcnRTdGFyKTtcclxuICAgIGV4cG9ydGVyKFwiX19pbXBvcnREZWZhdWx0XCIsIF9faW1wb3J0RGVmYXVsdCk7XHJcbiAgICBleHBvcnRlcihcIl9fY2xhc3NQcml2YXRlRmllbGRHZXRcIiwgX19jbGFzc1ByaXZhdGVGaWVsZEdldCk7XHJcbiAgICBleHBvcnRlcihcIl9fY2xhc3NQcml2YXRlRmllbGRTZXRcIiwgX19jbGFzc1ByaXZhdGVGaWVsZFNldCk7XHJcbn0pO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBzcGFjZWQtY29tbWVudCAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRyaXBsZS1zbGFzaC1yZWZlcmVuY2VcclxuaW1wb3J0IGVuZ2luZSBmcm9tIFwiZW5naW5lXCI7XHJcblxyXG5jb25zdCBfd2luZG93OiBhbnkgPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgY29uc3QgRSA9IGVuZ2luZTtcclxuZXhwb3J0IGNvbnN0IExvYWRlciA9IEUubG9hZGVyO1xyXG4vLyBleHBvcnQgY29uc3QgbG9hZGVyID0gRW5naW5lbmdpbmUuZW5naW5lSW5zdGFuY2VuZ2luZS5sb2FkZXI7XHJcbmV4cG9ydCBjb25zdCBUb3VjaE1hbmFnZXIgPSBlbmdpbmUuZ2FtZS5yb290VUlDYW1lcmEudG91Y2hNYW5hZ2VyO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV0dCBleHRlbmRzIGVuZ2luZS5FbnRpdHkgeyB9XHJcbmV4cG9ydCBjbGFzcyBQcmVmYWIgZXh0ZW5kcyBlbmdpbmUuUHJlZmFiIHsgfVxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NsYXNzLW5hbWUtY2FzaW5nXHJcbmV4cG9ydCBjbGFzcyB2MiBleHRlbmRzIGVuZ2luZS5WZWN0b3IyIHtcclxuICAgIC8vIHN0YXRpYyByZWFkb25seSBPTkUgPSB2Mi5jcmVhdGVGcm9tTnVtYmVyKDEsIDEpO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFVQID0gdjIuY3JlYXRlRnJvbU51bWJlcigwLCAxKTtcclxuICAgIHN0YXRpYyByZWFkb25seSBET1dOID0gdjIuY3JlYXRlRnJvbU51bWJlcigwLCAtMSk7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgTEVGVCA9IHYyLmNyZWF0ZUZyb21OdW1iZXIoLTEsIDApO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFJJR0hUID0gdjIuY3JlYXRlRnJvbU51bWJlcigxLCAwKTtcclxufVxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NsYXNzLW5hbWUtY2FzaW5nXHJcbmV4cG9ydCBjbGFzcyB2MyBleHRlbmRzIGVuZ2luZS5WZWN0b3IzIHtcclxuICAgIC8qXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgT05FID0gdjMuY3JlYXRlRnJvbU51bWJlcigxLCAxLCAxKTtcclxuICAgIHN0YXRpYyByZWFkb25seSBGT1JXQVJEID0gdjMuY3JlYXRlRnJvbU51bWJlcigwLCAwLCAtMSk7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgQkFDSyA9IHYzLmNyZWF0ZUZyb21OdW1iZXIoMCwgMCwgMSk7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgVVAgPSB2My5jcmVhdGVGcm9tTnVtYmVyKDAsIDEsIDApO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IERPV04gPSB2My5jcmVhdGVGcm9tTnVtYmVyKDAsIC0xLCAwKTtcclxuICAgIHN0YXRpYyByZWFkb25seSBMRUZUID0gdjMuY3JlYXRlRnJvbU51bWJlcigtMSwgMCwgMCk7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgUklHSFQgPSB2My5jcmVhdGVGcm9tTnVtYmVyKDEsIDAsIDApO1xyXG4gICAgKi9cclxufVxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NsYXNzLW5hbWUtY2FzaW5nXHJcbmV4cG9ydCBjbGFzcyB2NCBleHRlbmRzIGVuZ2luZS5WZWN0b3I0IHtcclxuICAgIC8qXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgT05FID0gdjQuY3JlYXRlRnJvbU51bWJlcigxLCAxLCAxLCAxKTtcclxuICAgICovXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIERlbGVnYXRlSGFuZGxlcjxTLCBFPiA9IChzZW5kZXI6IFMsIGV2ZW50QXJnczogRSkgPT4gYW55O1xyXG5leHBvcnQgaW50ZXJmYWNlIElLZXlib2FyZEV2ZW50UmVzIHsgdmFsdWU6IHN0cmluZzsgfVxyXG5cclxuZXhwb3J0IHR5cGUgQ29tcG9uZW50ID0gZW5naW5lLkNvbXBvbmVudDtcclxuZXhwb3J0IGNsYXNzIFBvaW50IGV4dGVuZHMgdjIgeyB9XHJcbmV4cG9ydCBjbGFzcyBRdWF0IGV4dGVuZHMgZW5naW5lLlF1YXRlcm5pb24geyB9XHJcbmV4cG9ydCBjbGFzcyBNNCBleHRlbmRzIGVuZ2luZS5NYXRyaXg0IHsgfVxyXG5leHBvcnQgY2xhc3MgU1AzRCBleHRlbmRzIGVuZ2luZS5FbnRpdHkgeyB9XHJcbi8vIGV4cG9ydCBjbGFzcyBUYiBleHRlbmRzIGVuZ2luZS5UcmFuc2Zvcm1CYXNlIHsgfVxyXG5leHBvcnQgY2xhc3MgVGYyRCBleHRlbmRzIGVuZ2luZS5UcmFuc2Zvcm0yRCB7IH1cclxuZXhwb3J0IGNsYXNzIFRmM0QgZXh0ZW5kcyBlbmdpbmUuVHJhbnNmb3JtM0QgeyB9XHJcbmV4cG9ydCBjbGFzcyBNYXNrIGV4dGVuZHMgZW5naW5lLlVJTWFzayB7IH1cclxuZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIGVuZ2luZS5VSUJ1dHRvbiB7IH1cclxuZXhwb3J0IGNsYXNzIFRvZ2dsZSBleHRlbmRzIGVuZ2luZS5VSVRvZ2dsZSB7IH1cclxuZXhwb3J0IGNsYXNzIFRvZ2dsZUdyb3VwIGV4dGVuZHMgZW5naW5lLlVJVG9nZ2xlR3JvdXAgeyB9XHJcbmV4cG9ydCBjbGFzcyBJbnB1dCBleHRlbmRzIGVuZ2luZS5VSVRleHRJbnB1dCB7IH1cclxuZXhwb3J0IGNsYXNzIFJpY2hUZXh0IGV4dGVuZHMgZW5naW5lLlVJUmljaFRleHQgeyB9XHJcbmV4cG9ydCBjbGFzcyBHYW1lIGV4dGVuZHMgZW5naW5lLkdhbWUgeyB9XHJcbmV4cG9ydCBjbGFzcyBNZXNoUmVuZGVyZXIgZXh0ZW5kcyBlbmdpbmUuTWVzaFJlbmRlcmVyIHsgfVxyXG5leHBvcnQgY2xhc3MgU2tpbm5lZE1lc2hSZW5kZXJlciBleHRlbmRzIGVuZ2luZS5Ta2lubmVkTWVzaFJlbmRlcmVyIHsgfVxyXG5leHBvcnQgY2xhc3MgTGluZVJlbmRlcmVyIGV4dGVuZHMgZW5naW5lLkxpbmVSZW5kZXJlciB7IH1cclxuZXhwb3J0IGNsYXNzIFBhcnRpY2xlIGV4dGVuZHMgZW5naW5lLlBhcnRpY2xlIHsgfVxyXG5leHBvcnQgY2xhc3MgU3BGcmFtZSBleHRlbmRzIGVuZ2luZS5TcHJpdGVGcmFtZSB7IH1cclxuZXhwb3J0IGNsYXNzIFRleDJEIGV4dGVuZHMgZW5naW5lLlRleHR1cmUyRCB7IH1cclxuZXhwb3J0IGNsYXNzIFJlY3QgZXh0ZW5kcyBlbmdpbmUuUmVjdCB7IH1cclxuZXhwb3J0IGNsYXNzIEFuaW1hdG9yIGV4dGVuZHMgZW5naW5lLkFuaW1hdG9yIHsgfVxyXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uQ2xpcCBleHRlbmRzIGVuZ2luZS5BbmltYXRpb25DbGlwIHsgfVxyXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uIGV4dGVuZHMgZW5naW5lLkFuaW1hdGlvbiB7fVxyXG5leHBvcnQgY2xhc3MgQW5pbWF0b3JDb250cm9sbGVyIGV4dGVuZHMgZW5naW5lLkFuaW1hdG9yQ29udHJvbGxlciB7IH1cclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsIGV4dGVuZHMgZW5naW5lLk1hdGVyaWFsIHsgfVxyXG5leHBvcnQgY2xhc3MgRWZmZWN0IGV4dGVuZHMgZW5naW5lLkVmZmVjdCB7IH1cclxuZXhwb3J0IGNsYXNzIEFuY2hvciBleHRlbmRzIGVuZ2luZS5VSUFuY2hvciB7IH1cclxuZXhwb3J0IGNsYXNzIFBvc3RQcm9jZXNzQ29tcG9uZW50IGV4dGVuZHMgZW5naW5lLlBvc3RQcm9jZXNzQ29tcG9uZW50IHsgfVxyXG4vLyBleHBvcnQgY2xhc3MgU2NlbmUgZXh0ZW5kcyBlbmdpbmUuU2NlbmUge31cclxuZXhwb3J0IGNsYXNzIENvbG9yIGV4dGVuZHMgZW5naW5lLkNvbG9yIHtcclxuICAgIHN0YXRpYyByZWFkb25seSBSRUQgPSBuZXcgQ29sb3IoMjU1LCAwLCAwLCAyNTUpO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEdSRUVOOiBDb2xvciA9IG5ldyBDb2xvcigwLCAyNTUsIDAsIDI1NSk7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgQkxVRTogQ29sb3IgPSBuZXcgQ29sb3IoMCwgMCwgMjU1LCAyNTUpO1xyXG4gICAgLy9zdGF0aWMgcmVhZG9ubHkgV0hJVEU6IENvbG9yID0gbmV3IENvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSk7XHJcbiAgICAvL3N0YXRpYyByZWFkb25seSBCTEFDSzogQ29sb3IgPSBuZXcgQ29sb3IoMCwgMCwgMCwgMjU1KTtcclxuICAgIHN0YXRpYyByZWFkb25seSBZRUxMT1c6IENvbG9yID0gbmV3IENvbG9yKDI1NSwgMjM1LCA0LCAyNTUpO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IENZQU46IENvbG9yID0gbmV3IENvbG9yKDAsIDI1NSwgMjU1LCAyNTUpO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IE1BR0VOVEE6IENvbG9yID0gbmV3IENvbG9yKDI1NSwgMCwgMjU1LCAyNTUpO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFBVUlBMRTogQ29sb3IgPSBuZXcgQ29sb3IoMjU1LCAxOTIsIDIwMywgMjU1KTtcclxuICAgIHN0YXRpYyByZWFkb25seSBPUkFOR0U6IENvbG9yID0gbmV3IENvbG9yKDI1NSwgOTcsIDAsIDI1NSk7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgR1JBWTogQ29sb3IgPSBuZXcgQ29sb3IoMTI4LCAxMjgsIDEyOCwgMjU1KTtcclxuICAgIHN0YXRpYyByZWFkb25seSBHUkVZOiBDb2xvciA9IG5ldyBDb2xvcigxMjgsIDEyOCwgMTI4LCAyNTUpO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IENMRUFSOiBDb2xvciA9IG5ldyBDb2xvcigwLCAwLCAwLCAwKTtcclxuXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgUVVBTElUWV9DT0xPUjogQ29sb3JbXSA9XHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBDb2xvci5XSElURSxcclxuICAgICAgICAgICAgbmV3IENvbG9yKDE5LCAyMzIsIDUwLCAyNTUpLFxyXG4gICAgICAgICAgICBuZXcgQ29sb3IoMTUsIDE3NCwgMjU1LCAyNTUpLFxyXG4gICAgICAgICAgICBuZXcgQ29sb3IoMjA0LCA1OSwgMjM5LCAyNTUpLFxyXG4gICAgICAgICAgICBuZXcgQ29sb3IoMjU1LCAxMjksIDAsIDI1NSksXHJcbiAgICAgICAgICAgIG5ldyBDb2xvcigyNTUsIDI1NSwgMiwgMjU1KVxyXG4gICAgICAgIF07XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFVJU3ByaXRlRmxpcFR5cGUge1xyXG4gICAgTm90aGluZyxcclxuICAgIEhvcml6b250YWxseSxcclxuICAgIFZlcnRpY2FsbHksXHJcbiAgICBCb3RoLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2NyaXB0IGV4dGVuZHMgZW5naW5lLlNjcmlwdCB7XHJcbiAgICBwdWJsaWMgZ2V0IG93bmVyKCk6IEV0dCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50aXR5O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBXZ3QgZXh0ZW5kcyBlbmdpbmUuVUlXaWRnZXQgeyB9XHJcbmV4cG9ydCBjbGFzcyBTcCBleHRlbmRzIGVuZ2luZS5VSVNwcml0ZSB7XHJcbiAgICBwdWJsaWMgYXRsYXNOYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc3ByaXRlTmFtZTogc3RyaW5nO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBGb250IGV4dGVuZHMgZW5naW5lLkZvbnQge31cclxuZXhwb3J0IGNsYXNzIExhYmVsIGV4dGVuZHMgZW5naW5lLlVJTGFiZWwgeyB9XHJcbmV4cG9ydCBjbGFzcyBTY3JvbGxWaWV3IGV4dGVuZHMgZW5naW5lLlVJU2Nyb2xsVmlldyB7IH1cclxuZXhwb3J0IGNsYXNzIEdyaWQgZXh0ZW5kcyBlbmdpbmUuVUlHcmlkIHsgfVxyXG5leHBvcnQgY2xhc3MgUmVuZGVyVGV4dHVyZSBleHRlbmRzIGVuZ2luZS5SZW5kZXJUZXh0dXJlIHsgfVxyXG5leHBvcnQgY2xhc3MgR3JhcGhpYyBleHRlbmRzIGVuZ2luZS5VSUdyYXBoaWMgeyB9XHJcblxyXG4vLyBleHBvcnQgY2xhc3MgQ2FudmFzIGV4dGVuZHMgZW5naW5lLlVJQ2FudmFzIHt9XHJcbmV4cG9ydCBjbGFzcyBDYW0gZXh0ZW5kcyBlbmdpbmUuQ2FtZXJhIHsgfVxyXG5leHBvcnQgY2xhc3MgRGwgZXh0ZW5kcyBlbmdpbmUuRGlyZWN0aW9uYWxMaWdodCB7IH1cclxuZXhwb3J0IGNsYXNzIFRvdWNoYWJsZSBleHRlbmRzIGVuZ2luZS5Ub3VjaGFibGUgeyB9XHJcbmV4cG9ydCBjbGFzcyBUb3VjaElucHV0Q29tcG9uZW50IGV4dGVuZHMgZW5naW5lLlRvdWNoSW5wdXRDb21wb25lbnQgeyB9XHJcbmV4cG9ydCBjbGFzcyBLZXlib2FyZElucHV0Q29tcG9uZW50IGV4dGVuZHMgZW5naW5lLktleWJvYXJkSW5wdXRDb21wb25lbnQgeyB9XHJcbmV4cG9ydCBjbGFzcyBSYXlDYXN0ZXIgZXh0ZW5kcyBlbmdpbmUuUmF5Y2FzdGVyIHsgfVxyXG5leHBvcnQgY2xhc3MgQ29sb3JVdGlscyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJnYlRvSGV4KHIsIGcsIGIpIHtcclxuICAgICAgICByZXR1cm4gXCIjXCIgKyAoKDEgPDwgMjQpICsgKHIgPDwgMTYpICsgKGcgPDwgOCkgKyBiKS50b1N0cmluZygxNikuc2xpY2UoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETyBpbXByb3ZlIC4uLlxyXG4gICAgcHVibGljIHN0YXRpYyBIZXhUb0NvbG9yKGhleDogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gaGV4IHNob3VsZCBiZWdpbiB3aXRoIFwiI1wiXHJcbiAgICAgICAgY29uc3QgaGV4U3RyID0gaGV4LnNsaWNlKDEpO1xyXG4gICAgICAgIGNvbnN0IHJlZCA9IGhleFN0ci5zbGljZSgwLCAyKTtcclxuICAgICAgICBjb25zdCBncmVlbiA9IGhleFN0ci5zbGljZSgyLCA0KTtcclxuICAgICAgICBjb25zdCBibHVlID0gaGV4U3RyLnNsaWNlKDQsIDYpO1xyXG4gICAgICAgIGxldCBhbHBoYSA9IFwiRkZcIjtcclxuICAgICAgICBpZiAoaGV4U3RyLmxlbmd0aCA+IDYpIHtcclxuICAgICAgICAgICAgYWxwaGEgPSBoZXhTdHIuc2xpY2UoNiwgOCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBQkdSIGZvcm1hdFxyXG4gICAgICAgIGNvbnN0IGhleE51bSA9IHBhcnNlSW50KGFscGhhICsgYmx1ZSArIGdyZWVuICsgcmVkLCAxNik7XHJcbiAgICAgICAgcmV0dXJuIGVuZ2luZS5Db2xvci5mcm9tSGV4KGhleE51bSk7XHJcblxyXG4gICAgICAgIC8vIE5PVEUgUkdCQSBmb3JtYXRcclxuICAgICAgICAvLyBsZXQgaGV4U3RyID0gaGV4LnNsaWNlKDEpO1xyXG4gICAgICAgIC8vIGlmIChoZXhTdHIubGVuZ3RoID4gNikge1xyXG4gICAgICAgIC8vICAgICBsZXQgaGV4TnVtID0gcGFyc2VJbnQoaGV4U3RyLCAxNik7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBlbmdpbmUuQ29sb3IuZnJvbUhleChoZXhOdW0pO1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIGxldCBoZXhOdW0gPSBwYXJzZUludChoZXhTdHIgKyBcIkZGXCIsIDE2KTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGVuZ2luZS5Db2xvci5mcm9tSGV4KGhleE51bSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgR3JheXNjYWxlKGNvbG9yOiBDb2xvcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKGNvbG9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwLjI5OSAqIGNvbG9yLnIgKyAwLjU4NyAqIGNvbG9yLmcgKyAwLjExNCAqIGNvbG9yLmI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFNjcmVlblBvc1RvR2xvYihzY3JlZW5Qb3M6IFBvaW50LCBjcmVhdGVOZXdQb2ludD86IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IHN0YWdlWCA9IHNjcmVlblBvcy54O1xyXG4gICAgY29uc3Qgc3RhZ2VZID0gc2NyZWVuUG9zLnk7XHJcblxyXG4gICAgbGV0IHJlc3VsdCA9IHNjcmVlblBvcztcclxuICAgIGlmIChjcmVhdGVOZXdQb2ludCkge1xyXG4gICAgICAgIHJlc3VsdCA9IG5ldyBQb2ludCgpO1xyXG4gICAgfVxyXG4gICAgcmVzdWx0LnggPSBzdGFnZVg7XHJcbiAgICByZXN1bHQueSA9IHN0YWdlWTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBGaW5kQ2hpbGRCeVBhdGgocm9vdDpUYiwgcGF0aDpzdHJpbmcpOlRie1xyXG4vLyAgICAgaWYocGF0aCA9PSBcIi5cIikgcmV0dXJuIHJvb3Q7XHJcblxyXG4vLyAgICAgbGV0IG5hbWVzID0gcGF0aC5zcGxpdChcIi9cIik7XHJcbi8vICAgICBsZXQgbm9kZSA9IHJvb3Q7XHJcbi8vICAgICBuYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xyXG4vLyAgICAgICAgIGlmKCFub2RlKSByZXR1cm47XHJcblxyXG4vLyAgICAgICAgIG5vZGUgPSBub2RlbmdpbmUuZmluZENoaWxkQnlOYW1lKG5hbWUpO1xyXG4vLyAgICAgfSk7XHJcblxyXG4vLyAgICAgcmV0dXJuIG5vZGU7XHJcbi8vIH1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wb25lbnRzSW5jbHVkZUNoaWxkKG5vZGU6IEV0dCwgY2xhczogYW55KTogQXJyYXk8YW55PiB7XHJcbiAgICBpZiAoIW5vZGUpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBub2RlLmdldENvbXBvbmVudHMoY2xhcyk7XHJcblxyXG4gICAgaWYgKGNvbXBvbmVudHMpIHtcclxuICAgICAgICBjb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChjb21wb25lbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChub2RlLnRyYW5zZm9ybSAmJiBub2RlLnRyYW5zZm9ybS5jaGlsZHJlbkNvdW50ID4gMCkge1xyXG4gICAgICAgIG5vZGUudHJhbnNmb3JtLnRyYXZlbENoaWxkKChjaGlsZDogVGYzRCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQgIT09IG5vZGUudHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZENvbXBvbmVudHMgPSBnZXRDb21wb25lbnRzSW5jbHVkZUNoaWxkKGNoaWxkLmVudGl0eSwgY2xhcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRDb21wb25lbnRzICYmIGNoaWxkQ29tcG9uZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZENvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcG9uZW50c0luY2x1ZGVDaGlsZDJEKG5vZGU6IEV0dCwgY2xhczogYW55KTogQXJyYXk8YW55PiB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuICAgIGlmICghbm9kZSkgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICBjb25zdCBjb21wb25lbnRzID0gbm9kZS5nZXRDb21wb25lbnRzKGNsYXMpO1xyXG5cclxuICAgIGlmIChjb21wb25lbnRzKSB7XHJcbiAgICAgICAgY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQpID0+IHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goY29tcG9uZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobm9kZS50cmFuc2Zvcm0yRCAmJiBub2RlLnRyYW5zZm9ybTJELmNoaWxkcmVuQ291bnQgPiAwKSB7XHJcbiAgICAgICAgbm9kZS50cmFuc2Zvcm0yRC50cmF2ZWxDaGlsZCgoY2hpbGQ6IFRmMkQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkICE9PSBub2RlLnRyYW5zZm9ybTJEKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZENvbXBvbmVudHMgPSBnZXRDb21wb25lbnRzSW5jbHVkZUNoaWxkMkQoY2hpbGQuZW50aXR5LCBjbGFzKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZENvbXBvbmVudHMgJiYgY2hpbGRDb21wb25lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkQ29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29tcG9uZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wb25lbnRJblBhcmVudChub2RlOiBFdHQsIGNsYXM6IGFueSkge1xyXG4gICAgY29uc3QgY29tcG9uZW50ID0gbm9kZS5nZXRDb21wb25lbnQoY2xhcyk7XHJcblxyXG4gICAgaWYgKGNvbXBvbmVudCkge1xyXG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IG5vZGUudHJhbnNmb3JtLnBhcmVudDtcclxuICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRDb21wb25lbnRJblBhcmVudChwYXJlbnQuZW50aXR5LCBjbGFzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMb29wSW5kaWNhdG9yIHtcclxuICAgIHB1YmxpYyB0OiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlvIDlkK/kuIDkuKrlvqrnjq9cclxuICogQHBhcmFtIGNhbGxlciDosIPnlKjogIVcclxuICogQHBhcmFtIG1ldGhvZCDmiafooYzmlrnms5VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBTdGFydExvb3AoY2FsbGVyOiBhbnksIG1ldGhvZDogRnVuY3Rpb24pOiBMb29wSW5kaWNhdG9yIHtcclxuICAgIGNvbnN0IGxvY2FsQ2FsbGVyID0gY2FsbGVyO1xyXG4gICAgY29uc3QgaW5kaWNhdG9yOiBMb29wSW5kaWNhdG9yID0gbmV3IExvb3BJbmRpY2F0b3IoKTtcclxuICAgIGNvbnN0IGxvb3BGdW5jID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlua2V5ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wRnVuYyk7IC8vICDov5nkuIDlj6XopoHmlL7lnKjlm57osIPkuYvliY3vvIzlkKbliJnkuI3og73lj5bmtojlvqrnjq9cclxuICAgICAgICBpbmRpY2F0b3IudCA9IGlua2V5O1xyXG4gICAgICAgIG1ldGhvZC5hcHBseShsb2NhbENhbGxlcik7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb3V0S2V5ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wRnVuYyk7XHJcbiAgICBpbmRpY2F0b3IudCA9IG91dEtleTtcclxuICAgIHJldHVybiBpbmRpY2F0b3I7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnu5PmnZ/kuIDkuKrlvqrnjq9cclxuICogQHBhcmFtIGxvb3BJbmRpY2F0b3Ig55SxU3RhcnRMb29w5pa55rOV6L+U5Zue55qE5b6q546v5Y+l5p+EXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gRW5kTG9vcChsb29wSW5kaWNhdG9yOiBMb29wSW5kaWNhdG9yKSB7XHJcbiAgICBpZiAobG9vcEluZGljYXRvcikge1xyXG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShsb29wSW5kaWNhdG9yLnQpO1xyXG4gICAgICAgIGxvb3BJbmRpY2F0b3IgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgQmFzZVVybDogc3RyaW5nO1xyXG4iLCJjb25zdCBDT0xMSURFX1NUQVRFID0ge1xyXG4gIE5POiAwLCAvLyDmsqHnorDmkp5cclxuICBJTlRFUlNFQ1Q6IDEsIC8vIOebuOS6pFxyXG4gIElOU0lERTogMiwgLy8g5Zyo5YaFXHJcbn07XHJcbmNvbnN0IGlzSW50ZXJzZWN0ZWQgPSAoYXJyMSwgYXJyMikgPT4ge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyMS5sZW5ndGg7IGkrKykge1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBhcnIyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIGlmIChhcnIxW2ldID09PSBhcnIyW2pdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuY2xhc3MgQ29sbGlkZXIge1xyXG4gIHVwZGF0ZU51bSA9IDA7XHJcbiAgc3RhdGUgPSB7XHJcbiAgICB4OiBDT0xMSURFX1NUQVRFLk5PLFxyXG4gICAgeTogQ09MTElERV9TVEFURS5OTyxcclxuICAgIHo6IENPTExJREVfU1RBVEUuTk8sXHJcbiAgfTtcclxuXHJcbiAgY29tcE1hcCA9IG5ldyBNYXAoKTsgLy8gY29tcDogW2dyb3VwMSwgZ3JvdXAyLCAuLi5dXHJcbiAgZ3JvdXBQYWlyID0gW107XHJcbiAgICBcclxuICBvblVwZGF0ZShkdCkge1xyXG4gICAgdGhpcy51cGRhdGVOdW0rKztcclxuXHJcbiAgICBpZiAodGhpcy51cGRhdGVOdW0gJSAzID09PSAwKSB7IC8vIOiKgua1gVxyXG4gICAgICB0aGlzLl93YWxrQ29tcCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgd2F0Y2hHcm91cChncm91cDEsIGdyb3VwMikge1xyXG4gICAgdGhpcy5ncm91cFBhaXIucHVzaChbZ3JvdXAxLCBncm91cDJdKTtcclxuICB9XHJcblxyXG4gIHdhdGNoKGNvbXAsIGdyb3VwcyA9IFtdKSB7XHJcbiAgICBjb25zdCBnID0gdGhpcy5jb21wTWFwLmdldChjb21wKTtcclxuICAgIGlmIChnKSB7XHJcbiAgICAgIGdyb3VwcyA9IGdyb3Vwcy5jb25jYXQoZyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbXBNYXAuc2V0KGNvbXAsIGdyb3Vwcyk7XHJcbiAgfVxyXG5cclxuICB1bndhdGNoKGNvbXApIHtcclxuICAgIHRoaXMuY29tcE1hcC5kZWxldGUoY29tcCk7XHJcbiAgfVxyXG5cclxuICBfd2Fsa0NvbXAoKSB7XHJcbiAgICBjb25zdCB0cmlnZ2VyQ29tcHMgPSBbXTtcclxuICAgIHRoaXMuZ3JvdXBQYWlyLmZvckVhY2goKHBhaXIpID0+IHtcclxuICAgICAgY29uc3QgZzEgPSBwYWlyWzBdO1xyXG4gICAgICBjb25zdCBnMiA9IHBhaXJbMV07XHJcbiAgICAgIHRoaXMuY29tcE1hcC5mb3JFYWNoKChncm91cHMxLCBjb21wMSkgPT4ge1xyXG4gICAgICAgIGlmICghY29tcDEpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdGhpcy5jb21wTWFwLmZvckVhY2goKGdyb3VwczIsIGNvbXAyKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWNvbXAyKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgaWYgKGNvbXAxID09PSBjb21wMikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIC8vIOWcqGdyb3VwUGFpcuWGheeahOaJjeeisOaSnlxyXG4gICAgICAgICAgICAoZ3JvdXBzMS5pbmRleE9mKGcxKSA+IC0xICYmIGdyb3VwczIuaW5kZXhPZihnMikgPiAtMSlcclxuICAgICAgICAgICAgfHxcclxuICAgICAgICAgICAgKGdyb3VwczEuaW5kZXhPZihnMikgPiAtMSAmJiBncm91cHMyLmluZGV4T2YoZzEpID4gLTEpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ29sbGlkZWQoY29tcDEsIGNvbXAyKSkge1xyXG4gICAgICAgICAgICAgIHRyaWdnZXJDb21wcy5wdXNoKFtjb21wMSwgY29tcDJdKTsgLy8g5Y+q6Kem5Y+RY29tcDEub25Db2xsaWRl5Zue6LCD77yMY29tcDLnmoTkvJrlnKjlkI7nu63pgY3ljobkuK3lpITnkIbliLBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdHJpZ2dlckNvbXBzLmZvckVhY2goKGNvbXBzKSA9PiB7XHJcbiAgICAgIGNvbXBzWzBdLm9uQ29sbGlkZSAmJiBjb21wc1swXS5vbkNvbGxpZGUoY29tcHNbMV0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfaXNDb2xsaWRlZChjb21wMSwgY29tcDIpIHtcclxuICAgIGNvbnN0IHAxID0gY29tcDEuZW50aXR5LnRyYW5zZm9ybS53b3JsZFBvc2l0aW9uO1xyXG4gICAgY29uc3QgcDIgPSBjb21wMi5lbnRpdHkudHJhbnNmb3JtLndvcmxkUG9zaXRpb247XHJcbiAgICBjb25zdCBiMSA9IGNvbXAxLmJvdW5kO1xyXG4gICAgY29uc3QgYjIgPSBjb21wMi5ib3VuZDtcclxuXHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICB4OiBDT0xMSURFX1NUQVRFLk5PLFxyXG4gICAgICB5OiBDT0xMSURFX1NUQVRFLk5PLFxyXG4gICAgICB6OiBDT0xMSURFX1NUQVRFLk5PLFxyXG4gICAgfTtcclxuICAgIGZvciAobGV0IGsgaW4gdGhpcy5zdGF0ZSkge1xyXG4gICAgICBjb25zdCBmcm9udDEgPSBwMVtrXSArIGIxW2tdOyAvLyBw54K555qE5YmN6L6555WMXHJcbiAgICAgIGNvbnN0IGJhY2sxID0gcDFba10gLSBiMVtrXTsgLy8gcOeCueeahOWQjui+ueeVjFxyXG4gICAgICBjb25zdCBmcm9udDIgPSBwMltrXSArIGIyW2tdO1xyXG4gICAgICBjb25zdCBiYWNrMiA9IHAyW2tdIC0gYjJba107XHJcbiAgICAgIGlmIChcclxuICAgICAgICAoZnJvbnQxID49IGJhY2syICYmIGJhY2sxIDwgYmFjazIpIHx8XHJcbiAgICAgICAgKGJhY2sxIDw9IGZyb250MiAmJiBmcm9udDEgPiBmcm9udDIpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMuc3RhdGVba10gPSBDT0xMSURFX1NUQVRFLklOVEVSU0VDVDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIGZyb250MSA8PSBmcm9udDIgJiZcclxuICAgICAgICBiYWNrMSA+PSBiYWNrMlxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLnN0YXRlW2tdID0gQ09MTElERV9TVEFURS5JTlNJREU7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGlmICh0aGlzLnN0YXRlW2tdID09PSBDT0xMSURFX1NUQVRFLk5PKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyDkuInkuKrovbTpg73mnInnorDmkp7miY3nrpfnorDmkp7vvIzoi6XlhbbkuK3kuIDkuKrmsqHnorDvvIzpgqPnm7TmjqXov5Tlm57vvIzoioLnuqborqHnrpdcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKHN0YXRlKTtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlLnggJiYgdGhpcy5zdGF0ZS55ICYmIHRoaXMuc3RhdGUuejsgLy8g5LiJ5Liq6L206YO95pyJ56Kw5pKe5omN566X56Kw5pKeXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgQ29sbGlkZXIoKTsiLCJkZWNsYXJlIGNvbnN0IEdhbWVHbG9iYWw6IGFueTtcclxuXHJcbmNsYXNzIERhdGFDZW50ZXIge1xyXG4gIHBsYXllckVudGl0eSA9IG51bGw7XHJcbiAgcGxheWVyQ29tcCA9IG51bGw7XHJcbiAgY2FtZXJhQ29tcCA9IG51bGw7XHJcbiAgd29ybGRFbnRpdHkgPSBudWxsO1xyXG59ICAgXHJcbiBcclxuR2FtZUdsb2JhbC5EYXRhQ2VudGVyID0gbmV3IERhdGFDZW50ZXIoKTtcclxuZXhwb3J0IGRlZmF1bHQgR2FtZUdsb2JhbC5EYXRhQ2VudGVyOyIsImltcG9ydCAqIGFzIEV2ZW50RW1pdHRlciBmcm9tICdldmVudGVtaXR0ZXIzJztcclxuXHJcbmNsYXNzIEV2ZW50RW1pdHRlckNlbnRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcbiAgcHVibGljIFRPVUNIX01PVkUgPSAnVE9VQ0hfTU9WRSc7XHJcbiAgcHVibGljIFNUQVJUX1NIT09UID0gJ1NUQVJUX1NIT09UJztcclxuICBwdWJsaWMgRU5EX1NIT09UID0gJ0VORF9TSE9PVCc7XHJcbiAgXHJcbiAgcHVibGljIEFERF9QTEFZRVIgPSAnQUREX1BMQVlFUic7XHJcbiAgcHVibGljIEFERF9FTkVNWSA9ICdBRERfRU5FTVknO1xyXG4gIHB1YmxpYyBNT1ZFX1BMQVlFUiA9ICdNT1ZFX1BMQVlFUic7XHJcbiAgcHVibGljIEhVUlRfUExBWUVSID0gJ0hVUlRfUExBWUVSJztcclxuICBwdWJsaWMgR0VUX1NDT1JFID0gJ0dFVF9TQ09SRSc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGNvbnNvbGUubG9nKCdlZScpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEV2ZW50Q2VudGVyID0gbmV3IEV2ZW50RW1pdHRlckNlbnRlcigpO1xyXG5leHBvcnQgZGVmYXVsdCBFdmVudENlbnRlcjsiLCIvLyBpbXBvcnQgZW5naW5lIGZyb20gJ2VuZ2luZSc7XHJcbmltcG9ydCBlbmdpbmUgZnJvbSBcImVuZ2luZVwiO1xyXG5kZWNsYXJlIHR5cGUgVmVjdG9yMiA9IGltcG9ydChcImVuZ2luZS9lbmdpbmVcIikuVmVjdG9yMjtcclxuZGVjbGFyZSB0eXBlIFRvdWNoSW5wdXRFdmVudCA9IGltcG9ydChcImVuZ2luZS9pbnB1dC90b3VjaFwiKS5Ub3VjaElucHV0RXZlbnQ7XHJcbmRlY2xhcmUgdHlwZSBFbnRpdHkyRCA9IGltcG9ydChcImVuZ2luZS9zY2VuZS9zY2VuZVwiKS5FbnRpdHkyRDtcclxuaW1wb3J0IEV2ZW50Q2VudGVyIGZyb20gXCIuLi9jb21tb25zL2V2ZW50Q2VudGVyLmpzXCI7XHJcblxyXG5jb25zdCBTQ1JFRU5fV0lEVEggPSBlbmdpbmUuZGV2aWNlLnNjcmVlbldpZHRoO1xyXG5jb25zdCBTQ1JFRU5fSEVJR0hUID0gZW5naW5lLmRldmljZS5zY3JlZW5IZWlnaHQ7XHJcbmNvbnN0IEdBTUVfV0lEVEggPSBlbmdpbmUuYWRhcHRhdGlvbi5mcmFtZVdpZHRoO1xyXG5jb25zdCBHQU1FX0hFSUdIVCA9IGVuZ2luZS5hZGFwdGF0aW9uLmZyYW1lSGVpZ2h0O1xyXG5cclxuQGVuZ2luZS5kZWNvcmF0b3JzLnNlcmlhbGl6ZShcIkQyTW92ZVwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEMk1vdmUgZXh0ZW5kcyBlbmdpbmUuU2NyaXB0IHtcclxuICBwdWJsaWMgYnV0dG9uUG9zID0gZW5naW5lLlZlY3RvcjIuWkVSTy5jbG9uZSgpOyAvLyDmjInpkq7nmoRjYW52YXPlnZDmoIdcclxuICBwdWJsaWMgYnV0dG9uUmFkaXVzID0geyB4OiAwLCB5OiAwIH07XHJcbiAgcHVibGljIGRpcmVjdGlvbiA9IGVuZ2luZS5WZWN0b3IyLlpFUk8uY2xvbmUoKTtcclxuICBwdWJsaWMgdWlzcHJpdGUgPSBudWxsO1xyXG4gIHB1YmxpYyB1aUlucHV0OiBlbmdpbmUuVG91Y2hJbnB1dENvbXBvbmVudCB8IG51bGwgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZW50aXR5OiBFbnRpdHkyRCkge1xyXG4gICAgc3VwZXIoZW50aXR5KTtcclxuICAgIHRoaXMub25Ub3VjaFN0YXJ0ID0gdGhpcy5vblRvdWNoU3RhcnQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25Ub3VjaEVudGVyID0gdGhpcy5vblRvdWNoRW50ZXIuYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25Ub3VjaE1vdmUgPSB0aGlzLm9uVG91Y2hNb3ZlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uVG91Y2hFbmQgPSB0aGlzLm9uVG91Y2hFbmQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25Ub3VjaExlYXZlID0gdGhpcy5vblRvdWNoTGVhdmUuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkF3YWtlKCkge1xyXG4gICAgdGhpcy51aXNwcml0ZSA9IHRoaXMuZW50aXR5LmdldENvbXBvbmVudChlbmdpbmUuVUlTcHJpdGUpO1xyXG4gICAgdGhpcy5idXR0b25Qb3MgPSB0aGlzLmVudGl0eS50cmFuc2Zvcm0yRC53b3JsZFBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB0aGlzLmJ1dHRvblJhZGl1cyA9IHsgeDogdGhpcy5lbnRpdHkudHJhbnNmb3JtMkQuc2l6ZS54IC8gMiwgeTogdGhpcy5lbnRpdHkudHJhbnNmb3JtMkQuc2l6ZS55IC8gMiB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgdGhpcy51aUlucHV0ID0gdGhpcy5nZXRDb21wb25lbnQ8ZW5naW5lLlRvdWNoSW5wdXRDb21wb25lbnQ+KGVuZ2luZS5Ub3VjaElucHV0Q29tcG9uZW50KTtcclxuICAgIGlmICh0aGlzLnVpSW5wdXQpIHtcclxuICAgICAgdGhpcy51aUlucHV0Lm9uVG91Y2hTdGFydC5hZGQodGhpcy5vblRvdWNoU3RhcnQpO1xyXG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaEVudGVyLmFkZCh0aGlzLm9uVG91Y2hFbnRlcik7XHJcbiAgICAgIHRoaXMudWlJbnB1dC5vblRvdWNoRW5kLmFkZCh0aGlzLm9uVG91Y2hFbmQpO1xyXG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaExlYXZlLmFkZCh0aGlzLm9uVG91Y2hMZWF2ZSk7XHJcbiAgICAgIHRoaXMudWlJbnB1dC5vblRvdWNoTW92ZS5hZGQodGhpcy5vblRvdWNoTW92ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudWlJbnB1dCkge1xyXG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaFN0YXJ0LnJlbW92ZSh0aGlzLm9uVG91Y2hTdGFydCk7XHJcbiAgICAgIHRoaXMudWlJbnB1dC5vblRvdWNoRW50ZXIucmVtb3ZlKHRoaXMub25Ub3VjaEVudGVyKTtcclxuICAgICAgdGhpcy51aUlucHV0Lm9uVG91Y2hFbmQucmVtb3ZlKHRoaXMub25Ub3VjaEVuZCk7XHJcbiAgICAgIHRoaXMudWlJbnB1dC5vblRvdWNoTGVhdmUucmVtb3ZlKHRoaXMub25Ub3VjaExlYXZlKTtcclxuICAgICAgdGhpcy51aUlucHV0Lm9uVG91Y2hNb3ZlLnJlbW92ZSh0aGlzLm9uVG91Y2hNb3ZlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblRvdWNoU3RhcnQoczogZW5naW5lLlRvdWNoSW5wdXRDb21wb25lbnQsIGU6IFRvdWNoSW5wdXRFdmVudCkge1xyXG4gICAgdGhpcy5zZXRBbHBoYSgyMDApO1xyXG4gICAgdGhpcy5oYW5kbGVUb3VjaChlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblRvdWNoRW50ZXIoczogZW5naW5lLlRvdWNoSW5wdXRDb21wb25lbnQsIGU6IFRvdWNoSW5wdXRFdmVudCkge1xyXG4gICAgdGhpcy5zZXRBbHBoYSgyMDApO1xyXG4gICAgdGhpcy5oYW5kbGVUb3VjaChlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblRvdWNoTW92ZShzOiBlbmdpbmUuVG91Y2hJbnB1dENvbXBvbmVudCwgZTogVG91Y2hJbnB1dEV2ZW50KSB7XHJcbiAgICB0aGlzLmhhbmRsZVRvdWNoKGUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVG91Y2hMZWF2ZShzOiBlbmdpbmUuVG91Y2hJbnB1dENvbXBvbmVudCwgZTogVG91Y2hJbnB1dEV2ZW50KSB7XHJcbiAgICB0aGlzLnNldEFscGhhKDI1NSk7XHJcbiAgICB0aGlzLmVtaXREaXJlY3Rpb24oeyB4OiAwLCB5OiAwLCB6OiAwIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVG91Y2hFbmQoczogZW5naW5lLlRvdWNoSW5wdXRDb21wb25lbnQsIGU6IFRvdWNoSW5wdXRFdmVudCkge1xyXG4gICAgdGhpcy5zZXRBbHBoYSgyNTUpO1xyXG4gICAgdGhpcy5lbWl0RGlyZWN0aW9uKHsgeDogMCwgeTogMCwgejogMCB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYW5kbGVUb3VjaChlOiBUb3VjaElucHV0RXZlbnQpIHtcclxuICAgIHRoaXMuZGlyZWN0aW9uLnggPSBlLnRvdWNoZXNbMF0ucG9zaXRpb24ueCAvIHRoaXMuYnV0dG9uUmFkaXVzLng7XHJcbiAgICB0aGlzLmRpcmVjdGlvbi55ID0gZS50b3VjaGVzWzBdLnBvc2l0aW9uLnkgLyB0aGlzLmJ1dHRvblJhZGl1cy55O1xyXG4gICAgdGhpcy5lbWl0RGlyZWN0aW9uKHsgeDogdGhpcy5kaXJlY3Rpb24ueCwgeTogMCwgejogLXRoaXMuZGlyZWN0aW9uLnkgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0QWxwaGEodmFsOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IGMgPSB0aGlzLnVpc3ByaXRlLmNvbG9yLmNsb25lKCk7XHJcbiAgICBjLmEgPSB2YWw7XHJcbiAgICB0aGlzLnVpc3ByaXRlLmNvbG9yID0gYztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBlbWl0RGlyZWN0aW9uKGRpcmVjdGlvbjogeyB4OiBudW1iZXI7IHk6IG51bWJlcjsgejogbnVtYmVyOyB9KTogdm9pZCB7XHJcbiAgICBFdmVudENlbnRlci5lbWl0KEV2ZW50Q2VudGVyLlRPVUNIX01PVkUsIGRpcmVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2FtZVBvc1RvU2NyZWVuKHBvczogVmVjdG9yMik6IFZlY3RvcjIge1xyXG4gICAgY29uc3QgcCA9IGVuZ2luZS5WZWN0b3IyLlpFUk8uY2xvbmUoKTtcclxuICAgIHAueCA9IFNDUkVFTl9XSURUSCAvIEdBTUVfV0lEVEggKiBwb3MueDtcclxuICAgIHAueSA9IFNDUkVFTl9IRUlHSFQgLyBHQU1FX0hFSUdIVCAqIHBvcy55O1xyXG4gICAgcmV0dXJuIHA7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2FudmFzUG9zVG9TY3JlZW4ocG9zKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhwb3MpO1xyXG4gICAgcG9zLnggPSBwb3MueCAtIFNDUkVFTl9XSURUSCAvIDI7XHJcbiAgICBwb3MueSA9IC1wb3MueSArIFNDUkVFTl9IRUlHSFQgLyAyO1xyXG4gICAgcmV0dXJuIHBvcztcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IGVuZ2luZSBmcm9tIFwiZW5naW5lXCI7XHJcbmltcG9ydCBFdmVudENlbnRlciBmcm9tIFwiLi4vY29tbW9ucy9ldmVudENlbnRlci5qc1wiO1xyXG5cclxuQGVuZ2luZS5kZWNvcmF0b3JzLnNlcmlhbGl6ZShcIkQyU2NvcmVcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRDJTY29yZSBleHRlbmRzIGVuZ2luZS5TY3JpcHQge1xyXG4gIHB1YmxpYyBzY29yZSA9IDA7XHJcbiAgcHVibGljIHVpbGFiZWwgPSBudWxsO1xyXG5cclxuICBwdWJsaWMgb25Bd2FrZSgpIHtcclxuICAgIHRoaXMudWlsYWJlbCA9IHRoaXMuZW50aXR5LmdldENvbXBvbmVudChlbmdpbmUuVUlMYWJlbCk7XHJcbiAgICB0aGlzLnVpbGFiZWwudGV4dCA9IFwiMDAwXCI7XHJcblxyXG4gICAgRXZlbnRDZW50ZXIub24oRXZlbnRDZW50ZXIuR0VUX1NDT1JFLCAoZ2V0U2NvcmUpID0+IHtcclxuICAgICAgdGhpcy5zY29yZSArPSBOdW1iZXIoZ2V0U2NvcmUpO1xyXG4gICAgICBpZiAodGhpcy5zY29yZSA8IDApIHtcclxuICAgICAgICB0aGlzLnNjb3JlID0gMDtcclxuICAgICAgfVxyXG4gICAgICBsZXQgc3RyID0gdGhpcy5zY29yZSArIFwiXCI7XHJcbiAgICAgIGlmICh0aGlzLnNjb3JlIDwgMTApIHtcclxuICAgICAgICBzdHIgPSBcIjBcIiArIHN0cjtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zY29yZSA8IDEwMCkge1xyXG4gICAgICAgIHN0ciA9IFwiMFwiICsgc3RyO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMudWlsYWJlbC50ZXh0ID0gc3RyO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBlbmdpbmUgZnJvbSBcImVuZ2luZVwiO1xyXG5kZWNsYXJlIHR5cGUgVG91Y2hJbnB1dEV2ZW50ID0gaW1wb3J0KFwiZW5naW5lL2lucHV0L3RvdWNoXCIpLlRvdWNoSW5wdXRFdmVudDtcclxuZGVjbGFyZSB0eXBlIEVudGl0eTJEID0gaW1wb3J0KFwiZW5naW5lL3NjZW5lL3NjZW5lXCIpLkVudGl0eTJEO1xyXG5pbXBvcnQgRUMgZnJvbSBcIi4uL2NvbW1vbnMvZXZlbnRDZW50ZXIuanNcIjtcclxuXHJcbkBlbmdpbmUuZGVjb3JhdG9ycy5zZXJpYWxpemUoXCJEMlNob290XCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEQyU2hvb3QgZXh0ZW5kcyBlbmdpbmUuU2NyaXB0IHtcclxuICBwdWJsaWMgdWlzcHJpdGU6IGVuZ2luZS5VSVNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG4gIHB1YmxpYyB1aUlucHV0OiBlbmdpbmUuVG91Y2hJbnB1dENvbXBvbmVudCB8IG51bGwgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZW50aXR5OiBFbnRpdHkyRCkge1xyXG4gICAgc3VwZXIoZW50aXR5KTtcclxuICAgIHRoaXMub25Ub3VjaFN0YXJ0ID0gdGhpcy5vblRvdWNoU3RhcnQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25Ub3VjaEVudGVyID0gdGhpcy5vblRvdWNoRW50ZXIuYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25Ub3VjaEVuZCA9IHRoaXMub25Ub3VjaEVuZC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vblRvdWNoTGVhdmUgPSB0aGlzLm9uVG91Y2hMZWF2ZS5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQXdha2UoKSB7XHJcbiAgICB0aGlzLnVpc3ByaXRlID0gdGhpcy5lbnRpdHkuZ2V0Q29tcG9uZW50PGVuZ2luZS5VSVNwcml0ZT4oZW5naW5lLlVJU3ByaXRlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgIHRoaXMudWlJbnB1dCA9IHRoaXMuZ2V0Q29tcG9uZW50PGVuZ2luZS5Ub3VjaElucHV0Q29tcG9uZW50PihlbmdpbmUuVG91Y2hJbnB1dENvbXBvbmVudCk7XHJcbiAgICBpZiAodGhpcy51aUlucHV0KSB7XHJcbiAgICAgIHRoaXMudWlJbnB1dC5vblRvdWNoU3RhcnQuYWRkKHRoaXMub25Ub3VjaFN0YXJ0KTtcclxuICAgICAgdGhpcy51aUlucHV0Lm9uVG91Y2hFbnRlci5hZGQodGhpcy5vblRvdWNoRW50ZXIpO1xyXG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaEVuZC5hZGQodGhpcy5vblRvdWNoRW5kKTtcclxuICAgICAgdGhpcy51aUlucHV0Lm9uVG91Y2hMZWF2ZS5hZGQodGhpcy5vblRvdWNoTGVhdmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnVpSW5wdXQpIHtcclxuICAgICAgdGhpcy51aUlucHV0Lm9uVG91Y2hTdGFydC5yZW1vdmUodGhpcy5vblRvdWNoU3RhcnQpO1xyXG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaEVudGVyLnJlbW92ZSh0aGlzLm9uVG91Y2hFbnRlcik7XHJcbiAgICAgIHRoaXMudWlJbnB1dC5vblRvdWNoRW5kLnJlbW92ZSh0aGlzLm9uVG91Y2hFbmQpO1xyXG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaExlYXZlLnJlbW92ZSh0aGlzLm9uVG91Y2hMZWF2ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25Ub3VjaFN0YXJ0KHM6IGVuZ2luZS5Ub3VjaElucHV0Q29tcG9uZW50LCBlOiBUb3VjaElucHV0RXZlbnQpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdvblRvdWNoU3RhcnQgRDJTaG9vdCcpO1xyXG4gICAgY29uc3QgYyA9IHRoaXMudWlzcHJpdGUuY29sb3IuY2xvbmUoKTtcclxuICAgIGMuYSA9IDIwMDtcclxuICAgIHRoaXMudWlzcHJpdGUuY29sb3IgPSBjO1xyXG4gICAgRUMuZW1pdChFQy5TVEFSVF9TSE9PVCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25Ub3VjaEVudGVyKHM6IGVuZ2luZS5Ub3VjaElucHV0Q29tcG9uZW50LCBlOiBUb3VjaElucHV0RXZlbnQpIHtcclxuICAgIGNvbnN0IGMgPSB0aGlzLnVpc3ByaXRlLmNvbG9yLmNsb25lKCk7XHJcbiAgICBjLmEgPSAyMDA7XHJcbiAgICB0aGlzLnVpc3ByaXRlLmNvbG9yID0gYztcclxuICAgIEVDLmVtaXQoRUMuU1RBUlRfU0hPT1QpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVG91Y2hFbmQoczogZW5naW5lLlRvdWNoSW5wdXRDb21wb25lbnQsIGU6IFRvdWNoSW5wdXRFdmVudCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ29uVG91Y2hFbmQgRDJTaG9vdCcpO1xyXG4gICAgY29uc3QgYyA9IHRoaXMudWlzcHJpdGUuY29sb3IuY2xvbmUoKTtcclxuICAgIGMuYSA9IDI1NTtcclxuICAgIHRoaXMudWlzcHJpdGUuY29sb3IgPSBjO1xyXG4gICAgRUMuZW1pdChFQy5FTkRfU0hPT1QpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVG91Y2hMZWF2ZShzOiBlbmdpbmUuVG91Y2hJbnB1dENvbXBvbmVudCwgZTogVG91Y2hJbnB1dEV2ZW50KSB7XHJcbiAgICBjb25zdCBjID0gdGhpcy51aXNwcml0ZS5jb2xvci5jbG9uZSgpO1xyXG4gICAgYy5hID0gMjU1O1xyXG4gICAgdGhpcy51aXNwcml0ZS5jb2xvciA9IGM7XHJcbiAgICBFQy5lbWl0KEVDLkVORF9TSE9PVCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBlbmdpbmUgZnJvbSBcImVuZ2luZVwiO1xyXG5pbXBvcnQgQ29sbGlkZXIgZnJvbSBcIi4uL2NvbW1vbnMvY29sbGlkZXIuanNcIjtcclxuXHJcbkBlbmdpbmUuZGVjb3JhdG9ycy5zZXJpYWxpemUoXCJEM0J1bGxldFwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEM0J1bGxldCBleHRlbmRzIGVuZ2luZS5TY3JpcHQge1xyXG4gIHB1YmxpYyBkaXJlY3Rpb24gPSBlbmdpbmUuVmVjdG9yMy5aRVJPLmNsb25lKCk7XHJcbiAgcHVibGljIHNwZWVkID0gODtcclxuICBwdWJsaWMgc3VtVGltZSA9IDA7XHJcbiAgcHVibGljIG1heFRpbWUgPSA1O1xyXG4gIHB1YmxpYyBhdHRhY2sgPSAxO1xyXG4gIHB1YmxpYyBib3VuZCA9IGVuZ2luZS5WZWN0b3IzLmNyZWF0ZUZyb21OdW1iZXIoMC4xNSAvIDIsIDAuMTUgLyAyLCAwLjE1IC8gMik7XHJcblxyXG4gIHB1YmxpYyBvbkF3YWtlKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJvbkF3YWtlIEQzQnVsbGV0XCIsIHRoaXMuZGlyZWN0aW9uLngsIHRoaXMuZGlyZWN0aW9uLnksIHRoaXMuZGlyZWN0aW9uLnopO1xyXG4gICAgQ29sbGlkZXIud2F0Y2godGhpcywgW1wiYnVsbGV0XCJdKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblVwZGF0ZShkdCkge1xyXG4gICAgaWYgKHRoaXMuc3VtVGltZSA8IHRoaXMubWF4VGltZSkge1xyXG5cclxuICAgICAgdGhpcy5zdW1UaW1lICs9IGR0O1xyXG4gICAgICB0aGlzLmVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueCArPSB0aGlzLmRpcmVjdGlvbi54ICogdGhpcy5zcGVlZCAqIGR0O1xyXG4gICAgICB0aGlzLmVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueSArPSB0aGlzLmRpcmVjdGlvbi55ICogdGhpcy5zcGVlZCAqIGR0O1xyXG4gICAgICB0aGlzLmVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueiArPSB0aGlzLmRpcmVjdGlvbi56ICogdGhpcy5zcGVlZCAqIGR0O1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlU2VsZigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQ29sbGlkZShjb21wKSB7XHJcbiAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkRlc3Ryb3koKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnb25EZXN0cm95IGJ1bGxldCcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZVNlbGYoKSB7XHJcbiAgICBpZiAodGhpcy5lbnRpdHkudHJhbnNmb3JtICYmIHRoaXMuZW50aXR5LnRyYW5zZm9ybS5wYXJlbnQpIHtcclxuICAgICAgY29uc3QgcGFyZW50VHJhbnNmb3JtID0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBhcmVudCBhcyBUcmFuc2Zvcm0zRFxyXG4gICAgICBwYXJlbnRUcmFuc2Zvcm0ucmVtb3ZlQ2hpbGQodGhpcy5lbnRpdHkudHJhbnNmb3JtKTtcclxuICAgICAgQ29sbGlkZXIudW53YXRjaCh0aGlzKTtcclxuICAgICAgdGhpcy5lbnRpdHkuZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgZW5naW5lIGZyb20gXCJlbmdpbmVcIjtcclxuaW1wb3J0IERhdGFDZW50ZXIgZnJvbSBcIi4uL2NvbW1vbnMvZGF0YUNlbnRlci5qc1wiO1xyXG5pbXBvcnQgRXZlbnRDZW50ZXIgZnJvbSBcIi4uL2NvbW1vbnMvZXZlbnRDZW50ZXIuanNcIjtcclxuXHJcbmNvbnN0IFBPU19MSU1JVCA9IHtcclxuICB4OiBbLTI2LCAyNl0sXHJcbiAgLy8geTogWy0xMDAsIDEwMF0sXHJcbiAgejogWy00NCwgMTNdLFxyXG59O1xyXG5cclxuQGVuZ2luZS5kZWNvcmF0b3JzLnNlcmlhbGl6ZShcIkQzQ2FtZXJhXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEQzQ2FtZXJhIGV4dGVuZHMgZW5naW5lLlNjcmlwdCB7XHJcblxyXG4gIHB1YmxpYyBjYW1lcmEgPSBudWxsO1xyXG5cclxuICBwdWJsaWMgb25Bd2FrZSgpIHtcclxuICAgIHRoaXMuY2FtZXJhID0gdGhpcy5lbnRpdHkuZ2V0Q29tcG9uZW50KGVuZ2luZS5DYW1lcmEpO1xyXG4gICAgRGF0YUNlbnRlci5jYW1lcmFDb21wID0gdGhpcy5jYW1lcmE7XHJcbiAgICBjb25zb2xlLmxvZyhcIm9uQXdha2UgRDNDYW1lcmFcIik7XHJcblxyXG4gICAgRXZlbnRDZW50ZXIub24oRXZlbnRDZW50ZXIuQUREX1BMQVlFUiwgKCkgPT4ge1xyXG4gICAgICAvLyB0aGlzLmNhbWVyYS50YXJnZXRUcmFuc2Zvcm0gPSBEYXRhQ2VudGVyLnBsYXllci50cmFuc2Zvcm07XHJcbiAgICB9KTtcclxuICAgIEV2ZW50Q2VudGVyLm9uKEV2ZW50Q2VudGVyLk1PVkVfUExBWUVSLCAobW92ZSkgPT4ge1xyXG4gICAgICBjb25zdCBwb3MgPSBEYXRhQ2VudGVyLnBsYXllckVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgIGZvciAoY29uc3QgayBpbiBQT1NfTElNSVQpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBwb3Nba10gKyBtb3ZlW2tdID49IFBPU19MSU1JVFtrXVswXVxyXG4gICAgICAgICAgJiZcclxuICAgICAgICAgIHBvc1trXSArIG1vdmVba10gPD0gUE9TX0xJTUlUW2tdWzFdXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGlzLmNhbWVyYS5lbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uW2tdICs9IG1vdmVba107XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKERhdGFDZW50ZXIucGxheWVyRW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi54LCBEYXRhQ2VudGVyLnBsYXllckVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueSwgRGF0YUNlbnRlci5wbGF5ZXJFbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnopO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25VcGRhdGUoZHQpIHtcclxuXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBlbmdpbmUgZnJvbSBcImVuZ2luZVwiO1xyXG5pbXBvcnQgQ29sbGlkZXIgZnJvbSBcIi4uL2NvbW1vbnMvY29sbGlkZXIuanNcIjtcclxuaW1wb3J0IERhdGFDZW50ZXIgZnJvbSBcIi4uL2NvbW1vbnMvZGF0YUNlbnRlci5qc1wiO1xyXG5pbXBvcnQgRXZlbnRDZW50ZXIgZnJvbSBcIi4uL2NvbW1vbnMvZXZlbnRDZW50ZXIuanNcIjtcclxuaW1wb3J0IEQzQnVsbGV0IGZyb20gXCIuL2QzQnVsbGV0LmpzXCI7XHJcbmltcG9ydCBEM1BsYXllciBmcm9tIFwiLi9kM1BsYXllci5qc1wiO1xyXG5cclxuY29uc3QgcmFuZG9tQmV0d2VlbiA9IChtaW4sIG1heCkgPT4ge1xyXG4gIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XHJcbn07XHJcblxyXG5cclxuQGVuZ2luZS5kZWNvcmF0b3JzLnNlcmlhbGl6ZShcIkQzRW5lbXlcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRDNFbmVteSBleHRlbmRzIGVuZ2luZS5TY3JpcHQge1xyXG5cclxuICBwdWJsaWMgc3RhdGljIGVuZW15Q291bnQgPSAwO1xyXG4gIHB1YmxpYyBkaXJlY3Rpb24gPSBlbmdpbmUuVmVjdG9yMy5aRVJPLmNsb25lKCk7XHJcbiAgcHVibGljIHNwZWVkID0gcmFuZG9tQmV0d2VlbigzLCA2KTtcclxuICBwdWJsaWMgc3VtVGltZSA9IDA7XHJcbiAgcHVibGljIG1heFRpbWUgPSAxNTtcclxuICBwdWJsaWMgaHAgPSA1O1xyXG4gIHB1YmxpYyBzY29yZSA9IHtcclxuICAgIGNvbGxpZGU6IC0yLFxyXG4gICAgZGVhZDogMSxcclxuICB9O1xyXG4gIHB1YmxpYyByb3RhdGlvblkgPSAoTWF0aC5yYW5kb20oKSA8IDAuNSA/IC0xIDogMSkgKiAwLjA1O1xyXG4gIHB1YmxpYyBodXJ0UGFydGljbGUgPSBudWxsO1xyXG4gIHB1YmxpYyBib3VuZCA9IGVuZ2luZS5WZWN0b3IzLmNyZWF0ZUZyb21OdW1iZXIoMC45IC8gMiwgMC41IC8gMiwgMC45IC8gMik7XHJcblxyXG4gIHB1YmxpYyBvbkF3YWtlKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJvbkF3YWtlIEQzRW5lbXlcIik7XHJcbiAgICB0aGlzLmRpcmVjdGlvbi56ID0gMTtcclxuICAgIHRoaXMuaHVydFBhcnRpY2xlID0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLl9jaGlsZHJlblswXS5maW5kQ2hpbGRCeU5hbWUoXCJIdXJ0XCIpLmVudGl0eS5nZXRDb21wb25lbnQoZW5naW5lLlBhcnRpY2xlKTtcclxuICAgIENvbGxpZGVyLndhdGNoKHRoaXMsIFtcImVuZW15XCJdKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblVwZGF0ZShkdCkge1xyXG4gICAgaWYgKHRoaXMuc3VtVGltZSA8IHRoaXMubWF4VGltZSkge1xyXG5cclxuICAgICAgdGhpcy5zdW1UaW1lICs9IGR0O1xyXG5cclxuICAgICAgLy8gY29uc3QgcGxheWVyID0gRGF0YUNlbnRlci5wbGF5ZXJFbnRpdHk7XHJcbiAgICAgIC8vIHRoaXMuZGlyZWN0aW9uLnggPSBwbGF5ZXIudHJhbnNmb3JtLnBvc2l0aW9uLnggLSB0aGlzLmVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueDtcclxuICAgICAgLy8gdGhpcy5kaXJlY3Rpb24ueSA9IHBsYXllci50cmFuc2Zvcm0ucG9zaXRpb24ueSAtIHRoaXMuZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi55O1xyXG4gICAgICAvLyB0aGlzLmRpcmVjdGlvbi56ID0gcGxheWVyLnRyYW5zZm9ybS5wb3NpdGlvbi56IC0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLno7XHJcbiAgICAgIC8vIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb24ubm9ybWFsaXplKCk7XHJcblxyXG4gICAgICB0aGlzLmVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueCArPSB0aGlzLmRpcmVjdGlvbi54ICogdGhpcy5zcGVlZCAqIGR0O1xyXG4gICAgICB0aGlzLmVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueSArPSB0aGlzLmRpcmVjdGlvbi55ICogdGhpcy5zcGVlZCAqIGR0O1xyXG4gICAgICB0aGlzLmVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueiArPSB0aGlzLmRpcmVjdGlvbi56ICogdGhpcy5zcGVlZCAqIGR0O1xyXG5cclxuICAgICAgdGhpcy5lbnRpdHkudHJhbnNmb3JtLmV1bGVyLnkgKz0gdGhpcy5yb3RhdGlvblk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlbW92ZUVuZW15KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25Db2xsaWRlKGNvbXApIHtcclxuICAgIGlmIChjb21wIGluc3RhbmNlb2YgRDNQbGF5ZXIpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ2lzQ29sbGlkZWQgZW5lbXkgcGxheWVyJyk7XHJcbiAgICAgIEV2ZW50Q2VudGVyLmVtaXQoRXZlbnRDZW50ZXIuSFVSVF9QTEFZRVIpO1xyXG4gICAgICBFdmVudENlbnRlci5lbWl0KEV2ZW50Q2VudGVyLkdFVF9TQ09SRSwgdGhpcy5zY29yZS5jb2xsaWRlKTtcclxuICAgICAgdGhpcy5yZW1vdmVFbmVteSgpO1xyXG5cclxuICAgIH0gZWxzZSBpZiAoY29tcCBpbnN0YW5jZW9mIEQzQnVsbGV0KSB7XHJcbiAgICAgIHRoaXMuaHAgLT0gY29tcC5hdHRhY2s7XHJcbiAgICAgIHRoaXMuaHVydFBhcnRpY2xlLmVtaXR0ZXIuc3RhcnQgPSB0cnVlO1xyXG4gICAgICBpZiAodGhpcy5ocCA8PSAwKSB7XHJcbiAgICAgICAgRXZlbnRDZW50ZXIuZW1pdChFdmVudENlbnRlci5HRVRfU0NPUkUsIHRoaXMuc2NvcmUuZGVhZCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVFbmVteSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlRW5lbXkoKSB7XHJcbiAgICBpZiAodGhpcy5lbnRpdHkudHJhbnNmb3JtKSB7XHJcbiAgICAgIGNvbnN0IHBhcmVudFRyYW5zZm9ybSA9IHRoaXMuZW50aXR5LnRyYW5zZm9ybS5wYXJlbnQ7XHJcbiAgICAgIHBhcmVudFRyYW5zZm9ybS5yZW1vdmVDaGlsZCh0aGlzLmVudGl0eS50cmFuc2Zvcm0pO1xyXG4gICAgICBDb2xsaWRlci51bndhdGNoKHRoaXMpO1xyXG4gICAgICB0aGlzLmVudGl0eS5kZXN0cm95KCk7XHJcbiAgICAgIEQzRW5lbXkuZW5lbXlDb3VudC0tO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uRGVzdHJveSgpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdvbkRlc3Ryb3kgZW5lbXknKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IGVuZ2luZSBmcm9tIFwiZW5naW5lXCI7XHJcbmltcG9ydCBDb2xsaWRlciBmcm9tIFwiLi4vY29tbW9ucy9jb2xsaWRlci5qc1wiO1xyXG5pbXBvcnQgRGF0YUNlbnRlciBmcm9tIFwiLi4vY29tbW9ucy9kYXRhQ2VudGVyLmpzXCI7XHJcbmltcG9ydCBEM0VuZW15IGZyb20gXCIuL2QzRW5lbXkuanNcIjtcclxuaW1wb3J0IEQzUGxheWVyIGZyb20gXCIuL2QzUGxheWVyLmpzXCI7XHJcblxyXG5jb25zdCBFTkVNWV9JTlRFUlZBTCA9IDAuNTtcclxuY29uc3QgcmFuZG9tQmV0d2VlbiA9IChtaW4sIG1heCkgPT4ge1xyXG4gIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XHJcbn07XHJcblxyXG5AZW5naW5lLmRlY29yYXRvcnMuc2VyaWFsaXplKFwiRDNNYWluXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEQzTWFpbiBleHRlbmRzIGVuZ2luZS5TY3JpcHQge1xyXG4gIHB1YmxpYyB3b3JsZDogbnVsbCB8IGVuZ2luZS5FbnRpdHkgPSBudWxsOyAvLyB3b3JsZCBlbnRpdHlcclxuICBwdWJsaWMgZW5lbXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gIHB1YmxpYyBlbmVteVByZWZhYjogZW5naW5lLlByZWZhYiB8IG51bGwgPSBudWxsO1xyXG5cclxuICBwdWJsaWMgb25Bd2FrZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwib25Bd2FrZSBEM01haW5cIik7XHJcbiAgICB0aGlzLndvcmxkID0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBhcmVudC5lbnRpdHk7XHJcbiAgICBEYXRhQ2VudGVyLndvcmxkRW50aXR5ID0gdGhpcy53b3JsZDtcclxuICAgIFxyXG4gICAgQ29sbGlkZXIud2F0Y2hHcm91cChcImVuZW15XCIsIFwicGxheWVyXCIpO1xyXG4gICAgQ29sbGlkZXIud2F0Y2hHcm91cChcImVuZW15XCIsIFwiYnVsbGV0XCIpO1xyXG5cclxuICAgIHRoaXMuaW5pdFBsYXllcigpO1xyXG4gICAgdGhpcy5pbml0RW5lbXkoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblVwZGF0ZShkdDogbnVtYmVyKSB7XHJcbiAgICBDb2xsaWRlci5vblVwZGF0ZShkdCk7XHJcbiAgICB0aGlzLmVuZW15VGltZSArPSBkdDtcclxuICAgIGlmICh0aGlzLmVuZW15VGltZSA+PSBFTkVNWV9JTlRFUlZBTCkge1xyXG4gICAgICB0aGlzLmFkZEVuZW15KCk7XHJcbiAgICAgIHRoaXMuZW5lbXlUaW1lIC09IEVORU1ZX0lOVEVSVkFMO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXRQbGF5ZXIoKSB7XHJcbiAgICBlbmdpbmUubG9hZGVyLmxvYWQ8ZW5naW5lLlByZWZhYj4oXCJyZXNvdXJjZS9BaXJjcmFmdC5wcmVmYWJcIikucHJvbWlzZS50aGVuKChwcmVmYWIpID0+IHtcclxuICAgICAgY29uc3QgZW50aXR5ID0gcHJlZmFiLmluc3RhbnRpYXRlKCk7XHJcbiAgICAgIGVudGl0eS5hZGRDb21wb25lbnQoRDNQbGF5ZXIpO1xyXG4gICAgICBlbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnkgKz0gMTtcclxuICAgICAgZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi56ID0gODtcclxuICAgICAgdGhpcy53b3JsZC50cmFuc2Zvcm0uYWRkQ2hpbGQoZW50aXR5LnRyYW5zZm9ybSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0RW5lbXkoKSB7XHJcbiAgICBlbmdpbmUubG9hZGVyLmxvYWQ8ZW5naW5lLlByZWZhYj4oXCJyZXNvdXJjZS9FbmVteTAxLnByZWZhYlwiKS5wcm9taXNlLnRoZW4oKHByZWZhYikgPT4ge1xyXG4gICAgICB0aGlzLmVuZW15UHJlZmFiID0gcHJlZmFiO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkRW5lbXkoKSB7XHJcbiAgICBpZiAoIXRoaXMuZW5lbXlQcmVmYWIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKEQzRW5lbXkuZW5lbXlDb3VudCA+PSAyMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBlbnRpdHkgPSB0aGlzLmVuZW15UHJlZmFiLmluc3RhbnRpYXRlKCk7XHJcbiAgICBjb25zdCBzY3JpcHQgPSBlbnRpdHkuYWRkQ29tcG9uZW50KEQzRW5lbXkpO1xyXG4gICAgZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi54ID0gcmFuZG9tQmV0d2VlbigtMjYsIDI2KTtcclxuICAgIGVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueSArPSAxO1xyXG4gICAgZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi56ID0gcmFuZG9tQmV0d2VlbigtNTAsIC0yMCk7XHJcbiAgICAvLyBlbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnggPSByYW5kb21CZXR3ZWVuKC0xMCwgMTApO1xyXG4gICAgLy8gZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi56ID0gcmFuZG9tQmV0d2VlbigxMCwgMSk7XHJcbiAgICB0aGlzLndvcmxkLnRyYW5zZm9ybS5hZGRDaGlsZChlbnRpdHkudHJhbnNmb3JtKTtcclxuICAgIEQzRW5lbXkuZW5lbXlDb3VudCsrO1xyXG4gICAgLy8gY29uc29sZS5sb2coJ0FkZCBFbmVteScsIEQzRW5lbXkuZW5lbXlDb3VudCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBlbmdpbmUgZnJvbSAnZW5naW5lJztcclxuaW1wb3J0IENvbGxpZGVyIGZyb20gJy4uL2NvbW1vbnMvY29sbGlkZXIuanMnO1xyXG5pbXBvcnQgRGF0YUNlbnRlciBmcm9tICcuLi9jb21tb25zL2RhdGFDZW50ZXIuanMnO1xyXG5pbXBvcnQgRXZlbnRDZW50ZXIgZnJvbSAnLi4vY29tbW9ucy9ldmVudENlbnRlci5qcyc7XHJcbmltcG9ydCBEM0J1bGxldCBmcm9tICcuL2QzQnVsbGV0LmpzJztcclxuXHJcbmNvbnN0IFBPU19MSU1JVCA9IHtcclxuICB4OiBbLTMwLCAzMF0sXHJcbiAgLy8geTogWy0xMDAsIDEwMF0sXHJcbiAgejogWy01NCwgMTQuM10sXHJcbn07XHJcblxyXG5AZW5naW5lLmRlY29yYXRvcnMuc2VyaWFsaXplKFwiRDNQbGF5ZXJcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRDNQbGF5ZXIgZXh0ZW5kcyBlbmdpbmUuU2NyaXB0IHtcclxuICBwdWJsaWMgYnVsbGV0UHJlZmFiID0gbnVsbDtcclxuICBwdWJsaWMgYnVsbGV0SW50ZXJ2YWwgPSAwLjM7XHJcbiAgcHVibGljIGJ1bGxldFRpbWUgPSAwO1xyXG4gIHB1YmxpYyBwbGF5ZXIgPSBudWxsO1xyXG4gIHB1YmxpYyBodXJ0UGFydGljbGUgPSBudWxsO1xyXG4gIHB1YmxpYyBzcGVlZCA9IDEwO1xyXG4gIHB1YmxpYyBkaXJlY3Rpb24gPSBlbmdpbmUuVmVjdG9yMy5aRVJPLmNsb25lKCk7XHJcbiAgcHVibGljIHJvdGF0aW9uID0gZW5naW5lLlZlY3RvcjMuWkVSTy5jbG9uZSgpO1xyXG4gIHB1YmxpYyBib3VuZCA9IGVuZ2luZS5WZWN0b3IzLmNyZWF0ZUZyb21OdW1iZXIoMi43NSAvIDIsIDAuNDYgLyAyLCAwLjUgLyAyKTtcclxuXHJcbiAgcHVibGljIG9uQXdha2UoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIm9uQXdha2UgRDNQbGF5ZXJcIik7XHJcbiAgICAvLyB0aGlzLmluaXRFbnRpdHkoKTtcclxuXHJcbiAgICB0aGlzLnBsYXllciA9IHRoaXMuZW50aXR5O1xyXG4gICAgRGF0YUNlbnRlci5wbGF5ZXJFbnRpdHkgPSB0aGlzLnBsYXllcjtcclxuICAgIERhdGFDZW50ZXIucGxheWVyQ29tcCA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy5odXJ0UGFydGljbGUgPSB0aGlzLnBsYXllci50cmFuc2Zvcm0uX2NoaWxkcmVuWzBdLmZpbmRDaGlsZEJ5TmFtZShcIkh1cnRcIikuZW50aXR5LmdldENvbXBvbmVudChlbmdpbmUuUGFydGljbGUpO1xyXG4gICAgLy8gdGhpcy5odXJ0UGFydGljbGUuZW1pdHRlci5zdGFydCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5pbml0RXZlbnQoKTtcclxuICAgIHRoaXMuaW5pdFByZWZhYigpO1xyXG4gICAgQ29sbGlkZXIud2F0Y2godGhpcywgW1wicGxheWVyXCJdKTtcclxuXHJcbiAgICBFdmVudENlbnRlci5lbWl0KEV2ZW50Q2VudGVyLkFERF9QTEFZRVIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVXBkYXRlKGR0KSB7XHJcbiAgICBpZiAodGhpcy5wbGF5ZXIpIHtcclxuICAgICAgdGhpcy51cGRhdGVNb3ZlKGR0KTtcclxuICAgICAgdGhpcy51cGRhdGVCdWxsZXQoZHQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXRQcmVmYWIoKSB7XHJcbiAgICBlbmdpbmUubG9hZGVyLmxvYWQoXCJyZXNvdXJjZS9CdWxsZXQucHJlZmFiXCIpLnByb21pc2UudGhlbigocHJlZmFiKSA9PiB7XHJcbiAgICAgIHRoaXMuYnVsbGV0UHJlZmFiID0gcHJlZmFiO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdEV2ZW50KCkge1xyXG4gICAgRXZlbnRDZW50ZXIub24oRXZlbnRDZW50ZXIuVE9VQ0hfTU9WRSwgKGRpcmVjdGlvbikgPT4ge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygnZ2V0IDJkIE9OX1RPVUNIX01PVkUnLCBkaXJlY3Rpb24ueCwgZGlyZWN0aW9uLnksIGRpcmVjdGlvbi56KTtcclxuICAgICAgdGhpcy5kaXJlY3Rpb24ueCA9IGRpcmVjdGlvbi54O1xyXG4gICAgICB0aGlzLmRpcmVjdGlvbi55ID0gZGlyZWN0aW9uLnk7XHJcbiAgICAgIHRoaXMuZGlyZWN0aW9uLnogPSBkaXJlY3Rpb24uejtcclxuXHJcbiAgICAgIGlmIChkaXJlY3Rpb24ueCA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMucm90YXRpb24ueCA9IDA7XHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbi56ID0gMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uLnggPSAwLjAxO1xyXG4gICAgICAgIHRoaXMucm90YXRpb24ueiA9IGRpcmVjdGlvbi54IDwgMCA/IDAuMDEgOiAtMC4wMTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgRXZlbnRDZW50ZXIub24oRXZlbnRDZW50ZXIuSFVSVF9QTEFZRVIsICgpID0+IHtcclxuICAgICAgdGhpcy5odXJ0UGFydGljbGUuZW1pdHRlci5zdGFydCA9IHRydWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICBFdmVudENlbnRlci5vbihFdmVudENlbnRlci5TVEFSVF9TSE9PVCwgKCkgPT4ge1xyXG4gICAgICB0aGlzLmJ1bGxldEludGVydmFsID0gMC4xO1xyXG4gICAgfSk7XHJcbiAgICBFdmVudENlbnRlci5vbihFdmVudENlbnRlci5FTkRfU0hPT1QsICgpID0+IHtcclxuICAgICAgdGhpcy5idWxsZXRJbnRlcnZhbCA9IDAuMztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZU1vdmUoZHQpIHtcclxuICAgIGZvciAoY29uc3QgayBpbiBQT1NfTElNSVQpIHtcclxuICAgICAgaWYgKHRoaXMucm90YXRpb25ba10gPT09IDApIHtcclxuICAgICAgICB0aGlzLnBsYXllci50cmFuc2Zvcm0uZXVsZXJba10gPSAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGxheWVyLnRyYW5zZm9ybS5ldWxlcltrXSArPSB0aGlzLnJvdGF0aW9uW2tdO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllci50cmFuc2Zvcm0uZXVsZXJba10gPiAwLjIpIHtcclxuICAgICAgICAgIHRoaXMucGxheWVyLnRyYW5zZm9ybS5ldWxlcltrXSA9IDAuMjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGxheWVyLnRyYW5zZm9ybS5ldWxlcltrXSA8IC0wLjIpIHtcclxuICAgICAgICAgIHRoaXMucGxheWVyLnRyYW5zZm9ybS5ldWxlcltrXSA9IC0wLjI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyB0aGlzLmVudGl0eS50cmFuc2Zvcm0uZXVsZXIueSArPSAwLjAzO1xyXG5cclxuXHJcbiAgICBjb25zdCBtb3ZlID0ge1xyXG4gICAgICB4OiB0aGlzLnNwZWVkICogdGhpcy5kaXJlY3Rpb24ueCAqIGR0LFxyXG4gICAgICB5OiB0aGlzLnNwZWVkICogdGhpcy5kaXJlY3Rpb24ueSAqIGR0LFxyXG4gICAgICB6OiB0aGlzLnNwZWVkICogdGhpcy5kaXJlY3Rpb24ueiAqIGR0LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBvcyA9IHRoaXMucGxheWVyLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgIGZvciAoY29uc3QgayBpbiBQT1NfTElNSVQpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHBvc1trXSArIG1vdmVba10gPCBQT1NfTElNSVRba11bMF1cclxuICAgICAgICB8fFxyXG4gICAgICAgIHBvc1trXSArIG1vdmVba10gPiBQT1NfTElNSVRba11bMV1cclxuICAgICAgKSB7XHJcbiAgICAgICAgbW92ZVtrXSA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5wbGF5ZXIudHJhbnNmb3JtLnBvc2l0aW9uW2tdICs9IG1vdmVba107XHJcbiAgICB9XHJcbiAgICBpZiAobW92ZS54ICE9PSAwIHx8IG1vdmUueSAhPT0gMCB8fCBtb3ZlLnogIT09IDApIHtcclxuICAgICAgRXZlbnRDZW50ZXIuZW1pdChFdmVudENlbnRlci5NT1ZFX1BMQVlFUiwgbW92ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlQnVsbGV0KGR0KSB7XHJcbiAgICBpZiAoIXRoaXMuYnVsbGV0UHJlZmFiKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuYnVsbGV0VGltZSArPSBkdDtcclxuICAgIGlmICh0aGlzLmJ1bGxldFRpbWUgPj0gdGhpcy5idWxsZXRJbnRlcnZhbCkge1xyXG4gICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLmJ1bGxldFByZWZhYi5pbnN0YW50aWF0ZSgpO1xyXG4gICAgICBjb25zdCBzY3JpcHQgPSBlbnRpdHkuYWRkQ29tcG9uZW50KEQzQnVsbGV0KTtcclxuICAgICAgZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbiA9IHRoaXMucGxheWVyLnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAvLyBzY3JpcHQuZGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb24uY2xvbmUoKTtcclxuICAgICAgLy8gaWYgKHRoaXMuZGlyZWN0aW9uLmlzWmVybygpKSB7XHJcbiAgICAgIC8vICAgc2NyaXB0LmRpcmVjdGlvbi56ID0gLTE7XHJcbiAgICAgIC8vIH1cclxuICAgICAgc2NyaXB0LmRpcmVjdGlvbi56ID0gLTE7XHJcblxyXG4gICAgICBEYXRhQ2VudGVyLndvcmxkRW50aXR5LnRyYW5zZm9ybS5hZGRDaGlsZChlbnRpdHkudHJhbnNmb3JtKTtcclxuXHJcbiAgICAgIHRoaXMuYnVsbGV0VGltZSAtPSB0aGlzLmJ1bGxldEludGVydmFsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBc3NldE1hbmFnZXIge1xyXG4gICAgc3RhdGljIGFzeW5jIExvYWRBc3NldEFzeW5jKHBhdGg6c3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gZW5naW5lLmxvYWRlci5sb2FkKHBhdGgpLnByb21pc2VcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1Mb2dnZXIge1xyXG4gIHN0YXRpYyBMb2coXHJcbiAgICBwYXJhbTA/OiBhbnksXHJcbiAgICBwYXJhbTE/OiBhbnksXHJcbiAgICBwYXJhbTI/OiBhbnksXHJcbiAgICBwYXJhbTM/OiBhbnksXHJcbiAgICBwYXJhbTQ/OiBhbnksXHJcbiAgICBwYXJhbTU/OiBhbnksXHJcbiAgICBwYXJhbTY/OiBhbnlcclxuICApIHtcclxuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcbiAgICBjb25zb2xlLmxvZyhcIltsb2ddXCIsIC4uLmFyZ3MpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgZW5naW5lIGZyb20gXCJlbmdpbmVcIjtcclxuaW1wb3J0IE1Mb2dnZXIgZnJvbSBcIi4uL0dhbWVCYXNlL0RlYnVnL01Mb2dnZXJcIjtcclxuaW1wb3J0IEFzc2V0TWFuYWdlciBmcm9tIFwiLi4vR2FtZUJhc2UvQXNzZXQvQXNzZXRNYW5hZ2VyXCI7XHJcbmltcG9ydCAqIGFzIEcgZnJvbSBcIi4uL0dcIjtcclxuXHJcbmRlY2xhcmUgY29uc3Qgd3g7XHJcblxyXG5AZW5naW5lLmRlY29yYXRvcnMuc2VyaWFsaXplKFwiR2FtZVJvb3RcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVJvb3QgZXh0ZW5kcyBlbmdpbmUuU2NyaXB0IHtcclxuICBwcml2YXRlIG1fZ2FtZTtcclxuICBwcml2YXRlIGNhbWVyYU5vZGU6IEcuQ2FtO1xyXG4gIG9uQXdha2UoKSB7XHJcbiAgICAvL2luaXRcclxuICAgIHRoaXMubV9nYW1lID0gZW5naW5lLmdhbWU7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvblN0YXJ0KCkge1xyXG5cclxuICAgIC8vIGxldCBzY2VuZSA9IGF3YWl0IEFzc2V0TWFuYWdlci5Mb2FkQXNzZXRBc3luYyhcIkFzc2V0cy9SZXNvdXJjZXMvU2NlbmUvQmF0dGxlLnNjZW5lXCIpO1xyXG5cclxuICAgIC8vIGxldCBzY2VuZUV0dDpHLkV0dCA9IHRoaXMubV9nYW1lLnBsYXlTY2VuZShzY2VuZSk7XHJcblxyXG4gICAgbGV0IG5vZGVSb290ID0gdGhpcy5tX2dhbWUuY3JlYXRlRW50aXR5M0QoXCJOb2RlM0RSb290XCIpO1xyXG4gICAgdGhpcy5tX2dhbWUuYWN0aXZlU2NlbmUucm9vdC50cmFuc2Zvcm0uYWRkQ2hpbGQobm9kZVJvb3QudHJhbnNmb3JtKTtcclxuICAgIHRoaXMubV9nYW1lLm1hcmtBc1BlcnNpc3Qobm9kZVJvb3QpO1xyXG4gICAgLy8g5rKh5pyJ55u45py65YiZ5Yib5bu65LiA5LiqXHJcbiAgICBcclxuICAgIC8vIGxldCBjYW1lcmFUcmFucyA9IHRoaXMubV9nYW1lLmNyZWF0ZUVudGl0eTNEKFwiTWFpbkNhbWVyYVwiKS50cmFuc2Zvcm07XHJcbiAgICAvLyB0aGlzLm1fZ2FtZS5hY3RpdmVTY2VuZS5yb290LnRyYW5zZm9ybS5hZGRDaGlsZChjYW1lcmFUcmFucy5lbnRpdHkudHJhbnNmb3JtKTtcclxuXHJcbiAgICAvLyB0aGlzLmNhbWVyYU5vZGUgPSBjYW1lcmFUcmFucy5lbnRpdHkuYWRkQ29tcG9uZW50KEcuRS5DYW1lcmEpO1xyXG4gICAgLy8gdGhpcy5jYW1lcmFOb2RlLmFzcGVjdCA9IEcuRS5kZXZpY2Uuc2NyZWVuV2lkdGggLyBHLkUuZGV2aWNlLnNjcmVlbkhlaWdodDtcclxuICBcclxuXHJcbiAgICBsZXQgZW50aXR5OiBHLkV0dCA9IHRoaXMubV9nYW1lLmNyZWF0ZUVudGl0eTNEKFwiTW9uc3RlclwiKTtcclxuICAgIG5vZGVSb290LnRyYW5zZm9ybS5hZGRDaGlsZChlbnRpdHkudHJhbnNmb3JtKTtcclxuICAgIEFzc2V0TWFuYWdlci5Mb2FkQXNzZXRBc3luYyhcIkFzc2V0cy9SZXNvdXJjZXMvTW9kbGUvTW9uc3Rlcl8xL1ByZWZhYi9Nb25zdGVyXzEucHJlZmFiXCIpLnRoZW4oKHByZWZhYjogRy5QcmVmYWIpID0+IHtcclxuICAgICAgbGV0IHAgPSBwcmVmYWIuaW5zdGFudGlhdGUoKTtcclxuICAgICAgbm9kZVJvb3QudHJhbnNmb3JtLmFkZENoaWxkKHAudHJhbnNmb3JtKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCYXR0bGVTZXNzaW9ue1xyXG4gICAgXHJcbn0iXX0=
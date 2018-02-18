(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("dyna-ui-field-wrapper", ["react"], factory);
	else if(typeof exports === 'object')
		exports["dyna-ui-field-wrapper"] = factory(require("react"));
	else
		root["dyna-ui-field-wrapper"] = factory(root["react"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(10);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DynaFieldWrapper_1 = __webpack_require__(4);
exports.DynaFieldWrapper = DynaFieldWrapper_1.DynaFieldWrapper;
exports.EMode = DynaFieldWrapper_1.EMode;
exports.EStyle = DynaFieldWrapper_1.EStyle;
exports.EColor = DynaFieldWrapper_1.EColor;
exports.ESize = DynaFieldWrapper_1.ESize;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(5);
var dyna_guid_1 = __webpack_require__(6);
__webpack_require__(8);
__webpack_require__(11);
var EMode;
(function (EMode) {
    EMode["VIEW"] = "VIEW";
    EMode["EDIT"] = "EDIT";
})(EMode = exports.EMode || (exports.EMode = {}));
var EStyle;
(function (EStyle) {
    EStyle["INLINE_ROUNDED"] = "INLINE_ROUNDED";
})(EStyle = exports.EStyle || (exports.EStyle = {}));
var EColor;
(function (EColor) {
    EColor["WHITE_BLACK"] = "WHITE_BLACK";
    EColor["GRAY_WHITE_BLACK"] = "GRAY_WHITE_BLACK";
    EColor["WHITE_RED"] = "WHITE_RED";
    EColor["BLACK_WHITE"] = "BLACK_WHITE";
    EColor["ORANGE_WHITE"] = "ORANGE_WHITE";
    EColor["TRANSPARENT_WHITE"] = "TRANSPARENT_WHITE";
})(EColor = exports.EColor || (exports.EColor = {}));
var ESize;
(function (ESize) {
    ESize["XSMALL"] = "XSMALL";
    ESize["SMALL"] = "SMALL";
    ESize["MEDIUM"] = "MEDIUM";
    ESize["LARGE"] = "LARGE";
})(ESize = exports.ESize || (exports.ESize = {}));
var DynaFieldWrapper = /** @class */ (function (_super) {
    __extends(DynaFieldWrapper, _super);
    function DynaFieldWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.internalId = dyna_guid_1.guid();
        return _this;
    }
    Object.defineProperty(DynaFieldWrapper.prototype, "inputElement", {
        get: function () {
            return this.props.inputElementSelector &&
                this.controlContainerElement &&
                this.controlContainerElement.querySelector(this.props.inputElementSelector)
                || null;
        },
        enumerable: true,
        configurable: true
    });
    DynaFieldWrapper.prototype.componentDidMount = function () {
        if (this.props.inputElementSelector) {
            if (!this.inputElement) {
                console.error("DynaFieldWrapper: the inputElementSelector is defined but doesn't return any input control, inputElementSelector: [" + this.props.inputElementSelector + "]");
            }
            else {
                this.inputElement && this.inputElement.setAttribute('id', this.internalId);
            }
        }
    };
    DynaFieldWrapper.prototype.handleContainerClick = function (event) {
        var controlElement = this.controlContainerElement.querySelector(this.props.inputElementSelector);
        if (event.target !== event.currentTarget)
            return;
        if (controlElement)
            controlElement.focus();
        this.props.onFocus();
    };
    DynaFieldWrapper.prototype.render = function () {
        var _this = this;
        var _a = this.props, cn = _a.className, mode = _a.mode, style = _a.style, color = _a.color, size = _a.size, label = _a.label, required = _a.required, isLoading = _a.isLoading, children = _a.children, validationMessage = _a.validationMessage, footer = _a.footer;
        var className = [
            cn || '',
            'dyna-ui-field-wrapper',
            "dyna-ui-field-wrapper--mode-" + mode,
            "dyna-ui-field-wrapper--style-" + style,
            "dyna-ui-field-wrapper--color-" + color,
            "dyna-ui-field-wrapper--size-" + size,
        ].join(' ').trim();
        return (React.createElement("div", { className: className },
            label ?
                React.createElement("div", { className: "dyna-ui-label", onClick: this.handleContainerClick.bind(this) },
                    React.createElement("label", { htmlFor: this.internalId }, label))
                : null,
            React.createElement("div", { className: "dyna-ui-field-wrapper-container", onClick: this.handleContainerClick.bind(this) },
                React.createElement("div", { className: "dyna-ui-field-wrapper-required", onClick: this.handleContainerClick.bind(this) }, required),
                React.createElement("div", { className: "dyna-ui-field-wrapper-isLoading", onClick: this.handleContainerClick.bind(this) }, isLoading),
                React.createElement("div", { className: "dyna-ui-field-wrapper-control-container", ref: function (element) { return _this.controlContainerElement = element; }, onClick: this.handleContainerClick.bind(this) }, children),
                React.createElement("div", { className: "dyna-ui-field-wrapper-validation-message", onClick: this.handleContainerClick.bind(this) }, validationMessage),
                React.createElement("div", { className: "dyna-ui-field-wrapper-footer", onClick: this.handleContainerClick.bind(this) }, footer))));
    };
    DynaFieldWrapper.defaultProps = {
        className: null,
        mode: EMode.EDIT,
        style: EStyle.INLINE_ROUNDED,
        color: EColor.WHITE_BLACK,
        size: ESize.MEDIUM,
        label: null,
        required: null,
        isLoading: null,
        children: null,
        inputElementSelector: null,
        validationMessage: null,
        footer: null,
        onFocus: function () { return undefined; },
    };
    return DynaFieldWrapper;
}(React.Component));
exports.DynaFieldWrapper = DynaFieldWrapper;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
    if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["dyna-guid"] = factory();else root["dyna-guid"] = factory();
})(undefined, function () {
    return (/******/function (modules) {
            // webpackBootstrap
            /******/ // The module cache
            /******/var installedModules = {};
            /******/
            /******/ // The require function
            /******/function __webpack_require__(moduleId) {
                /******/
                /******/ // Check if module is in cache
                /******/if (installedModules[moduleId]) {
                    /******/return installedModules[moduleId].exports;
                    /******/
                }
                /******/ // Create a new module (and put it into the cache)
                /******/var module = installedModules[moduleId] = {
                    /******/i: moduleId,
                    /******/l: false,
                    /******/exports: {}
                    /******/ };
                /******/
                /******/ // Execute the module function
                /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                /******/
                /******/ // Flag the module as loaded
                /******/module.l = true;
                /******/
                /******/ // Return the exports of the module
                /******/return module.exports;
                /******/
            }
            /******/
            /******/
            /******/ // expose the modules object (__webpack_modules__)
            /******/__webpack_require__.m = modules;
            /******/
            /******/ // expose the module cache
            /******/__webpack_require__.c = installedModules;
            /******/
            /******/ // identity function for calling harmony imports with the correct context
            /******/__webpack_require__.i = function (value) {
                return value;
            };
            /******/
            /******/ // define getter function for harmony exports
            /******/__webpack_require__.d = function (exports, name, getter) {
                /******/if (!__webpack_require__.o(exports, name)) {
                    /******/Object.defineProperty(exports, name, {
                        /******/configurable: false,
                        /******/enumerable: true,
                        /******/get: getter
                        /******/ });
                    /******/
                }
                /******/
            };
            /******/
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/__webpack_require__.n = function (module) {
                /******/var getter = module && module.__esModule ?
                /******/function getDefault() {
                    return module['default'];
                } :
                /******/function getModuleExports() {
                    return module;
                };
                /******/__webpack_require__.d(getter, 'a', getter);
                /******/return getter;
                /******/
            };
            /******/
            /******/ // Object.prototype.hasOwnProperty.call
            /******/__webpack_require__.o = function (object, property) {
                return Object.prototype.hasOwnProperty.call(object, property);
            };
            /******/
            /******/ // __webpack_public_path__
            /******/__webpack_require__.p = "/dist/";
            /******/
            /******/ // Load entry module and return exports
            /******/return __webpack_require__(__webpack_require__.s = 1);
            /******/
        }(
        /************************************************************************/
        /******/[
        /* 0 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var random = function random() {
                return Math.floor(1000000000 + Math.random() * 0x10000000 /* 65536 */).toString(18).substr(0, 8);
            };
            exports.guid = function (blocks) {
                if (blocks === void 0) {
                    blocks = 2;
                }
                var date = new Date();
                var datePart = (Number(date) * 3).toString().split("").reverse().join("");
                var timeZonePart = new Date().getTimezoneOffset();
                if (timeZonePart < 0) {
                    timeZonePart = -timeZonePart;
                    timeZonePart = '7' + timeZonePart;
                } else {
                    timeZonePart = '3' + timeZonePart;
                }
                var output = '';
                for (var i = 0; i < blocks; i++) {
                    output += random() + '-';
                }output += datePart;
                output += timeZonePart;
                return output;
            };

            /***/
        },
        /* 1 */
        /***/function (module, exports, __webpack_require__) {

            module.exports = __webpack_require__(0);

            /***/
        }]
        /******/)
    );
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--4-2!../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--4-2!../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".dyna-ui-field-wrapper {\n  outline: none;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--style-INLINE_ROUNDED {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  border: 1px solid;\n  border-radius: 4px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--style-INLINE_ROUNDED .dyna-ui-label {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 0 auto;\n          flex: 1 0 auto;\n  border-right: 1px solid;\n  line-height: 16px;\n  border-radius: 4px 0 0 4px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--style-INLINE_ROUNDED .dyna-ui-field-wrapper-container {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 100%;\n          flex: 1 1 100%;\n  position: relative;\n  border-radius: 0 4px 4px 0;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--style-INLINE_ROUNDED .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-required {\n  position: absolute;\n  top: 4px;\n  right: 16px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--style-INLINE_ROUNDED .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-isLoading {\n  position: absolute;\n  bottom: 4px;\n  right: 16px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--style-INLINE_ROUNDED .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-control-container {\n  width: 100%;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--style-INLINE_ROUNDED .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-control-container > * {\n  width: 100%;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--style-INLINE_ROUNDED .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-validation-message {\n  position: absolute;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-XSMALL .dyna-ui-label,\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-SMALL .dyna-ui-label {\n  padding: 12px;\n  font-size: 14px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-XSMALL .dyna-ui-field-wrapper-container,\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-SMALL .dyna-ui-field-wrapper-container {\n  padding: 8px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-XSMALL .dyna-ui-field-wrapper-container input,\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-SMALL .dyna-ui-field-wrapper-container input {\n  font-size: 14px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-XSMALL .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-required,\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-SMALL .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-required {\n  font-size: 11px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-XSMALL .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-isLoading,\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-SMALL .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-isLoading {\n  font-size: 11px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-XSMALL .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-control-container,\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-SMALL .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-control-container {\n  position: relative;\n  top: 3px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-XSMALL .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-validation-message,\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-SMALL .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-validation-message {\n  font-size: 12px;\n  line-height: 14px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-MEDIUM .dyna-ui-label {\n  padding: 16px;\n  font-size: 14px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-MEDIUM .dyna-ui-field-wrapper-container {\n  padding: 16px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-MEDIUM .dyna-ui-field-wrapper-container input {\n  font-size: 14px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-MEDIUM .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-required {\n  font-size: 11px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-MEDIUM .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-isLoading {\n  font-size: 11px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-MEDIUM .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-validation-message {\n  font-size: 12px;\n  line-height: 14px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-LARGE .dyna-ui-label {\n  padding: 24px;\n  font-size: 20px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-LARGE .dyna-ui-field-wrapper-container {\n  padding: 24px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-LARGE .dyna-ui-field-wrapper-container input {\n  font-size: 20px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-LARGE .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-required {\n  font-size: 11px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-LARGE .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-isLoading {\n  font-size: 11px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--size-LARGE .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-validation-message {\n  font-size: 12px;\n  line-height: 14px;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--mode-VIEW .dyna-ui-field-wrapper-container input {\n  cursor: default;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--mode-EDIT {\n  cursor: pointer;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--mode-EDIT .dyna-ui-label label {\n  cursor: pointer;\n}\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--4-2!../node_modules/less-loader/dist/cjs.js!./color.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--4-2!../node_modules/less-loader/dist/cjs.js!./color.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".dyna-ui-field-wrapper {\n  outline: none;\n  -webkit-transition: border-color 250ms ease-in-out, background-color 250ms ease-in-out;\n  transition: border-color 250ms ease-in-out, background-color 250ms ease-in-out;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-WHITE_BLACK {\n  border-color: black;\n  background-color: white;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-WHITE_BLACK .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-validation-message {\n  color: tomato;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-GRAY_WHITE_BLACK {\n  border-color: white;\n  background-color: #2A2A2A;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-GRAY_WHITE_BLACK .dyna-ui-label {\n  border-color: white;\n  background-color: #434343;\n  color: white;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-GRAY_WHITE_BLACK .dyna-ui-field-wrapper-container {\n  background-color: white;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-GRAY_WHITE_BLACK .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-control-container {\n  color: #2A2A2A;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-GRAY_WHITE_BLACK .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-validation-message {\n  color: tomato;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-GRAY_WHITE_BLACK.dyna-ui-field-wrapper--mode-VIEW .dyna-ui-field-wrapper-container {\n  background-color: #434343;\n  color: white;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-GRAY_WHITE_BLACK.dyna-ui-field-wrapper--mode-VIEW .dyna-ui-field-wrapper-container input {\n  background-color: #434343;\n  color: white;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-WHITE_RED {\n  border-color: red;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-WHITE_RED .dyna-ui-label {\n  border-color: #ff5455;\n  color: white;\n  background-color: red;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-WHITE_RED .dyna-ui-field-wrapper-container {\n  background-color: white;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-WHITE_RED .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-validation-message {\n  color: tomato;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-WHITE_RED.dyna-ui-field-wrapper--mode-VIEW .dyna-ui-field-wrapper-container {\n  background-color: red;\n  color: white;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-WHITE_RED.dyna-ui-field-wrapper--mode-VIEW .dyna-ui-field-wrapper-container input {\n  background-color: red;\n  color: white;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-BLACK_WHITE {\n  border-color: black;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-BLACK_WHITE .dyna-ui-label {\n  border-color: gray;\n  color: white;\n  background-color: black;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-BLACK_WHITE .dyna-ui-field-wrapper-container {\n  background-color: white;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-BLACK_WHITE .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-validation-message {\n  color: tomato;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-BLACK_WHITE.dyna-ui-field-wrapper--mode-VIEW .dyna-ui-field-wrapper-container {\n  background-color: black;\n  color: white;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-BLACK_WHITE.dyna-ui-field-wrapper--mode-VIEW .dyna-ui-field-wrapper-container input {\n  background-color: black;\n  color: white;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-TRANSPARENT_WHITE {\n  border-color: white;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-TRANSPARENT_WHITE .dyna-ui-label {\n  color: white;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-TRANSPARENT_WHITE .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-control-container {\n  color: white;\n  background-color: transparent;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-TRANSPARENT_WHITE .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-control-container input {\n  color: white;\n  background-color: transparent;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-TRANSPARENT_WHITE .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-validation-message {\n  color: tomato;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-ORANGE_WHITE {\n  border-color: #FF6900;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-ORANGE_WHITE .dyna-ui-label {\n  border-color: #FFAE62;\n  background-color: #FF6900;\n  color: white;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-ORANGE_WHITE .dyna-ui-field-wrapper-container {\n  background-color: white;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-ORANGE_WHITE .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-control-container {\n  color: black;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-ORANGE_WHITE .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-validation-message {\n  color: tomato;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-ORANGE_WHITE.dyna-ui-field-wrapper--mode-VIEW .dyna-ui-field-wrapper-container {\n  background-color: #FF6900;\n  color: white;\n}\n.dyna-ui-field-wrapper.dyna-ui-field-wrapper--color-ORANGE_WHITE.dyna-ui-field-wrapper--mode-VIEW .dyna-ui-field-wrapper-container input {\n  background-color: #FF6900;\n  color: white;\n}\n.dyna-ui-field-wrapper .dyna-ui-label {\n  -webkit-transition: color 250ms ease-in-out, background-color 250ms ease-in-out;\n  transition: color 250ms ease-in-out, background-color 250ms ease-in-out;\n}\n.dyna-ui-field-wrapper .dyna-ui-field-wrapper-container {\n  -webkit-transition: color 250ms ease-in-out, background-color 250ms ease-in-out;\n  transition: color 250ms ease-in-out, background-color 250ms ease-in-out;\n}\n.dyna-ui-field-wrapper .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-control-container {\n  -webkit-transition: color 250ms ease-in-out, background-color 250ms ease-in-out;\n  transition: color 250ms ease-in-out, background-color 250ms ease-in-out;\n}\n.dyna-ui-field-wrapper .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-control-container input {\n  -webkit-transition: color 250ms ease-in-out, background-color 250ms ease-in-out;\n  transition: color 250ms ease-in-out, background-color 250ms ease-in-out;\n}\n.dyna-ui-field-wrapper .dyna-ui-field-wrapper-container .dyna-ui-field-wrapper-validation-message {\n  -webkit-transition: color 250ms ease-in-out, background-color 250ms ease-in-out;\n  transition: color 250ms ease-in-out, background-color 250ms ease-in-out;\n}\n", ""]);

// exports


/***/ })
/******/ ]);
});
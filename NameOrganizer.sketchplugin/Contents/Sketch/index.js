var that = this;
function run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports['default'] = function (layerName) {
	var Format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	var name = layerName.replace(/\-(\w)/g, function (all, letter) {
		return letter.toUpperCase();
	});
	name = upperCase(name.split(' ')).join('').replace(/ /g, "").split('/');
	if (Format) {
		return upperCase(name).join(' / ');
	} else {
		return upperCase(name).join(' / ').replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^\-/, "").replace(/\:\-/g, ":").replace(/ \-/g, " ");
	}
};

function upperCase(name) {
	for (var i = 0, newArr = [], sumArr = []; i < name.length; i++) {
		var news = name[i][0].toUpperCase();
		newArr.push(news);
		var sums = name[i].slice(1);
		sumArr.push(sums);
		name[i] = newArr[i] + sumArr[i];
	}
	return name;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renameAll = exports.removeNumber = exports.sortArtboards = exports.panel = undefined;

var _sortArtboards = __webpack_require__(2);

var _renameAll = __webpack_require__(4);

var _sketchModuleWebView = __webpack_require__(5);

var _sketchModuleWebView2 = _interopRequireDefault(_sketchModuleWebView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var panel = function panel(context) {
	var sketch = context.api();
	var webUI = new _sketchModuleWebView2['default'](context, 'panel/index.html', {
		identifier: 'name-organizer',
		x: 0,
		y: 0,
		width: 340,
		height: 532,
		onlyShowCloseButton: true,
		background: hexToNSColor('83FFBB'),
		title: ' ',
		hideTitleBar: false,
		shouldKeepAround: true,
		handlers: {
			onClick: function () {
				function onClick(callback) {
					try {
						var config = JSON.parse(callback);
						(0, _sortArtboards.sortArtboards)(context, config.PrefixNum, config.Order, config.Format);
						if (config.Rename.length > 0) {

							(0, _renameAll.renameAll)(context, config.Rename, config.Format);
						}
						;
					} catch (e) {
						sketch.alert(e, 'Debug');
					}
				}

				return onClick;
			}(),
			openWeb: function () {
				function openWeb(url) {
					NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));
				}

				return openWeb;
			}()
		}
	});
};

function hexToNSColor(hex) {
	var r = parseInt(hex.substring(0, 2), 16) / 255,
	    g = parseInt(hex.substring(2, 4), 16) / 255,
	    b = parseInt(hex.substring(4, 6), 16) / 255,
	    a = 1;
	return NSColor.colorWithRed_green_blue_alpha(r, g, b, a);
}

var removeNumber = function removeNumber(context) {
	return (0, _sortArtboards.sortArtboards)(context, false);
};

exports.panel = panel;
exports.sortArtboards = _sortArtboards.sortArtboards;
exports.removeNumber = removeNumber;
exports.renameAll = _renameAll.renameAll;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sortArtboards = undefined;

var _rename = __webpack_require__(0);

var _rename2 = _interopRequireDefault(_rename);

var _sort = __webpack_require__(3);

var _sort2 = _interopRequireDefault(_sort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var sortArtboards = function sortArtboards(context) {
	var PrefixNum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	var Order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


	var sketch = context.api();
	var doc = context.document;
	var artboards = Array();
	var pageArtboards = doc.currentPage().artboards();

	var removeNum = function removeNum(name) {
		return name.replace(/[0-9]+\:/, '');
	};

	for (var i = 0; i < pageArtboards.count(); i++) {
		artboards[i] = pageArtboards[i];
	}

	artboards.sort(function (a, b) {
		return a.frame().x() - b.frame().x();
	});
	artboards.sort(function (a, b) {
		return a.frame().y() - b.frame().y();
	});

	for (var _i = 0; _i < pageArtboards.count(); _i++) {
		var oldName = artboards[_i].name().toString();
		oldName = removeNum(oldName);
		oldName = (0, _rename2['default'])(oldName);
		var number = _i <= 8 ? '0' + (_i + 1).toString() : (_i + 1).toString();
		var name = number + ':' + oldName;
		artboards[_i].setName(name);
	}
	sketch.message('\uD83D\uDD8C Rename & Sort: ' + String(i) + ' Artboards');
	try {
		(0, _sort2['default'])(context, !Order);
	} catch (e) {
		sketch.alert(e, 'Debug');
	}
	if (!PrefixNum) {
		for (var i = 0; i < pageArtboards.count(); i++) {
			pageArtboards[i].setName(removeNum(pageArtboards[i].name().toString()));
		}
	}
};

exports.sortArtboards = sortArtboards;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
var sortAll = function sortAll(context) {
	var isAscending = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	var selection = context.document.currentPage().artboards();
	var moveBack = sendActionTimes.bind(null, context, 'moveBackward:');
	getSteps(selection, sortLayers(selection, isAscending)).forEach(function (steps) {
		return moveBack(steps.layer, steps.steps);
	});
};

function moveObject(array, atIndex, toIndex) {
	if (atIndex !== toIndex) {
		var object = array.objectAtIndex(atIndex).retain().autorelease();
		array.removeObjectAtIndex(atIndex);
		array.insertObject_atIndex(object, toIndex);
	}
	return array;
}

function sendActionTimes(context, action, object, times) {
	var doc = context.document;
	var page = doc.currentPage();
	var selection = context.selection;
	var selectedLayers = selection.mutableCopy();
	page.changeSelectionBySelectingLayers(nil);
	for (var i = 0; i < times; i++) {
		MSLayerMovement.moveBackward([object]);
	}
	page.changeSelectionBySelectingLayers(selectedLayers);
}

function sortLayers(layers, isAscending) {
	var sortDescriptor = NSSortDescriptor.sortDescriptorWithKey_ascending_selector('name', isAscending, 'localizedStandardCompare:');
	return layers.sortedArrayUsingDescriptors([sortDescriptor]);
}

function getSteps(selection, sortedLayers) {
	var steps = [];
	var selectedLayers = selection.mutableCopy();
	for (var i = 0; i < sortedLayers.count(); i++) {
		var layer = sortedLayers.objectAtIndex(i);
		var index = selectedLayers.indexOfObject(layer);
		steps.push({ layer: layer, steps: index - i });
		selectedLayers = moveObject(selectedLayers, index, i);
	}
	return steps;
}

exports['default'] = sortAll;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renameAll = undefined;

var _rename = __webpack_require__(0);

var _rename2 = _interopRequireDefault(_rename);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var renameAll = function renameAll(context) {
	var Rename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['SymbolInstance', 'TextStyle', 'LayerStyle'];
	var Format = arguments[2];

	var sketch = context.api();
	var doc = context.document;
	var pages = doc.pages();
	var Option = {
		SymbolInstance: ifExist(Rename, 'SymbolInstance'),
		TextStyle: ifExist(Rename, 'TextStyle'),
		LayerStyle: ifExist(Rename, 'LayerStyle')
	};

	var pages_loop = pages.objectEnumerator();

	while (page = pages_loop.nextObject()) {
		var artboards = page.artboards();
		var artboards_loop = artboards.objectEnumerator();
		while (artboard = artboards_loop.nextObject()) {
			if (Option.SymbolInstance) renameInstanceRecursive(artboard.layers(), Format);
			if (Option.TextStyle) renameLayers(artboard.layers(), doc.documentData().layerTextStyles(), Format);
			if (Option.LayerStyle) renameLayers(artboard.layers(), doc.documentData().layerStyles(), Format);
		}
	}

	sketch.message('🖌 Rename Done!');
};

var renameInstanceRecursive = function renameInstanceRecursive(layers, Format) {
	processLayers(layers, function (layer) {
		try {
			layer.setName((0, _rename2['default'])(layer.symbolMaster().name(), Format));
		} catch (e) {}
	});
};

var renameLayers = function renameLayers(layers, document, Format) {
	processLayers(layers, function (layer) {
		var sharedStyleID = layer.style().sharedObjectID();
		var allStyles = document.objects();

		var styleSearchPredicate = NSPredicate.predicateWithFormat('objectID == %@', sharedStyleID);
		var filteredStyles = allStyles.filteredArrayUsingPredicate(styleSearchPredicate);

		if (filteredStyles.length) layer.setName((0, _rename2['default'])(filteredStyles[0].name(), Format));
	});
};

var processLayers = function processLayers(layers, callback) {
	for (var i = 0; i < layers.count(); i++) {
		var layer = layers.objectAtIndex(i);
		if (layer['class']() == 'MSLayerGroup') {
			processLayers(layer.layers(), callback);
		} else {
			try {
				callback(layer);
			} catch (e) {}
		}
	}
};

function ifExist(array, word) {
	return array.indexOf(word) >= 0;
}

exports.renameAll = renameAll;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* globals NSUUID NSThread NSPanel NSMakeRect NSTexturedBackgroundWindowMask NSTitledWindowMask NSClosableWindowMask NSColor NSWindowMiniaturizeButton NSWindowZoomButton NSFloatingWindowLevel WebView COScript */
var MochaJSDelegate = __webpack_require__(6)
var parseQuery = __webpack_require__(7)

var coScript = COScript.currentCOScript()

var LOCATION_CHANGED = 'webView:didChangeLocationWithinPageForFrame:'

function WebUI (context, htmlName, options) {
  // ColorPicker main window
  var identifier = options.identifier || NSUUID.UUID().UUIDString()
  var threadDictionary = NSThread.mainThread().threadDictionary()
  var backgroundColor = options.background || NSColor.whiteColor()
  var panel = threadDictionary[identifier] ? threadDictionary[identifier] : NSPanel.alloc().init()

  // Window size
  panel.setFrame_display(NSMakeRect(
    options.x || 0,
    options.y || 0,
    options.width || 240,
    options.height || 180
  ), true)

  panel.setStyleMask(options.styleMask || (NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask))
  panel.setBackgroundColor(backgroundColor)

  if (options.onlyShowCloseButton) {
    panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true)
    panel.standardWindowButton(NSWindowZoomButton).setHidden(true)
  }

  // Titlebar
  panel.setTitle(options.title || context.plugin.name())
  if (options.hideTitleBar) {
    panel.setTitlebarAppearsTransparent(true)
  }

  panel.becomeKeyWindow()
  panel.setLevel(NSFloatingWindowLevel)

  threadDictionary[identifier] = panel

  if (options.shouldKeepAround !== false) { // Long-running script
    coScript.setShouldKeepAround(true)
  }

  // Add Web View to window
  var webView = WebView.alloc().initWithFrame(NSMakeRect(
    0,
    options.hideTitleBar ? -24 : 0,
    options.width || 240,
    (options.height || 180) - (options.hideTitleBar ? 0 : 24)
  ))

  if (options.frameLoadDelegate || options.handlers) {
    var handlers = options.frameLoadDelegate || {}
    if (options.handlers) {
      var lastQueryId
      handlers[LOCATION_CHANGED] = function (webview, frame) {
        var query = webview.windowScriptObject().evaluateWebScript('window.location.hash')
        query = parseQuery(query)
        if (query.pluginAction && query.actionId && query.actionId !== lastQueryId && query.pluginAction in options.handlers) {
          lastQueryId = query.actionId
          try {
            query.pluginArgs = JSON.parse(query.pluginArgs)
          } catch (err) {}
          options.handlers[query.pluginAction].apply(context, query.pluginArgs)
        }
      }
    }
    var frameLoadDelegate = new MochaJSDelegate(handlers)
    webView.setFrameLoadDelegate_(frameLoadDelegate.getClassInstance())
  }
  if (options.uiDelegate) {
    var uiDelegate = new MochaJSDelegate(options.uiDelegate)
    webView.setUIDelegate_(uiDelegate.getClassInstance())
  }

  webView.setOpaque(true)
  webView.setBackgroundColor(backgroundColor)
  webView.setMainFrameURL_(context.plugin.urlForResourceNamed(htmlName).path())

  panel.contentView().addSubview(webView)
  panel.center()
  panel.makeKeyAndOrderFront(null)

  return {
    panel: panel,
    eval: webView.stringByEvaluatingJavaScriptFromString,
    webView: webView
  }
}

WebUI.clean = function () {
  coScript.setShouldKeepAround(false)
}

module.exports = WebUI


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/* globals NSUUID MOClassDescription NSObject NSSelectorFromString NSClassFromString */

module.exports = function (selectorHandlerDict, superclass) {
  var uniqueClassName = 'MochaJSDelegate_DynamicClass_' + NSUUID.UUID().UUIDString()

  var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, superclass || NSObject)

  delegateClassDesc.registerClass()

  // Storage Handlers
  var handlers = {}

  // Define interface
  this.setHandlerForSelector = function (selectorString, func) {
    var handlerHasBeenSet = (selectorString in handlers)
    var selector = NSSelectorFromString(selectorString)

    handlers[selectorString] = func

    /*
      For some reason, Mocha acts weird about arguments: https://github.com/logancollins/Mocha/issues/28
      We have to basically create a dynamic handler with a likewise dynamic number of predefined arguments.
    */
    if (!handlerHasBeenSet) {
      var args = []
      var regex = /:/g
      while (regex.exec(selectorString)) {
        args.push('arg' + args.length)
      }

      var dynamicFunction = eval('(function (' + args.join(', ') + ') { return handlers[selectorString].apply(this, arguments); })')

      delegateClassDesc.addInstanceMethodWithSelector_function_(selector, dynamicFunction)
    }
  }

  this.removeHandlerForSelector = function (selectorString) {
    delete handlers[selectorString]
  }

  this.getHandlerForSelector = function (selectorString) {
    return handlers[selectorString]
  }

  this.getAllHandlers = function () {
    return handlers
  }

  this.getClass = function () {
    return NSClassFromString(uniqueClassName)
  }

  this.getClassInstance = function () {
    return NSClassFromString(uniqueClassName).new()
  }

  // Convenience
  if (typeof selectorHandlerDict === 'object') {
    for (var selectorString in selectorHandlerDict) {
      this.setHandlerForSelector(selectorString, selectorHandlerDict[selectorString])
    }
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (query) {
  query = query.split('?')[1]
  if (!query) { return }
  query = query.split('&').reduce(function (prev, s) {
    var res = s.split('=')
    if (res.length === 2) {
      prev[decodeURIComponent(res[0])] = decodeURIComponent(res[1])
    }
    return prev
  }, {})
  return query
}


/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['panel'] = run.bind(this, 'panel');
that['onRun'] = run.bind(this, 'default');
that['sortArtboards'] = run.bind(this, 'sortArtboards');
that['removeNumber'] = run.bind(this, 'removeNumber');
that['renameAll'] = run.bind(this, 'renameAll')

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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renameAll = exports.removeNumber = exports.sortArtboards = undefined;

var _sortArtboards = __webpack_require__(2);

var _renameAll = __webpack_require__(4);

exports.sortArtboards = _sortArtboards.sortArtboards;
exports.removeNumber = _sortArtboards.removeNumber;
exports.renameAll = _renameAll.renameAll;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports['default'] = function (layerName) {
	var name = layerName.split(' ');
	name = upperCase(name).join('').replace(/ /g, "").split('/');
	return upperCase(name).join(' / ');
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.removeNumber = exports.sortArtboards = undefined;

var _rename = __webpack_require__(1);

var _rename2 = _interopRequireDefault(_rename);

var _sort = __webpack_require__(3);

var _sort2 = _interopRequireDefault(_sort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var sortArtboards = function sortArtboards(context) {
	var ifNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


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
		(0, _sort2['default'])(context);
	} catch (e) {
		sketch.alert(e, 'Debug');
	}
	if (!ifNumber) {
		for (var i = 0; i < pageArtboards.count(); i++) {
			pageArtboards[i].setName(removeNum(pageArtboards[i].name().toString()));
		}
	}
};

var removeNumber = function removeNumber(context) {
	sortArtboards(context, false);
};

exports.sortArtboards = sortArtboards;
exports.removeNumber = removeNumber;

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

var _rename = __webpack_require__(1);

var _rename2 = _interopRequireDefault(_rename);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renameAll = function renameAll(context) {
	var sketch = context.api();
	var doc = context.document;
	var pages = doc.pages();
	for (var i = 0; i < pages.count(); i++) {
		renameInstanceRecursive(pages.objectAtIndex(i));
	}
	renameStyleLayer(context);
	sketch.message("🖌 Rename Done!");
};

var renameInstanceRecursive = function renameInstanceRecursive(selected) {
	selected.setName((0, _rename2["default"])(selected.name().toString()));
	if (selected instanceof MSSymbolInstance && selected.name() != selected.symbolMaster().name().trim()) {
		selected.setName(selected.symbolMaster().name());
		updateCount++;
		return;
	}
	try {
		var children = selected.layers();
		for (var i = 0; i < children.length; i++) {
			renameInstanceRecursive(children.objectAtIndex(i));
		}
	} catch (e) {}
};

var renameStyleLayer = function renameStyleLayer(context) {
	var document = context.document;
	var pages = document.pages();
	var pages_loop = pages.objectEnumerator();

	while (page = pages_loop.nextObject()) {
		var artboards = page.artboards();
		var artboards_loop = artboards.objectEnumerator();
		while (artboard = artboards_loop.nextObject()) {
			renameLayers(artboard.layers(), document.documentData().layerTextStyles());
			renameLayers(artboard.layers(), document.documentData().layerStyles());
		}
	}
};

var renameLayers = function renameLayers(layers, document) {
	processLayers(layers, function (layer) {
		var sharedStyleID = layer.style().sharedObjectID();
		var allStyles = document.objects();

		var styleSearchPredicate = NSPredicate.predicateWithFormat("objectID == %@", sharedStyleID);
		var filteredStyles = allStyles.filteredArrayUsingPredicate(styleSearchPredicate);

		if (filteredStyles.length) layer.setName((0, _rename2["default"])(filteredStyles[0].name()));
	});
};

var processLayers = function processLayers(layers, callback) {
	for (var i = 0; i < layers.count(); i++) {
		var layer = layers.objectAtIndex(i);
		if (layer["class"]() == "MSLayerGroup") {
			processLayers(layer.layers(), callback);
		} else {
			try {
				callback(layer);
			} catch (e) {}
		}
	}
};

exports.renameAll = renameAll;

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['sortArtboards'] = run.bind(this, 'sortArtboards');
that['onRun'] = run.bind(this, 'default');
that['removeNumber'] = run.bind(this, 'removeNumber');
that['renameAll'] = run.bind(this, 'renameAll')

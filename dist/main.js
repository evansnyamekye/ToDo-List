/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 2 */
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 4 */
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 6 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 7 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 8 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `html {
  scroll-behavior: smooth;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background: #61619d;
}

i {
  cursor: pointer;
}

.msg {
  display: none;
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
  margin-top: 20px;
  width: 300px;
  padding: 10px 80px;
  border-radius: 15px;
  text-align: center;
  color: #fff;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 40px;
  max-width: 600px;
  margin: auto;
}

.card {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 3px 10px rgba(243, 239, 239, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 15px 15px;
  background: #727eda;
  color: #fff;
}

.card-header p {
  font-family: 'Poppins', sans-serif;
  color: #323232;
}

.card-body {
  height: 100%;
  border-bottom: 1px solid #ccc;
  max-height: 500px;
  overflow-y: auto;
}

.card-body .form-field {
  padding: 15px 15px;
  border-bottom: 1px solid #ccc;
}

.card-body .form-field i {
  color: #171723;
}

.form {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.ul .edit {
  width: 93%;
  font-size: 16px;
  border: none;
  background: transparent;
}

.form .desc {
  width: 100%;
  font-size: 16px;
  font-style: italic;
  border: none;
  background: transparent;
}

.form .desc:focus {
  outline: none;
}

.ul .edit:focus {
  outline: none;
}

ul {
  /* padding: 15px 15px; */
  list-style-type: none;
}

ul li {
  border-bottom: 1px solid #ccc;
  padding: 15px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.active {
  background: #fffeca;
}

.hidden {
  display: none;
}

.completed {
  text-decoration: line-through;
  color: gray;
  font-style: italic;
}

ul li div {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  gap: 10px;
  height: 100%;
}

li.dragging {
  background: rgba(224, 223, 223, 0.5);
}

li.placeholder {
  height: 50px;
  background: #f1f1f1;
  border: 1px dashed #ccc;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 15px 15px;
  background: #d5d7d5;
}

.card-footer button {
  font-family: 'Poppins', sans-serif;
  color: #171723;
  font-size: 18px;
  font-weight: 300;
}

.card-footer:hover  {
  opacity: 0.5;
}

button {
  display: inline-block;
  cursor: pointer;
  border: none;
  background: none;
  margin: auto;
  color: #fff;
  font-weight: 600;
}

button:active {
  transform: scale(0.9);
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 10 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Todo {
  constructor(index, description, completed) {
    this.index = index;
    this.description = description;
    this.completed = completed;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Todo);

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class UI {
  errorMsg(message, color) {
    this.message = message;
    this.color = color;
    const msg = document.querySelector('.msg');
    msg.style.display = 'block';
    msg.innerText = message;
    msg.style.background = color;
    setTimeout(() => {
      msg.style.display = 'none';
    }, 3000);
  }

  static getItem() {
    let todoData;
    if (localStorage.getItem('todoData') === null) {
      todoData = [];
    } else {
      todoData = JSON.parse(localStorage.getItem('todoData'));
    }
    return todoData;
  }

  displayTask(newTodo) {
    this.newTodo = newTodo;
    const ul = document.querySelector('.ul');
    const list = document.createElement('li');
    list.id = 'list';
    list.className = newTodo.index;
    const div = document.createElement('div');
    div.className = 'divn';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = newTodo.index;
    checkbox.className = 'check';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = newTodo.index;
    input.className = 'edit';
    input.value = newTodo.description;

    if (newTodo.completed === true) {
      input.classList.add('completed');
      checkbox.checked = true;
    } else {
      input.classList.remove('completed');
      checkbox.checked = false;
    }

    const ellipsisIcon = document.createElement('i');
    ellipsisIcon.id = 'bar';
    ellipsisIcon.className = 'fas fa-ellipsis-v';

    const trashIcon = document.createElement('i');
    trashIcon.id = 'remove';
    trashIcon.className = 'fas fa-trash-alt hidden';

    div.appendChild(checkbox);
    div.appendChild(input);

    list.appendChild(div);
    list.appendChild(ellipsisIcon);
    list.appendChild(trashIcon);
    ul.appendChild(list);

    const newInput = list.querySelector('.edit');
    newInput.addEventListener('input', () => {
      // Update the description of the task
      newTodo.description = newInput.value;

      // Update the task in the localStorage
      UI.updateTaskInLocalStorage(newTodo.index, newTodo);
    });

    newInput.addEventListener('focusin', () => {
      const allListItems = document.querySelectorAll('.ul li');
      allListItems.forEach((item) => {
        if (item === list) {
          item.classList.add('active');
          const trashIcon = item.querySelector('.fa-trash-alt');
          const ellipsisIcon = item.querySelector('.fa-ellipsis-v');
          trashIcon.classList.remove('hidden');
          ellipsisIcon.classList.add('hidden');
        }
      });

      // Check if the 'active' class is removed
      if (list.classList.contains('active')) {
        trashIcon.classList.remove('hidden');
        ellipsisIcon.classList.add('hidden');
      }
    });

    newInput.addEventListener('focusout', () => {
      const allListItems = document.querySelectorAll('.ul li');
      allListItems.forEach((item) => {
        if (item !== list) {
          item.classList.remove('active');
          const trashIcon = item.querySelector('.fa-trash-alt');
          const ellipsisIcon = item.querySelector('.fa-ellipsis-v');
          trashIcon.classList.add('hidden');
          ellipsisIcon.classList.remove('hidden');
        }
      });
    });

    // Add event listener to check if completed === true
    const checkboxI = list.querySelector('.check');
    checkboxI.addEventListener('change', () => {
      // Update the status of the task
      newTodo.completed = !newTodo.completed;

      if (newTodo.completed === true) {
        input.classList.add('completed');
        checkbox.checked = true;
      } else {
        input.classList.remove('completed');
        checkbox.checked = false;
      }

      // Update the task in the localStorage
      UI.updateTaskInLocalStorage(newTodo.index, newTodo);
    });

    // Add event listener to delete icon
    trashIcon.addEventListener('click', () => {
      const taskId = newTodo.index;

      // Remove the task from the UI
      ul.removeChild(list);

      // Remove the task from the localStorage
      UI.deleteTaskFromLocalStorage(taskId);
    });
  }

  static addToLocalStorage(newTodo) {
    this.newTodo = newTodo;
    const todoData = UI.getItem();
    todoData.push(newTodo);
    localStorage.setItem('todoData', JSON.stringify(todoData));
  }

  static updateTaskInLocalStorage(taskId, updatedTodo) {
    const todoData = UI.getItem();
    const taskIndex = todoData.findIndex((todo) => todo.index === taskId);
    if (taskIndex !== -1) {
      todoData[taskIndex] = updatedTodo;
      localStorage.setItem('todoData', JSON.stringify(todoData));
    }
  }

  static deleteTaskFromLocalStorage(taskId) {
    const ui = new UI();
    const todoData = UI.getItem();
    const taskIndex = todoData.findIndex((todo) => todo.index === taskId);
    if (taskIndex !== -1) {
      todoData.splice(taskIndex, 1);
      localStorage.setItem('todoData', JSON.stringify(todoData));
    }
    ui.errorMsg('Success', 'rgba(9, 186, 9, 0.5)');
  }

  static clearCompletedTasks() {
    const todoData = UI.getItem();
    const ui = new UI();

    // Filter out completed tasks
    const incompleteTasks = todoData.filter((todo) => !todo.completed);

    // Update localStorage with incomplete tasks
    localStorage.setItem('todoData', JSON.stringify(incompleteTasks));

    // Remove completed tasks from the UI
    const completedTasks = document.querySelectorAll('.completed');
    completedTasks.forEach((task) => {
      const listItem = task.closest('li');
      listItem.parentNode.removeChild(listItem);
    });

    ui.errorMsg('Success', 'rgba(9, 186, 9, 0.5)');
  }

  static displayFromLocalStorage() {
    const ui = new UI();
    const todoList = UI.getItem();
    todoList.forEach((todo) => {
      ui.displayTask(todo);
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _modules_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);




const ui = new _modules_ui__WEBPACK_IMPORTED_MODULE_2__["default"]();
const form = document.querySelector('.form');
const clearBtn = document.querySelector('.clearBtn');

document.addEventListener('DOMContentLoaded', _modules_ui__WEBPACK_IMPORTED_MODULE_2__["default"].displayFromLocalStorage);

// Add todo list
form.addEventListener('submit', (e) => {
  const desc = document.querySelector('.desc').value;
  const newId = _modules_ui__WEBPACK_IMPORTED_MODULE_2__["default"].getItem();
  let index;
  if (newId.length > 0) {
    index = newId[newId.length - 1].index + 1;
  } else {
    index = 0;
  }

  const completed = false;

  if (desc === '') {
    ui.errorMsg('Error', 'rgba(255, 0, 0, 0.5)');
  } else {
    // Init todo data
    const newTodo = new _modules_data__WEBPACK_IMPORTED_MODULE_1__["default"](index, desc, completed);

    // Display data on ui
    ui.displayTask(newTodo);

    _modules_ui__WEBPACK_IMPORTED_MODULE_2__["default"].addToLocalStorage(newTodo);

    ui.errorMsg('Success', 'rgba(9, 186, 9, 0.5)');

    document.querySelector('.desc').value = '';
  }

  e.preventDefault();
});

// Clear all task
clearBtn.addEventListener('click', _modules_ui__WEBPACK_IMPORTED_MODULE_2__["default"].clearCompletedTasks);

})();

/******/ })()
;
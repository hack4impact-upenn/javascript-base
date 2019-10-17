webpackHotUpdate("static/development/pages/admin.js",{

/***/ "./components/Usertable.js":
/*!*********************************!*\
  !*** ./components/Usertable.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MaterialTableDemo; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var material_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! material-table */ "./node_modules/material-table/dist/index.js");
/* harmony import */ var material_table__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(material_table__WEBPACK_IMPORTED_MODULE_5__);




var _jsxFileName = "/Users/danieltian/Desktop/Hack4Impact/javascript-base/components/Usertable.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement;


function MaterialTableDemo() {
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState({
    columns: [{
      title: "Name",
      field: "name"
    }, {
      title: "Surname",
      field: "surname"
    }, {
      title: "Birth Year",
      field: "birthYear",
      type: "numeric"
    }, {
      title: "Birth Place",
      field: "birthCity",
      lookup: {
        34: "İstanbul",
        63: "Şanlıurfa"
      }
    }],
    data: [{
      name: "Mehmet",
      surname: "Baran",
      birthYear: 1987,
      birthCity: 63
    }, {
      name: "Zerya Betül",
      surname: "Baran",
      birthYear: 2017,
      birthCity: 34
    }]
  }),
      _React$useState2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  return __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, __jsx("link", {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/icon?family=Material+Icons",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }), __jsx(material_table__WEBPACK_IMPORTED_MODULE_5___default.a, {
    title: "Editable Example",
    columns: state.columns,
    data: state.data,
    editable: {
      onRowAdd: function onRowAdd(newData) {
        return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a(function (resolve) {
          setTimeout(function () {
            resolve();

            var data = Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(state.data);

            data.push(newData);
            setState(Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
              data: data
            }));
          }, 600);
        });
      },
      onRowUpdate: function onRowUpdate(newData, oldData) {
        return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a(function (resolve) {
          setTimeout(function () {
            resolve();

            var data = Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(state.data);

            data[data.indexOf(oldData)] = newData;
            setState(Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
              data: data
            }));
          }, 600);
        });
      },
      onRowDelete: function onRowDelete(oldData) {
        return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a(function (resolve) {
          setTimeout(function () {
            resolve();

            var data = Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(state.data);

            data.splice(data.indexOf(oldData), 1);
            setState(Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
              data: data
            }));
          }, 600);
        });
      }
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }));
}

/***/ })

})
//# sourceMappingURL=admin.js.18d6a386eb5b7bb8090a.hot-update.js.map
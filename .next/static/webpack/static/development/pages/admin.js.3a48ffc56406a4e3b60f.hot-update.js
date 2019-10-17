webpackHotUpdate("static/development/pages/admin.js",{

/***/ "./components/Usertable.js":
/*!*********************************!*\
  !*** ./components/Usertable.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReactVirtualizedTable; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/TableCell */ "./node_modules/@material-ui/core/esm/TableCell/index.js");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/Paper */ "./node_modules/@material-ui/core/esm/Paper/index.js");
/* harmony import */ var react_virtualized__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-virtualized */ "./node_modules/react-virtualized/dist/es/index.js");











var _jsxFileName = "/Users/danieltian/Desktop/Hack4Impact/javascript-base/components/Usertable.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement;








var styles = function styles(theme) {
  return {
    flexContainer: {
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box"
    },
    tableRow: {
      cursor: "pointer"
    },
    tableRowHover: {
      "&:hover": {
        backgroundColor: theme.palette.grey[200]
      }
    },
    tableCell: {
      flex: 1
    },
    noClick: {
      cursor: "initial"
    }
  };
};

var MuiVirtualizedTable =
/*#__PURE__*/
function (_React$PureComponent) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_9__["default"])(MuiVirtualizedTable, _React$PureComponent);

  function MuiVirtualizedTable() {
    var _getPrototypeOf2;

    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, MuiVirtualizedTable);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(MuiVirtualizedTable)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this), "getRowClassName", function (_ref) {
      var index = _ref.index;
      var _this$props = _this.props,
          classes = _this$props.classes,
          onRowClick = _this$props.onRowClick;
      return Object(clsx__WEBPACK_IMPORTED_MODULE_13__["default"])(classes.tableRow, classes.flexContainer, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__["default"])({}, classes.tableRowHover, index !== -1 && onRowClick != null));
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this), "cellRenderer", function (_ref2) {
      var cellData = _ref2.cellData,
          columnIndex = _ref2.columnIndex;
      var _this$props2 = _this.props,
          columns = _this$props2.columns,
          classes = _this$props2.classes,
          rowHeight = _this$props2.rowHeight,
          onRowClick = _this$props2.onRowClick;
      return __jsx(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_15__["default"], {
        component: "div",
        className: Object(clsx__WEBPACK_IMPORTED_MODULE_13__["default"])(classes.tableCell, classes.flexContainer, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__["default"])({}, classes.noClick, onRowClick == null)),
        variant: "body",
        style: {
          height: rowHeight
        },
        align: columnIndex != null && columns[columnIndex].numeric || false ? "right" : "left",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        },
        __self: this
      }, cellData);
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this), "headerRenderer", function (_ref3) {
      var label = _ref3.label,
          columnIndex = _ref3.columnIndex;
      var _this$props3 = _this.props,
          headerHeight = _this$props3.headerHeight,
          columns = _this$props3.columns,
          classes = _this$props3.classes;
      return __jsx(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_15__["default"], {
        component: "div",
        className: Object(clsx__WEBPACK_IMPORTED_MODULE_13__["default"])(classes.tableCell, classes.flexContainer, classes.noClick),
        variant: "head",
        style: {
          height: headerHeight
        },
        align: columns[columnIndex].numeric || false ? "right" : "left",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        },
        __self: this
      }, __jsx("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        },
        __self: this
      }, label));
    });

    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(MuiVirtualizedTable, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          classes = _this$props4.classes,
          columns = _this$props4.columns,
          rowHeight = _this$props4.rowHeight,
          headerHeight = _this$props4.headerHeight,
          tableProps = Object(_babel_runtime_corejs2_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__["default"])(_this$props4, ["classes", "columns", "rowHeight", "headerHeight"]);

      return __jsx(react_virtualized__WEBPACK_IMPORTED_MODULE_17__["AutoSizer"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        },
        __self: this
      }, function (_ref4) {
        var height = _ref4.height,
            width = _ref4.width;
        return __jsx(react_virtualized__WEBPACK_IMPORTED_MODULE_17__["Table"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
          height: height,
          width: width,
          rowHeight: rowHeight,
          headerHeight: headerHeight
        }, tableProps, {
          rowClassName: _this2.getRowClassName,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 97
          },
          __self: this
        }), columns.map(function (_ref5, index) {
          var dataKey = _ref5.dataKey,
              other = Object(_babel_runtime_corejs2_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__["default"])(_ref5, ["dataKey"]);

          return __jsx(react_virtualized__WEBPACK_IMPORTED_MODULE_17__["Column"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
            key: dataKey,
            headerRenderer: function headerRenderer(headerProps) {
              return _this2.headerRenderer(Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__["default"])({}, headerProps, {
                columnIndex: index
              }));
            },
            className: classes.flexContainer,
            cellRenderer: _this2.cellRenderer,
            dataKey: dataKey
          }, other, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 107
            },
            __self: this
          }));
        }));
      });
    }
  }]);

  return MuiVirtualizedTable;
}(react__WEBPACK_IMPORTED_MODULE_11___default.a.PureComponent);

Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__["default"])(MuiVirtualizedTable, "defaultProps", {
  headerHeight: 48,
  rowHeight: 48
});

MuiVirtualizedTable.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.object.isRequired,
  columns: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.shape({
    dataKey: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.string.isRequired,
    label: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.string.isRequired,
    numeric: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.bool,
    width: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.number.isRequired
  })).isRequired,
  headerHeight: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.number,
  onRowClick: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.func,
  rowHeight: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.number
};
var VirtualizedTable = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_14__["withStyles"])(styles)(MuiVirtualizedTable); // ---

var sample = [["Frozen yoghurt", 159, 6.0, 24, 4.0], ["Ice cream sandwich", 237, 9.0, 37, 4.3], ["Eclair", 262, 16.0, 24, 6.0], ["Cupcake", 305, 3.7, 67, 4.3], ["Gingerbread", 356, 16.0, 49, 3.9]];

function createData(id, dessert, calories, fat, carbs, protein) {
  return {
    id: id,
    dessert: dessert,
    calories: calories,
    fat: fat,
    carbs: carbs,
    protein: protein
  };
}

var rows = [];

for (var i = 0; i < 200; i += 1) {
  var randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData.apply(void 0, [i].concat(Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(randomSelection))));
}

function ReactVirtualizedTable() {
  return __jsx(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_16__["default"], {
    style: {
      height: 500,
      padding: 20,
      margin: 20
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 169
    },
    __self: this
  }, __jsx(VirtualizedTable, {
    rowCount: rows.length,
    rowGetter: function rowGetter(_ref6) {
      var index = _ref6.index;
      return rows[index];
    },
    columns: [{
      width: "20%",
      label: "Dessert",
      dataKey: "dessert"
    }, {
      width: 120,
      label: "Calories\xA0(g)",
      dataKey: "calories",
      numeric: true
    }, {
      width: 120,
      label: "Fat\xA0(g)",
      dataKey: "fat",
      numeric: true
    }, {
      width: 120,
      label: "Carbs\xA0(g)",
      dataKey: "carbs",
      numeric: true
    }, {
      width: 120,
      label: "Protein\xA0(g)",
      dataKey: "protein",
      numeric: true
    }],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 170
    },
    __self: this
  }));
}

/***/ })

})
//# sourceMappingURL=admin.js.3a48ffc56406a4e3b60f.hot-update.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStore = exports.StoreProvider = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ui = require('./ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StoreContext = (0, _react.createContext)(_ui.initialState);

var StoreProvider = exports.StoreProvider = function StoreProvider(_ref) {
  var children = _ref.children;

  var _useReducer = (0, _react.useReducer)(_ui2.default, _ui.initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  return _react2.default.createElement(
    StoreContext.Provider,
    { value: { state: state, dispatch: dispatch } },
    children
  );
};

var useStore = exports.useStore = function useStore(store) {
  var _useContext = (0, _react.useContext)(StoreContext),
      state = _useContext.state,
      dispatch = _useContext.dispatch;

  return { state: state, dispatch: dispatch };
};
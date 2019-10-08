'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _PassageSpan = require('./PassageSpan');

var _PassageSpan2 = _interopRequireDefault(_PassageSpan);

var _Icon = require('./Icon.js');

var _Icon2 = _interopRequireDefault(_Icon);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _useStore2 = require('./stores/useStore');

var _ui = require('./stores/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Passage = function Passage(_ref) {
  var emptyQuery = _ref.emptyQuery,
      readOnly = _ref.readOnly,
      text = _ref.text,
      inputText = _ref.inputText,
      onKeyPress = _ref.onKeyPress,
      onChange = _ref.onChange,
      loading = _ref.loading,
      roots = _ref.roots,
      styles = _ref.styles,
      errorState = _ref.errorState;

  var _useStore = (0, _useStore2.useStore)(),
      state = _useStore.state,
      dispatch = _useStore.dispatch;

  var selectedNodeId = state.selectedNodeId,
      hoverNodeId = state.hoverNodeId;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      focused = _useState2[0],
      setFocused = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      autoFocus = _useState4[0],
      setAutoFocus = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      passageActive = _useState6[0],
      setPassageActive = _useState6[1];

  (0, _react.useEffect)(function () {
    window.addEventListener('keyup', handleSpaceBar);
    return function () {
      window.removeEventListener('keyup', handleSpaceBar);
    };
  }, []);

  (0, _react.useEffect)(function () {
    handleEmpty();
  }, []);

  var passageInput = (0, _react.useRef)(null);

  var handleEmpty = function handleEmpty() {
    if (emptyQuery === true) {
      switch (autoFocus) {
        case null:
          setAutoFocus(true);
          break;
        case true:
          handleFocus();
          setAutoFocus(false);
          break;
      }
    }
  };

  var handleEsc = function handleEsc(e) {
    if (e.keyCode === 27) {
      handleBlur();
    }
  };

  var handleSpaceBar = function handleSpaceBar(e) {

    if (!loading && !readOnly) {
      if (focused === false && e.keyCode === 32) {
        e.preventDefault();
        handleFocus();
      }
    }

    if (focused && e.key === 'Enter' && !readOnly) {
      handleBlur();
    }
  };

  var handleFocus = function handleFocus() {
    setFocused(true);
    _reactDom2.default.findDOMNode(passageInput).focus();
    dispatch((0, _ui.focusNode)('defocus'));
  };

  var handleBlur = function handleBlur() {
    if (emptyQuery === true) {
      handleFocus();
    } else {
      setFocused(false);
      _reactDom2.default.findDOMNode(passageInput).blur();
    }
  };

  var handleMouseOver = function handleMouseOver() {
    return setPassageActive(true);
  };
  var handleMouseOut = function handleMouseOut() {
    return setPassageActive(false);
  };

  //render

  var passageConditionalClasses = (0, _bind2.default)({
    "passage--editing": focused,
    "passage--active": passageActive,
    "passage--loading": loading
  });

  return _react2.default.createElement(
    'div',
    { id: 'passage', className: passageConditionalClasses },
    _react2.default.createElement('div', { className: 'passage__focus-trigger',
      onDoubleClick: !readOnly ? handleFocus : function () {} }),
    !readOnly ? _react2.default.createElement('textarea', {
      ref: passageInput,
      rows: '1',
      onBlur: handleBlur,
      onKeyPress: onKeyPress,
      onKeyUp: handleEsc,
      readOnly: readOnly,
      onChange: onChange,
      disabled: loading,
      value: inputText !== null ? inputText : "" }) : null,
    _react2.default.createElement(
      'p',
      { onDoubleClick: !readOnly ? handleFocus : function () {} },
      _react2.default.createElement(
        'span',
        { className: 'passage__readonly' },
        roots.map(function (root, idx) {
          return _react2.default.createElement(_PassageSpan2.default, {
            key: idx,
            text: text,
            data: root,
            styles: styles,
            depth: 0
          });
        }),
        !readOnly ? _react2.default.createElement(
          'span',
          { className: 'passage__edit',
            onClick: handleFocus,
            onMouseOver: handleMouseOver,
            onMouseOut: handleMouseOut,
            title: 'Edit query' },
          _react2.default.createElement(_Icon2.default, { symbol: 'edit', wrapperClass: 'passage__edit__trigger' })
        ) : null
      )
    ),
    _react2.default.createElement('div', { className: 'passage__loading-mask' })
  );
};

Passage.propTypes = {
  readOnly: _propTypes2.default.bool,
  text: _propTypes2.default.string.isRequired,
  inputText: _propTypes2.default.string,
  //onKeyPress: PropTypes.func.isRequired,
  //onChange: PropTypes.func.isRequired,
  focusNode: _propTypes2.default.func,
  loading: _propTypes2.default.bool,
  emptyQuery: _propTypes2.default.bool,
  errorState: _propTypes2.default.bool,
  roots: _propTypes2.default.array,
  styles: _propTypes2.default.object,
  selectedNodeId: _propTypes2.default.string,
  hoverNodeId: _propTypes2.default.string,
  hoverNode: _propTypes2.default.func
};

exports.default = Passage;
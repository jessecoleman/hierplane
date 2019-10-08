'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('../Icon.js');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UiToggle = function UiToggle(_ref) {
  var onUiMouseOver = _ref.onUiMouseOver,
      onUiMouseOut = _ref.onUiMouseOut,
      onUiMouseUp = _ref.onUiMouseUp;
  return _react2.default.createElement(
    'div',
    { className: 'node__word__ui node__word__ui--toggle',
      onMouseOver: onUiMouseOver,
      onMouseOut: onUiMouseOut,
      onMouseUp: onUiMouseUp },
    _react2.default.createElement(
      'div',
      { className: 'node__word__ui__glyph' },
      _react2.default.createElement(_Icon2.default, { symbol: 'expand', wrapperClass: 'node__word__ui__glyph__svg node__word__ui__glyph__svg--expand' }),
      _react2.default.createElement(_Icon2.default, { symbol: 'collapse', wrapperClass: 'node__word__ui__glyph__svg node__word__ui__glyph__svg--collapse' })
    )
  );
};

UiToggle.propTypes = {
  onUiMouseOver: _propTypes2.default.func,
  onUiMouseOut: _propTypes2.default.func,
  onUiMouseUp: _propTypes2.default.func
};

exports.default = UiToggle;
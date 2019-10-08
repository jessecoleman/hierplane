'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('./Icon.js');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `Toolbar` displays the Euclid tool buttons.
var EmptyTree = function EmptyTree() {
  return _react2.default.createElement(
    'div',
    { className: 'main-stage__error-container' },
    _react2.default.createElement(
      'div',
      { className: 'parse-error' },
      _react2.default.createElement(_Icon2.default, { symbol: 'keyboard', wrapperClass: 'parse-error__icon' }),
      _react2.default.createElement(
        'h1',
        { className: 'parse-error__primary' },
        _react2.default.createElement(
          'span',
          null,
          'Enter your query above'
        )
      ),
      _react2.default.createElement(
        'p',
        { className: 'parse-error__secondary' },
        _react2.default.createElement(
          'strong',
          null,
          'Press ',
          _react2.default.createElement(
            'span',
            { className: 'parse-error--key' },
            'enter'
          ),
          ' to parse.'
        )
      )
    )
  );
};

exports.default = EmptyTree;
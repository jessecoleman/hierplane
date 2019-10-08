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

var UiParseNav = function UiParseNav(_ref) {
  var readOnly = _ref.readOnly,
      onPnMouseOver = _ref.onPnMouseOver,
      onPnMouseOut = _ref.onPnMouseOut,
      onPnMouseUp = _ref.onPnMouseUp,
      data = _ref.data;


  var altParseInfoExists = data.hasOwnProperty("alternateParseInfo") && data.alternateParseInfo !== undefined;

  var arrowIcons = function arrowIcons(direction) {
    return _react2.default.createElement(
      'div',
      { className: 'node__word__ui__glyph node__word__ui__glyph--' + direction },
      _react2.default.createElement(_Icon2.default, { symbol: 'arrow-' + direction, wrapperClass: 'node__word__ui__glyph__svg' }),
      _react2.default.createElement(_Icon2.default, { symbol: 'arrow-' + direction + '--inverted', wrapperClass: 'node__word__ui__glyph__svg--inverted' })
    );
  };

  var createNavButton = function createNavButton(direction, target) {
    return altParseInfoExists && data.alternateParseInfo.hasOwnProperty(target + 'Parse') && !readOnly ? _react2.default.createElement(
      'div',
      { className: 'parse-nav-trigger-' + direction,
        onMouseOver: onPnMouseOver,
        onMouseOut: onPnMouseOut,
        onMouseUp: function onMouseUp() {
          onPnMouseUp(data, target);
        } },
      arrowIcons(direction)
    ) : _react2.default.createElement(
      'div',
      { className: 'parse-nav-trigger-' + direction + ' node__word__ui--disabled' },
      arrowIcons(direction)
    );
  };

  return _react2.default.createElement(
    'div',
    { className: 'node__word__ui node__word__ui--parse-nav' },
    createNavButton("left", "prev"),
    createNavButton("right", "next")
  );
};

UiParseNav.propTypes = {
  readOnly: _propTypes2.default.bool,
  data: _propTypes2.default.object,
  onPnMouseOver: _propTypes2.default.func,
  onPnMouseOut: _propTypes2.default.func,
  onPnMouseUp: _propTypes2.default.func
};

exports.default = UiParseNav;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeExpansionControl = function (_React$Component) {
  _inherits(TreeExpansionControl, _React$Component);

  function TreeExpansionControl() {
    _classCallCheck(this, TreeExpansionControl);

    return _possibleConstructorReturn(this, (TreeExpansionControl.__proto__ || Object.getPrototypeOf(TreeExpansionControl)).apply(this, arguments));
  }

  _createClass(TreeExpansionControl, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          mode = _props.mode,
          onClick = _props.onClick;

      // Enforce valid values of mode property

      var validModes = new Set(["explode", "implode"]);
      if (!validModes.has(mode)) {
        throw new Error('Invalid value of property "mode". Expected ("' + Array.from(validModes).join("\" or \"") + '") but found "' + mode + '" instead.');
      }

      return _react2.default.createElement(
        'div',
        { className: 'tree-expansion-control' },
        _react2.default.createElement(
          'div',
          { className: 'tree-expansion-control__glyph tree-expansion-control__glyph--' + mode },
          _react2.default.createElement('div', { className: 'tree-expansion-control__glyph__triangle tree-expansion-control__glyph__triangle--down' }),
          _react2.default.createElement('div', { className: 'tree-expansion-control__glyph__triangle tree-expansion-control__glyph__triangle--up' }),
          _react2.default.createElement('div', { className: 'tree-expansion-control__glyph__triangle tree-expansion-control__glyph__triangle--left' }),
          _react2.default.createElement('div', { className: 'tree-expansion-control__glyph__triangle tree-expansion-control__glyph__triangle--right' })
        ),
        _react2.default.createElement('div', { className: 'tree-expansion-control__trigger',
          onClick: onClick })
      );
    }
  }]);

  return TreeExpansionControl;
}(_react2.default.Component);

TreeExpansionControl.propTypes = {
  mode: _propTypes2.default.string,
  onClick: _propTypes2.default.func
};

exports.default = TreeExpansionControl;
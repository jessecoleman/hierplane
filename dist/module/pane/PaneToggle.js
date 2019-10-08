'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('../Icon.js');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// `Toolbar` displays the Euclid tool buttons.
var PaneToggle = function (_React$Component) {
  _inherits(PaneToggle, _React$Component);

  function PaneToggle() {
    _classCallCheck(this, PaneToggle);

    return _possibleConstructorReturn(this, (PaneToggle.__proto__ || Object.getPrototypeOf(PaneToggle)).apply(this, arguments));
  }

  _createClass(PaneToggle, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          sideBarCollapsed = _props.sideBarCollapsed,
          togglePane = _props.togglePane,
          icon = _props.icon,
          mode = _props.mode;


      return _react2.default.createElement(
        'div',
        { className: 'pane__toggle pane__toggle--' + icon + ' ' + (sideBarCollapsed ? "pane__toggle--sidebar-collapsed" : ""), onClick: function onClick() {
            togglePane(mode);
          } },
        _react2.default.createElement(_Icon2.default, { symbol: icon, wrapperClass: 'pane__toggle__glyph' })
      );
    }
  }]);

  return PaneToggle;
}(_react2.default.Component);

PaneToggle.propTypes = {
  sideBarCollapsed: _propTypes2.default.bool,
  togglePane: _propTypes2.default.func,
  icon: _propTypes2.default.string,
  mode: _propTypes2.default.string
};

exports.default = PaneToggle;
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

// `Toolbar` displays the Euclid tool buttons.
var PaneHandler = function (_React$Component) {
  _inherits(PaneHandler, _React$Component);

  function PaneHandler() {
    _classCallCheck(this, PaneHandler);

    return _possibleConstructorReturn(this, (PaneHandler.__proto__ || Object.getPrototypeOf(PaneHandler)).apply(this, arguments));
  }

  _createClass(PaneHandler, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          onMouseDown = _props.onMouseDown,
          onDoubleClick = _props.onDoubleClick,
          direction = _props.direction;


      return _react2.default.createElement(
        'div',
        { id: 'sidebar-handler',
          className: 'pane__handler pane__handler--' + direction,
          onMouseDown: onMouseDown,
          onDoubleClick: onDoubleClick },
        _react2.default.createElement(
          'div',
          { className: 'pane__handler__thumb' },
          _react2.default.createElement('div', { className: 'pane__handler__thumb__highlight' })
        )
      );
    }
  }]);

  return PaneHandler;
}(_react2.default.Component);

PaneHandler.propTypes = {
  onMouseDown: _propTypes2.default.func,
  onDoubleClick: _propTypes2.default.func,
  direction: _propTypes2.default.string
};

exports.default = PaneHandler;
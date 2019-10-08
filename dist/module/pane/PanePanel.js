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

var PanePanel = function (_React$Component) {
  _inherits(PanePanel, _React$Component);

  function PanePanel() {
    _classCallCheck(this, PanePanel);

    var _this = _possibleConstructorReturn(this, (PanePanel.__proto__ || Object.getPrototypeOf(PanePanel)).call(this));

    _this.state = {
      collapsed: false
    };
    return _this;
  }

  _createClass(PanePanel, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var collapsed = this.state.collapsed;
      var _props = this.props,
          panelHeader = _props.panelHeader,
          panelContent = _props.panelContent,
          padded = _props.padded;


      return _react2.default.createElement(
        'div',
        { className: 'pane__panel ' + (collapsed ? "pane__panel--collapsed" : "") },
        _react2.default.createElement(
          'div',
          { className: 'pane__panel__header', onClick: function onClick() {
              _this2.setState({ collapsed: !_this2.state.collapsed });
            } },
          _react2.default.createElement(
            'span',
            null,
            panelHeader
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'pane__panel__content ' + (padded ? "pane__panel__content--padded" : "") },
          panelContent
        )
      );
    }
  }]);

  return PanePanel;
}(_react2.default.Component);

PanePanel.propTypes = {
  panelHeader: _propTypes2.default.string,
  panelContent: _propTypes2.default.object,
  padded: _propTypes2.default.bool
};

exports.default = PanePanel;
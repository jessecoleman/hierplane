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

var AltParseNavToggle = function (_React$Component) {
  _inherits(AltParseNavToggle, _React$Component);

  function AltParseNavToggle() {
    _classCallCheck(this, AltParseNavToggle);

    var _this = _possibleConstructorReturn(this, (AltParseNavToggle.__proto__ || Object.getPrototypeOf(AltParseNavToggle)).call(this));

    _this.state = {
      interaction: "idle" // idle, hover, active
    };

    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    return _this;
  }

  _createClass(AltParseNavToggle, [{
    key: 'handleMouseUp',
    value: function handleMouseUp() {
      this.setState({
        interaction: "hover"
      });
      this.props.fetchAltParse(this.props.selectedData, this.props.direction);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          direction = _props.direction,
          keyInteraction = _props.keyInteraction,
          disabled = _props.disabled,
          loading = _props.loading;

      var icoArrow = _react2.default.createElement(_Icon2.default, { symbol: 'arrow-' + (direction === "prev" ? "left" : "right") + '--inverted' });

      var altParseTrigger = null;

      if (disabled === false) {
        altParseTrigger = _react2.default.createElement(
          'div',
          { className: 'pane__alt-parse__nav__trigger-' + direction + '\n            pane__alt-parse__nav--' + (keyInteraction === direction ? "active" : this.state.interaction),
            title: 'load ' + (direction === "prev" ? "previous" : "next") + ' parse',
            onMouseOver: function onMouseOver() {
              _this2.setState({ interaction: "hover" });
            },
            onMouseOut: function onMouseOut() {
              _this2.setState({ interaction: "idle" });
            },
            onMouseDown: function onMouseDown() {
              _this2.setState({ interaction: "active" });
            },
            onMouseUp: this.handleMouseUp },
          icoArrow
        );
      } else {
        altParseTrigger = _react2.default.createElement(
          'div',
          { className: 'pane__alt-parse__nav__trigger-' + direction + '\n            ' + (loading === false ? "pane__alt-parse__nav--disabled" : ""),
            onMouseOut: function onMouseOut() {
              _this2.setState({ interaction: "idle" });
            } },
          icoArrow
        );
      }

      return altParseTrigger;
    }
  }]);

  return AltParseNavToggle;
}(_react2.default.Component);

AltParseNavToggle.propTypes = {
  direction: _propTypes2.default.string,
  keyInteraction: _propTypes2.default.string,
  fetchAltParse: _propTypes2.default.func,
  selectedData: _propTypes2.default.object,
  disabled: _propTypes2.default.bool,
  loading: _propTypes2.default.bool
};

exports.default = AltParseNavToggle;
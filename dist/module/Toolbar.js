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
var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar() {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Toolbar, [{
    key: 'handleClick',
    value: function handleClick() {
      var win = window.open("", "_blank");
      var data = this.props.selectedData;
      var hasParses = data.hasOwnProperty("alternateParseInfo") && data.alternateParseInfo.hasOwnProperty("currentParseIndex");

      if (win) {
        win.document.write("<pre>" + JSON.stringify(this.props.jsonData, null, 2) + "</pre>");
        win.document.title = (hasParses ? "Parse: " + data.alternateParseInfo.currentParseIndex + "  |  " : "") + 'Node: ' + data.id;
        win.focus();
      } else {
        alert('Please allow popups for this website');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          jsonUrl = _props.jsonUrl,
          serverEndPoint = _props.serverEndPoint;


      var jsonBtn = void 0;
      if (serverEndPoint) {
        jsonBtn = _react2.default.createElement(
          'a',
          { className: 'toolbar__button__link', target: '_blank', href: jsonUrl },
          'JSON'
        );
      } else {
        jsonBtn = _react2.default.createElement(
          'div',
          { className: 'toolbar__button__link', onClick: this.handleClick },
          'JSON'
        );
      }

      return _react2.default.createElement(
        'ul',
        { className: 'toolbar' },
        _react2.default.createElement(
          'li',
          { className: 'toolbar__button' },
          jsonBtn
        )
      );
    }
  }]);

  return Toolbar;
}(_react2.default.Component);

Toolbar.propTypes = {
  jsonUrl: _propTypes2.default.string,
  serverEndPoint: _propTypes2.default.bool,
  jsonData: _propTypes2.default.object,
  selectedData: _propTypes2.default.object
};

exports.default = Toolbar;
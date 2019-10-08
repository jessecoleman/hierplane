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

var StrRep = function (_React$Component) {
  _inherits(StrRep, _React$Component);

  function StrRep() {
    _classCallCheck(this, StrRep);

    return _possibleConstructorReturn(this, (StrRep.__proto__ || Object.getPrototypeOf(StrRep)).apply(this, arguments));
  }

  _createClass(StrRep, [{
    key: 'handleFocus',
    value: function handleFocus() {
      // Make sure any selected text on the page is de-selected when textarea is focused.
      if (document.selection) {
        document.selection.empty();
      } else if (window.getSelection) {
        window.getSelection().removeAllRanges();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var selectedData = this.props.selectedData;


      var parsedStr = null;
      if (selectedData.stringRepresentation) {
        parsedStr = selectedData.stringRepresentation;
      } else {
        parsedStr = "";
      }

      return _react2.default.createElement(
        'div',
        { className: 'code' },
        _react2.default.createElement('textarea', { onFocus: function onFocus() {
            return _this2.handleFocus();
          }, className: 'code__content', readOnly: 'readonly', value: parsedStr })
      );
    }
  }]);

  return StrRep;
}(_react2.default.Component);

StrRep.propTypes = {
  selectedData: _propTypes2.default.object
};

exports.default = StrRep;
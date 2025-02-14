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

var Attributes = function (_React$Component) {
  _inherits(Attributes, _React$Component);

  function Attributes() {
    _classCallCheck(this, Attributes);

    return _possibleConstructorReturn(this, (Attributes.__proto__ || Object.getPrototypeOf(Attributes)).apply(this, arguments));
  }

  _createClass(Attributes, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          attrs = _props.attrs,
          id = _props.id;


      return _react2.default.createElement(
        'div',
        { className: 'node__word__attrs' },
        attrs !== undefined && attrs.length > 0 ? attrs.map(function (attr) {
          return _react2.default.createElement(
            'div',
            { key: attr, className: 'node__word__attrs__item' },
            _react2.default.createElement(
              'span',
              { id: "node-" + id + "-attr-" + attr },
              attr
            )
          );
        }) : null
      );
    }
  }]);

  return Attributes;
}(_react2.default.Component);

Attributes.propTypes = {
  attrs: _propTypes2.default.array,
  id: _propTypes2.default.string
};

exports.default = Attributes;
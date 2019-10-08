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

var LinkSvg = function (_React$Component) {
  _inherits(LinkSvg, _React$Component);

  function LinkSvg() {
    _classCallCheck(this, LinkSvg);

    return _possibleConstructorReturn(this, (LinkSvg.__proto__ || Object.getPrototypeOf(LinkSvg)).apply(this, arguments));
  }

  _createClass(LinkSvg, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          capPos = _props.capPos,
          viewBox = _props.viewBox,
          fillPoints = _props.fillPoints,
          strokePoints = _props.strokePoints;


      return _react2.default.createElement(
        'div',
        { className: 'node__word__link__tab__' + capPos + '-cap' },
        _react2.default.createElement(
          'svg',
          { viewBox: viewBox, preserveAspectRatio: 'none' },
          _react2.default.createElement('polyline', { points: fillPoints, className: 'node__word__link__tab__svg__fill' }),
          _react2.default.createElement('polyline', { points: strokePoints, className: 'node__word__link__tab__svg__stroke' })
        )
      );
    }
  }]);

  return LinkSvg;
}(_react2.default.Component);

LinkSvg.propTypes = {
  capPos: _propTypes2.default.string,
  viewBox: _propTypes2.default.string,
  fillPoints: _propTypes2.default.string,
  strokePoints: _propTypes2.default.string
};

exports.default = LinkSvg;
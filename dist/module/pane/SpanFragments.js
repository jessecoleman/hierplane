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

var SpanFragments = function (_React$Component) {
  _inherits(SpanFragments, _React$Component);

  function SpanFragments() {
    _classCallCheck(this, SpanFragments);

    return _possibleConstructorReturn(this, (SpanFragments.__proto__ || Object.getPrototypeOf(SpanFragments)).apply(this, arguments));
  }

  _createClass(SpanFragments, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          selectedData = _props.selectedData,
          text = _props.text;


      function getFragmentData(_ref) {
        var alternateParseInfo = _ref.alternateParseInfo;

        return alternateParseInfo && alternateParseInfo.spanAnnotations ? alternateParseInfo.spanAnnotations : null;
      }

      var fragmentData = getFragmentData(selectedData);

      return _react2.default.createElement(
        'div',
        { className: 'pane__fragments' },
        _react2.default.createElement(
          'div',
          { className: 'pane__fragments__nowrap-container' },
          _react2.default.createElement(
            'div',
            { className: 'pane__fragments__nowrap-container__truncation-container' },
            fragmentData ? fragmentData.map(function (item) {
              return _react2.default.createElement(
                'span',
                { className: 'fragment fragment--' + item.spanType, key: item.lo + '-' + item.hi },
                _react2.default.createElement(
                  'span',
                  { className: 'fragment__type' },
                  item.spanType === "ignored" ? "ignr." : item.spanType
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'fragment__text' },
                  text.slice(item.lo, item.hi)
                )
              );
            }) : _react2.default.createElement(
              'div',
              { className: 'pane__alt-parse__empty' },
              _react2.default.createElement(
                'span',
                null,
                'No span fragments were served.'
              )
            )
          )
        )
      );
    }
  }]);

  return SpanFragments;
}(_react2.default.Component);

SpanFragments.propTypes = {
  selectedData: _propTypes2.default.object,
  text: _propTypes2.default.string
};

exports.default = SpanFragments;
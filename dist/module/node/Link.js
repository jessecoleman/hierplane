'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LinkSvg = require('./LinkSvg.js');

var _LinkSvg2 = _interopRequireDefault(_LinkSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Link = function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
  }

  _createClass(Link, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          link = _props.link,
          dataPos = _props.dataPos,
          layout = _props.layout,
          linkLabels = _props.linkLabels,
          id = _props.id;


      var displayLink = null;

      // If a linkNameToLabel mapping exists, display that instead of node object's link value.
      if (linkLabels[link]) {
        displayLink = linkLabels[link];
      } else {
        displayLink = link;
      }

      var linkData = {
        left: {
          before: {
            capPos: "top",
            viewBox: "0 0 21 14",
            fillPoints: "21.3,14 0.5,14 0.5,13.7 21.3,0.4",
            strokePoints: "0.5,14 0.5,13.7 21.3,0.4"
          },
          after: {
            capPos: "bottom",
            viewBox: "0 0 21 14",
            fillPoints: "21.3,-0.1 0.5,-0.1 0.5,0.3 21.3,13.6",
            strokePoints: "0.5,0 0.5,0.3 21.3,13.6"
          }
        },
        right: {
          before: {
            capPos: "top",
            viewBox: "0 0 21 14",
            fillPoints: "-0.3,14 20.5,14 20.5,13.7 -0.3,0.4",
            strokePoints: "20.5,14 20.5,13.7 -0.3,0.4"
          },
          after: {
            capPos: "bottom",
            viewBox: "0 0 21 14",
            fillPoints: "-0.3,-0.1 20.5,-0.1 20.5,0.3 -0.3,13.6",
            strokePoints: "20.5,0 20.5,0.3 -0.3,13.6"
          }
        },
        inside: {
          before: {
            capPos: "top",
            viewBox: "0 0 34 11",
            fillPoints: "17,1.2 0.5,10.7 0.5,11 33.5,11 33.5,10.7",
            strokePoints: "33.5,11 33.5,10.7 17,1.2 0.5,10.7 0.5,11"
          },
          after: {
            capPos: "bottom",
            viewBox: "0 0 34 11",
            fillPoints: "17,9.8 33.5,0.3 33.5,0 0.5,0 0.5,0.3",
            strokePoints: "0.5,0 0.5,0.3 17,9.8 33.5,0.3 33.5,0"
          }
        },
        down: {
          before: {
            capPos: "left",
            viewBox: "0 0 14 21",
            fillPoints: "14.1,-0.3 14.1,20.5 13.7,20.5 0.4,-0.3",
            strokePoints: "14.1,20.5 13.7,20.5 0.4,-0.3"
          },
          after: {
            capPos: "right",
            viewBox: "0 0 14 21",
            fillPoints: "-0.1,-0.3 -0.1,20.5 0.3,20.5 13.6,-0.3",
            strokePoints: "0,20.5 0.3,20.5 13.6,-0.3"
          }
        }
      };

      return _react2.default.createElement(
        'div',
        { className: 'node__word__link' },
        _react2.default.createElement(
          'div',
          { className: 'node__word__link__tab' },
          _react2.default.createElement(_LinkSvg2.default, linkData[layout !== "canonical" ? dataPos : "down"].before),
          _react2.default.createElement(
            'div',
            { className: 'node__word__link__label' },
            _react2.default.createElement(
              'span',
              { id: "node-" + id + "-link" },
              displayLink
            )
          ),
          _react2.default.createElement(_LinkSvg2.default, linkData[layout !== "canonical" ? dataPos : "down"].after)
        )
      );
    }
  }]);

  return Link;
}(_react2.default.Component);

Link.propTypes = {
  link: _propTypes2.default.string,
  id: _propTypes2.default.string,
  dataPos: _propTypes2.default.string,
  layout: _propTypes2.default.string,
  linkLabels: _propTypes2.default.object
};

exports.default = Link;
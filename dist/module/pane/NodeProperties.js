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

var NodeProperties = function (_React$Component) {
  _inherits(NodeProperties, _React$Component);

  function NodeProperties() {
    _classCallCheck(this, NodeProperties);

    return _possibleConstructorReturn(this, (NodeProperties.__proto__ || Object.getPrototypeOf(NodeProperties)).apply(this, arguments));
  }

  _createClass(NodeProperties, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          selectedData = _props.selectedData,
          text = _props.text;


      var emptyProp = _react2.default.createElement(
        'div',
        { className: 'meta-table-label' },
        _react2.default.createElement(
          'span',
          { className: 'meta-table-label--empty' },
          'none'
        )
      );

      // charNodeRoot is the field in the JSON node object that contains its span's
      // lo and hi values that let the UI extract a phrase from the original query.
      var hasSpan = selectedData.hasOwnProperty("alternateParseInfo") && selectedData.alternateParseInfo.hasOwnProperty("charNodeRoot");
      var spanData = null;

      if (hasSpan) {
        var spanField = selectedData.alternateParseInfo.charNodeRoot;
        spanData = text.slice(spanField.charLo, spanField.charHi);
      }

      return _react2.default.createElement(
        'table',
        { className: 'meta-table' },
        _react2.default.createElement(
          'tbody',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              _react2.default.createElement(
                'span',
                null,
                'Head Word:'
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              selectedData.word ? _react2.default.createElement(
                'div',
                { className: 'meta-table-label' },
                _react2.default.createElement(
                  'span',
                  { className: 'meta-table-label--hero' },
                  selectedData.word
                )
              ) : emptyProp
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              _react2.default.createElement(
                'span',
                null,
                'JSON ID:'
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'meta-table-label' },
                _react2.default.createElement(
                  'span',
                  null,
                  selectedData.id
                )
              )
            )
          ),
          _react2.default.createElement(
            'tr',
            { className: 'meta-table__tr--section' },
            _react2.default.createElement(
              'th',
              null,
              _react2.default.createElement(
                'span',
                null,
                'Kind:'
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              selectedData.nodeType ? _react2.default.createElement(
                'div',
                { className: 'meta-table-label' },
                _react2.default.createElement(
                  'span',
                  null,
                  selectedData.nodeType
                )
              ) : emptyProp
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              _react2.default.createElement(
                'span',
                null,
                'Link:'
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              selectedData.link ? _react2.default.createElement(
                'div',
                { className: 'meta-table-label' },
                _react2.default.createElement(
                  'span',
                  { className: selectedData.link !== "__TODO__" && selectedData.link !== "none" ? "" : "meta-table-label--empty" },
                  selectedData.link
                )
              ) : emptyProp
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              _react2.default.createElement(
                'span',
                null,
                'Children:'
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              selectedData.children.length > 0 ? _react2.default.createElement(
                'div',
                { className: 'meta-table-label' },
                _react2.default.createElement(
                  'span',
                  null,
                  selectedData.children.length
                )
              ) : emptyProp
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              _react2.default.createElement(
                'span',
                null,
                'Attributes:'
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              selectedData.attributes.length > 0 ? _react2.default.createElement(
                'div',
                { className: 'meta-table-label' },
                _react2.default.createElement(
                  'span',
                  null,
                  selectedData.attributes.join(", ")
                )
              ) : emptyProp
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              _react2.default.createElement(
                'span',
                null,
                'Span:'
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              hasSpan ? _react2.default.createElement(
                'div',
                { className: 'meta-table-label', title: spanData },
                _react2.default.createElement(
                  'span',
                  null,
                  spanData
                )
              ) : emptyProp
            )
          )
        )
      );
    }
  }]);

  return NodeProperties;
}(_react2.default.Component);

NodeProperties.propTypes = {
  selectedData: _propTypes2.default.object,
  text: _propTypes2.default.string
};

exports.default = NodeProperties;
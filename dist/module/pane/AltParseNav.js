'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AltParseNavToggle = require('./AltParseNavToggle.js');

var _AltParseNavToggle2 = _interopRequireDefault(_AltParseNavToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AltParseNav = function (_React$Component) {
  _inherits(AltParseNav, _React$Component);

  function AltParseNav() {
    _classCallCheck(this, AltParseNav);

    var _this = _possibleConstructorReturn(this, (AltParseNav.__proto__ || Object.getPrototypeOf(AltParseNav)).call(this));

    _this.state = {
      keyInteraction: "idle" // idle, prev, next
    };

    _this.handleKeydown = _this.handleKeydown.bind(_this);
    _this.handleKeyup = _this.handleKeyup.bind(_this);
    _this.handleKeyInput = _this.handleKeyInput.bind(_this);
    return _this;
  }

  _createClass(AltParseNav, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('keydown', this.handleKeydown);
      window.addEventListener('keyup', this.handleKeyup);
    }
  }, {
    key: 'handleKeydown',
    value: function handleKeydown(e) {
      this.handleKeyInput(e, "down");
    }
  }, {
    key: 'handleKeyup',
    value: function handleKeyup(e) {
      this.handleKeyInput(e, "up");
    }
  }, {
    key: 'handleKeyInput',
    value: function handleKeyInput(e, keyEvent) {
      var selectedData = this.props.selectedData;
      var altParseInfo = selectedData.alternateParseInfo;
      if (selectedData.hasOwnProperty("alternateParseInfo") && !this.props.readOnly && !this.props.loading) {
        if (e.keyCode === 219 && altParseInfo.hasOwnProperty("prevParse")) {
          if (keyEvent === "up") {
            this.props.fetchAltParse(selectedData, "prev");
          }
          this.setState({
            keyInteraction: keyEvent === "down" ? "prev" : "idle"
          });
        } else if (e.keyCode === 221 && altParseInfo.hasOwnProperty("nextParse")) {
          if (keyEvent === "up") {
            this.props.fetchAltParse(selectedData, "next");
          }
          this.setState({
            keyInteraction: keyEvent === "down" ? "next" : "idle"
          });
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeydown);
      window.removeEventListener('keyup', this.handleKeyup);
    }
  }, {
    key: 'render',
    value: function render() {
      var keyInteraction = this.state.keyInteraction;
      var _props = this.props,
          readOnly = _props.readOnly,
          selectedData = _props.selectedData,
          fetchAltParse = _props.fetchAltParse,
          loading = _props.loading;


      var altParseContent = null;
      var altParseInfoExists = selectedData.hasOwnProperty("alternateParseInfo") && selectedData.alternateParseInfo !== undefined;

      var altParseInfo = altParseInfoExists ? selectedData.alternateParseInfo : null;
      var hasPrevParse = altParseInfoExists && altParseInfo.hasOwnProperty("prevParse");
      var hasNextParse = altParseInfoExists && altParseInfo.hasOwnProperty("nextParse");

      var insertTrigger = function insertTrigger(direction) {
        var hasDirectionalParse = direction === "prev" ? hasPrevParse : hasNextParse;
        var disabled = altParseInfoExists && hasDirectionalParse && !loading && !readOnly ? false : true;

        return _react2.default.createElement(_AltParseNavToggle2.default, {
          direction: direction,
          keyInteraction: keyInteraction,
          fetchAltParse: fetchAltParse,
          disabled: disabled,
          loading: loading,
          selectedData: selectedData });
      };

      if (altParseInfoExists) {
        altParseContent = _react2.default.createElement(
          'div',
          { className: 'pane__alt-parse' },
          _react2.default.createElement(
            'div',
            { className: 'pane__alt-parse__meta' },
            _react2.default.createElement(
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
                      'Current Parse:'
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
                        altParseInfo.hasOwnProperty("currentParseIndex") ? _react2.default.createElement(
                          'span',
                          null,
                          altParseInfo.currentParseIndex + 1
                        ) : _react2.default.createElement(
                          'span',
                          { className: 'meta-table-label--empty' },
                          'unknown'
                        ),
                        altParseInfo.hasOwnProperty("numberOfParses") ? _react2.default.createElement(
                          'span',
                          null,
                          _react2.default.createElement(
                            'span',
                            { className: 'meta-table-label--empty' },
                            '\xA0of\xA0'
                          ),
                          _react2.default.createElement(
                            'span',
                            { className: 'meta-table-label--secondary' },
                            altParseInfo.numberOfParses
                          )
                        ) : ""
                      )
                    )
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'pane__alt-parse__nav' },
            insertTrigger("prev"),
            insertTrigger("next")
          )
        );
      } else {
        altParseContent = _react2.default.createElement(
          'div',
          { className: 'pane__alt-parse' },
          _react2.default.createElement(
            'div',
            { className: 'pane__alt-parse__empty' },
            _react2.default.createElement(
              'span',
              null,
              'No alternate parse data was served.'
            )
          )
        );
      }

      return altParseContent;
    }
  }]);

  return AltParseNav;
}(_react2.default.Component);

AltParseNav.propTypes = {
  readOnly: _propTypes2.default.bool,
  selectedData: _propTypes2.default.object,
  fetchAltParse: _propTypes2.default.func,
  loading: _propTypes2.default.bool
};

exports.default = AltParseNav;
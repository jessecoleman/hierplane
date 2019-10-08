'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ui = require('./stores/modules/ui');

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeExpansionControl = require('./TreeExpansionControl.js');

var _TreeExpansionControl2 = _interopRequireDefault(_TreeExpansionControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ParseTreeToolbar = function (_Component) {
  _inherits(ParseTreeToolbar, _Component);

  function ParseTreeToolbar() {
    _classCallCheck(this, ParseTreeToolbar);

    return _possibleConstructorReturn(this, (ParseTreeToolbar.__proto__ || Object.getPrototypeOf(ParseTreeToolbar)).apply(this, arguments));
  }

  _createClass(ParseTreeToolbar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          collapseAllNodes = _props.collapseAllNodes,
          expandAllNodes = _props.expandAllNodes,
          disabled = _props.disabled;


      return _react2.default.createElement(
        'ul',
        { className: 'parse-tree-toolbar ' + (disabled ? "parse-tree-toolbar--disabled" : "") },
        _react2.default.createElement(
          'li',
          { className: 'parse-tree-toolbar__item' },
          _react2.default.createElement(_TreeExpansionControl2.default, { mode: 'implode', onClick: function onClick() {
              collapseAllNodes();
            } }),
          _react2.default.createElement(
            'div',
            { className: 'parse-tree-toolbar__item__label' },
            'Collapse all nodes'
          ),
          _react2.default.createElement('div', { className: 'parse-tree-toolbar__item__mask' })
        ),
        _react2.default.createElement(
          'li',
          { className: 'parse-tree-toolbar__item' },
          _react2.default.createElement(_TreeExpansionControl2.default, { mode: 'explode', onClick: function onClick() {
              expandAllNodes();
            } }),
          _react2.default.createElement(
            'div',
            { className: 'parse-tree-toolbar__item__label' },
            'Expand all nodes'
          ),
          _react2.default.createElement('div', { className: 'parse-tree-toolbar__item__mask' })
        )
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        collapseAllNodes: _propTypes2.default.func.isRequired,
        expandAllNodes: _propTypes2.default.func.isRequired,
        disabled: _propTypes2.default.bool
      };
    }
  }]);

  return ParseTreeToolbar;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
  var ui = _ref.ui;
  return { exploded: ui.exploded };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, { collapseAllNodes: _ui.collapseAllNodes, expandAllNodes: _ui.expandAllNodes })(ParseTreeToolbar);
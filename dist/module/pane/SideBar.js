'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NodeProperties = require('./NodeProperties.js');

var _NodeProperties2 = _interopRequireDefault(_NodeProperties);

var _AltParseNav = require('./AltParseNav.js');

var _AltParseNav2 = _interopRequireDefault(_AltParseNav);

var _StrRep = require('./StrRep.js');

var _StrRep2 = _interopRequireDefault(_StrRep);

var _PanePanel = require('./PanePanel.js');

var _PanePanel2 = _interopRequireDefault(_PanePanel);

var _PaneToggle = require('./PaneToggle.js');

var _PaneToggle2 = _interopRequireDefault(_PaneToggle);

var _PaneHandler = require('./PaneHandler.js');

var _PaneHandler2 = _interopRequireDefault(_PaneHandler);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideBar = function (_React$Component) {
  _inherits(SideBar, _React$Component);

  function SideBar() {
    _classCallCheck(this, SideBar);

    var _this = _possibleConstructorReturn(this, (SideBar.__proto__ || Object.getPrototypeOf(SideBar)).call(this));

    _this.state = {
      defaultWidth: 400,
      mode: "autosnap",
      handlerStartX: null,
      sideBarStartWidth: null
    };

    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.handleDoubleClick = _this.handleDoubleClick.bind(_this);
    return _this;
  }

  _createClass(SideBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setSideBarWidth(this.state.defaultWidth);
    }
  }, {
    key: 'setSideBarWidth',
    value: function setSideBarWidth(width) {
      _reactDom2.default.findDOMNode(this.refs.sideBar).style.width = width + 'px';
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      this.setState({
        mode: "moving",
        handlerStartX: e.clientX,
        sideBarStartWidth: _reactDom2.default.findDOMNode(this.refs.sideBar).getBoundingClientRect().width
      });
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      var newWidth = void 0;
      if (this.state.mode === "moving") {
        newWidth = this.state.sideBarStartWidth - e.clientX + this.state.handlerStartX;
        this.setSideBarWidth(this.state.width);
      }
      this.setState({
        width: newWidth
      });
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp() {
      this.setState({
        mode: "autosnap"
      });
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: 'handleDoubleClick',
    value: function handleDoubleClick() {
      this.setSideBarWidth(this.state.defaultWidth);
    }
  }, {
    key: 'render',
    value: function render() {
      var mode = this.state.mode;
      var _props = this.props,
          readOnly = _props.readOnly,
          text = _props.text,
          selectedData = _props.selectedData,
          sideBarCollapsed = _props.sideBarCollapsed,
          togglePane = _props.togglePane,
          fetchAltParse = _props.fetchAltParse,
          loading = _props.loading;


      var nodePropContent = _react2.default.createElement(_NodeProperties2.default, { selectedData: selectedData, text: text }),
          altParseContent = _react2.default.createElement(_AltParseNav2.default, { selectedData: selectedData, fetchAltParse: fetchAltParse, loading: loading, readOnly: readOnly }),
          strRepContent = _react2.default.createElement(_StrRep2.default, { selectedData: selectedData });

      var paneContent = null;

      if (selectedData !== null) {
        paneContent = _react2.default.createElement(
          'div',
          { className: 'pane__panels' },
          _react2.default.createElement(_PanePanel2.default, { panelHeader: 'Node Properties', panelContent: nodePropContent, padded: true }),
          _react2.default.createElement(_PanePanel2.default, { panelHeader: 'Alternate Parses', panelContent: altParseContent, padded: true }),
          _react2.default.createElement(_PanePanel2.default, { panelHeader: 'String Representation', panelContent: strRepContent, padded: false })
        );
      } else {
        paneContent = _react2.default.createElement(
          'div',
          { className: 'pane__empty' },
          _react2.default.createElement(
            'span',
            null,
            'Click a node to focus it and',
            _react2.default.createElement('br', null),
            'inspect its properties.'
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { id: 'sidebar', ref: 'sideBar', className: 'pane pane--right\n          ' + (mode === "autosnap" ? "pane--autosnap" : "") + '\n          ' + (mode === "moving" ? "pane--moving" : "") + '\n          ' + (sideBarCollapsed ? "pane--collapsed" : "") },
        _react2.default.createElement(_PaneHandler2.default, {
          onMouseDown: this.handleMouseDown,
          onDoubleClick: this.handleDoubleClick,
          direction: "vertical" }),
        paneContent,
        _react2.default.createElement(_PaneToggle2.default, {
          icon: "close",
          mode: "close",
          sideBarCollapsed: sideBarCollapsed,
          togglePane: togglePane })
      );
    }
  }]);

  return SideBar;
}(_react2.default.Component);

SideBar.propTypes = {
  readOnly: _propTypes2.default.bool,
  selectedData: _propTypes2.default.object,
  text: _propTypes2.default.string,
  sideBarCollapsed: _propTypes2.default.bool,
  togglePane: _propTypes2.default.func,
  fetchAltParse: _propTypes2.default.func,
  loading: _propTypes2.default.bool
};

exports.default = SideBar;
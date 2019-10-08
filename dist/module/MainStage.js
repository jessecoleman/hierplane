'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EmptyTree = require('./EmptyTree');

var _EmptyTree2 = _interopRequireDefault(_EmptyTree);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Node = require('./node/Node');

var _Node2 = _interopRequireDefault(_Node);

var _ParseError = require('./ParseError');

var _ParseError2 = _interopRequireDefault(_ParseError);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _ui = require('./stores/ui');

var _useStore2 = require('./stores/useStore');

var _helpers = require('./helpers');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MainStage = function MainStage(_ref) {
  var _classNames;

  var readOnly = _ref.readOnly,
      styles = _ref.styles,
      positions = _ref.positions,
      linkLabels = _ref.linkLabels,
      roots = _ref.roots,
      layout = _ref.layout,
      text = _ref.text,
      fetchAltParse = _ref.fetchAltParse,
      togglePane = _ref.togglePane,
      loading = _ref.loading,
      firstLoad = _ref.firstLoad,
      emptyQuery = _ref.emptyQuery,
      errorState = _ref.errorState;

  var _useStore = (0, _useStore2.useStore)(),
      state = _useStore.state,
      dispatch = _useStore.dispatch;

  // render


  var rendered = true;

  var mainsStageContent = null;

  if (emptyQuery) {
    mainsStageContent = _react2.default.createElement(_EmptyTree2.default, null);
  } else {
    if (roots && !errorState) {
      // TODO: remove readOnly, execute componentDidUpdate automatically when readOnly is true
      mainsStageContent = _react2.default.createElement(
        'div',
        {
          className: 'main-stage__tree-container ' + (rendered || readOnly ? 'main-stage--rendered' : ''),
          style: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }
        },
        _react2.default.createElement('div', {
          className: 'main-stage__defocus-trigger',
          onDoubleClick: function onDoubleClick() {
            return dispatch((0, _ui.focusNode)('defocus'));
          }
        }),
        roots.filter(function (r) {
          return r.render;
        }).map(function (root, idx) {
          return _react2.default.createElement(_Node2.default, {
            key: idx,
            readOnly: readOnly,
            fetchAltParse: fetchAltParse,
            togglePane: togglePane,
            styles: styles,
            positions: positions,
            linkLabels: linkLabels,
            loading: loading,
            data: root,
            isSingleSegment: (0, _helpers.isSingleSegment)(root.nodeType),
            layout: layout,
            depth: 0,
            directionalChildIndex: 0,
            text: text
          });
        })
      );
    } else {
      mainsStageContent = _react2.default.createElement(_ParseError2.default, null);
    }
  }

  // mainStageConditionalClasses builds dynamic class lists for #main-stage:
  var mainStageConditionalClasses = (0, _bind2.default)((_classNames = {}, _defineProperty(_classNames, '' + layout, true), _defineProperty(_classNames, 'main-stage--loading', loading), _defineProperty(_classNames, 'main-stage--fade-delay', !firstLoad && !emptyQuery), _classNames));

  return _react2.default.createElement(
    'div',
    { id: 'main-stage', className: mainStageConditionalClasses },
    loading ? _react2.default.createElement(
      'div',
      { className: 'main-stage__loading-mask' },
      _react2.default.createElement(
        'div',
        { className: 'main-stage__loading-mask__spinbox' },
        _react2.default.createElement(_Icon2.default, { symbol: 'logo-euclid', wrapperClass: 'loader' })
      )
    ) : null,
    _react2.default.createElement('div', {
      className: 'main-stage__defocus-trigger',
      onDoubleClick: function onDoubleClick() {
        return dispatch((0, _ui.focusNode)('defocus'));
      }
    }),
    mainsStageContent
  );
};

MainStage.propTypes = {
  readOnly: _propTypes2.default.bool,
  styles: _propTypes2.default.object.isRequired,
  positions: _propTypes2.default.object.isRequired,
  linkLabels: _propTypes2.default.object.isRequired,
  data: _propTypes2.default.shape({
    id: _propTypes2.default.string,
    kind: _propTypes2.default.string,
    word: _propTypes2.default.string,
    attributes: _propTypes2.default.arrayOf(_propTypes2.default.string.isRequired),
    children: _propTypes2.default.arrayOf(_propTypes2.default.object.isRequired),
    link: _propTypes2.default.string
  }),
  layout: _propTypes2.default.string,
  text: _propTypes2.default.string,
  fetchAltParse: _propTypes2.default.func,
  togglePane: _propTypes2.default.func,
  loading: _propTypes2.default.bool,
  firstLoad: _propTypes2.default.bool,
  emptyQuery: _propTypes2.default.bool,
  errorState: _propTypes2.default.bool
};

exports.default = MainStage;
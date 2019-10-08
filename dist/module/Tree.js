'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MainStage = require('./MainStage.js');

var _MainStage2 = _interopRequireDefault(_MainStage);

var _Passage = require('./Passage.js');

var _Passage2 = _interopRequireDefault(_Passage);

var _useStore2 = require('./stores/useStore');

var _ui = require('./stores/ui');

var _helpers = require('./helpers');

var _IconSprite = require('./IconSprite');

var _IconSprite2 = _interopRequireDefault(_IconSprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tree = function Tree(_ref) {
  var inputText = _ref.inputText,
      text = _ref.text,
      roots = _ref.roots,
      nodeTypeToStyle = _ref.nodeTypeToStyle,
      linkToPosition = _ref.linkToPosition,
      selectedData = _ref.selectedData,
      firstFocus = _ref.firstFocus,
      loading = _ref.loading,
      firstLoad = _ref.firstLoad,
      emptyQuery = _ref.emptyQuery,
      errorState = _ref.errorState;

  var _useStore = (0, _useStore2.useStore)(),
      state = _useStore.state,
      dispatch = _useStore.dispatch;

  roots = roots.map(function (root, idx) {
    return (0, _helpers.translateSpans)((0, _helpers.assignNodeIds)(root, idx + '.'));
  });

  var setCollapsible = function setCollapsible(fetchedData, selectedData) {
    var includesSubTree = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    // If this is a new query, i.e., not an alternate parse, then clear the expandedNodeIds.
    // Otherwise, collapse all the open descendant nodes.
    if (!includesSubTree) {
      dispatch((0, _ui.collapseAllNodes)());
    } else {
      dispatch((0, _ui.collapseDescendants)(selectedData.id));
    }
    // Add the ids to the UI redux store.
    var root = fetchedData.root;
    dispatch((0, _ui.addAllNodeIds)((0, _helpers.getCollapsibleNodeIds)(root, (0, _helpers.isSingleSegment)(root.nodeType))));
  };

  /**
   * Returns an object with the correct data to generate the UI from.
   *
   * @param {object} data - The response from the api call.
   * @param {boolean} includesSubTree - Whether a subtree is expected in the JSON that is returned.
   *                                    This is true if we're fetching an alternate parse.
   */
  var sanitizeResponse = function sanitizeResponse(data, includesSubTree) {
    return {
      fetchedData: includesSubTree ? data.newCompleteJson : data,
      selectedData: includesSubTree ? data.selectedTree : null
    };
  };

  return _react2.default.createElement(
    _useStore2.StoreProvider,
    null,
    _react2.default.createElement(
      'div',
      { className: 'hierplane hierplane--theme-light' },
      _react2.default.createElement(
        'div',
        { className: 'pane-container' },
        _react2.default.createElement(
          'div',
          { className: 'pane pane--scroll' },
          _react2.default.createElement(_Passage2.default, {
            readOnly: true,
            text: text,
            inputText: inputText,
            onKeyPress: null,
            loading: loading,
            roots: roots,
            styles: nodeTypeToStyle,
            emptyQuery: emptyQuery,
            errorState: errorState }),
          _react2.default.createElement(
            'div',
            { className: 'pane pane--fill' },
            _react2.default.createElement(_MainStage2.default, {
              readOnly: true,
              styles: nodeTypeToStyle,
              positions: linkToPosition,
              linkLabels: {},
              roots: roots,
              layout: 'default',
              text: text,
              loading: loading,
              firstLoad: firstLoad,
              emptyQuery: emptyQuery,
              errorState: errorState
            })
          )
        ),
        _react2.default.createElement(_IconSprite2.default, null)
      )
    )
  );
};

exports.default = Tree;
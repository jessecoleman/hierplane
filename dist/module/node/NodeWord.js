'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Attributes = require('./Attributes.js');

var _Attributes2 = _interopRequireDefault(_Attributes);

var _Link = require('./Link.js');

var _Link2 = _interopRequireDefault(_Link);

var _UiToggle = require('./UiToggle');

var _UiToggle2 = _interopRequireDefault(_UiToggle);

var _UiParseNav = require('./UiParseNav');

var _UiParseNav2 = _interopRequireDefault(_UiParseNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NodeWord = function NodeWord(_ref) {
  var readOnly = _ref.readOnly,
      hasInsideChildren = _ref.hasInsideChildren,
      layout = _ref.layout,
      dataPos = _ref.dataPos,
      positions = _ref.positions,
      linkLabels = _ref.linkLabels,
      data = _ref.data,
      text = _ref.text,
      onMouseOver = _ref.onMouseOver,
      onMouseOut = _ref.onMouseOut,
      onMouseDown = _ref.onMouseDown,
      _onMouseUp = _ref.onMouseUp,
      onUiMouseOver = _ref.onUiMouseOver,
      onUiMouseOut = _ref.onUiMouseOut,
      onUiMouseUp = _ref.onUiMouseUp,
      onPnMouseOver = _ref.onPnMouseOver,
      onPnMouseOut = _ref.onPnMouseOut,
      onPnMouseUp = _ref.onPnMouseUp,
      dataCollapsable = _ref.dataCollapsable,
      altParses = _ref.altParses,
      rollups = _ref.rollups,
      isRoot = _ref.isRoot,
      isEventRoot = _ref.isEventRoot,
      togglePane = _ref.togglePane,
      insideChildren = _ref.insideChildren,
      eventSeqChild = _ref.eventSeqChild,
      encapsulated = _ref.encapsulated,
      notFirstInsideChild = _ref.notFirstInsideChild;


  // charNodeRoot is the field in the JSON node object that contains its span's
  // lo and hi values that let the UI extract a phrase from the original query.
  var hasFragments = data.hasOwnProperty("alternateParseInfo") && data.alternateParseInfo.hasOwnProperty("spanAnnotations");
  var hasRollup = rollups && dataCollapsable && hasFragments;
  var fragmentData = hasFragments ? data.alternateParseInfo.spanAnnotations : null;

  // Max rollup characters before node is forced to text wrap
  var maxRollupChars = 40;
  // Boolean that returns true if node span is more than maxRollupChars (used in conditional class of .node__word__label)
  var wideRollup = hasRollup && data.alternateParseInfo.charNodeRoot.charHi - data.alternateParseInfo.charNodeRoot.charLo >= maxRollupChars;

  // Iterates through spanAnnotations to wrap head word ("self") in a <strong> tag
  // so it is visually distinct from the rest of the rollup text.
  var rollupText = hasFragments ? fragmentData.map(function (item, index) {
    if (item.spanType === "self") {
      return _react2.default.createElement(
        'strong',
        { key: index },
        ' ',
        text.slice(item.lo, item.hi),
        ' '
      );
    } else {
      return ' ' + text.slice(item.lo, item.hi) + ' ';
    }
  }) : null;

  var toggle = _react2.default.createElement(_UiToggle2.default, {
    onUiMouseOver: onUiMouseOver,
    onUiMouseOut: onUiMouseOut,
    onUiMouseUp: onUiMouseUp });

  var parseNav = _react2.default.createElement(_UiParseNav2.default, {
    readOnly: readOnly,
    data: data,
    onPnMouseOver: onPnMouseOver,
    onPnMouseOut: onPnMouseOut,
    onPnMouseUp: onPnMouseUp });

  var focusTrigger = _react2.default.createElement('div', { className: 'node-focus-trigger ' + (hasInsideChildren ? "node-focus-trigger--seq" : ""),
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut,
    onMouseDown: onMouseDown,
    onDoubleClick: function onDoubleClick() {
      togglePane("open");
    },
    onMouseUp: function onMouseUp() {
      _onMouseUp(data);
    } });

  return !isRoot ? _react2.default.createElement(
    'div',
    { className: 'node__word\n          ' + (hasInsideChildren && data.attributes.length > 0 ? "node__word--has-attrs" : "") + '\n          ' + (hasRollup ? "node__word--has-rollup" : "") },
    _react2.default.createElement('div', { className: 'node__word__tile' }),
    !isEventRoot && data.link && layout === "canonical" || !isEventRoot && data.link && layout === "default" && positions[data.link] !== "left" && notFirstInsideChild && !encapsulated && !eventSeqChild ? _react2.default.createElement(_Link2.default, { link: data.link, dataPos: dataPos, layout: layout, linkLabels: linkLabels, id: data.id }) : null,
    _react2.default.createElement(
      'div',
      { className: 'node__word__content' },
      _react2.default.createElement(
        'div',
        { className: 'node__word__label ' + (wideRollup ? "node__word__label--wide" : "") },
        _react2.default.createElement(
          'div',
          { className: 'node__word__label__siblings' },
          _react2.default.createElement(
            'span',
            { className: 'node__word__label__headword', id: "node-" + data.id + "-word" },
            data.word
          ),
          hasRollup ? _react2.default.createElement(
            'span',
            { className: 'node__word__label__rollup', id: "node-" + data.id + "-span" },
            rollupText
          ) : null
        )
      ),
      hasInsideChildren ? insideChildren : null,
      _react2.default.createElement(_Attributes2.default, { attrs: data.attributes, id: data.id })
    ),
    !encapsulated && !eventSeqChild && data.link && layout === "default" && positions[data.link] === "left" ? _react2.default.createElement(_Link2.default, { link: data.link, dataPos: dataPos, layout: layout, linkLabels: linkLabels, id: data.id }) : null,
    focusTrigger,
    dataCollapsable ? toggle : null,
    altParses ? parseNav : null
  ) : altParses ? _react2.default.createElement(
    'div',
    { className: 'node__segments' },
    focusTrigger,
    altParses ? parseNav : null
  ) : null;
};

NodeWord.propTypes = {
  readOnly: _propTypes2.default.bool,
  positions: _propTypes2.default.object.isRequired,
  linkLabels: _propTypes2.default.object.isRequired,
  data: _propTypes2.default.shape({
    attributes: _propTypes2.default.arrayOf(_propTypes2.default.string.isRequired)
  }),
  text: _propTypes2.default.string,
  layout: _propTypes2.default.string.isRequired,
  dataPos: _propTypes2.default.string.isRequired,
  hasInsideChildren: _propTypes2.default.bool,
  dataCollapsable: _propTypes2.default.bool.isRequired,
  altParses: _propTypes2.default.bool.isRequired,
  rollups: _propTypes2.default.bool.isRequired,
  isRoot: _propTypes2.default.bool.isRequired,
  isEventRoot: _propTypes2.default.bool.isRequired,
  onMouseOver: _propTypes2.default.func.isRequired,
  onMouseOut: _propTypes2.default.func.isRequired,
  onMouseDown: _propTypes2.default.func.isRequired,
  onMouseUp: _propTypes2.default.func.isRequired,
  onUiMouseOver: _propTypes2.default.func.isRequired,
  onUiMouseOut: _propTypes2.default.func.isRequired,
  onUiMouseUp: _propTypes2.default.func.isRequired,
  onPnMouseOver: _propTypes2.default.func.isRequired,
  onPnMouseOut: _propTypes2.default.func.isRequired,
  onPnMouseUp: _propTypes2.default.func.isRequired,
  togglePane: _propTypes2.default.func,
  insideChildren: _propTypes2.default.object,
  eventSeqChild: _propTypes2.default.bool,
  encapsulated: _propTypes2.default.bool,
  notFirstInsideChild: _propTypes2.default.bool
};

exports.default = NodeWord;
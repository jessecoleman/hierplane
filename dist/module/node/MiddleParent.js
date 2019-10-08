'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NodeWord = require('./NodeWord.js');

var _NodeWord2 = _interopRequireDefault(_NodeWord);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Converts an array of classes to string.
function stylesToString() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return arr.reduce(function (str, style) {
    return "node--" + style + " " + str;
  }, "");
}

var MiddleParent = function MiddleParent(_ref) {
  var _classNames;

  var readOnly = _ref.readOnly,
      canonicalChildren = _ref.canonicalChildren,
      hasChildren = _ref.hasChildren,
      hasSideChildren = _ref.hasSideChildren,
      hasInsideChildren = _ref.hasInsideChildren,
      hasDownChildren = _ref.hasDownChildren,
      layout = _ref.layout,
      positions = _ref.positions,
      linkLabels = _ref.linkLabels,
      data = _ref.data,
      depth = _ref.depth,
      styles = _ref.styles,
      active = _ref.active,
      collapsed = _ref.collapsed,
      nodeFocusing = _ref.nodeFocusing,
      dataCollapsable = _ref.dataCollapsable,
      rollups = _ref.rollups,
      isRoot = _ref.isRoot,
      isSingleSegment = _ref.isSingleSegment,
      isEventRoot = _ref.isEventRoot,
      onMouseOver = _ref.onMouseOver,
      onMouseOut = _ref.onMouseOut,
      onMouseDown = _ref.onMouseDown,
      onMouseUp = _ref.onMouseUp,
      onUiMouseOver = _ref.onUiMouseOver,
      onUiMouseOut = _ref.onUiMouseOut,
      onUiMouseUp = _ref.onUiMouseUp,
      onPnMouseOver = _ref.onPnMouseOver,
      onPnMouseOut = _ref.onPnMouseOut,
      onPnMouseUp = _ref.onPnMouseUp,
      text = _ref.text,
      parentId = _ref.parentId,
      togglePane = _ref.togglePane,
      insideChildren = _ref.insideChildren,
      directionalChildIndex = _ref.directionalChildIndex,
      dataPos = _ref.dataPos,
      eventSeqChild = _ref.eventSeqChild,
      encapsulated = _ref.encapsulated,
      notFirstInsideChild = _ref.notFirstInsideChild,
      seqType = _ref.seqType,
      focused = _ref.focused;
  var id = data.id,
      nodeType = data.nodeType;


  var altParseInfo = data.alternateParseInfo;
  var altParses = altParseInfo !== undefined && (altParseInfo.hasOwnProperty("prevParse") || altParseInfo.hasOwnProperty("nextParse"));
  var nodeCollapsed = dataCollapsable && collapsed && (!hasSideChildren || hasSideChildren && hasInsideChildren) && !isRoot && !isEventRoot;

  // nodeConditionalClasses builds dynamic class lists for .node blocks:
  var nodeConditionalClasses = (0, _bind2.default)((_classNames = {
    "node--root": isRoot,
    "node--has-alt-parses": altParses,
    "node--hover": active === "hover",
    "node--toggle-ready": active === "toggle-ready",
    "node--focused": focused,
    "node--focusing": nodeFocusing,
    "node--encapsulated": encapsulated,
    "node-container--collapsed": nodeCollapsed,
    "node-container--expanded": !nodeCollapsed,
    "node-container--active": active !== null && hasChildren && !hasSideChildren
  }, _defineProperty(_classNames, '' + stylesToString(styles[data.nodeType]), true), _defineProperty(_classNames, 'node--' + (0, _helpers.colorToString)(styles[seqType]), seqType !== null), _classNames));

  // Screen Output
  return _react2.default.createElement(
    'div',
    { className: 'ft__tr__td ft--middle-parent' },
    _react2.default.createElement(
      'div',
      { className: 'node ' + nodeConditionalClasses,
        id: id,
        'data-parent-id': depth > 0 ? parentId : "null",
        'data-node-type': nodeType,
        'data-pos': dataPos,
        'data-is-root': isRoot,
        'data-is-single-segment': isSingleSegment,
        'data-is-event-root': isEventRoot,
        'data-depth': depth,
        'data-has-children': hasChildren,
        'data-has-side-children': hasSideChildren,
        'data-has-inside-children': hasInsideChildren,
        'data-has-down-children': hasDownChildren,
        'data-collapsable': dataCollapsable,
        'data-directional-child-index': directionalChildIndex,
        'data-alt-parses': altParses },
      _react2.default.createElement(_NodeWord2.default, {
        readOnly: readOnly,
        depth: depth,
        layout: layout,
        dataPos: dataPos,
        positions: positions,
        linkLabels: linkLabels,
        data: data,
        text: text,
        dataCollapsable: dataCollapsable,
        altParses: altParses,
        rollups: rollups,
        isRoot: isRoot,
        isEventRoot: isEventRoot,
        hasChildren: hasChildren,
        hasSideChildren: hasSideChildren,
        hasInsideChildren: hasInsideChildren,
        onMouseOver: onMouseOver,
        onMouseOut: onMouseOut,
        onMouseDown: onMouseDown,
        onMouseUp: onMouseUp,
        onUiMouseOver: onUiMouseOver,
        onUiMouseOut: onUiMouseOut,
        onUiMouseUp: onUiMouseUp,
        onPnMouseOver: onPnMouseOver,
        onPnMouseOut: onPnMouseOut,
        onPnMouseUp: onPnMouseUp,
        togglePane: togglePane,
        insideChildren: insideChildren,
        encapsulated: encapsulated,
        eventSeqChild: eventSeqChild,
        notFirstInsideChild: notFirstInsideChild }),
      canonicalChildren
    )
  );
};

MiddleParent.propTypes = {
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
  text: _propTypes2.default.string,
  depth: _propTypes2.default.number.isRequired,
  layout: _propTypes2.default.string.isRequired,
  hasChildren: _propTypes2.default.bool.isRequired,
  hasSideChildren: _propTypes2.default.bool.isRequired,
  hasInsideChildren: _propTypes2.default.bool,
  hasDownChildren: _propTypes2.default.bool,
  canonicalChildren: _propTypes2.default.object,
  active: _propTypes2.default.string,
  collapsed: _propTypes2.default.bool.isRequired,
  nodeFocusing: _propTypes2.default.bool.isRequired,
  dataCollapsable: _propTypes2.default.bool.isRequired,
  rollups: _propTypes2.default.bool.isRequired,
  isRoot: _propTypes2.default.bool.isRequired,
  isSingleSegment: _propTypes2.default.bool,
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
  parentId: _propTypes2.default.string,
  insideChildren: _propTypes2.default.object,
  directionalChildIndex: _propTypes2.default.number,
  dataPos: _propTypes2.default.string,
  eventSeqChild: _propTypes2.default.bool,
  encapsulated: _propTypes2.default.bool,
  notFirstInsideChild: _propTypes2.default.bool,
  seqType: _propTypes2.default.string,
  focused: _propTypes2.default.bool
};

exports.default = MiddleParent;
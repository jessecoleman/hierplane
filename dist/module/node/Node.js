'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _MiddleParent = require('./MiddleParent');

var _MiddleParent2 = _interopRequireDefault(_MiddleParent);

var _useStore2 = require('../stores/useStore');

var _ui = require('../stores/ui');

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Node = function Node(_ref) {
  var readOnly = _ref.readOnly,
      styles = _ref.styles,
      positions = _ref.positions,
      linkLabels = _ref.linkLabels,
      data = _ref.data,
      layout = _ref.layout,
      depth = _ref.depth,
      parentId = _ref.parentId,
      text = _ref.text,
      isSingleSegment = _ref.isSingleSegment,
      fetchAltParse = _ref.fetchAltParse,
      togglePane = _ref.togglePane,
      directionalChildIndex = _ref.directionalChildIndex,
      loading = _ref.loading;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      setActive = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      nodeFocusing = _useState4[0],
      setNodeFocusing = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      focused = _useState6[0],
      setFocused = _useState6[1];

  var _useState7 = (0, _react.useState)(true),
      _useState8 = _slicedToArray(_useState7, 2),
      rollups = _useState8[0],
      setRollups = _useState8[1]; // not necessary to be stateful

  var _useStore = (0, _useStore2.useStore)(),
      _useStore$state = _useStore.state,
      selectedNodeId = _useStore$state.selectedNodeId,
      hoverNodeId = _useStore$state.hoverNodeId,
      expandedNodeIds = _useStore$state.expandedNodeIds,
      dispatch = _useStore.dispatch;

  (0, _react.useEffect)(function () {
    setActive(hoverNodeId === data.id ? 'hover' : null);
  }, [hoverNodeId]);

  (0, _react.useEffect)(function () {
    if (selectedNodeId === data.id) {
      handleNodeFocus();
    } else {
      setFocused(false);
    }
  }, [selectedNodeId]);

  //const onExpandNodeIds = () => {
  //  dispatch(expandNodeIds);
  //}

  // Returns arrays of children grouped by positions set in
  // linkToPosition in the JSON:
  var createChildren = function createChildren(children, positions) {
    return children.filter(function (c) {
      return c.render;
    }).reduce(function (children, child) {
      var index = positions[child.link];
      if (index in children) {
        children[index].push(child);
      } else {
        children['down'].push(child);
      }
      return children;
    }, { left: [], right: [], down: [], inside: [] });
  };

  // Returns arrays of inside children grouped by kind:
  var countSeqChildren = function countSeqChildren(children) {
    return children.reduce(function (children, child) {
      var supportedKinds = new Set(['event', 'entity', 'detail']);
      if (supportedKinds.has(child.nodeType)) {
        children[child.nodeType].push(child);
      }
      return children;
    }, { event: [], entity: [], detail: [] });
  };

  // Node MouseUp Handler:
  var handleNodeMouseUp = function handleNodeMouseUp() {
    setNodeFocusing(false);
    dispatch((0, _ui.focusNode)(data));
    dispatch((0, _ui.expandNode)(data.id));
    handleNodeFocus();
  };

  // UiToggle MouseUp Handler:
  var handleUiToggleMouseUp = function handleUiToggleMouseUp() {
    dispatch((0, _ui.toggleNode)(data.id));
    setActive(null);
  };

  // UiParseNav MouseUp Handler:
  var handlePnToggleMouseUp = function handlePnToggleMouseUp(nodeData, direction) {

    handleNodeMouseUp(data);

    if (!loading) {
      fetchAltParse(nodeData, direction);
    }
  };

  var handleNodeMouseOver = function handleNodeMouseOver() {
    setActive('hover');
    dispatch((0, _ui.hoverNode)(data.id));
  };

  var handleNodeMouseOut = function handleNodeMouseOut() {
    setActive(null);
    dispatch((0, _ui.hoverNode)('none'));
  };

  var handleNodeFocus = function handleNodeFocus() {
    setFocused(true);
    setNodeFocusing(false);
    dispatch((0, _ui.expandNode)(data.id));
  };

  // render

  var leftChildren = null,
      rightChildren = null,
      downChildren = null,
      insideChildren = null,
      canonicalChildren = null;

  var childNodes = void 0;
  // Immediate child position detection and array building.
  if (data.children) {
    childNodes = createChildren(data.children, positions);
  }

  var seqType = null,
      seqChildren = void 0;

  // Setting value of seqType (sequence inherits type based on kind of its inside children)
  if (data.children && data.nodeType === 'sequence' && childNodes.inside.length > 0) {
    seqChildren = countSeqChildren(childNodes.inside);
    switch (childNodes.inside.length) {
      case seqChildren.event.length:
        seqType = 'event';
        break;
      case seqChildren.entity.length:
        seqType = 'entity';
        break;
      case seqChildren.detail.length:
        seqType = 'detail';
        break;
      default:
        seqType = null;
    }
  }

  var hasChildren = false,
      hasSideChildren = false,
      hasLeftChildren = false,
      hasRightChildren = false,
      hasDownChildren = false,
      hasInsideChildren = false;
  // Testing if there are children.
  if (data.children) {
    // Testing if there are any side children.
    hasLeftChildren = childNodes.left.length > 0;
    hasRightChildren = childNodes.right.length > 0;
    hasDownChildren = childNodes.down.length > 0;
    hasInsideChildren = childNodes.inside.length > 0;
    hasSideChildren = hasLeftChildren || hasRightChildren;
    hasChildren = hasSideChildren || hasDownChildren || hasInsideChildren;

    var insertDefocusTrigger = function insertDefocusTrigger(classes) {
      return _react2.default.createElement('div', {
        className: classes,
        onDoubleClick: function onDoubleClick() {
          return dispatch((0, _ui.focusNode)('defocus'));
        }
      });
    };

    var insertSeqTrigger = function insertSeqTrigger() {
      return _react2.default.createElement('div', { className: 'node-sequence-trigger',
        onClick: function onClick() {
          return dispatch((0, _ui.focusNode)(data));
        },
        onMouseOver: handleNodeMouseOver,
        onMouseOut: handleNodeMouseOut,
        onMouseDown: function onMouseDown() {
          return setNodeFocusing(true);
        }
      });
    };

    // Node Children Container template:
    var populateNodes = function populateNodes(nodes, container) {
      return _react2.default.createElement(
        'div',
        { className: 'node-' + (container ? container : 'children') + '-container' },
        container !== 'sequence' ? insertDefocusTrigger('node-children-container-defocus-trigger') : insertSeqTrigger(),
        nodes.filter(function (n) {
          return n.render;
        }).map(function (childNode, index) {
          return _react2.default.createElement(Node, {
            key: childNode.id,
            readOnly: readOnly,
            fetchAltParse: fetchAltParse,
            togglePane: function togglePane() {
              return null;
            },
            styles: styles,
            directionalChildIndex: index,
            isSingleSegment: isSingleSegment,
            loading: loading,
            positions: positions,
            linkLabels: linkLabels,
            parentId: data.id,
            data: childNode,
            layout: layout,
            text: text,
            seqType: seqType,
            depth: depth + 1
          });
        })
      );
    };

    // Side and Down Children template:
    var populateDirectionalChildren = function populateDirectionalChildren(direction, children) {
      if (children.length > 0) {
        // Down Children:
        if (direction === 'down') {
          return _react2.default.createElement(
            'div',
            { className: 'ft__tr' },
            hasLeftChildren ? insertDefocusTrigger('ft__tr__td ft--left-placeholder') : null,
            _react2.default.createElement(
              'div',
              { className: 'ft__tr__td ft--middle-children' },
              populateNodes(children)
            ),
            hasRightChildren ? insertDefocusTrigger('ft__tr__td ft--right-placeholder') : null
          );
        } else if (direction === 'left' || direction === 'right') {
          // Side Children:
          return _react2.default.createElement(
            'div',
            { className: 'ft__tr__td ft--' + direction + '-children' },
            insertDefocusTrigger('node-children-container-defocus-trigger'),
            populateNodes(children)
          );
        }
      } else {
        return null;
      }
    };

    // Outputting sets of each type of children.
    if (layout === 'canonical' || layout === 'default' && !hasSideChildren && !hasInsideChildren) {
      canonicalChildren = populateNodes(data.children);
    } else if (layout === 'default' && hasInsideChildren && !hasSideChildren && childNodes.down.length > 0) {
      insideChildren = populateNodes(childNodes.inside, 'sequence');
      canonicalChildren = populateNodes(childNodes.down);
    } else if (layout === 'default') {
      leftChildren = populateDirectionalChildren('left', childNodes.left);
      rightChildren = populateDirectionalChildren('right', childNodes.right);
      downChildren = populateDirectionalChildren('down', childNodes.down);
      insideChildren = populateNodes(childNodes.inside, 'sequence');
    }
  }

  // Determining collapsability and node treatment depending on nesting level.
  var isRoot = !isSingleSegment && depth === 0;
  var isEventRoot = !isSingleSegment && depth === 1 || isSingleSegment && depth === 0;
  var dataCollapsable = hasChildren && depth > 0 && !isEventRoot;

  // Setting value of link position
  var dataPos = '';

  if (data.link) {
    // If a link position is not explicitly set, default to 'down'.
    if (positions[data.link]) {
      dataPos = positions[data.link];
    } else {
      dataPos = 'down';
    }
  }

  if (!isSingleSegment && depth === 1 || isSingleSegment && depth === 0) {
    dataPos = '';
  }

  var isCollapsed = !expandedNodeIds.has(data.id);
  var eventSeqChild = data.nodeType === 'event' && dataPos === 'inside';
  var encapsulated = (dataPos === 'left' || dataPos === 'right') && hasSideChildren;
  var notFirstInsideChild = !(data.id !== undefined && dataPos === 'inside' && directionalChildIndex === 0);
  var ftCollapsed = isCollapsed && (hasSideChildren || hasDownChildren) && !isRoot && !isEventRoot;

  // ftConditionalClasses builds dynamic class lists for .ft blocks:
  var ftConditionalClasses = (0, _bind2.default)({
    'ft--event': data.nodeType === 'event',
    'ft--seq': hasInsideChildren && hasSideChildren,
    'ft--root-event': isEventRoot,
    'ft--encapsulated': encapsulated,
    'ft--event-seq-child': eventSeqChild,
    'ft--no-left-children': hasSideChildren && !hasLeftChildren,
    'ft--no-right-children': hasSideChildren && !hasRightChildren,
    'node-container--collapsed': ftCollapsed,
    'node-container--expanded': !ftCollapsed,
    'node-container--active': active !== null && hasSideChildren,
    'node-container--toggle-ready': active === 'toggle-ready'
  });

  var nodeContent = _react2.default.createElement(
    'div',
    { className: 'ft ' + ftConditionalClasses,
      'data-has-children': hasChildren },
    _react2.default.createElement(
      'div',
      { className: 'ft__tr' },
      leftChildren,
      _react2.default.createElement(_MiddleParent2.default, {
        readOnly: readOnly,
        depth: depth,
        directionalChildIndex: directionalChildIndex,
        layout: layout,
        positions: positions,
        linkLabels: linkLabels,
        data: data,
        parentId: parentId,
        hasChildren: hasChildren,
        styles: styles,
        active: active,
        focused: focused,
        collapsed: isCollapsed,
        selectedNodeId: selectedNodeId,
        hoverNodeId: hoverNodeId,
        nodeFocusing: nodeFocusing,
        canonicalChildren: canonicalChildren,
        dataCollapsable: dataCollapsable,
        rollups: rollups,
        isRoot: isRoot,
        encapsulated: encapsulated,
        eventSeqChild: eventSeqChild,
        notFirstInsideChild: notFirstInsideChild,
        isSingleSegment: isSingleSegment,
        text: text,
        dataPos: dataPos
        // TODO
        , togglePane: function togglePane() {
          return null;
        },
        isEventRoot: isEventRoot,
        onUiMouseOver: function onUiMouseOver() {
          return setActive('toggle-ready');
        },
        onPnMouseOver: function onPnMouseOver() {
          return setActive('hover');
        },
        onUiMouseOut: function onUiMouseOut() {
          return setActive(null);
        },
        onPnMouseOut: function onPnMouseOut() {
          return setActive(null);
        },
        onMouseDown: function onMouseDown() {
          return setNodeFocusing(true);
        },
        onMouseOver: handleNodeMouseOver,
        onMouseOut: handleNodeMouseOut,
        onMouseUp: handleNodeMouseUp,
        onUiMouseUp: handleUiToggleMouseUp,
        onPnMouseUp: handlePnToggleMouseUp,
        insideChildren: insideChildren,
        hasInsideChildren: hasInsideChildren,
        hasSideChildren: hasSideChildren,
        hasDownChildren: hasDownChildren,
        seqType: seqType }),
      rightChildren
    ),
    downChildren
  );

  var nodeContentStructure = encapsulated || eventSeqChild ? _react2.default.createElement(
    'div',
    {
      className: 'encapsulated ' + (eventSeqChild ? 'event-seq-child' : '') + ' ' + (!isCollapsed && hasChildren ? 'event-seq-child--expanded' : ''),
      'data-pos': dataPos },
    eventSeqChild && notFirstInsideChild || encapsulated && dataPos === 'right' ? _react2.default.createElement(_Link2.default, {
      link: data.link,
      dataPos: dataPos,
      layout: layout,
      linkLabels: linkLabels,
      id: data.id
    }) : null,
    nodeContent,
    !eventSeqChild && dataPos === 'left' ? _react2.default.createElement(_Link2.default, {
      link: data.link,
      dataPos: dataPos,
      layout: layout,
      linkLabels: linkLabels,
      id: data.id
    }) : null
  ) : nodeContent;

  return nodeContentStructure;
};

Node.propTypes = {
  readOnly: _propTypes2.default.bool,
  styles: _propTypes2.default.object.isRequired,
  positions: _propTypes2.default.object.isRequired,
  linkLabels: _propTypes2.default.object.isRequired,
  data: _propTypes2.default.shape({
    attributes: _propTypes2.default.arrayOf(_propTypes2.default.string.isRequired),
    children: _propTypes2.default.arrayOf(_propTypes2.default.object.isRequired),
    link: _propTypes2.default.string,
    id: _propTypes2.default.string
  }),
  depth: _propTypes2.default.number.isRequired,
  layout: _propTypes2.default.string,
  text: _propTypes2.default.string,
  parentId: _propTypes2.default.string,
  isSingleSegment: _propTypes2.default.bool,
  fetchAltParse: _propTypes2.default.func,
  togglePane: _propTypes2.default.func,
  directionalChildIndex: _propTypes2.default.number,
  loading: _propTypes2.default.bool
};

exports.default = Node;
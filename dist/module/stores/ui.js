'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = exports.focusNode = exports.hoverNode = exports.expandPathToNode = exports.collapseDescendants = exports.expandAllNodes = exports.collapseAllNodes = exports.expandNode = exports.collapseNode = exports.toggleNode = exports.addAllNodeIds = exports.FOCUS_NODE = exports.HOVER_NODE = exports.EXPAND_PATH_TO_NODE = exports.EXPAND_ALL_NODES = exports.EXPAND_NODE = exports.COLLAPSE_DESCENDANTS = exports.COLLAPSE_ALL_NODES = exports.COLLAPSE_NODE = exports.TOGGLE_NODE_STATE = exports.ADD_ALL_NODE_IDS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Action Type Constants
 */
var ADD_ALL_NODE_IDS = exports.ADD_ALL_NODE_IDS = 'ADD_ALL_NODE_IDS';
var TOGGLE_NODE_STATE = exports.TOGGLE_NODE_STATE = 'TOGGLE_NODE_STATE';
var COLLAPSE_NODE = exports.COLLAPSE_NODE = 'COLLAPSE_NODE';
var COLLAPSE_ALL_NODES = exports.COLLAPSE_ALL_NODES = 'COLLAPSE_ALL_NODES';
var COLLAPSE_DESCENDANTS = exports.COLLAPSE_DESCENDANTS = 'COLLAPSE_DESCENDANTS';
var EXPAND_NODE = exports.EXPAND_NODE = 'EXPAND_NODE';
var EXPAND_ALL_NODES = exports.EXPAND_ALL_NODES = 'EXPAND_ALL_NODES';
var EXPAND_PATH_TO_NODE = exports.EXPAND_PATH_TO_NODE = 'EXPAND_PATH_TO_NODE';
var HOVER_NODE = exports.HOVER_NODE = 'HOVER_NODE';
var FOCUS_NODE = exports.FOCUS_NODE = 'FOCUS_NODE';

/**
 * Action Creators
 */

/**
 * Adds all the node ids.
 *
 * @param {Immutable.Set} ids - the node ids to be added
 * @returns {object}
 */
var addAllNodeIds = exports.addAllNodeIds = function addAllNodeIds(ids) {
  return {
    ids: ids,
    type: ADD_ALL_NODE_IDS
  };
};

/**
 * Toggle the collapsed/expanded state of a node.
 *
 * @param {string} id - the id of the node to be toggled
 * @returns {object}
 */
var toggleNode = exports.toggleNode = function toggleNode(id) {
  return {
    id: id,
    type: TOGGLE_NODE_STATE
  };
};

/**
 * Explicitly collapse a node.
 *
 * @param {string} id - the id of the node to be collapsed
 * @returns {object}
 */
var collapseNode = exports.collapseNode = function collapseNode(id) {
  return {
    id: id,
    type: COLLAPSE_NODE
  };
};

/**
 * Explicitly expand a node.
 *
 * @param {string} id - the id of the node to be expanded
 * @returns {object}
 */
var expandNode = exports.expandNode = function expandNode(id) {
  return {
    id: id,
    type: EXPAND_NODE
  };
};

/**
 * Collapse all nodes.
 *
 * @returns {object}
 */
var collapseAllNodes = exports.collapseAllNodes = function collapseAllNodes() {
  return {
    type: COLLAPSE_ALL_NODES
  };
};

/**
 * Expand all nodes.
 *
 * @returns {object}
 */
var expandAllNodes = exports.expandAllNodes = function expandAllNodes() {
  return {
    type: EXPAND_ALL_NODES
  };
};

/**
 * Collapse decendants for a given node id. When navigating between parses on a focused node, we
 * keep that node expanded (i.e. show its immediate children), but force-collapse all of its other
 * descendants.
 *
 * @param {string} id - The node id that we're fetching an alternate parse for.
 * @returns {object}
 */
var collapseDescendants = exports.collapseDescendants = function collapseDescendants(id) {
  return {
    id: id,
    type: COLLAPSE_DESCENDANTS
  };
};

/**
 * Expand the path to the clicked node.
 *
 * @param {string} id - The node id that we're exposing the path to.
 * @returns {object}
 */
var expandPathToNode = exports.expandPathToNode = function expandPathToNode(id) {
  return {
    id: id,
    type: EXPAND_PATH_TO_NODE
  };
};

var hoverNode = exports.hoverNode = function hoverNode(nodeId) {
  return {
    hoverNodeId: nodeId,
    type: HOVER_NODE
  };
};

var focusNode = exports.focusNode = function focusNode(data) {
  if (data !== 'defocus') {
    return {
      selectedNode: data,
      selectedNodeId: data.id,
      type: FOCUS_NODE
    };
  } else {
    return {
      selectedNode: null,
      selectedNodeId: null,
      type: FOCUS_NODE
    };
  }
};

/**
 * UI Reducer
 */
var initialState = exports.initialState = {
  expandableNodeIds: _immutable2.default.Set(),
  expandedNodeIds: _immutable2.default.Set(),
  exploded: false
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case ADD_ALL_NODE_IDS:
      return _extends({}, state, {
        expandableNodeIds: action.ids
      });
    case COLLAPSE_NODE:
      return _extends({}, state, {
        exploded: false,
        expandedNodeIds: state.expandedNodeIds.delete(action.id)
      });
    case COLLAPSE_ALL_NODES:
      return _extends({}, state, {
        exploded: false,
        expandedNodeIds: _immutable2.default.Set()
      });
    case COLLAPSE_DESCENDANTS:
      return _extends({}, state, {
        exploded: false,
        expandedNodeIds: state.expandedNodeIds.filterNot(isChildOf(action.id))
      });
    case EXPAND_NODE:
      return function () {
        var expandedNodeIds = state.expandedNodeIds,
            expandableNodeIds = state.expandableNodeIds;

        var newExpandedNodeIds = expandedNodeIds.add(action.id);

        return _extends({}, state, {
          exploded: newExpandedNodeIds.equals(expandableNodeIds),
          expandedNodeIds: newExpandedNodeIds
        });
      }();
    case TOGGLE_NODE_STATE:
      return function () {
        var prevIds = state.expandedNodeIds,
            expandableNodeIds = state.expandableNodeIds;

        var id = action.id;
        var newExpandedNodeIds = prevIds.has(id) ? prevIds.delete(id) : prevIds.add(id);

        return _extends({}, state, {
          exploded: newExpandedNodeIds.equals(expandableNodeIds),
          expandedNodeIds: newExpandedNodeIds
        });
      }();
    case EXPAND_ALL_NODES:
      return _extends({}, state, {
        exploded: true,
        expandedNodeIds: _immutable2.default.Set(state.expandableNodeIds)
      });
    case EXPAND_PATH_TO_NODE:
      return _extends({}, state, {
        expandedNodeIds: state.expandedNodeIds.union(pathToNode(action.id))
      });
    case HOVER_NODE:
      return _extends({}, state, {
        hoverNodeId: action.hoverNodeId
      });
    case FOCUS_NODE:
      return _extends({}, state, {
        selectedNode: action.selectedNode,
        selectedNodeId: action.selectedNodeId
      });
    default:
      return state;
  }
};

var isChildOf = function isChildOf(parseId) {
  return function (nodeId) {
    return nodeId.startsWith(parseId + '.');
  };
};

/**
 * Returns an Immutable.Set of node ids. The ids are the path from root to that id. For example,
 * given the id '0.0.0', this function will return ['0', '0.0', '0.0.0'].
 *
 * @param {string} id - the node id to get the path from the root node to.
 * @returns {Immutable.Set}
 */
var pathToNode = function pathToNode(id) {
  if (!id) {
    return _immutable2.default.Set();
  }

  // Recurse from child to parent by cutting off the last two characters, treating the shortened
  // string as a parent pointer.
  return id.length > 0 ? _immutable2.default.Set([id]).union(pathToNode(id.slice(0, -2))) : [];
};
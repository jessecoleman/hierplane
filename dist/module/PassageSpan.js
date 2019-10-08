'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ui = require('./stores/ui');

var _useStore2 = require('./stores/useStore');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _helpers = require('./helpers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PassageSpan = function PassageSpan(_ref) {
  var text = _ref.text,
      data = _ref.data,
      styles = _ref.styles,
      parentId = _ref.parentId,
      depth = _ref.depth;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      setActive = _useState2[1]; // null, hover, pressed


  var _useStore = (0, _useStore2.useStore)(),
      state = _useStore.state,
      dispatch = _useStore.dispatch;

  var selectedNodeId = state.selectedNodeId,
      hoverNodeId = state.hoverNodeId;


  (0, _react.useEffect)(function () {
    if (hoverNodeId === data.id) setActive('hover');else setActive(null);
  }, [hoverNodeId]);

  var handleMouseOver = function handleMouseOver() {
    setActive('hover');
    dispatch((0, _ui.hoverNode)(data.id));
  };

  var handleMouseOut = function handleMouseOut() {
    setActive(null);
    dispatch((0, _ui.hoverNode)('none'));
  };

  var handleMouseUp = function handleMouseUp() {
    setActive('null');
    dispatch((0, _ui.expandPathToNode)(data.id));
    dispatch((0, _ui.focusNode)(data));
  };

  //render

  // Shorthand consts for fragment data
  var segmentsContainer = data.nodeType === "top-level-and";

  function getFragmentData(_ref2) {
    var alternateParseInfo = _ref2.alternateParseInfo;

    return alternateParseInfo && alternateParseInfo.spanAnnotations ? alternateParseInfo.spanAnnotations : null;
  }

  var fragmentData = getFragmentData(data);
  var textHi = text.length + 1;

  var populateSpans = function populateSpans(children, lo, hi) {
    var fragments = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    return children.map(function (childNode) {
      // Shorthand consts for span data
      var hasSpan = childNode.hasOwnProperty("alternateParseInfo") && childNode.alternateParseInfo.hasOwnProperty("charNodeRoot");
      var spanField = hasSpan ? childNode.alternateParseInfo.charNodeRoot : null;
      var spanLo = fragments && hasSpan ? spanField.charLo : 0;
      var spanHi = fragments && hasSpan ? spanField.charHi : textHi;

      // If the child node span fits inside the bounds of the child fragment that triggered this recursion:
      if (spanLo >= lo && spanHi <= hi) {
        return _react2.default.createElement(PassageSpan, {
          key: childNode.id,
          parentId: data.id,
          data: childNode,
          styles: styles,
          text: text,
          depth: depth + 1 });
      }
    });
  };

  var output = null;
  if (fragmentData) {
    output = fragmentData.map(function (item) {
      // If fragment is type child then trigger recursive rendering of children:
      if (item.spanType === "child") {
        return populateSpans(data.children, item.lo, item.hi);
        // Otherwise, render the fragment now:
      } else {
        return _react2.default.createElement(
          'span',
          { key: item.lo + '-' + item.hi, className: 'span-slice__' + item.spanType },
          text.slice(item.lo, item.hi)
        );
      }
    });
  } else {
    // If we don't have fragment data, just display the given text. This means that highlighting
    // won't work.
    output = text;
  }

  // Building list of conditional classes for span-slice
  var spanConditionalClasses = (0, _bind2.default)(_defineProperty({
    "span-slice--hover": active === "hover" || hoverNodeId === data.id,
    "span-slice--pressed": active === "pressed",
    "span-slice--focused": selectedNodeId === data.id,
    "span-slice--margin": depth === 0
  }, 'span-slice--' + (0, _helpers.colorToString)(styles[data.nodeType]), true));

  var onMouseOver = !segmentsContainer ? handleMouseOver : null;
  var onMouseOut = !segmentsContainer ? handleMouseOut : null;
  var onMouseDown = !segmentsContainer ? function () {
    setActive('pressed');
  } : null;
  var onMouseUp = !segmentsContainer ? handleMouseUp : null;

  return _react2.default.createElement(
    'span',
    {
      className: 'span-slice ' + spanConditionalClasses,
      'data-parent-id': depth > 0 ? parentId : "null",
      'data-id': data.id,
      onMouseOver: onMouseOver,
      onMouseOut: onMouseOut,
      onMouseDown: onMouseDown,
      onMouseUp: onMouseUp },
    output
  );
};

PassageSpan.propTypes = {
  text: _propTypes2.default.string.isRequired,
  data: _propTypes2.default.object,
  styles: _propTypes2.default.object,
  parentId: _propTypes2.default.string,
  selectedNodeId: _propTypes2.default.string,
  depth: _propTypes2.default.number,
  hoverNodeId: _propTypes2.default.string,
  hoverNode: _propTypes2.default.func,
  focusNode: _propTypes2.default.func

  // We have no state to map to props, so we just return an empty object.
};var mapStateToProps = function mapStateToProps() {
  return {};
};

// When PassageSpan is called recursively, it is using the local definition of the component and not the
// exported, "wrapped with connect" definition, which is a higher-ordered component that has been
// decorated with redux store state. The fix is to assign the wrapped version of Node to a new
// variable here, export that, and call it when we recurse.
//const PassageSpanWrapper = connect(mapStateToProps, { expandPathToNode })(PassageSpan);

exports.default = PassageSpan;
import { expandPathToNode, focusNode, hoverNode } from './stores/ui';
import { useStore } from './stores/useStore';

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import { colorToString } from './helpers.js';

const PassageSpan = ({
  text,
  data,
  styles,
  parentId,
  depth,
}) => {

  const [ active, setActive ] = useState(null); // null, hover, pressed
  const { state, dispatch } = useStore();

  const {
    selectedNodeId,
    hoverNodeId,
  } = state;

  useEffect(() => {
    if (hoverNodeId === data.id)
      setActive('hover');
    else
      setActive(null);
  }, [hoverNodeId]);

  const handleMouseOver = () => {
    setActive('hover')
    dispatch(hoverNode(data.id));
  }

  const handleMouseOut = () => {
    setActive(null);
    dispatch(hoverNode('none'));
  }

  const handleMouseUp = () => {
    setActive('null');
    dispatch(expandPathToNode(data.id));
    dispatch(focusNode(data));
  }

  //render

  // Shorthand consts for fragment data
  const segmentsContainer = data.nodeType === "top-level-and";

  function getFragmentData({ alternateParseInfo }) {
    return alternateParseInfo && alternateParseInfo.spanAnnotations ? alternateParseInfo.spanAnnotations : null;
  }

  const fragmentData = getFragmentData(data);
  const textHi = text.length + 1;

  const populateSpans = (children, lo, hi, fragments = true) => {
    return children.map((childNode) => {
      // Shorthand consts for span data
      const hasSpan = childNode.hasOwnProperty("alternateParseInfo") && childNode.alternateParseInfo.hasOwnProperty("charNodeRoot");
      const spanField = hasSpan ? childNode.alternateParseInfo.charNodeRoot : null;
      const spanLo = fragments && hasSpan ? spanField.charLo : 0;
      const spanHi = fragments && hasSpan ? spanField.charHi : textHi;

      // If the child node span fits inside the bounds of the child fragment that triggered this recursion:
      if (spanLo >= lo && spanHi <= hi) {
        return (
          <PassageSpan
            key={childNode.id}
            parentId={data.id}
            data={childNode}
            styles={styles}
            text={text}
            depth={depth + 1} />
        );
      }
    });
  }

  let output = null;
  if (fragmentData) {
    output = fragmentData.map(item => {
      // If fragment is type child then trigger recursive rendering of children:
      if (item.spanType === "child") {
        return populateSpans(data.children, item.lo, item.hi);
      // Otherwise, render the fragment now:
      } else {
        return (<span key={`${item.lo}-${item.hi}`} className={`span-slice__${item.spanType}`}>{text.slice(item.lo, item.hi)}</span>);
      }
    });
  } else {
    // If we don't have fragment data, just display the given text. This means that highlighting
    // won't work.
    output = text;
  }

  // Building list of conditional classes for span-slice
  const spanConditionalClasses = classNames({
    "span-slice--hover": active === "hover" || hoverNodeId === data.id,
    "span-slice--pressed": active === "pressed",
    "span-slice--focused": selectedNodeId === data.id,
    "span-slice--margin": depth === 0,
    [`span-slice--${colorToString(styles[data.nodeType])}`]: true,
  });

  const onMouseOver = !segmentsContainer ? handleMouseOver : null;
  const onMouseOut = !segmentsContainer ? handleMouseOut : null;
  const onMouseDown = !segmentsContainer ? () => {setActive('pressed')} : null;
  const onMouseUp = !segmentsContainer ? handleMouseUp : null;

  return (
    <span
        className={`span-slice ${spanConditionalClasses}`}
        data-parent-id={(depth > 0) ? parentId : "null"}
        data-id={data.id}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}>
      {output}
    </span>
  );
}

PassageSpan.propTypes = {
  text: PropTypes.string.isRequired,
  data: PropTypes.object,
  styles: PropTypes.object,
  parentId: PropTypes.string,
  selectedNodeId: PropTypes.string,
  depth: PropTypes.number,
  hoverNodeId: PropTypes.string,
  hoverNode: PropTypes.func,
  focusNode: PropTypes.func,
}

// We have no state to map to props, so we just return an empty object.
const mapStateToProps = () => ({});

// When PassageSpan is called recursively, it is using the local definition of the component and not the
// exported, "wrapped with connect" definition, which is a higher-ordered component that has been
// decorated with redux store state. The fix is to assign the wrapped version of Node to a new
// variable here, export that, and call it when we recurse.
//const PassageSpanWrapper = connect(mapStateToProps, { expandPathToNode })(PassageSpan);

export default PassageSpan;

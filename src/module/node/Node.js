import React, { useState, useEffect } from 'react';
import Link from './Link';
import MiddleParent from './MiddleParent';

import { useStore } from '../stores/useStore';
import { 
  focusNode,
  expandNode, 
  toggleNode, 
  hoverNode,
} from '../stores/ui';

import classNames from 'classnames/bind';
import Immutable from 'immutable';
import PropTypes from 'prop-types';

const Node = ({
  readOnly,
  styles,
  positions,
  linkLabels,
  data,
  layout,
  depth,
  parentId,
  text,
  isSingleSegment,
  fetchAltParse,
  togglePane,
  directionalChildIndex,
  loading,
}) => {

  const [ active, setActive ] = useState(null);
  const [ nodeFocusing, setNodeFocusing ] = useState(false);
  const [ focused, setFocused ] = useState(false);
  const [ rollups, setRollups ] = useState(true); // not necessary to be stateful

  const {
    state: {
      selectedNodeId,
      hoverNodeId,
      expandedNodeIds
    },
    dispatch,
  } = useStore();

  useEffect(() => {
    setActive(hoverNodeId === data.id ? 'hover' : null);
  }, [hoverNodeId]);

  useEffect(() => {
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
  const createChildren = (children, positions) => {
    return children.filter(c => c.render).reduce((children, child) => {
      let index = positions[child.link]
      if (index in children) {
        children[index].push(child);
      }
      else {
        children['down'].push(child);
      }
      return children;
    }, { left: [], right: [], down: [], inside: [] });
  }

  // Returns arrays of inside children grouped by kind:
  const countSeqChildren = (children) => {
    return children.reduce((children, child) => {
      const supportedKinds = new Set(['event', 'entity', 'detail']);
      if (supportedKinds.has(child.nodeType)) {
        children[child.nodeType].push(child);
      }
      return children;
    }, { event: [], entity: [], detail: [] });
  }

  // Node MouseUp Handler:
  const handleNodeMouseUp = () => {
    setNodeFocusing(false);
    dispatch(focusNode(data));
    dispatch(expandNode(data.id));
    handleNodeFocus();
  }

  // UiToggle MouseUp Handler:
  const handleUiToggleMouseUp = () => {
    dispatch(toggleNode(data.id));
    setActive(null);
  }

  // UiParseNav MouseUp Handler:
  const handlePnToggleMouseUp = (nodeData, direction) => {

    handleNodeMouseUp(data);

    if (!loading) {
      fetchAltParse(nodeData, direction);
    }
  }

  const handleNodeMouseOver = () => {
    setActive('hover');
    dispatch(hoverNode(data.id));
  }

  const handleNodeMouseOut = () => {
    setActive(null);
    dispatch(hoverNode('none'));
  }

  const handleNodeFocus = () => {
    setFocused(true);
    setNodeFocusing(false);
    dispatch(expandNode(data.id));
  }

  // render
	
  let leftChildren = null,
      rightChildren = null,
      downChildren = null,
      insideChildren = null,
      canonicalChildren = null;
 
  let childNodes;
  // Immediate child position detection and array building.
  if (data.children) {
    childNodes = createChildren(data.children, positions);
  }
 
  let seqType = null,
      seqChildren;
 
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
 
  let hasChildren = false,
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
    hasSideChildren = (hasLeftChildren || hasRightChildren);
    hasChildren = (hasSideChildren || hasDownChildren || hasInsideChildren);
 
    const insertDefocusTrigger = (classes) => (
      <div 
        className={classes} 
        onDoubleClick={() => dispatch(focusNode('defocus'))} 
      />
    );
 
    const insertSeqTrigger = () => (
      <div className='node-sequence-trigger'
        onClick={() => dispatch(focusNode(data))}
        onMouseOver={handleNodeMouseOver}
        onMouseOut={handleNodeMouseOut}
        onMouseDown={() => setNodeFocusing(true)}
      />
    );
 
    // Node Children Container template:
    const populateNodes = (nodes, container) => (
      <div className={`node-${container ? container : 'children'}-container`}>
        {container !== 'sequence' 
          ? insertDefocusTrigger('node-children-container-defocus-trigger') 
          : insertSeqTrigger()}
        {nodes.filter(n => n.render).map((childNode, index) => (
          <Node
            key={childNode.id}
            readOnly={readOnly}
            fetchAltParse={fetchAltParse}
            togglePane={() => null}
            styles={styles}
            directionalChildIndex={index}
            isSingleSegment={isSingleSegment}
            loading={loading}
            positions={positions}
            linkLabels={linkLabels}
            parentId={data.id}
            data={childNode}
            layout={layout}
            text={text}
            seqType={seqType}
            depth={depth + 1} 
          />
        ))}
      </div>
    );
 
    // Side and Down Children template:
    const populateDirectionalChildren = (direction, children) => {
      if (children.length > 0) {
        // Down Children:
        if (direction === 'down') {
          return (
            <div className='ft__tr'>
              {hasLeftChildren ? insertDefocusTrigger('ft__tr__td ft--left-placeholder') : null}
              <div className='ft__tr__td ft--middle-children'>
                {populateNodes(children)}
              </div>
              {hasRightChildren ? insertDefocusTrigger('ft__tr__td ft--right-placeholder') : null}
            </div>
          );
        } else if (direction === 'left' || direction === 'right') {
          // Side Children:
          return (
            <div className={`ft__tr__td ft--${direction}-children`}>
              {insertDefocusTrigger('node-children-container-defocus-trigger')}
              {populateNodes(children)}
            </div>
          );
        }
      } else {
        return null;
      }
    }
 
    // Outputting sets of each type of children.
    if (layout === 'canonical' || (layout === 'default' && !hasSideChildren && !hasInsideChildren)) {
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
  let isRoot = !isSingleSegment && depth === 0;
  let isEventRoot = (!isSingleSegment && depth === 1) || (isSingleSegment && depth === 0);
  let dataCollapsable = hasChildren && depth > 0 && !isEventRoot;
 
  // Setting value of link position
  let dataPos = '';
 
  if (data.link) {
    // If a link position is not explicitly set, default to 'down'.
    if (positions[data.link]) {
      dataPos = positions[data.link];
    } else {
      dataPos = 'down';
    }
  }
 
  if ((!isSingleSegment && depth === 1) || (isSingleSegment && depth === 0)) {
    dataPos = '';
  }
 
  const isCollapsed = !expandedNodeIds.has(data.id);
  const eventSeqChild = data.nodeType === 'event' && dataPos === 'inside';
  const encapsulated = (dataPos === 'left' || dataPos === 'right') && hasSideChildren;
  const notFirstInsideChild = !(data.id !== undefined && dataPos === 'inside' && directionalChildIndex === 0);
  const ftCollapsed = isCollapsed && (hasSideChildren || hasDownChildren) && !isRoot && !isEventRoot;
 
  // ftConditionalClasses builds dynamic class lists for .ft blocks:
  const ftConditionalClasses = classNames({
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
    'node-container--toggle-ready': active === 'toggle-ready',
  });
 
  const nodeContent = (
    <div className={`ft ${ftConditionalClasses}`}
      data-has-children={hasChildren}>
      <div className='ft__tr'>
        {leftChildren}
        <MiddleParent
          readOnly={readOnly}
          depth={depth}
          directionalChildIndex={directionalChildIndex}
          layout={layout}
          positions={positions}
          linkLabels={linkLabels}
          data={data}
          parentId={parentId}
          hasChildren={hasChildren}
          styles={styles}
          active={active}
          focused={focused}
          collapsed={isCollapsed}
          selectedNodeId={selectedNodeId}
          hoverNodeId={hoverNodeId}
          nodeFocusing={nodeFocusing}
          canonicalChildren={canonicalChildren}
          dataCollapsable={dataCollapsable}
          rollups={rollups}
          isRoot={isRoot}
          encapsulated={encapsulated}
          eventSeqChild={eventSeqChild}
          notFirstInsideChild={notFirstInsideChild}
          isSingleSegment={isSingleSegment}
          text={text}
          dataPos={dataPos}
	  // TODO
          togglePane={() => null}
          isEventRoot={isEventRoot}
          onUiMouseOver={() => setActive('toggle-ready')}
          onPnMouseOver={() => setActive('hover')}
          onUiMouseOut={() => setActive(null)}
          onPnMouseOut={() => setActive(null)}
          onMouseDown={() => setNodeFocusing(true)}
          onMouseOver={handleNodeMouseOver}
          onMouseOut={handleNodeMouseOut}
          onMouseUp={handleNodeMouseUp}
          onUiMouseUp={handleUiToggleMouseUp}
          onPnMouseUp={handlePnToggleMouseUp}
          insideChildren={insideChildren}
          hasInsideChildren={hasInsideChildren}
          hasSideChildren={hasSideChildren}
          hasDownChildren={hasDownChildren}
          seqType={seqType} />
        {rightChildren}
      </div>
      {downChildren}
    </div>
  );
 
  const nodeContentStructure = encapsulated || eventSeqChild ? (
      <div
        className={`encapsulated ${eventSeqChild ? 'event-seq-child' : ''} ${!isCollapsed && hasChildren ? 'event-seq-child--expanded' : ''}`}
        data-pos={dataPos}>
        {(eventSeqChild && notFirstInsideChild) || (encapsulated && dataPos === 'right') 
          ? <Link 
              link={data.link} 
              dataPos={dataPos} 
              layout={layout} 
              linkLabels={linkLabels} 
              id={data.id} 
            />
          : null}
        {nodeContent}
        {!eventSeqChild && dataPos === 'left' 
          ? <Link 
              link={data.link} 
              dataPos={dataPos} 
              layout={layout} 
              linkLabels={linkLabels} 
              id={data.id} 
            />
          : null}
      </div>
    ) : nodeContent;
 
  return nodeContentStructure;

}

Node.propTypes = {
  readOnly: PropTypes.bool,
  styles: PropTypes.object.isRequired,
  positions: PropTypes.object.isRequired,
  linkLabels: PropTypes.object.isRequired,
  data: PropTypes.shape({
    attributes: PropTypes.arrayOf(PropTypes.string.isRequired),
    children: PropTypes.arrayOf(PropTypes.object.isRequired),
    link: PropTypes.string,
    id: PropTypes.string,
  }),
  depth: PropTypes.number.isRequired,
  layout: PropTypes.string,
  text: PropTypes.string,
  parentId: PropTypes.string,
  isSingleSegment: PropTypes.bool,
  fetchAltParse: PropTypes.func,
  togglePane: PropTypes.func,
  directionalChildIndex: PropTypes.number,
  loading: PropTypes.bool,
}

export default Node;

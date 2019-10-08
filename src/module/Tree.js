import React from 'react';
import MainStage from './MainStage.js';
import Passage from './Passage.js';

import { useStore, StoreProvider } from './stores/useStore';
import {
  addAllNodeIds,
  collapseAllNodes,
  collapseDescendants,
  focusNode,
} from './stores/ui';
import {
  assignNodeIds,
  findAllNodeTypes,
  getCollapsibleNodeIds,
  generateStylesForNodeTypes,
  isSingleSegment,
  translateSpans
} from './helpers';
import IconSprite from './IconSprite';

const Tree = ({
  inputText,
  text,
  roots,
  theme,
  nodeTypeToStyle,
  linkToPosition,
  selectedData,
  firstFocus,
  loading,
  firstLoad,
  emptyQuery,
  errorState,
}) => {

  const { state, dispatch } = useStore();
  roots = roots.map((root, idx) => translateSpans(assignNodeIds(root, `${idx}.`)));

  const setCollapsible = (fetchedData, selectedData, includesSubTree = false) => {
    // If this is a new query, i.e., not an alternate parse, then clear the expandedNodeIds.
    // Otherwise, collapse all the open descendant nodes.
    if (!includesSubTree) {
      dispatch(collapseAllNodes());
    } else {
      dispatch(collapseDescendants(selectedData.id));
    }
    // Add the ids to the UI redux store.
    const root = fetchedData.root;
    dispatch(addAllNodeIds(getCollapsibleNodeIds(root, isSingleSegment(root.nodeType))));
  }

  /**
   * Returns an object with the correct data to generate the UI from.
   *
   * @param {object} data - The response from the api call.
   * @param {boolean} includesSubTree - Whether a subtree is expected in the JSON that is returned.
   *                                    This is true if we're fetching an alternate parse.
   */
  const sanitizeResponse = (data, includesSubTree) => {
    return {
      fetchedData: includesSubTree ? data.newCompleteJson : data,
      selectedData: includesSubTree ? data.selectedTree : null,
    };
  }

  return (
    <StoreProvider>
      <div className=`hierplane hierplane--theme-${theme || 'light'}`>
        <div className="pane-container">
          <div className="pane pane--scroll">
            <Passage
              readOnly={true}
              text={text}
              inputText={inputText}
              onKeyPress={null}
              loading={loading}
              roots={roots}
              styles={nodeTypeToStyle}
              emptyQuery={emptyQuery}
              errorState={errorState} />
            <div className="pane pane--fill">
              <MainStage
                readOnly={true}
                styles={nodeTypeToStyle}
                positions={linkToPosition}
                linkLabels={{}}
                roots={roots}
                layout='default'
                text={text}
                loading={loading}
                firstLoad={firstLoad}
                emptyQuery={emptyQuery}
                errorState={errorState} 
              />
            </div>
          </div>
          <IconSprite />
        </div>
      </div>
    </StoreProvider>
  );
}

export default Tree;

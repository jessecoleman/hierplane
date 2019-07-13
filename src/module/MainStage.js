import React from 'react';

import EmptyTree from './EmptyTree';
import Icon from './Icon';
import Node from './node/Node';
import ParseError from './ParseError';
import classNames from 'classnames/bind';
import { focusNode } from './stores/ui';
import { useStore } from './stores/useStore';

import { isSingleSegment } from './helpers';

import PropTypes from 'prop-types';


const MainStage = ({
  readOnly,
  styles,
  positions,
  linkLabels,
  roots,
  layout,
  text,
  fetchAltParse,
  togglePane,
  loading,
  firstLoad,
  emptyQuery,
  errorState,
}) => {

  const { state, dispatch } = useStore();

  // render
  const rendered = true;

  let mainsStageContent = null;

  if (emptyQuery) {
    mainsStageContent = (<EmptyTree />);
  } else {
    if (roots && !errorState) {
      // TODO: remove readOnly, execute componentDidUpdate automatically when readOnly is true
      mainsStageContent = (
        <div 
          className={`main-stage__tree-container ${rendered || readOnly ? 'main-stage--rendered' : ''}`}
	      style={{
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'center', 
            alignItems: 'flex-start',
          }}
        >
          <div 
            className='main-stage__defocus-trigger' 
            onDoubleClick={() => dispatch(focusNode('defocus'))} 
          />
          {roots.filter(r => r.render).map((root, idx) => (
            <Node
              key={idx}
              readOnly={readOnly}
              fetchAltParse={fetchAltParse}
              togglePane={togglePane}
              styles={styles}
              positions={positions}
              linkLabels={linkLabels}
              loading={loading}
              data={root}
              isSingleSegment={isSingleSegment(root.nodeType)}
              layout={layout}
              depth={0}
              directionalChildIndex={0}
              text={text} 
            />
          ))}
        </div>
      );
    } else {
      mainsStageContent = (<ParseError />);
    }
  }

  // mainStageConditionalClasses builds dynamic class lists for #main-stage:
  const mainStageConditionalClasses = classNames({
    [`${layout}`]: true,
    'main-stage--loading': loading,
    'main-stage--fade-delay': !firstLoad && !emptyQuery,
  });

  return (
    <div id='main-stage' className={mainStageConditionalClasses}>
      {loading ? (
        <div className='main-stage__loading-mask'>
          <div className='main-stage__loading-mask__spinbox'>
            <Icon symbol='logo-euclid' wrapperClass='loader' />
          </div>
        </div>
      ) : null}
      <div 
        className='main-stage__defocus-trigger' 
        onDoubleClick={() => dispatch(focusNode('defocus'))} 
      />
      {mainsStageContent}
    </div>
  );
}

MainStage.propTypes = {
  readOnly: PropTypes.bool,
  styles: PropTypes.object.isRequired,
  positions: PropTypes.object.isRequired,
  linkLabels: PropTypes.object.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    kind: PropTypes.string,
    word: PropTypes.string,
    attributes: PropTypes.arrayOf(PropTypes.string.isRequired),
    children: PropTypes.arrayOf(PropTypes.object.isRequired),
    link: PropTypes.string,
  }),
  layout: PropTypes.string,
  text: PropTypes.string,
  fetchAltParse: PropTypes.func,
  togglePane: PropTypes.func,
  loading: PropTypes.bool,
  firstLoad: PropTypes.bool,
  emptyQuery: PropTypes.bool,
  errorState: PropTypes.bool,
}

export default MainStage;

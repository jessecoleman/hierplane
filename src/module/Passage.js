import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PassageSpan from './PassageSpan';
import Icon from './Icon.js';
import classNames from 'classnames/bind';
import { useStore } from './stores/useStore';
import { hoverNode, focusNode } from './stores/ui';

const Passage = ({
  emptyQuery,
  readOnly,
  text,
  inputText,
  onKeyPress,
  onChange,
  loading,
  roots,
  styles,
  errorState,
}) => {

  const { state, dispatch } = useStore();
  const { selectedNodeId, hoverNodeId } = state;

  const [ focused, setFocused ] = useState(false);
  const [ autoFocus, setAutoFocus ] = useState(null);
  const [ passageActive, setPassageActive ] = useState(false);

  useEffect(() => {
    window.addEventListener('keyup', handleSpaceBar);
    return () => {
      window.removeEventListener('keyup', handleSpaceBar);
    }
  }, []);

  useEffect(() => {
    handleEmpty();
  }, []);

  const passageInput = useRef(null);

  const handleEmpty = () => {
    if (emptyQuery === true) {
      switch (autoFocus) {
        case null:
          setAutoFocus(true);
          break;
        case true:
          handleFocus();
          setAutoFocus(false);
          break;
      }
    }
  }

  const handleEsc = (e) => {
    if (e.keyCode === 27) {
      handleBlur();
    }
  }

  const handleSpaceBar = (e) => {

    if (!loading && !readOnly) {
      if (focused === false && e.keyCode === 32) {
        e.preventDefault();
        handleFocus();
      }
    }

    if (focused && e.key === 'Enter' && !readOnly) {
      handleBlur();
    }
  }

  const handleFocus = () => {
    setFocused(true);
    ReactDOM.findDOMNode(passageInput).focus();
    dispatch(focusNode('defocus'));
  }

  const handleBlur = () => {
    if (emptyQuery === true) {
      handleFocus();
    } else {
      setFocused(false);
      ReactDOM.findDOMNode(passageInput).blur();
    }
  }

  const handleMouseOver = () => setPassageActive(true);
  const handleMouseOut = () => setPassageActive(false);

  //render

  const passageConditionalClasses = classNames({
    "passage--editing": focused,
    "passage--active": passageActive,
    "passage--loading": loading,
  });

  return (
    <div id="passage" className={passageConditionalClasses}>
      <div className="passage__focus-trigger"
        onDoubleClick={!readOnly ? handleFocus : () => {}}></div>
      {!readOnly ? (
        <textarea
          ref={passageInput}
          rows="1"
          onBlur={handleBlur}
          onKeyPress={onKeyPress}
          onKeyUp={handleEsc}
          readOnly={readOnly}
          onChange={onChange}
          disabled={loading}
          value={(inputText !== null ? inputText : "")} />
      ) : null}
      <p onDoubleClick={!readOnly ? handleFocus : () => {}}>
        <span className="passage__readonly">
          {roots.map((root, idx) => (
              <PassageSpan
                key={idx}
                text={text}
                data={root}
                styles={styles}
                depth={0} 
              />
          ))}
          {!readOnly ? (
            <span className="passage__edit"
              onClick={handleFocus}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              title="Edit query">
              <Icon symbol="edit" wrapperClass="passage__edit__trigger" />
            </span>
          ) : null}
        </span>
      </p>
      <div className="passage__loading-mask"></div>
    </div>
  );
}

Passage.propTypes = {
  readOnly: PropTypes.bool,
  text: PropTypes.string.isRequired,
  inputText: PropTypes.string,
  //onKeyPress: PropTypes.func.isRequired,
  //onChange: PropTypes.func.isRequired,
  focusNode: PropTypes.func,
  loading: PropTypes.bool,
  emptyQuery: PropTypes.bool,
  errorState: PropTypes.bool,
  roots: PropTypes.array,
  styles: PropTypes.object,
  selectedNodeId: PropTypes.string,
  hoverNodeId: PropTypes.string,
  hoverNode: PropTypes.func,
}

export default Passage;

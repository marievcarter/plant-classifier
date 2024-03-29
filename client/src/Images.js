import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default props =>
  props.images.map((image, i) => (
    <div key={i} className="fadein">
      <div
        onClick={() => props.removeImage(image.public_id)}
        className="delete"
      >
        <FontAwesomeIcon icon={faTimesCircle} size="2x" />
      </div>
      <img
        src={image.secure_url}
        alt=""
        onError={() => props.onError(image.public_id)}
      />
      <br />
      <button onClick={props.runScripts} className="identifyBtn">
        identify plant
      </button>
      <br />
      <div className="results">
        <h2>RESULTS:</h2>
        <p>
          <b>{props.results}</b>
        </p>
      </div>
    </div>
  ));

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
      <button onClick={props.runScripts}>test image</button>
      <br />
      <div className="results">
        <h3>RESULTS:</h3>
        <p>{props.results}</p>
      </div>
    </div>
  ));

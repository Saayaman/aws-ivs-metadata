import React from 'react';

import { CONTROLS } from '../../config';
import { AspectRatio, Close, VolumeOff, VolumeUp } from '../../assets/icons';

const PlayerControls = (props) => {

  const {  muted, onClose, onMute } = props;

  return (
    <div className="PlayerControls">
        <button className="PlayerControls-button" onClick={onClose}>
            <Close />
        </button>
        <button className="PlayerControls-button" onClick={onMute}>
            {muted ? <VolumeOff /> : <VolumeUp />}
        </button>
    </div>
  );
};

export default PlayerControls;

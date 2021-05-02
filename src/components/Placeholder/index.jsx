import React from 'react';
import './style.css';

const Placeholder = ({ loading }) => {

  return (
    <div className="Placeholder" style={{ background: loading ? '#000' : 'transparent' }}>
      <div className="Placeholder-content">
        {loading && (
          <div className="Placeholder-spinner">
            <div className="Placeholder-gradient"/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Placeholder;
 
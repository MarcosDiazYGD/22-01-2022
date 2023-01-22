import React from 'react';

const ModalMessage = ({ status, message }) => {
  return (
    <div className='modal-overlay'>
        <div className='container--modal' style={status ? {background: '#9bdc28', color: '#fff'} : {background: '#f83991', color: '#fff'}}>
          <p>{message}</p>
      </div>
    </div>
  );
};

export default ModalMessage;
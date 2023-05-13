import React, { useState } from 'react';
import './Popup.css';
import { Button, Box, Modal, Typography } from '@mui/material';
// import Modal from 'react-modal';

// npm install @mui/material 필요
// npm install @emotion/react 필요
// npm install @emotion/styled 필요

const Popup = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="popup-style"> 
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* // 팝업창의 정보 : 
                // {parentRequest.pickupManName}, {parentRequest.studentName}, {parentRequest.studentGrade}, {parentRequest.studentGender}
                */}
            student pickup popup content comes here 
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Popup;

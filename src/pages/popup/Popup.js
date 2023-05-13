import React, { useState } from 'react';
import './Popup.css';
import { Button, Box, Modal, Typography } from '@mui/material';
// import Modal from 'react-modal';

// 팝업창의 정보 : 
// {parentRequest.pickupManName}, {parentRequest.studentName}, {parentRequest.studentGrade}, {parentRequest.studentGender}

// npm install @mui/material 필요
// npm install @emotion/react 필요
// npm install @emotion/styled 필요


const Popup = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="popup-style"> {/* Use the CSS class here */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            student pickup popup content comes here 
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Popup;

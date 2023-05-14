import React, { useState, useEffect } from 'react';

function PopupContainer({ children }) {
  const [popups, setPopups] = useState([]);

  useEffect(() => {
    let index = 0;
    const timeoutIds = [];

    const addPopup = (popup) => {
      setPopups((popups) => [...popups, popup]);
    };

    const removePopup = () => {
      setPopups((popups) => popups.slice(1));
    };

    const showPopup = () => {
      const timeoutId = setTimeout(() => {
        addPopup(children[index]);
        index++;

        if (index < children.length) {
          showPopup();
        }
      }, 2000);

      timeoutIds.push(timeoutId);
    };

    showPopup();

    const clearAllTimeouts = () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };

    return clearAllTimeouts;
  }, [children]);

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
      {popups.map((popup, index) => (
        <div
          key={index}
          style={{
            backgroundColor: '#e6e6e6',
            border: '1px solid #ccc',
            padding: '35px 100px',
            borderRadius: '5px',
            marginBottom: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          {popup}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [students, setStudents] = useState([
    { id: "1", name: "hi1"},
    { id: "2", name: "hi2"},
    { id: "3", name: "hi3"},
    { id: "4", name: "hi4" },
    { id: "5", name: "hi5"},
  ]);

  const popupMessages = students.map((student) => {
    return <div key={student.id}>{student.name}</div>
  });

  return (
    <div className="App">
      <PopupContainer>
        {popupMessages}
      </PopupContainer>
    </div>
  );
}

export default App;



/*



import React, { useState, useEffect } from 'react';

function PopupContainer({ children }) {
  const [popups, setPopups] = useState([]);

  useEffect(() => {
    let index = 0;
    const timeoutIds = [];

    const addPopup = (popup) => {
      setPopups((popups) => [...popups, popup]);
    };

    const removePopup = () => {
      setPopups((popups) => popups.slice(1));
    };

    const showPopup = () => {
      const timeoutId = setTimeout(() => {
        addPopup(children[index]);
        index++;

        if (index < children.length) {
          showPopup();
        }
      }, 2000);

      timeoutIds.push(timeoutId);
    };

    showPopup();

    const clearAllTimeouts = () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };

    return clearAllTimeouts;
  }, [children]);

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
      {popups.map((popup, index) => (
        <div
          key={index}
          style={{
            backgroundColor: '#e6e6e6',
            border: '1px solid #ccc',
            padding: '35px 100px',
            borderRadius: '5px',
            marginBottom: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
            width: '100px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {popup}
        </div>
      ))}
    </div>
  );
}

function App() {
  const popups = ['Hi', 'Hello'];

  return (
    <div className="App">
      <PopupContainer>
        {popups.map((popup) => (
          <div key={popup}>{popup}</div>
        ))}
      </PopupContainer>
    </div>
  );
}

export default App;







/*
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
                
            student pickup popup content comes here 
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Popup;
*/
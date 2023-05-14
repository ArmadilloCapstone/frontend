import React, { useState, useEffect } from 'react';
// const alarmSound = new Audio('./alarm.wav');

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
  
    const audio = new Audio('./alarm.wav');
    audio.load();
  
    const showPopup = () => {
      const timeoutId = setTimeout(() => {
        addPopup(children[index]);
        index++;
  
        // play audio file when first popup appears
        // popups appear every 1 second, clears out after 5 seconds of end
        audio.muted = true;
        audio.play();
        audio.muted = false;
        if (index === 1) {
          audio.play();
        }
  
        if (index < children.length) {
          showPopup();
        } else {
          setTimeout(() => {
            setPopups([]);
          }, 5000); 
        }
      }, 1000);
  
      timeoutIds.push(timeoutId);
    };
    

    // delay initial popup load
    const initialTimeoutId = setTimeout(() => {
      showPopup();
    }, 3000);

    timeoutIds.push(initialTimeoutId);

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
            backgroundColor: '#b8dff8',
            border: '1px solid #ccc',
            padding: '20px 20px',
            borderRadius: '5px',
            marginBottom: '10px',
            boxShadow: '3px 3px 15px #888888',
          }}
        >
          {popup}
        </div>
      ))}
    </div>
  );
}

function Popup() {
  // 더미 데이터
  // {parentRequest.pickupManName}, {parentRequest.studentName}, 
  // {parentRequest.studentGrade}, {parentRequest.studentGender}
                
  const [students, setStudents] = useState([
    { id: "1", name: "김민수", grade: "1", gender: "M", pickupManName: "김미영"},
    { id: "2", name: "이민수", grade: "2", gender: "F", pickupManName: "이미영"},
    { id: "3", name: "박민수", grade: "1", gender: "M", pickupManName: "박미영"},
    { id: "4", name: "최민수", grade: "2", gender: "F", pickupManName: "최미영" },
    { id: "5", name: "강민수", grade: "1", gender: "M", pickupManName: "강미영"},
  ]);

  const popupMessages = students.map((student) => {
    return (
      <div key={student.id} style={{ fontSize: '14px' }}>
        {student.name} 학생 <br></br>
        {student.grade}학년 / {student.gender} / 픽업자: {student.pickupManName}
      </div>
    );
  });

  return (
    <div className="Popup">
      <PopupContainer>
        {popupMessages}
      </PopupContainer>
    </div>
  );
}

export default Popup;



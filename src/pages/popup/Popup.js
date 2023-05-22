import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const PopupContainer = ({ children }) => {
  const [popup, setPopup] = useState(null);

  useEffect(() => {
      setPopup(children);
  }, []);


  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
      {popup && (
        <div
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
      )}
    </div>
  );
};

const Popup = () => {
  const [students, setStudents] = useState([
    // { id: "1", name: "김민수", grade: "1", gender: "M", pickupManName: "김미영" },
    // { id: "2", name: "이민수", grade: "2", gender: "F", pickupManName: "이미영" },
    // { id: "3", name: "박민수", grade: "1", gender: "M", pickupManName: "박미영" },
    // { id: "4", name: "최민수", grade: "2", gender: "F", pickupManName: "최미영" },
    // { id: "5", name: "강민수", grade: "1", gender: "M", pickupManName: "강미영" },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const user_option = useSelector((state => state.user_option))

  const clickPopup = () =>{
    setShowPopup(false);
  }

  useEffect(() => {
    console.log(user_option);
    if(user_option == 1){
      var now = new Date();
      //const period = 1; // 1분주기
      //var lastsec = 60 - now.getSeconds(); // 남은 시간
      const period = 0.333;
      var lastsec = 1;
      setTimeout(() => {
        axios.post("http://13.209.104.24:8080/sendPickupFormToTeacher").then((res)=>{
          setStudents(res.data.map(function(el){
            console.log(el);
            var returnObj = {}
            returnObj['id'] = el.studentId;
            returnObj['name'] = el.studentName;
            returnObj['grade'] = el.studentGrade;
            returnObj['gender'] = (el.studentGender==1)?'M':'F';
            returnObj['pickupManName'] = el.pickupManName;
            return returnObj;
          }));
          if(res.data != null){
            setShowPopup(true);
            console.log("showPopup is true")
          }

        })
        setInterval(() => {
          axios.post("http://13.209.104.24:8080/sendPickupFormToTeacher").then((res)=>{
            setStudents(res.data.map(function(el){
              console.log(el);
              var returnObj = {}
              returnObj['id'] = el.studentId;
              returnObj['name'] = el.studentName;
              returnObj['grade'] = el.studentGrade;
              returnObj['gender'] = (el.studentGender==1)?'M':'F';
              returnObj['pickupManName'] = el.pickupManName;
              return returnObj;
            }));
            if(res.data != null){
              setShowPopup(true);
              console.log("showPopup is true")
            }

          })
        }, period * 60 * 1000);
      }, lastsec* 1000);
        console.log(showPopup)
  }
  }, []);


  const popupMessage = students.map((student, index) => (
    <React.Fragment key={student.id}>
      <div style={{ fontSize: '14px' }}>
        {student.name} 학생 <br />
        {student.grade}학년 / {student.gender} / 픽업자: {student.pickupManName}
      </div>
      {index !== students.length - 1 && <hr/>} {/* Add line if not the last student */}
    </React.Fragment>
  ));
  

  return (
    <div className="Popup" onClick={clickPopup}>
      {(showPopup && (students.length != 0))?<PopupContainer>{popupMessage}</PopupContainer>:null}
    </div>
  );
};

export default Popup;








/*
several popup boxes 

import React, { useState, useEffect } from 'react';
const audio = new Audio('./sound.wav');

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
  

   const audio = new Audio('./sound.wav');
   audio.load();
  
    const showPopup = () => {
      const timeoutId = setTimeout(() => {
        addPopup(children[index]);
        index++;

        if (index < children.length) {
          showPopup();
        } else {
          setTimeout(() => {
            setPopups([]);
          }, 7000); 
        }
      }, 500);
  
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

const Popup = () => {

 // const [isAlarmPlayed, setIsAlarmPlayed] = useState(false);

  const handleAlarmClick = () => {
      const audio = new Audio('./sound.wav');
      audio.load();
      audio.play();
  };
  

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

      <button
          onClick={handleAlarmClick}
          style={{
          position: 'fixed',
          top: '95%',
          left: '5%',
          transform: 'translate(-50%, -50%)',
          padding: '10px 20px',
          backgroundColor: '#b5bfc1',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Alarm
      </button>

    </div>
  );
}

export default Popup;




// #b5bfc1 : light gray

*/
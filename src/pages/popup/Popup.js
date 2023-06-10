import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {useCallback} from 'react';


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
            backgroundColor: '#12B560',
            border: 'none',
            color: 'white',
            padding: '20px 20px',
            borderRadius: '15px',
            marginBottom: '10px',
            boxShadow: '3px 3px 15px darkgreen',
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
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const user_option = useSelector((state => state.user_option))

  const clickPopup = () =>{
    setShowPopup(false);
  }

  const handleClickButton = useCallback(() => {
    var audio = new Audio('/alarm.wav');
    audio.muted = true;
    audio.play();
    audio.muted = false;
    
  }, []);
  

  useEffect(() => {
    // console.log(user_option);
      var now = new Date();
      const period = 20; // 초단위 주기
      var lastsec = 1;
      setTimeout(() => {
        // console.log("pickup");
        if(user_option == 1){
          axios.post("http://dolbomi.site/sendPickupFormToTeacher/" + localStorage.getItem('userid')).then((res)=>{
            if(res.data.length != 0){
              setStudents(res.data.map(function(el){
                // console.log(el);
                var returnObj = {}
                returnObj['id'] = el.studentId;
                returnObj['name'] = el.studentName;
                returnObj['grade'] = el.studentGrade;
                returnObj['gender'] = (el.studentGender==1)?'M':'F';
                returnObj['pickupManName'] = el.pickupManName;
                return returnObj;
              }));
              setShowPopup(true);
              handleClickButton();
              // console.log("showPopup is true")
            }
          
          })
        }
        setInterval(() => {
          // console.log("pickup");
          if(user_option == 1){
            axios.post("http://dolbomi.site/sendPickupFormToTeacher/" + localStorage.getItem('userid')).then((res)=>{
              if(res.data.length != 0){
                setStudents(res.data.map(function(el){
                  // console.log(el);
                  var returnObj = {}
                  returnObj['id'] = el.studentId;
                  returnObj['name'] = el.studentName;
                  returnObj['grade'] = el.studentGrade;
                  returnObj['gender'] = (el.studentGender==1)?'M':'F';
                  returnObj['pickupManName'] = el.pickupManName;
                  return returnObj;
                }));
                setShowPopup(true);
                handleClickButton();
                // console.log("showPopup is true")
              }
            
            })
          }
        }, period * 1000);
      }, lastsec* 1000);
        // console.log(showPopup)
  }, []);


  const popupMessage = students.map((student, index) => (
    <React.Fragment key={student.id}>
      <div style={{ fontSize: '14px' }}>
        {student.name} 학생 <br />
        {student.grade}학년 / {student.gender} / 픽업자: {student.pickupManName}
      </div>
      {index !== students.length - 1 && <hr/>} 
    </React.Fragment>
  ));
  

  return (
    <div className="Popup" onClick={clickPopup}>
      {(showPopup && (students.length != 0))?<PopupContainer>{popupMessage}</PopupContainer>:null}
    </div>
  );
};

export default Popup;

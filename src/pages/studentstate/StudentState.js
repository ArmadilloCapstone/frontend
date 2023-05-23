import './StudentState.css';
import Draggable from "react-draggable";
import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import soon from "./soon.png";
import arrived from "./arrived.png";
import art from "./art.png";
import house from "./house.png";

const iconMap = {
  box1: soon,
  box2: arrived,
  box3: art,
  box4: house
};

const iconStyles = {
  width: '70px', 
  height: '70px', 
};



function drop(event, student, setStudent) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var target = event.target;

  while (target.className != "box") {
    target = target.parentNode;
  }

  const newStudent = student.map((item) => {
    if (item.id === data) {
      return { ...item, state: target.id };
    }
    return item;
  });
  setStudent(newStudent);
}

const sortItems = (box) => {
  var items = box.querySelectorAll('.item');
  var sortedItems = Array.prototype.slice.call(items).sort(function (a, b) {
    return a.innerHTML.localeCompare(b.innerHTML, 'ko-KR');
  });
  for (var i = 0; i < sortedItems.length; i++) {
    box.appendChild(sortedItems[i]);
  }
}

const StudentState = () => {



  // 더미데이터 -> 추후에 백엔드에서 학생 명단 받아오면 대체할 부분
  const [student, setStudent] = useState([
  ]);

  useEffect(() => {
    // 백엔드의 학생 명단 가져오는 부분
    axios.post('http://13.209.104.24:8080/getStudentInfo')
        .then(function(response){
          setStudent(response.data.map(function(el, idx){

            // 서버에서 주는 데이터 형식
            // {[id : Long, student_id : Long, name : String, state : Long]}


            console.log(el);
            var returnObj = {}
            returnObj["id"] = el.id;
            returnObj["student_id"] = el.student_id;
            returnObj["name"] = el.name;
            returnObj["state"] = "box" + el.state;
            console.log(returnObj);
            return returnObj;

          }));
        }).catch(function(reason){
      console.log(reason);
    });
  }, []);



  // 드래그 끝난 후의 박스 위치 파악 -> state 변경 -> student 변경
  const handleDrag = useCallback((event, ui, ns) => {
    const [ret] = document.elementsFromPoint(event.clientX, event.clientY).filter(i => i.id.startsWith('box'));
    if (!ret) return;
    if (ret.id !== ns.state) {
      const dt = [...student];
      const idx = dt.findIndex(i => i.id === ns.id);
      dt[idx].state = ret.id;
      console.log(dt[idx].student_id, dt[idx].state[3] - 0)
      // 서버에 dt 보내는 코드 작성 위치
      axios.post('http://13.209.104.24:8080/changeStudentState', { id : dt[idx].id, student_id : dt[idx].student_id,name : dt[idx].name, state : dt[idx].state[3] - 0})
          .then(function(response){
            console.log(response);
          }).catch(function(reason) {
        console.log(reason);
      });

      console.log(dt[idx])
      setStudent(dt);
    }
  }, [student]);

  return (
    <div className='statebody'>
    <div className="StudentState">
      <div className="box" id="box1">
        <div className="icon">
         <img src={iconMap.box1} alt="Icon" style={iconStyles} />
        </div>
        <h5 style={{ padding: "15px 0px 15px 0px", fontSize: "25px", fontWeight: "bolder"}}>도착하지 않았어요</h5>
        {student.filter((item) => item.state === "box1").map(student => (
          <Draggable position={{ x: 0, y: 0 }} key={student.id} onStop={(event, ui) => handleDrag(event, ui, student)}>
            <div className="item" id={student.id}>{student.name}</div>
          </Draggable>
        ))}
      </div>

      <div className="box" id="box2">
          <div className="icon">
            <img src={iconMap.box2} alt="Icon" style={iconStyles}/>
          </div>
        <h5 style={{ padding: "15px 0px 15px 0px", fontSize: "25px", fontWeight: "bolder"}}>돌봄교실에 도착했어요</h5>
        {student.filter((item) => item.state === "box2").map(student => (
          <Draggable position={{ x: 0, y: 0 }} key={student.id} onStop={(event, ui) => handleDrag(event, ui, student)}>
            <div className="item" id={student.id}>{student.name}</div>
          </Draggable>
        ))}
      </div>

      <div className="box" id="box3">
          <div className="icon">
            <img src={iconMap.box3} alt="Icon" style={iconStyles}/>
          </div>
        <h5 style={{ padding: "15px 0px 15px 0px", fontSize: "25px", fontWeight: "bolder"}}>방과후수업에 다녀올게요</h5>
        {student.filter((item) => item.state === "box3").map(student => (
          <Draggable position={{ x: 0, y: 0 }} key={student.id} onStop={(event, ui) => handleDrag(event, ui, student)}>
            <div className="item" id={student.id}>{student.name}</div>
          </Draggable>
        ))}
      </div>

      <div className="box" id="box4">
          <div className="icon">
            <img src={iconMap.box4} alt="Icon" style={iconStyles}/>
          </div>
        <h5 style={{ padding: "15px 0px 15px 0px", fontSize: "25px", fontWeight: "bolder"}}>오늘은 떠날게요</h5>
        {student.filter((item) => item.state === "box4").map(student => (
          <Draggable position={{ x: 0, y: 0 }} key={student.id} onStop={(event, ui) => handleDrag(event, ui, student)}>
            <div className="item" id={student.id}>{student.name}</div>
          </Draggable>
        ))}
      </div>
    </div>
    </div>
  );
};

export default StudentState;

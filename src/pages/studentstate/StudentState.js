import './StudentState.css';
import Draggable from "react-draggable";
import axios from 'axios';
import React, { useState, useCallback } from 'react';

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

  /*
    // 백엔드의 학생 명단 가져오는 부분
  axios.post('/getStudentInfo').then(function(response){
    console.log(response)
  }).catch(function(reason){
    console.log(reason);
  });
 */


  // 더미데이터 -> 추후에 백엔드에서 학생 명단 받아오면 대체할 부분
  const [student, setStudent] = useState([
    { id: "1", name: "김민수", state: "box1" },
    { id: "2", name: "이민수", state: "box2" },
    { id: "3", name: "박민수", state: "box1" },
    { id: "4", name: "최민수", state: "box3" },
    { id: "5", name: "정민수", state: "box1" },
    { id: "6", name: "강민수", state: "box4" },
  ]);


  // 드래그 끝난 후의 박스 위치 파악 -> state 변경 -> student 변경
  const handleDrag = useCallback((event, ui, ns) => {
    const [ret] = document.elementsFromPoint(event.clientX, event.clientY).filter(i => i.id.startsWith('box'));
    if (!ret) return;
    if (ret.id !== ns.state) {
      const dt = [...student];
      const idx = dt.findIndex(i => i.id === ns.id);
      dt[idx].state = ret.id;
      // 서버에 dt 보내는 코드 작성 위치
      setStudent(dt);
    }
  }, [student]);

  return (
    <div className="StudentState">
      <div className="box" id="box1">
        <h3>도착하지 않았어요</h3>
        {student.filter((item) => item.state === "box1").map(student => (
          <Draggable position={{ x: 0, y: 0 }} key={student.id} onStop={(event, ui) => handleDrag(event, ui, student)}>
            <div className="item" id={student.id}>{student.name}</div>
          </Draggable>
        ))}
      </div>

      <div className="box" id="box2">
        <h3>돌봄교실에 도착했어요</h3>
        {student.filter((item) => item.state === "box2").map(student => (
          <Draggable position={{ x: 0, y: 0 }} key={student.id} onStop={(event, ui) => handleDrag(event, ui, student)}>
            <div className="item" id={student.id}>{student.name}</div>
          </Draggable>
        ))}
      </div>

      <div className="box" id="box3">
        <h3>방과후수업에 다녀올게요</h3>
        {student.filter((item) => item.state === "box3").map(student => (
          <Draggable position={{ x: 0, y: 0 }} key={student.id} onStop={(event, ui) => handleDrag(event, ui, student)}>
            <div className="item" id={student.id}>{student.name}</div>
          </Draggable>
        ))}
      </div>

      <div className="box" id="box4">
        <h3>오늘은 떠날게요</h3>
        {student.filter((item) => item.state === "box4").map(student => (
          <Draggable position={{ x: 0, y: 0 }} key={student.id} onStop={(event, ui) => handleDrag(event, ui, student)}>
            <div className="item" id={student.id}>{student.name}</div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default StudentState;

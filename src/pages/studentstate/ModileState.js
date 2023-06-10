import './StudentState.css';
import Draggable from "react-draggable";
import { DndProvider } from 'react-dnd-multi-backend';
// for mobile
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import soon from "./soon.png";
import arrived from "./arrived.png";
import art from "./art.png";
import house from "./house.png";
import {Container} from "./Container";

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


const iconSize = {
  width: '70px',
  height: '70px',
};


const ModileState = () => {


  const [student, setStudent] = useState([
  ]);

  useEffect(() => {
    // 백엔드의 학생 명단 가져오는 부분
    axios.post('http://dolbomi.site/getStudentInfo/' + localStorage.getItem('userid'))
        .then(function(response){
          setStudent(response.data.map(function(el, idx){

            // console.log(el);
            var returnObj = {}
            returnObj["id"] = el.id;
            returnObj["student_id"] = el.student_id;
            returnObj["name"] = el.name;
            returnObj["state"] = "box" + el.state;
            // console.log(returnObj);
            return returnObj;

          }));
        }).catch(function(reason){
      // console.log(reason);
    });
  }, []);


  const handleDrag = useCallback((event, ui, ns) => {
    const [ret] = document.elementsFromPoint(event.clientX, event.clientY).filter(i => i.id.startsWith('box'));
    if (!ret) return;
    if (ret.id !== ns.state) {
      const dt = [...student];
      const idx = dt.findIndex(i => i.id === ns.id);
      dt[idx].state = ret.id;
      // console.log(dt[idx].student_id, dt[idx].state[3] - 0)
      // 서버에 dt 보내는 코드 작성 위치
      axios.post('http://dolbomi.site/changeStudentState', { id : dt[idx].id, student_id : dt[idx].student_id,name : dt[idx].name, state : dt[idx].state[3] - 0})
          .then(function(response){
            // console.log(response);
          }).catch(function(reason) {
        // console.log(reason);
      });

      // console.log(dt[idx])
      setStudent(dt);
    }
  }, [student]);

  return (
    <div>
      {/*
        multi-backend의 DndProvider를 사용하고 options에 HTML5toTouch를 넣으면
        모바일에서 처리할 수 없는 drag 이벤트를 touch 이벤트로 바꿔줌!
        react-dnd를 사용할 컨테이너를 DndProvider로 감싸줌
       */}
      <DndProvider options={HTML5toTouch}>
        <Container/>
      </DndProvider>
    </div>
  );
};

export default ModileState;


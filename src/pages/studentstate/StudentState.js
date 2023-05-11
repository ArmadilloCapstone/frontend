import './StudentState.css';
import Draggable from "react-draggable";
import axios from 'axios'; 
import React, { useState, useEffect } from 'react';

function allowDrop(event) {
  event.preventDefault();
}

function handleDrag(event, ui, student, setStudent) {
  // Update the student's state when an item is dragged
  const id = event.target.id;
  const newStudent = student.map((item) => {
    if (item.id === id) {
      return { ...item, state: ui.lastX > 700 ? "left" : ui.lastX < 300 ? "right" : "center" };
    }
    return item;
  });
  setStudent(newStudent);
}

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
  var sortedItems = Array.prototype.slice.call(items).sort(function(a, b) {
      return a.innerHTML.localeCompare(b.innerHTML, 'ko-KR');
  });
  for (var i = 0; i < sortedItems.length; i++) {
      box.appendChild(sortedItems[i]);
  }
}

const StudentState = () => {


  axios.post('/getStudentInfo').then(function(response){
    console.log(response)
  }).catch(function(reason){
    console.log(reason);
  });


  return (
    <div className="StudentState">
      <div className="box" id="box1" onDrop={(event) => drop(event, student, setStudent)} onDragStart={allowDrop}>
        <h3>도착하지 않았어요</h3>
        {student.filter((item) => item.state === "box1").map(student => (
          <Draggable onStop={(event, ui) => handleDrag(event, ui, student, setStudent)}>
            <div className="item" id={student.id} draggable="true">{student.name}</div>
          </Draggable>
        ))}
      </div>

      <div className="box" id="box2" onDrop={(event) => drop(event, student, setStudent)} onDragOver={allowDrop}>
        <h3>돌봄교실에 도착했어요</h3>
        {student.filter((item) => item.state === "box2").map(student => (
          <Draggable onStop={(event, ui) => handleDrag(event, ui, student, setStudent)}>
            <div className="item" id={student.id} draggable="true">{student.name}</div>
          </Draggable>
        ))}
      </div>

      <div className="box" id="box3" onDrop={(event) => drop(event, student, setStudent)} onDragOver={allowDrop}>
          <h3>방과후수업에 다녀올게요</h3>
          {student.filter((item) => item.state === "box3").map(student => (
          <Draggable onStop={(event, ui) => handleDrag(event, ui, student, setStudent)}>
          <div className="item" id={student.id} draggable="true">{student.name}</div>
        </Draggable>
      ))}
    </div>

    <div className="box" id="box4" onDrop={(event) => drop(event, student, setStudent)} onDragOver={allowDrop}>
        <h3>오늘은 떠날게요</h3>
        {student.filter((item) => item.state === "box4").map(student => (
          <Draggable onStop={(event, ui) => handleDrag(event, ui, student, setStudent)}>
            <div className="item" id={student.id} draggable="true">{student.name}</div>
          </Draggable>
        ))}
    </div>
  </div>
  );
};

export default StudentState;
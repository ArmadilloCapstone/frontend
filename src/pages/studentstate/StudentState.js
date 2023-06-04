import './StudentState.css';
import Draggable from "react-draggable";
import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import soon from "./soon.png";
import arrived from "./arrived.png";
import art from "./art.png";
import house from "./house.png";

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


const StudentState = () => {


  const [student, setStudent] = useState([
  ]);

  useEffect(() => {
    // 백엔드의 학생 명단 가져오는 부분
    axios.post('http://localhost:80/getStudentInfo/' + localStorage.getItem('userid'))
        .then(function(response){
          setStudent(response.data.map(function(el, idx){

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


  const handleDrag = useCallback((event, ui, ns) => {
    const [ret] = document.elementsFromPoint(event.clientX, event.clientY).filter(i => i.id.startsWith('box'));
    if (!ret) return;
    if (ret.id !== ns.state) {
      const dt = [...student];
      const idx = dt.findIndex(i => i.id === ns.id);
      dt[idx].state = ret.id;
      console.log(dt[idx].student_id, dt[idx].state[3] - 0)
      // 서버에 dt 보내는 코드 작성 위치
      axios.post('http://localhost:80/changeStudentState', { id : dt[idx].id, student_id : dt[idx].student_id,name : dt[idx].name, state : dt[idx].state[3] - 0})
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
        <img src={soon} alt="Icon" style={iconSize} />
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
            <img src={arrived}alt="Icon" style={iconSize}/>
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
            <img src={art} alt="Icon" style={iconSize} />
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
            <img src={house} alt="Icon" style={iconSize} />
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

/*

import './StudentState.css';
import { DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import soon from "./soon.png";
import arrived from "./arrived.png";
import art from "./art.png";
import house from "./house.png";



const iconSize = {
  width: '70px',
  height: '70px',
};


const StudentState = () => {


  const [student, setStudent] = useState([
  ]);

  useEffect(() => {
    // 백엔드의 학생 명단 가져오는 부분
    axios.post('http://dolbomi.site/getStudentInfo/' + localStorage.getItem('userid'))
        .then(function(response){
          setStudent(response.data.map(function(el, idx){

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

  const handleChange = (result) => {
    console.log(result);
    if (!result.destination) return;
    if(result.destination.droppableId != result.source.droppableId){
      const items = [...student];

      const idx = items.findIndex((e) => {console.log(e); return e.id == result.draggableId.slice(1)-0});

      items[idx].state = result.destination.droppableId;

      axios.post('http://dolbomi.site/changeStudentState', { id : items[idx].id, student_id : items[idx].student_id,name : items[idx].name, state : items[idx].state[3] - 0})
      .then(function(response){
        console.log(response);
      }).catch(function(reason) {
        console.log(reason);
      });

      setStudent(items);
    }
  };

  const handleDrag = useCallback((event, ui, ns) => {
    const [ret] = document.elementsFromPoint(event.clientX, event.clientY).filter(i => i.id.startsWith('box'));
    if (!ret) return;
    if (ret.id !== ns.state) {
      const dt = [...student];
      const idx = dt.findIndex(i => i.id === ns.id);
      dt[idx].state = ret.id;
      console.log(dt[idx].student_id, dt[idx].state[3] - 0)
      // 서버에 dt 보내는 코드 작성 위치


      console.log(dt[idx])
      setStudent(dt);
    }
  }, [student]);

  return (
    <div className='statebody'>
    <div className="StudentState">
    <DragDropContext onDragEnd={handleChange}>
      <Droppable droppableId="box1">
        {provided => (
          <div className="box box1" id="box1" {...provided.droppableProps} ref={provided.innerRef}>
            <div className="icon">
            <img src={soon} alt="Icon" style={iconSize} />
            </div>
            <h5 style={{ padding: "15px 0px 15px 0px", fontSize: "25px", fontWeight: "bolder"}}>도착하지 않았어요</h5>
            {student.filter((item) => item.state === "box1").map((student, idx) => (
              <Draggable draggableId={"s" + student.id}  index={idx} key={student.id}>
                {(provided, snapshot) => {
                  return (
                  <div className="item"
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}>
                    {student.name}
                  </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder} 
          </div>
        )}
        </Droppable>
      <Droppable droppableId="box2">
        {provided => (
          <div className="box box2" id="box2" {...provided.droppableProps} ref={provided.innerRef}>
            <div className="icon">
            <img src={arrived} alt="Icon" style={iconSize} />
            </div>
            <h5 style={{ padding: "15px 0px 15px 0px", fontSize: "25px", fontWeight: "bolder"}}>도착하지 않았어요</h5>
            {student.filter((item) => item.state === "box2").map((student, idx) => (
              <Draggable draggableId={"s" + student.id}  index={idx} key={student.id}>
                {(provided, snapshot) => {
                  return (
                  <div className="item"
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}>
                    {student.name}
                  </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder} 
          </div>
        )}
        </Droppable>
      <Droppable droppableId="box3">
        {provided => (
          <div className="box box3" id="box3" {...provided.droppableProps} ref={provided.innerRef}>
            <div className="icon">
            <img src={art} alt="Icon" style={iconSize} />
            </div>
            <h5 style={{ padding: "15px 0px 15px 0px", fontSize: "25px", fontWeight: "bolder"}}>돌봄교실에 도착했어요</h5>
            {student.filter((item) => item.state === "box3").map((student, idx) => (
              <Draggable draggableId={"s" + student.id}  index={idx} key={student.id}>
                {(provided, snapshot) => {
                  return (
                  <div className="item"
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}>
                    {student.name}
                  </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder} 
          </div>
        )}
        </Droppable>

      
      <Droppable droppableId="box4">
        {provided => (
          <div className="box box4" id="box4" {...provided.droppableProps} ref={provided.innerRef}>
            <div className="icon">
            <img src={house} alt="Icon" style={iconSize} />
            </div>
            <h5 style={{ padding: "15px 0px 15px 0px", fontSize: "25px", fontWeight: "bolder"}}>도착하지 않았어요</h5>
            {student.filter((item) => item.state === "box4").map((student, idx) => (
              <Draggable draggableId={"s" + student.id}  index={idx} key={student.id}>
                {(provided, snapshot) => {
                  return (
                  <div className="item"
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}>
                    {student.name}
                  </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder} 
          </div>
        )}
        </Droppable>
      </DragDropContext>

      {
    }
    </div>
    </div>
  );
};

export default StudentState;

*/
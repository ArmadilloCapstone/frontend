import React from 'react';
import './StudentState.css';
import Draggable from "react-draggable";
import axios from 'axios'; 

function allowDrop(event) {
  event.preventDefault();
}

function handleDrag(event, ui) {
  // Do something when an item is dragged
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var target = event.target;

  while (target.className != "box") {
    target = target.parentNode;
  }

  var item = document.getElementById(data);
  target.appendChild(item);

}

function sortItems(box) {
  var items = box.querySelectorAll('.item');
  var sortedItems = Array.prototype.slice.call(items).sort(function(a, b) {
      return a.innerHTML.localeCompare(b.innerHTML, 'ko-KR');
  });
  for (var i = 0; i < sortedItems.length; i++) {
      box.appendChild(sortedItems[i]);
  }
}

function StudentState() {

  axios.post('/getStudentInfo').then(function(response){
    console.log(response)
  }).catch(function(reason){
    console.log(reason);
  });

  return (
    <div className="StudentState">
      <div className="box" id="box1" onDrop={drop} onDragStart={allowDrop}>
        <h3>도착하지 않았어요</h3>
        <Draggable onStop={handleDrag}>
          <div className="item" id="item1" draggable="true">김하민</div>
        </Draggable>
        <Draggable onStop={handleDrag}>
          <div className="item" id="item2" draggable="true">이시원</div>
        </Draggable>
        <Draggable onStop={handleDrag}>
          <div className="item" id="item3" draggable="true">박주안</div>
        </Draggable>
      </div>

      <div className="box" id="box2" onDrop={drop} onDragOver={allowDrop}>
        <h3>돌봄교실에 도착했어요</h3>
      </div>

      <div className="box" id="box3" onDrop={drop} onDragOver={allowDrop}>
          <h3>방과후수업에 다녀올게요</h3>
      </div>

      <div className="box" id="box4" onDrop={drop} onDragOver={allowDrop}>
          <h3>오늘은 떠날게요</h3>
      </div>
    </div>
  );
}

export default StudentState;














/* 재윤님이 처음 쓰신 코드

import './StudentState.css';
import Draggable from "react-draggable"; 
import axios from 'axios';

var draggedItem = null;

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  draggedItem = event.target;
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var target = event.target;

  while (target.className != "box") {
    target = target.parentNode;
  }

  if (target.id != draggedItem.parentNode.id) {
    target.appendChild(draggedItem);
    sortItems(target);
  }
}

function sortItems(box) {
        var items = box.querySelectorAll('.item');
        var sortedItems = Array.prototype.slice.call(items).sort(function(a, b) {
            return a.innerHTML.localeCompare(b.innerHTML, 'ko-KR');
        });
        for (var i = 0; i < sortedItems.length; i++) {
            box.appendChild(sortedItems[i]);
        }
    }


function StudentState() {
  
  axios.post('/getStudentInfo').then(function(response){
    console.log(response)
  }).catch(function(reason){
    console.log(reason);
  });
  
    return (
      <div className="StudentState">
        <div className="box" id="box1" onDrop={drop} onDragStart={allowDrop}>
          <h3>도착하지 않았어요</h3>
          <div className="item" id="item1" draggable="true" onDragStart={drag}>김하민</div>
          <div className="item" id="item2" draggable="true" onDragStart={drag}>이시원</div>
          <div className="item" id="item3" draggable="true" onDragStart={drag}>박주안</div>
        </div>

        <div className="box" id="box2" onDrop={drop} onDragOver={allowDrop}>
          <h3>돌봄교실에 도착했어요</h3>
        </div>

        <div className="box" id="box3" onDrop={drop} onDragOver={allowDrop}>
            <h3>방과후수업에 다녀올게요</h3>
        </div>

        <div className="box" id="box4" onDrop={drop} onDragOver={allowDrop}>
            <h3>오늘은 떠날게요</h3>
        </div>
    </div>
    );
  }
  
  export default StudentState;
  */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from "moment";
import 'moment/locale/ko';

import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TodayMarker,
  TimelineMarkers
} from "react-calendar-timeline/lib";

var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title"
};

function CustomTimeline() {
  // 초기 타임라인 시간 범위 설정
  const defaultTimeStart = moment().startOf('day'); 
  const defaultTimeEnd = moment().endOf('day');

  const defaultTimeRange = defaultTimeEnd - defaultTimeStart;

  // // 더미데이터 -> 추후에 백엔드에서 학생 명단 받아오면 대체할 부분
  // const [student, setStudent] = useState([
  //   {id: 1, name: "김예지", class_id: 1},
  //   {id: 2, name: "이아름", class_id: 1},
  //   {id: 3, name: "하현우", class_id: 1}
  // ]);

  // const [student_time, setStudent_time] = useState([
  //   {student_id: 1,
  //   entry1: "12:00", entry2: "12:00", entry3: "12:00", entry4: "12:00", entry5: "12:00",
  //   off1: "18:00", off2: "18:00", off3: "18:00", off4: "18:00", off5: "18:00"},
  //   {student_id: 2,
  //   entry1: "13:00", entry2: "13:00", entry3: "13:00", entry4: "13:00", entry5: "13:00",
  //   off1: "18:00", off2: "18:00", off3: "18:00", off4: "18:00", off5: "18:00"},
  //   {student_id: 3,
  //   entry1: "12:00", entry2: "12:00", entry3: "12:00", entry4: "12:00", entry5: "12:00",
  //   off1: "17:00", off2: "17:00", off3: "17:00", off4: "17:00", off5: "17:00"}
  // ]);

  // const [after_school_class, setAfter_school_class] = useState([
  //   {id: 1, class_name: "미술A", start_time: "14:00", end_time: "15:00", day: 1},
  //   {id: 2, class_name: "미술B", start_time: "14:00", end_time: "15:00", day: 3},
  //   {id: 3, class_name: "음악A", start_time: "13:00", end_time: "14:00", day: 2},
  //   {id: 4, class_name: "음악B", start_time: "13:00", end_time: "14:00", day: 4},
  //   {id: 5, class_name: "운동A", start_time: "15:00", end_time: "16:00", day: 1},
  //   {id: 6, class_name: "운동B", start_time: "15:00", end_time: "16:00", day: 5}
  // ]);

  // const [student_schedule, setStudent_schedule] = useState([
  //   {student_id: 1, class_id: 1},
  //   {student_id: 1, class_id: 2},
  //   {student_id: 1, class_id: 5},
  //   {student_id: 1, class_id: 6}, // 1번 학생 스케줄
  //   {student_id: 2, class_id: 3},
  //   {student_id: 2, class_id: 4}, // 2번 학생 스케줄
  //   {student_id: 3, class_id: 1},
  //   {student_id: 3, class_id: 2}  // 3번 학생 스케줄
  // ]);

  const [student, setStudent] = useState([]);
  const [student_time, setStudent_time] = useState([]);
  const [after_school_class, setAfter_school_class] = useState([]);
  const [student_schedule, setStudent_schedule] = useState([]);


  // 백엔드에서 데이터 가져오기 & 오늘의 요일에 맞는 학생들의 입실/퇴실 시간 설정 => todaylist === student_time
  useEffect( () => {
    axios.post('/studentTimeFindAll')
        .then(function(response){
          console.log(response.data);
          setStudent_time(response.data.map(function(el, idx){
            console.log(el);

            var returnObj = {}
            returnObj['student_id'] = el.student_id;
            returnObj['seed'] = 0;
            if(moment().day() === 1) {
              returnObj['start_time'] = moment(defaultTimeStart).add(el.entry1, 'h');
              returnObj['end_time'] = moment(defaultTimeStart).add(el.off1, 'h');
            }
            else if(moment().day() === 2) {
              returnObj['start_time'] = moment(defaultTimeStart).add(el.entry2, 'h');
              returnObj['end_time'] = moment(defaultTimeStart).add(el.off2, 'h');
            }
            else if(moment().day() === 3) {
              returnObj['start_time'] = moment(defaultTimeStart).add(el.entry3, 'h');
              returnObj['end_time'] = moment(defaultTimeStart).add(el.off3, 'h');
            }
            else if(moment().day() === 4) {
              returnObj['start_time'] = moment(defaultTimeStart).add(el.entry4, 'h');
              returnObj['end_time'] = moment(defaultTimeStart).add(el.off4, 'h');
            }
            else {
              returnObj['start_time'] = moment(defaultTimeStart).add(el.entry5, 'h');
              returnObj['end_time'] = moment(defaultTimeStart).add(el.off5, 'h');
            }
            return returnObj;
          }));
        }).catch(function(reason){
          console.log(reason);
        });
  }, []);

  // 백엔드에서 데이터 가져오기 & 오늘의 요일에 맞는 방과후교실 목록 추출 => todayAfterSchoolList === after_school_class
  useEffect( () => {
    axios.post('/AfterSchoolClassFindAll')
        .then(function(response){
          console.log(response.data);
          setAfter_school_class(response.data.filter(function(el, idx){
            console.log(el);

            if(moment().day() === el.day) {
              return el;
            }
          }));
        }).catch(function(reason){
          console.log(reason);
        });
  }, []);

  // 백엔드에서 데이터 가져오기 & student_schedule 가져오기
  useEffect( () => {
    axios.post('/studentScheduleFindAll')
        .then(function(response){
          console.log(response.data);
          setStudent_schedule(response.data.map(function(el, idx){
            console.log(el);
  
            var returnObj = {}
            returnObj['student_id'] = el.student_id;
            returnObj['class_id'] = el.class_id;
            return returnObj;
          }));
        }).catch(function(reason){
          console.log(reason);
        });
  }, []);

  /* 학생들 중 오늘의 방과후수업 목록 포함되어 있는 학생 목록 추출  */
  function afterSchoolStudentsList(afterSchool, studentSchedule) {
    let arr = [];
    for (let i=0; i < afterSchool.length; i++) {
      for (let j=0; j < studentSchedule.length; j++) {
        if (afterSchool[i].id === studentSchedule[j].class_id) {
          arr.push(studentSchedule[j]);
        }
      }
    }
    return arr;
  }

const itemsForAfterSchool = afterSchoolStudentsList(after_school_class, student_schedule);

/* 학생의 id를 포함한 방과후수업 목록을 item 형태로 설정 */
const setAfterSchoolItems = itemsForAfterSchool.map(obj => {
  let newList = {};
  newList['student_id'] = obj.student_id;
  newList['seed'] = obj.class_id;
  newList['start_time'] = moment(defaultTimeStart).add(after_school_class[obj.class_id-1].start_time, 'h');
  newList['end_time'] = moment(defaultTimeStart).add(after_school_class[obj.class_id-1].end_time, 'h');

  return newList;
});

setAfterSchoolItems.sort((a,b) => a.student_id - b.student_id); // student_id 기준으로 정렬

/* 돌봄시간, 방과후시간이 모두 포함된 전체 아이템 */
function allItems(){
  let allItemList = [];
  for (let i=0; i<student_time.length; i++) {
    allItemList.push({
      student_id: student_time[i].student_id,
      seed: student_time[i].seed,
      start_time: student_time[i].start_time,
      end_time: student_time[i].end_time
      // start_time: moment(defaultTimeStart).add(student_time[i].entry5, 'h'),
      // end_time: moment(defaultTimeStart).add(student_time[i].off5, 'h'),
    })
  }
  for (let i=0; i<setAfterSchoolItems.length; i++) {
    allItemList.push({
      student_id: setAfterSchoolItems[i].student_id,
      seed: setAfterSchoolItems[i].seed,
      start_time: setAfterSchoolItems[i].start_time,
      end_time: setAfterSchoolItems[i].end_time
    })
  }
  allItemList.sort((a,b) => a.student_id - b.student_id);
  return allItemList;
}

let sortedAllItem = allItems();// student_id 기준으로 정렬

/* 타임라인에 나타내기 위한 형태로 설정 */
let id = 1;

const setGroup = (el, i, ary, student_id) =>
  new Object({
    id: id++,
    group: student_id,
    canMove: false,
    itemProps: {
      style: {
        color: "black",
        background: ary[i].seed === 0 ? "rgb(251, 103, 128)"
          : (ary[i].seed === 1 || ary[i].seed === 2) ? "rgba(46, 133, 248, 0.932)"
          : (ary[i].seed === 3 || ary[i].seed === 4) ? " rgb(91, 227, 67)"
          : "rgb(243, 252, 0)",
        textAlign: "center"
        },
    },
    ...el
  });

  useEffect( () => {
    axios.post('/studentFindAll')
        .then(function(response){
          console.log(response.data);
          setStudent(response.data.map(function(el, idx){
            console.log(el);

            var returnObj = {}
            returnObj['id'] = el.student_id;
            returnObj['name'] = el.name
            returnObj['class_id'] = el.class_id;
            
            return returnObj;
          }));
        }).catch(function(reason){
          console.log(reason);
        });
  }, []);

  const groups = student.map(obj => {
    let newList = {};
    newList['id'] = obj.id;
    newList['title'] = obj.name;
    return newList;
  });

/* 전체 아이템 중 각 학생마다 item group 설정 */
function individualItems() {
  let items = []
  for(let index=0; index<student_time.length; index++) {
    const isNowStudent = sortedAllItem.filter(obj => {
      if(index+1 === obj.student_id) {
        return obj;
      }
    })
    items = [
      ...items,
      ...isNowStudent.map((el, i, ary) => setGroup(el, i, ary, student[index].id))
    ]
  }
  items = items.sort((a, b) => b - a)
  return items
}

let items = individualItems();

return (
  <div>
  {/* <Detail></Detail>   */}
  <Timeline 
  minZoom={defaultTimeRange}
  maxZoom={defaultTimeRange}
  visibleTimeStart={defaultTimeStart}
  visibleTimeEnd={defaultTimeEnd}
  
    className="timeline"
    groups= {groups}
    items={items}
    // keys={keys}
    sidebarContent={<div>Above The Left</div>}
    itemsSorted
    itemTouchSendsClick={false}
    // stackItems
    itemHeightRatio={0.8}
    showCursorLine
    canMove={false}
    canResize={false}
    // defaultTimeStart={defaultTimeStart}
    // defaultTimeEnd={defaultTimeEnd}
  >
    <TimelineHeaders className="sticky">
      <SidebarHeader>
        {({ getRootProps}) => {
          return <div {...getRootProps()}></div>;
        }}
      </SidebarHeader>
      <DateHeader unit="primaryHeader" />
      <DateHeader />
    </TimelineHeaders>
    <TimelineMarkers>
      <TodayMarker>
        {({ styles }) => {
            const newStyles = { ...styles, backgroundColor: "red" };
            return <div style={newStyles} />;
        }}
      </TodayMarker>
    </TimelineMarkers>
  </Timeline>

  <div>
  <button id = "subjectButtons" class="dolbom">돌봄교실</button>
  <button id = "subjectButtons" class="art">미술</button>
  <button id = "subjectButtons" class="music">음악</button>
  <button id = "subjectButtons" class="sport">운동</button>
  </div>

  </div>

);

}

export default CustomTimeline;
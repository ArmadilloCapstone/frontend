// back-data.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from "moment";

export const defaultTimeStart = moment().startOf('day');
export const defaultTimeEnd = moment().endOf('day');

export const studentList = []
export const Student = () => {
    const [student, setStudent] = useState([]);

    useEffect(async () => {
        await axios.post("http://13.209.104.24:8080/student")
            .then((response) => {
           //console.log(response.data);
           setStudent(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    })

    studentList.push(...student)
}


export const Student_time = () => {
    const [student_time, setStudent_time] = useState([]);

    useEffect(async () => {
        await axios.post("http://13.209.104.24:8080/student_time")
            .then((response) => {
           //console.log(response.data);
           setStudent_time(response.data);
        });
    }, []);

    return student_time.map(obj => {
        let newList = {};
        newList['studentId'] = obj.student_id;
        newList['seed'] = 0;
        if(moment().day() === 1) {
          newList['start_time'] = moment(defaultTimeStart).add(obj.entry1, 'h');
          newList['end_time'] = moment(defaultTimeStart).add(obj.off1, 'h');
        }
        else if(moment().day() === 2) {
          newList['start_time'] = moment(defaultTimeStart).add(obj.entry2, 'h');
          newList['end_time'] = moment(defaultTimeStart).add(obj.off2, 'h');
        }
        else if(moment().day() === 3) {
          newList['start_time'] = moment(defaultTimeStart).add(obj.entry3, 'h');
          newList['end_time'] = moment(defaultTimeStart).add(obj.off3, 'h');
        }
        else if(moment().day() === 4) {
          newList['start_time'] = moment(defaultTimeStart).add(obj.entry4, 'h');
          newList['end_time'] = moment(defaultTimeStart).add(obj.off4, 'h');
        }
        else {
          newList['start_time'] = moment(defaultTimeStart).add(obj.entry5, 'h');
          newList['end_time'] = moment(defaultTimeStart).add(obj.off5, 'h');
        }
        return newList;
      });
}


export const After_school_class = () => {
    const [after_school_class, setAfter_school_class] = useState([]);

    useEffect(async () => {
        await axios.post("http://13.209.104.24:8080/after_school_class")
            .then((response) => {
           //console.log(response.data);
           setAfter_school_class(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    })

    return After_school_class.filter(obj => {
        if(moment().day() === obj.day) {
          return obj
        }
      })
}

export const Student_schedule = () => {
    const [student_schedule, setStudent_schedule] = useState([]);

    useEffect(async () => {
        await axios.post("http://13.209.104.24:8080/student")
            .then((response) => {
           //console.log(response.data);
           setStudent_schedule(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    })

    return student_schedule;
}


// function BackendDate() {
//   const [student, setStudent] = useState(null);
//   const [student_time, setStudent_time] = useState([]);
//   const [after_school_class, setAfter_school_class] = useState([]);
//   const [student_schedule, setStudent_schedule] = useState([]);

//   useEffect(() => {
//           getStudent();
//           getStudent_time();
//           getafter_school_class();
//           getStudent_schedule();
//   },[]);

//   async function getStudent(){
//     await axios
//         .post("/student")
//         .then((response) => {
//            //console.log(response.data);
//            setStudent(response.data);
//         })
//         .catch((error)=>{
//             console.log(error);
//         })
// }

// async function getStudent_time(){
//     await axios
//         .post("/student_time")
//         .then((response) => {
//            //console.log(response.data);
//            setStudent_time(response.data);
//         })
//         .catch((error)=>{
//             console.log(error);
//         })
// }

// async function getafter_school_class(){
//     await axios
//         .post("/after_school_class")
//         .then((response) => {
//            //console.log(response.data);
//            setAfter_school_class(response.data);
//         })
//         .catch((error)=>{
//             console.log(error);
//         })
// }

// async function getStudent_schedule(){
//     await axios
//         .post("/student_schedule")
//         .then((response) => {
//            //console.log(response.data);
//            setStudent_schedule(response.data);
//         })
//         .catch((error)=>{
//             console.log(error);
//         })
// }

// return {student, student_time, after_school_class, student_schedule}
// }

// export default BackendDate

// export const Student = [
//     {id: 1, name: "김예지", class_id: 1},
//     {id: 2, name: "이아름", class_id: 1},
//     {id: 3, name: "하현우", class_id: 1},
// ];


// export const Student_time = [
//     {student_id: 1,
//     entry1: "12:00", entry2: "12:00", entry3: "12:00", entry4: "12:00", entry5: "12:00",
//     off1: "18:00", off2: "18:00", off3: "18:00", off4: "18:00", off5: "18:00"},
//     {student_id: 2,
//     entry1: "13:00", entry2: "13:00", entry3: "13:00", entry4: "13:00", entry5: "13:00",
//     off1: "18:00", off2: "18:00", off3: "18:00", off4: "18:00", off5: "18:00"},
//     {student_id: 3,
//     entry1: "12:00", entry2: "12:00", entry3: "12:00", entry4: "12:00", entry5: "12:00",
//     off1: "17:00", off2: "17:00", off3: "17:00", off4: "17:00", off5: "17:00"}
// ]

// export const After_school_class = [
//     {id: 1, class_name: "미술A", start_time: "14:00", end_time: "15:00", day: 1},
//     {id: 2, class_name: "미술B", start_time: "14:00", end_time: "15:00", day: 3},
//     {id: 3, class_name: "음악A", start_time: "13:00", end_time: "14:00", day: 2},
//     {id: 4, class_name: "음악B", start_time: "13:00", end_time: "14:00", day: 4},
//     {id: 5, class_name: "운동A", start_time: "15:00", end_time: "16:00", day: 1},
//     {id: 6, class_name: "운동B", start_time: "15:00", end_time: "16:00", day: 5}
// ]

// export const Student_schedule = [
//     {student_id: 1, class_id: 1},
//     {student_id: 1, class_id: 2},
//     {student_id: 1, class_id: 5},
//     {student_id: 1, class_id: 6}, // 1번 학생 스케줄
//     {student_id: 2, class_id: 3},
//     {student_id: 2, class_id: 4}, // 2번 학생 스케줄
//     {student_id: 3, class_id: 1},
//     {student_id: 3, class_id: 2}  // 3번 학생 스케줄
// ]








// fakr-data.js
// import moment from "moment";
// import { Student, Student_time, After_school_class, Student_schedule } from "./back-data";

// /* 오늘의 타임라인을 위한 초기날짜 설정 */
// export const defaultTimeStart = moment().startOf('day');
// export const defaultTimeEnd = moment().endOf('day');

// const todayList = Student_time
// /* 오늘의 요일에 맞는 학생들의 입실/퇴실 시간 설정 */
// // const todayList = Student_time.map(obj => {
// //   let newList = {};
// //   newList['studentId'] = obj.student_id;
// //   newList['seed'] = 0;
// //   if(moment().day() === 1) {
// //     newList['start_time'] = moment(defaultTimeStart).add(obj.entry1, 'h');
// //     newList['end_time'] = moment(defaultTimeStart).add(obj.off1, 'h');
// //   }
// //   else if(moment().day() === 2) {
// //     newList['start_time'] = moment(defaultTimeStart).add(obj.entry2, 'h');
// //     newList['end_time'] = moment(defaultTimeStart).add(obj.off2, 'h');
// //   }
// //   else if(moment().day() === 3) {
// //     newList['start_time'] = moment(defaultTimeStart).add(obj.entry3, 'h');
// //     newList['end_time'] = moment(defaultTimeStart).add(obj.off3, 'h');
// //   }
// //   else if(moment().day() === 4) {
// //     newList['start_time'] = moment(defaultTimeStart).add(obj.entry4, 'h');
// //     newList['end_time'] = moment(defaultTimeStart).add(obj.off4, 'h');
// //   }
// //   else {
// //     newList['start_time'] = moment(defaultTimeStart).add(obj.entry5, 'h');
// //     newList['end_time'] = moment(defaultTimeStart).add(obj.off5, 'h');
// //   }
// //   return newList;
// // });
// const todayAfterSchoolList = After_school_class
// // /* 오늘의 요일에 맞는 방과후교실 목록 추출 */
// // const todayAfterSchoolList = After_school_class.filter(obj => {
// //   if(moment().day() === obj.day) {
// //     return obj
// //   }
// // })

// /* 학생들 중 오늘의 방과후수업 목록 포함되어 있는 학생 목록 추출  */
// function afterSchoolStudentsList(afterSchool, studentSchedule) {
//   let arr = [];
//   for (let i=0; i < afterSchool.length; i++) {
//     for (let j=0; j < studentSchedule.length; j++) {
//       if (afterSchool[i].id === studentSchedule[j].class_id) {
//         arr.push(studentSchedule[j]);
//       }
//     }
//   }
//   return arr;
// }

// export const itemsForAfterSchool = afterSchoolStudentsList(todayAfterSchoolList, Student_schedule);

// /* 학생의 id를 포함한 방과후수업 목록을 item 형태로 설정 */
// const setAfterSchoolItems = itemsForAfterSchool.map(obj => {
//   let newList = {};
//   newList['studentId'] = obj.student_id;
//   newList['seed'] = obj.class_id;
//   newList['start_time'] = moment(defaultTimeStart).add(After_school_class[obj.class_id-1].start_time, 'h');
//   newList['end_time'] = moment(defaultTimeStart).add(After_school_class[obj.class_id-1].end_time, 'h');

//   return newList;
// });

// setAfterSchoolItems.sort((a,b) => a.studentId - b.studentId); // student_id 기준으로 정렬

// /* 돌봄시간, 방과후시간이 모두 포함된 전체 아이템 */
// function allItems(){
//   let allItemList = [];
//   for (let i=0; i<todayList.length; i++) {
//     allItemList.push({
//       studentId: todayList[i].studentId,
//       seed: todayList[i].seed,
//       start_time: todayList[i].start_time,
//       end_time: todayList[i].end_time
//     })
//   }
//   for (let i=0; i<setAfterSchoolItems.length; i++) {
//     allItemList.push({
//       studentId: setAfterSchoolItems[i].studentId,
//       seed: setAfterSchoolItems[i].seed,
//       start_time: setAfterSchoolItems[i].start_time,
//       end_time: setAfterSchoolItems[i].end_time
//     })
//   }
//   allItemList.sort((a,b) => a.studentId - b.studentId);
//   return allItemList;
// }

// export let sortedAllItem = allItems();// student_id 기준으로 정렬

// /* 타임라인에 나타내기 위한 형태로 설정 */
// let id = 1;

// const setGroup = (el, i, ary, studentId) =>
//   new Object({
//     id: id++,
//     group: studentId,
//     canMove: false,
//     itemProps: {
//       style: {
//         color: "black",
//         background: ary[i].seed === 0 ? "rgb(251, 103, 128)"
//           : (ary[i].seed === 1 || ary[i].seed === 2) ? "rgba(46, 133, 248, 0.932)"
//           : (ary[i].seed === 3 || ary[i].seed === 4) ? " rgb(91, 227, 67)"
//           : "rgb(243, 252, 0)",
//         textAlign: "center"
//         },
//     },
//     ...el
//   });

// /* 전체 아이템 중 각 학생마다 item group 설정 */
// function individualItems() {
//   let items = []
//   let temp = 0;
//   for(let index=0; index<todayList.length; index++) {
//     const isNowStudent = sortedAllItem.filter(obj => {
//       if(index+1 === obj.studentId) {
//         return obj
//       }
//     })
//     items = [
//       ...items,
//       ...isNowStudent.map((el, i, ary) => setGroup(el, i, ary, Student[index].id))
//     ]
//   }
//   items = items.sort((a, b) => b - a)
//   return items
// }

// export let items = individualItems();












//CustomTimelien.js
// import React, { useEffect, useState } from "react";
// import 'moment/locale/ko';

// import Timeline, {
//   TimelineHeaders,
//   SidebarHeader,
//   DateHeader,
//   TodayMarker,
//   TimelineMarkers
// } from "react-calendar-timeline/lib";

// import { studentList, Student } from "./back-data";
// import { items, defaultTimeStart, defaultTimeEnd, sortedAllItem } from "./fake-data";

// import Detail from "./after-alarm";


// const groups = studentList.map(obj => {
//   let newList = {};
//   newList['id'] = obj.id;
//   newList['title'] = obj.name;
//   return newList;
// });

// // const groups = [
// //   { id: student[0].studentId, title: student[0].name },
// //   { id: student[1].studentId, title: student[1].name },
// //   { id: student[2].studentId, title: student[2].name } // groupIds.하현우 -> student[3].id, "하현우" -> student[2].name
// // ];

// //groups.sort((a,b) => b.id - a.id); // 초기엔 이름순 정렬
// function Example() {
//   const [Groups, setGroups] = useState(groups);

//   return (
//       <div class="timeline_sort">
//         정렬:
//       <button id = "sortingButtons" onClick={()=>{
//         let copy = [...Groups];
//         copy.sort((a,b) => a.id - b.id);
//         setGroups(copy);
//         alert(JSON.stringify(copy))
//       }}
//       >이름순
//       </button>

//       <button id = "sortingButtons" onClick={()=>{
//         let copy = [...Groups];
//         copy.sort((a,b) => b.id - a.id); // group 속성에 오늘 요일 귀가시간 포함시켜서 정렬
//         setGroups(copy);
//         alert(JSON.stringify(copy))
//       }}
//       >귀가순
//       </button>

//       <button id = "sortingButtons" onClick={()=>{
//         let copy = [...Groups];
//         copy.sort((a,b) => b.id - a.id); // 방과후수업이랑 현재시간 비교 or 각 방과후 수업 or 알림으로만
//         setGroups(copy);
//         alert(JSON.stringify(copy))
//       }}
//       >방과후순
//       </button>
      
//       </div>
//   )
//     }

// var keys = {
//   groupIdKey: "id",
//   groupTitleKey: "title",
//   groupRightTitleKey: "rightTitle",
//   itemIdKey: "id",
//   itemTitleKey: "title",
//   itemDivTitleKey: "title",
//   itemGroupKey: "group",
//   itemTimeStartKey: "start",
//   itemTimeEndKey: "end",
//   groupLabelKey: "title"
// };

// function CustomTimeline() {
//   console.log(sortedAllItem);
//   console.log(items);
// //   const baseUrl = "http://localhost:8080";

// //     const [user_username, setUser_username] = useState();

// //     useEffect(()=>{
// //       getUser();
// //   },[]);

// //   async function getUser(){
// //       await axios
// //           .get(baseUrl + "/" + {user_username})
// //           .then((response) => {
// //               console.log(response.data);
// //               setUser_username(response.data.userName);
// //           })
// //           .catch((error)=>{
// //               console.log(error);
// //           })
// //   }

// //   const handleChange_username = (e)=>{
// //     e.preventDefault();
// //     setUser_username(e.target.value);
// // }

//     const defaultTimeRange = defaultTimeEnd - defaultTimeStart;

//     return (
//       <div>
//       {/* <Detail></Detail>   */}
//       <Example></Example>
//       <Timeline 
//       minZoom={defaultTimeRange}
//       maxZoom={defaultTimeRange}
//       visibleTimeStart={defaultTimeStart}
//       visibleTimeEnd={defaultTimeEnd}
      
//         className="timeline"
//         groups= {groups}
//         items={items}
//         // keys={keys}
//         sidebarContent={<div>Above The Left</div>}
//         itemsSorted
//         itemTouchSendsClick={false}
//         // stackItems
//         itemHeightRatio={0.8}
//         showCursorLine
//         canMove={false}
//         canResize={false}
//         // defaultTimeStart={defaultTimeStart}
//         // defaultTimeEnd={defaultTimeEnd}
//       >
//         <TimelineHeaders className="sticky">
//           <SidebarHeader>
//             {({ getRootProps}) => {
//               return <div {...getRootProps()}></div>;
//             }}
//           </SidebarHeader>
//           <DateHeader unit="primaryHeader" />
//           <DateHeader />
//         </TimelineHeaders>
//         <TimelineMarkers>
//           <TodayMarker>
//             {({ styles }) => {
//                 const newStyles = { ...styles, backgroundColor: "red" };
//                 return <div style={newStyles} />;
//             }}
//           </TodayMarker>
//         </TimelineMarkers>
//       </Timeline>

//       <div>
//       <button id = "subjectButtons" class="dolbom">돌봄교실</button>
//       <button id = "subjectButtons" class="art">미술</button>
//       <button id = "subjectButtons" class="music">음악</button>
//       <button id = "subjectButtons" class="sport">운동</button>
//       </div>

//       </div>

//     );
//   }

//   export default CustomTimeline;

// // export default class App extends Component {
// //   constructor(props) {
// //     super(props);

// //     // const {groups, items} = generateFakeData(5);

// //     const defaultTimeStart = moment()
// //       .startOf("day")
// //       .toDate();
// //     const defaultTimeEnd = moment()
// //       .startOf("day")
// //       .add(1, "day")
// //       .toDate();

// //     this.state = {
// //       groups,
// //       items,
// //       defaultTimeStart,
// //       defaultTimeEnd
// //     };
// //   }

// //   render() {
// //     const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;

// //     return (
// //       <div>
// //       <Example></Example>
// //       <Timeline className="timeline"
// //         groups={groups}
// //         items={items}
// //         // keys={keys}
// //         sidebarContent={<div>Above The Left</div>}
// //         itemsSorted
// //         itemTouchSendsClick={false}
// //         stackItems
// //         itemHeightRatio={0.8}
// //         showCursorLine
// //         canMove={false}
// //         canResize={false}
// //         defaultTimeStart={defaultTimeStart}
// //         defaultTimeEnd={defaultTimeEnd}
// //       >
// //         <TimelineHeaders className="sticky">
// //           <SidebarHeader>
// //             {({ getRootProps}) => {
// //               return <div {...getRootProps()}></div>;
// //             }}
// //           </SidebarHeader>
// //           <DateHeader unit="primaryHeader" />
// //           <DateHeader />
// //         </TimelineHeaders>
// //         <TimelineMarkers>
// //           <TodayMarker>
// //             {({ styles }) => {
// //                 const newStyles = { ...styles, backgroundColor: "red" };
// //                 return <div style={newStyles} />;
// //             }}
// //           </TodayMarker>
// //         </TimelineMarkers>
// //       </Timeline>

// //       <div id="buttons">
// //       <button class="dolbom">돌봄교실</button>
// //       <button class="art">미술</button>
// //       <button class="cook">요리</button>
// //       <button class="music">음악</button>
// //       </div>

// //       </div>

// //     );
// //   }
// // }
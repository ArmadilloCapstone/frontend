import moment from "moment";
import { student, student_time, after_school_class, student_schedule } from "./back-data";

/* 오늘의 타임라인을 위한 초기날짜 설정 */
export const defaultTimeStart = moment().startOf('day');
export const defaultTimeEnd = moment().endOf('day');

/* 오늘의 요일에 맞는 학생들의 입실/퇴실 시간 설정 */
const todayList = student_time.map(obj => {
  let newList = {};
  newList['studentId'] = obj.studentId;
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

/* 오늘의 요일에 맞는 방과후교실 목록 추출 */
const todayAfterSchoolList = after_school_class.filter(obj => {
  if(moment().day() === obj.day) {
    return obj
  }
})

/* 학생들 중 오늘의 방과후수업 목록 포함되어 있는 학생 목록 추출  */
function afterSchoolStudentsList(afterSchool, studentSchedule) {
  let arr = [];
  for (let i=0; i < afterSchool.length; i++) {
    for (let j=0; j < studentSchedule.length; j++) {
      if (afterSchool[i].afterId === studentSchedule[j].afterId) {
        arr.push(studentSchedule[j]);
      }
    }
  }
  return arr;
}

export const itemsForAfterSchool = afterSchoolStudentsList(todayAfterSchoolList, student_schedule);

/* 학생의 id를 포함한 방과후수업 목록을 item 형태로 설정 */
const setAfterSchoolItems = itemsForAfterSchool.map(obj => {
  let newList = {};
  newList['studentId'] = obj.studentId;
  newList['seed'] = obj.afterId;
  newList['start_time'] = moment(defaultTimeStart).add(after_school_class[obj.afterId-1].start_time, 'h');
  newList['end_time'] = moment(defaultTimeStart).add(after_school_class[obj.afterId-1].end_time, 'h');

  return newList;
});

setAfterSchoolItems.sort((a,b) => a.studentId - b.studentId); // student_id 기준으로 정렬

/* 돌봄시간, 방과후시간이 모두 포함된 전체 아이템 */
function allItems(){
  let allItemList = [];
  for (let i=0; i<todayList.length; i++) {
    allItemList.push({
      studentId: todayList[i].studentId,
      seed: todayList[i].seed,
      start_time: todayList[i].start_time,
      end_time: todayList[i].end_time
    })
  }
  for (let i=0; i<setAfterSchoolItems.length; i++) {
    allItemList.push({
      studentId: setAfterSchoolItems[i].studentId,
      seed: setAfterSchoolItems[i].seed,
      start_time: setAfterSchoolItems[i].start_time,
      end_time: setAfterSchoolItems[i].end_time
    })
  }
  allItemList.sort((a,b) => a.studentId - b.studentId);
  return allItemList;
}

export let sortedAllItem = allItems();// student_id 기준으로 정렬

/* 타임라인에 나타내기 위한 형태로 설정 */
let id = 1;

const setGroup = (el, i, ary, studentId) =>
  new Object({
    id: id++,
    group: studentId,
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

/* 전체 아이템 중 각 학생마다 item group 설정 */
function individualItems() {
  let items = []
  let temp = 0;
  for(let index=0; index<todayList.length; index++) {
    const isNowStudent = sortedAllItem.filter(obj => {
      if(index+1 === obj.studentId) {
        return obj
      }
    })
    items = [
      ...items,
      ...isNowStudent.map((el, i, ary) => setGroup(el, i, ary, student[index].studentId))
    ]
  }
  items = items.sort((a, b) => b - a)
  return items
}

export let items = individualItems();
import moment from "moment";
import { student, student_time, after_school_class, student_schedule } from "./back-data";

let id = 1;

export const defaultTimeStart = moment().startOf('day');
export const defaultTimeEnd = moment().endOf('day');

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

export const todayAfterSchoolList = after_school_class.filter(obj => {
  if(moment().day() === obj.day) {
    return obj
  }
})

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

export const setAfterSchoolItems = itemsForAfterSchool.map(obj => {
  let newList = {};
  newList['studentId'] = obj.studentId;
  newList['seed'] = obj.afterId;
  newList['start_time'] = moment(defaultTimeStart).add(after_school_class[obj.afterId-1].start_time, 'h');
  newList['end_time'] = moment(defaultTimeStart).add(after_school_class[obj.afterId-1].end_time, 'h');

  return newList;
});

setAfterSchoolItems.sort((a,b) => a.studentId - b.studentId); // student_id 기준으로 정렬


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

let index = 0;
let after_index = 0;

export let items = [
  {
    seed: todayList[index].seed,
    //title: "",
    start_time: todayList[index].start_time,
    end_time: todayList[index].end_time
  },
  {
    seed: setAfterSchoolItems[after_index].seed,
    start_time: setAfterSchoolItems[after_index].start_time,
    end_time: setAfterSchoolItems[after_index++].end_time
  },
  {
    seed: setAfterSchoolItems[after_index].seed,
    start_time: setAfterSchoolItems[after_index].start_time,
    end_time: setAfterSchoolItems[after_index++].end_time
  }
].map((el, i, ary) => setGroup(el, i, ary, student[index].studentId));

items = [
  ...items,
  ...[
    {
      seed: todayList[++index].seed,
      start_time: todayList[index].start_time,
      end_time: todayList[index].end_time,
      day: "월 or 1" //둘 중 하나로 선택해서 수정 필요!
    },
    {
      seed: setAfterSchoolItems[after_index].seed,
      start_time: setAfterSchoolItems[after_index].start_time,
      end_time: setAfterSchoolItems[after_index++].end_time
    }
  ].map((el, i, ary) => setGroup(el, i, ary, student[index].studentId))
];

items = [
  ...items,
  ...[
    {
      seed: todayList[++index].seed,
      start_time: todayList[index].start_time,
      end_time: todayList[index].end_time,
      day: "월 or 1" //둘 중 하나로 선택해서 수정 필요!
    },
    { 
      seed: setAfterSchoolItems[after_index].seed,
      start_time: setAfterSchoolItems[after_index].start_time,
      end_time: setAfterSchoolItems[after_index].end_time
    }
  ].map((el, i, ary) => setGroup(el, i, ary, student[index].studentId))
];

items = items.sort((a, b) => b - a)
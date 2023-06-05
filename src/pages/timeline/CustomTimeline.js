import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from "moment";
import 'moment/locale/ko';
import randomColor from "randomcolor";
import './style.css';

import Timeline, {
  DateHeader,
  TodayMarker,
} from "react-calendar-timeline";
import swal from 'sweetalert';

function CustomTimeline() {
  // 초기 타임라인 시간 범위 설정
  const defaultTimeStart = moment().startOf("day").toDate();
  const defaultTimeEnd = moment().startOf("day").add(1, "day").toDate();

  const defaultTimeRange = defaultTimeEnd - defaultTimeStart;

  const [groups, setGroups] = useState([]);
  const [student_time, setStudent_time] = useState([]);
  const [after_school_class, setAfter_school_class] = useState([]);
  const [student_schedule, setStudent_schedule] = useState([]);

  const subjectButtons = [];

  // 백엔드에서 데이터 가져오기 & 오늘의 요일에 맞는 학생들의 입실/퇴실 시간 설정 => todaylist === student_time
  // useEffect(() => {
  const loadStudentTime = () => {
    axios.post('http://dolbomi.site/studentTimeFindAll/' + localStorage.getItem('userid'))
      .then(function (response) {
        console.log("학생 입퇴실 데이터");
        console.log(response.data);
        setStudent_time(response.data.map(function (el, idx) {

          var returnObj = {}
          returnObj['student_id'] = el.student_id;
          returnObj['seed'] = 0;
          if (moment().day() === 1) {
            returnObj['start_time'] = moment(defaultTimeStart).add(el.entry_1);
            returnObj['end_time'] = moment(defaultTimeStart).add(el.off_1);
            returnObj['start'] = el.entry_1;
            returnObj['end'] = el.off_1;
          }
          else if (moment().day() === 2) {
            returnObj['start_time'] = moment(defaultTimeStart).add(el.entry_2);
            returnObj['end_time'] = moment(defaultTimeStart).add(el.off_2);
            returnObj['start'] = el.entry_2;
            returnObj['end'] = el.off_2;
          }
          else if (moment().day() === 3) {
            returnObj['start_time'] = moment(defaultTimeStart).add(el.entry_3);
            returnObj['end_time'] = moment(defaultTimeStart).add(el.off_3);
            returnObj['start'] = el.entry_3;
            returnObj['end'] = el.off_3;
          }
          else if (moment().day() === 4) {
            returnObj['start_time'] = moment(defaultTimeStart).add(el.entry_4);
            returnObj['end_time'] = moment(defaultTimeStart).add(el.off_4);
            returnObj['start'] = el.entry_4;
            returnObj['end'] = el.off_4;
          }
          else {
            returnObj['start_time'] = moment(defaultTimeStart).add(el.entry_5);
            returnObj['end_time'] = moment(defaultTimeStart).add(el.off_5);
            returnObj['start'] = el.entry_5;
            returnObj['end'] = el.off_5;
          }
          return returnObj;
        }));
      }).catch(function (reason) {
        console.log(reason);
      });
  }
  // }, []);
  useEffect(() => {
    loadStudentTime();
  }, []);

  // 백엔드에서 데이터 가져오기 & 오늘의 요일에 맞는 방과후교실 목록 추출 => todayAfterSchoolList === after_school_class
  useEffect(() => {
    axios.post('http://dolbomi.site/AfterSchoolClassFindAll')
      .then(function (response) {
        console.log("방과후교실 목록 데이터");
        console.log(response.data);
        setAfter_school_class(response.data.filter(function (el, idx) {
          if (moment().day() === el.day) {
            return el;
          }
        }));
      }).catch(function (reason) {
        console.log(reason);
      });
  }, []);

  // subjectButtons 객체 배열 생성
  function MakeSubjectButtons() {
    for (let i = 0; i < after_school_class.length; i++) {
      subjectButtons.push({ id: after_school_class[i].id, class_name: after_school_class[i].class_name })
    }
    subjectButtons.push({ id: 0, class_name: "돌봄교실" });
  }
  MakeSubjectButtons();


  // 백엔드에서 데이터 가져오기 & student_schedule 가져오기
  useEffect(() => {
    axios.post('http://dolbomi.site/studentScheduleFindAll/' + localStorage.getItem('userid'))
      .then(function (response) {
        console.log("학생 방과후교실 시간표 데이터");
        console.log(response.data);
        setStudent_schedule(response.data.map(function (el, idx) {
          console.log(el);

          var returnObj = {}
          returnObj['student_id'] = el.student_id;
          returnObj['class_id'] = el.class_id;
          return returnObj;
        }));
      }).catch(function (reason) {
        console.log(reason);
      });
  }, []);

  /* 학생들 중 오늘의 방과후수업 목록 포함되어 있는 학생 목록 추출  */
  function afterSchoolStudentsList(afterSchool, studentSchedule) {
    let arr = [];

    for (let i = 0; i < afterSchool.length; i++) {
      for (let j = 0; j < studentSchedule.length; j++) {
        if (afterSchool[i].id === studentSchedule[j].class_id) {
          arr.push(studentSchedule[j]);
        }
      }
    }
    return arr;
  }
  const itemsForAfterSchool = afterSchoolStudentsList(after_school_class, student_schedule);
  console.log(itemsForAfterSchool)

  /* 학생의 id를 포함한 방과후수업 목록을 item 형태로 설정 */
  const setAfterSchoolItems = itemsForAfterSchool.map(obj => {
    console.log(after_school_class)
    let newList = {};
    newList['student_id'] = obj.student_id;
    newList['seed'] = obj.class_id;
    // newList['seed'] = obj.class_name;
    console.log(obj);
    newList['start_time'] = moment(defaultTimeStart).add(after_school_class.find((el) => el.id === obj.class_id).start_time);
    newList['end_time'] = moment(defaultTimeStart).add(after_school_class.find((el) => el.id === obj.class_id).end_time);

    return newList;
  });

  console.log(setAfterSchoolItems)
  setAfterSchoolItems.sort((a, b) => a.student_id - b.student_id); // student_id 기준으로 정렬

  /* 돌봄시간, 방과후시간이 모두 포함된 전체 아이템 */
  function allItems() {
    let allItemList = [];
    for (let i = 0; i < student_time.length; i++) {
      allItemList.push({
        student_id: student_time[i].student_id,
        seed: student_time[i].seed,
        start_time: student_time[i].start_time,
        end_time: student_time[i].end_time
      })
    }
    for (let i = 0; i < setAfterSchoolItems.length; i++) {
      allItemList.push({
        student_id: setAfterSchoolItems[i].student_id,
        seed: setAfterSchoolItems[i].seed,
        start_time: setAfterSchoolItems[i].start_time,
        end_time: setAfterSchoolItems[i].end_time
      })
    }
    allItemList.sort((a, b) => a.student_id - b.student_id);
    console.log(allItemList)
    return allItemList;
  }
  let sortedAllItem = allItems();// student_id 기준으로 정렬
  console.log(sortedAllItem);

  /* 타임라인에 나타내기 위한 형태로 설정 */
  let id = 1;

  const setGroup = (el, i, ary, student_id) =>
    new Object({
      id: id++,
      group: student_id,
      canMove: false,
      itemProps: {
        style: {
          "border-radius": "5px",
          "border": "1px",
          "box-shadow": ary[i].seed !== 0 ? "2px 2px 2px 0px gray" : "none",
          color: "black",
          background: randomColor({
            seed: ary[i].seed,
          }),
          textAlign: "center"
        },
      },
      ...el
    });

  useEffect(() => {
    axios.post('http://dolbomi.site/studentFindAll/' + localStorage.getItem('userid'))
      .then(function (response) {
        console.log(response.data);
        setGroups(response.data.map(function (el, idx) {
          console.log(el);

          var returnObj = {}
          returnObj['id'] = el.id;
          returnObj['name'] = el.name
          returnObj['class_id'] = el.class_id;
          returnObj['title'] = el.name;

          return returnObj;
        }));
      }).catch(function (reason) {
        console.log(reason);
      });
  }, []);

  /* 전체 아이템 중 각 학생마다 item group 설정 */
  function individualItems() {
    let items = []
    for (let index = 0; index < student_time.length; index++) {
      const isNowStudent = sortedAllItem.filter(obj => {
        if (student_time[index].student_id === obj.student_id) {
          return obj;
        }
      })
      items = [
        ...items,
        ...isNowStudent.map((el, i, ary) => setGroup(el, i, ary, student_time[index].student_id))
      ]
    }
    items = items.sort((a, b) => b - a)
    return items
  }

  let items = individualItems();

  /* 방과후교실에 가야 하는 학생들을 알려주는 메소드 */
  const showAfterStudents = (el) => {
    let returnObj = []
    returnObj = sortedAllItem.filter((obj) => el.id === obj.seed)
    let show = []
    for (let i = 0; i < groups.length; i++) {
      for (let j = 0; j < returnObj.length; j++) {
        if (groups[i].id === returnObj[j].student_id) {
          show.push(groups[i].name)
        }
      }
    }
    swal("[ " + show + " ]", "'" + el.class_name + "' 수업 참여 학생 목록입니다.", {
      buttons: '확인',
    });
  }

  /* 정렬 메소드 */
  const sortById = () => {
    let copy = [...groups];
    copy.sort((a, b) => a.id - b.id);
    setGroups(copy);
  }
  const sortByName = () => {
    let copy = [...groups];
    copy.sort((a, b) => a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1);
    setGroups(copy);
  }
  const sortByStartTime = () => {
    let copyTime = [...student_time]
    let copyGroup = [...groups]
    copyGroup.sort((a, b) => a.id - b.id); // id순 정렬을 먼저 해준 후, start 정해주기
    for (let i = 0; i < copyGroup.length; i++) {
      copyGroup[i].start = copyTime[i].start;
    }
    copyGroup.sort((a, b) => a.start.toUpperCase() < b.start.toUpperCase() ? -1 : 1);
    setGroups(copyGroup);
    swal("오늘의 입실 시작 시간은" + copyGroup[0].start.substr(0, 5) + "입니다!", {
      buttons: '확인',
    });
  }
  const sortByEndTime = () => {
    let copyTime = [...student_time]
    let copyGroup = [...groups]
    copyGroup.sort((a, b) => a.id - b.id); // id순 정렬을 먼저 해준 후, end 정해주기
    for (let i = 0; i < copyGroup.length; i++) {
      copyGroup[i].end = copyTime[i].end;
    }
    copyGroup.sort((a, b) => a.end.toUpperCase() < b.end.toUpperCase() ? -1 : 1);
    setGroups(copyGroup);
    swal("오늘의 귀가 시작 시간은" + copyGroup[0].end.substr(0, 5) + "입니다!", {
      buttons: '확인',
    });
  }
  // function SeekTodayTimes() {
  //   let copy = [...student_time]
  //   copy.sort((a, b) => a.start.toUpperCase() < b.start.toUpperCase() ? -1 : 1)
  //   let todayStart = copy[0].start.substr(0, 5);

  //   copy.sort((a, b) => a.end.toUpperCase() < b.end.toUpperCase() ? -1 : 1)
  //   let todayEnd = copy[0].end.substr(0, 5);

  //   return (
  //     <div class="timeInfoBox">
  //       <div class="timeInfoText">오늘의 입실 시작 시간은 <span class="timeInfoStart">{todayStart}</span>,
  //        귀가 시작 시간은 <span class="timeInfoEnd">{todayEnd}</span>입니다!</div>
  //     </div>
  //   )
  // }

  return (
    <div class="timeline_wrapper">
      <div class="timeline_sort">
        <button className="sortingButtons" onClick={sortById}
        >번호순
        </button>
        <button className="sortingButtons" onClick={sortByName}
        >이름순
        </button>
        <button className="sortingButtons" onClick={() => {
          sortByStartTime();
        }}
        >입실순
        </button>
        <button className="sortingButtons" onClick={() => {
          sortByEndTime();
        }}
        >귀가순
        </button>
      </div>

      <Timeline
        className="timeline"
        minZoom={defaultTimeRange}
        maxZoom={defaultTimeRange}
        visibleTimeStart={defaultTimeStart}
        visibleTimeEnd={defaultTimeEnd}
        groups={groups}
        items={items}
        itemTouchSendsClick={false}
        itemHeightRatio={0.9}
        showCursorLine
        canMove={false}
        canResize={false}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
      >
        <DateHeader unit="primaryHeader" class="timeline_date" />
        <TodayMarker>
          {({ styles }) => {
            const newStyles = { ...styles, backgroundColor: "red", "z-index": "100" };
            return <div style={newStyles} />;
          }}
        </TodayMarker>
      </Timeline>

      <div className="subjectButtons-parent">
        {subjectButtons.map((el) => (
          <button className="subjectButtons"
            key={el.id}
            style={{
              "box-shadow": el.id !== 0 ? "2px 2px 5px 0px gray" : "none",
              background: randomColor({
                seed: el.id,
              })
            }}
            onClick={el.id !== 0 ? () => showAfterStudents(el) : null}
          >
            {el.class_name}
          </button>
        ))}
      </div>
    </div>

  );

}

export default CustomTimeline;
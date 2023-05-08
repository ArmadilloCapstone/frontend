import React, { useEffect, useState } from "react";
import 'moment/locale/ko';

import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TodayMarker,
  TimelineMarkers
} from "react-calendar-timeline/lib";

import { student } from "./back-data";
import { items, defaultTimeStart, defaultTimeEnd, sortedAllItem } from "./fake-data";

import Detail from "./after-alarm";

const groups = student.map(obj => {
  let newList = {};
  newList['id'] = obj.id;
  newList['title'] = obj.name;
  return newList;
});

// const groups = [
//   { id: student[0].studentId, title: student[0].name },
//   { id: student[1].studentId, title: student[1].name },
//   { id: student[2].studentId, title: student[2].name } // groupIds.하현우 -> student[3].id, "하현우" -> student[2].name
// ];

groups.sort((a,b) => b.id - a.id); // 초기엔 이름순 정렬
function Example() {
  const [Groups, setGroups] = useState(groups);

  return (
      <div class="timeline_sort">
      <button id = "sortingButtons" onClick={()=>{
        let copy = [...Groups];
        copy.sort((a,b) => a.id - b.id);
        setGroups(copy);
        alert(JSON.stringify(copy))
      }}
      >이름순
      </button>

      <button id = "sortingButtons" onClick={()=>{
        let copy = [...Groups];
        copy.sort((a,b) => b.id - a.id); // group 속성에 오늘 요일 귀가시간 포함시켜서 정렬
        setGroups(copy);
        alert(JSON.stringify(copy))
      }}
      >귀가순
      </button>

      <button id = "sortingButtons" onClick={()=>{
        let copy = [...Groups];
        copy.sort((a,b) => b.id - a.id); // 방과후수업이랑 현재시간 비교 or 각 방과후 수업 or 알림으로만
        setGroups(copy);
        alert(JSON.stringify(copy))
      }}
      >방과후순
      </button>
      
      </div>
  )
    }

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

function App() {
  console.log(sortedAllItem);
  console.log(items);
//   const baseUrl = "http://localhost:8080";

//     const [user_username, setUser_username] = useState();

//     useEffect(()=>{
//       getUser();
//   },[]);

//   async function getUser(){
//       await axios
//           .get(baseUrl + "/" + {user_username})
//           .then((response) => {
//               console.log(response.data);
//               setUser_username(response.data.userName);
//           })
//           .catch((error)=>{
//               console.log(error);
//           })
//   }

//   const handleChange_username = (e)=>{
//     e.preventDefault();
//     setUser_username(e.target.value);
// }

    const defaultTimeRange = defaultTimeEnd - defaultTimeStart;

    return (
      <div>
      {/* <Detail></Detail>   */}
      <Example></Example>
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

  export default App;

// export default class App extends Component {
//   constructor(props) {
//     super(props);

//     // const {groups, items} = generateFakeData(5);

//     const defaultTimeStart = moment()
//       .startOf("day")
//       .toDate();
//     const defaultTimeEnd = moment()
//       .startOf("day")
//       .add(1, "day")
//       .toDate();

//     this.state = {
//       groups,
//       items,
//       defaultTimeStart,
//       defaultTimeEnd
//     };
//   }

//   render() {
//     const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;

//     return (
//       <div>
//       <Example></Example>
//       <Timeline className="timeline"
//         groups={groups}
//         items={items}
//         // keys={keys}
//         sidebarContent={<div>Above The Left</div>}
//         itemsSorted
//         itemTouchSendsClick={false}
//         stackItems
//         itemHeightRatio={0.8}
//         showCursorLine
//         canMove={false}
//         canResize={false}
//         defaultTimeStart={defaultTimeStart}
//         defaultTimeEnd={defaultTimeEnd}
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

//       <div id="buttons">
//       <button class="dolbom">돌봄교실</button>
//       <button class="art">미술</button>
//       <button class="cook">요리</button>
//       <button class="music">음악</button>
//       </div>

//       </div>

//     );
//   }
// }

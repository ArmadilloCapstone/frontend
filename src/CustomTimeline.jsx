import React, { Component, useState } from "react";
import moment from "moment";
import 'moment/locale/ko';

import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TodayMarker,
  TimelineMarkers
} from "react-calendar-timeline/lib";

import { groupIds, items } from "./fake-data";
import Example from "./example";

const groups = [
  { id: groupIds.전호윤, title: "전호윤" },
  { id: groupIds.김예지, title: "김예지" },
  { id: groupIds.이아름, title: "이아름" }
];

//groups.sort((a,b) => a.id - b.id); // 초기엔 이름순 정렬


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

function App(props) {
    const defaultTimeStart = moment()
      .startOf("day")
      .toDate();
    const defaultTimeEnd = moment()
      .startOf("day")
      .add(1, "day")
      .toDate();

    return (
      <div>
      <Example></Example>
      <Timeline className="timeline"
        groups={groups}
        items={items}
        // keys={keys}
        sidebarContent={<div>Above The Left</div>}
        itemsSorted
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.8}
        showCursorLine
        canMove={false}
        canResize={false}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
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

      <div id="buttons">
      <button class="dolbom">돌봄교실</button>
      <button class="art">미술</button>
      <button class="cook">요리</button>
      <button class="music">음악</button>
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
//       {/* <Example></Example> */}
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

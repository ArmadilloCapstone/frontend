import React, { useState } from 'react';
import StudentScheduleDetail from './StudentScheduleDetail';
import StudentScheduleAdd from './StudentScheduleAdd';
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  cursor: pointer;
`;

const TabButton = styled.button`
  &.active {
    background-color: #12B560;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

export default function StudentScheduleManagement() {
  const [activeIndex, setActiveIndex] = useState(0);


  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  const tabContArr = [
    {
      tabTitle: (
        <TabButton
          className={`tab-button ${activeIndex === 0 ? "active" : ""}`}
          onClick={() => tabClickHandler(0)}
          style={{ width: '170px'}}
          >
          시간표 목록
        </TabButton>
      ),
      tabCont: (
        <div className="StudentScheduleManagementPage">
          <Routes>
            <Route path="/" element={<StudentScheduleDetail />} />
          </Routes>
        </div>
      )
    },
    {
      tabTitle: (
        <TabButton
          className={`tab-button ${activeIndex === 1 ? "active" : ""}`}
          onClick={() => tabClickHandler(1)}
          style={{ width: '170px'}}
        >
         시간표 추가
        </TabButton>
      ),
      tabCont: (
        <div className="StudentScheduleManagementPage">
          <Routes>
            <Route path="/" element={<StudentScheduleAdd />} />
          </Routes>
        </div>
      )
    }
  ];

  return (
    <Container className="container">
      <div className="my-3">
        <ul>
          {tabContArr.map((section, index) => {
            return section.tabTitle;
          })}
        </ul>
      </div>
      {tabContArr[activeIndex].tabCont}
    </Container>
  );
}


// import StudentScheduleDetail from "./StudentScheduleDetail";
// import { BrowserRouter as Router, Route,Routes,withRouter} from "react-router-dom";
// function StudentScheduleManagementPage(props) {
//   return (
 
     
//       <div className="StudentScheduleManagementPage">
//         <Routes>
//           <Route exact path="/" element={<StudentScheduleDetail />} />
//         </Routes>
//       </div>
 
//   );
// }
 
// export default StudentScheduleManagementPage;
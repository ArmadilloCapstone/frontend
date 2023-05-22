import React, { useState } from 'react';
import ParentDetail from './ParentDetail';
import ParentAdd from './ParentAdd';
import { Route, Routes } from "react-router-dom";

export default function ParentManagementPage() {
  const [activeIndex, setActiveIndex] = useState(0);



  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  const tabContArr = [
    {
      tabTitle: (
        <li className={(activeIndex === 0 ? "is-active" : "")} onClick={() => tabClickHandler(0)}>
          <p class="nav-link active" style={{ backgroundColor: activeIndex === 0 ? "#12B560" : "white",
            color: activeIndex === 0 ? "white" : "gray"}}>학부모 목록</p>
        </li>
      ),
      tabCont: (
        <div className="ParentManagementPage">

          <Routes>
            <Route exact path="/" element={<ParentDetail />} />
          </Routes>
        </div>
      )
    },
    {
      tabTitle: (
        <li className={activeIndex === 1 ? "is-active" : ""} onClick={() => tabClickHandler(1)}>
          <p class="nav-link active" style={{ backgroundColor: activeIndex === 1 ? "#12B560" : "white",
            color: activeIndex === 1 ? "white" : "gray"}}>학부모 추가</p>
        </li>
      ),
      tabCont: (
        <div className="ParentManagementPage">

          <Routes>
            <Route exact path="/" element={<ParentAdd />} />
          </Routes>
        </div>
      )
    }
  ];

  return (
    <div className="container" style={{ width: "1200px", cursor: "pointer" }}>
      <div className="my-3">
        <ul class="nav nav-tabs">
          {tabContArr.map((section, index) => {
            return section.tabTitle
          })}
        </ul>

      </div>
      {tabContArr[activeIndex].tabCont}
    </div>
  );
}


// import ParentDetail from './ParentDetail';
// import { BrowserRouter as Router, Route,Routes,withRouter} from "react-router-dom";
// function ParentManagementPage(props) {
//   return (
 
     
//       <div className="ParentManagementPage">
//         <Routes>
//           <Route exact path="/" element={<ParentDetail />} />
//         </Routes>
//       </div>
 
//   );
// }
 
// export default ParentManagementPage;
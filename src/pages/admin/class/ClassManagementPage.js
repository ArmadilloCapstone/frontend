import React, { useState } from 'react';
import ClassDetail from './ClassDetail';
import ClassAdd from './ClassAdd';
import { BrowserRouter as Router, Route, Routes, withRouter } from "react-router-dom";

export default function ClassManagementPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  const tabContArr = [
    {
      tabTitle: (
        <button
          className={`tab-button ${activeIndex === 0 ? "active" : ""}`}
          onClick={() => tabClickHandler(0)}
        >
          돌봄학급 목록
        </button>
      ),
      tabCont: (
        <div className="ClassManagementPage">
          <Routes>
            <Route path="/" element={<ClassDetail />} />
          </Routes>
        </div>
      )
    },
    {
      tabTitle: (
        <button
          className={`tab-button ${activeIndex === 1 ? "active" : ""}`}
          onClick={() => tabClickHandler(1)}
        >
          돌봄학급 추가
        </button>
      ),
      tabCont: (
        <div className="ClassManagementPage">
          <Routes>
            <Route path="/" element={<ClassAdd />} />
          </Routes>
        </div>
      )
    }
  ];

  return (
    <div className="container" style={{ fontFamily: "Eorinai"}}>
      <div className="my-3">
        <div className="tab-buttons">
          {tabContArr.map((section, index) => {
            return (
              <div key={index} className="tab-button-wrapper">
                {section.tabTitle}
              </div>
            );
          })}
        </div>
      </div>
      {tabContArr[activeIndex].tabCont}
    </div>
  );
}

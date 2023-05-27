import React, { useState } from 'react';
import TeacherDetail from './TeacherDetail';
import TeacherAdd from './TeacherAdd';
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

export default function TeacherManagementPage() {
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
        >
          돌봄교사 목록
        </TabButton>
      ),
      tabCont: (
        <div className="TeacherManagementPage">
          <Routes>
            <Route exact path="/" element={<TeacherDetail />} />
          </Routes>
        </div>
      )
    },
    {
      tabTitle: (
        <TabButton
          className={`tab-button ${activeIndex === 1 ? "active" : ""}`}
          onClick={() => tabClickHandler(1)}
        >
          돌봄교사 추가
        </TabButton>
      ),
      tabCont: (
        <div className="TeacherManagementPage">
          <Routes>
            <Route exact path="/" element={<TeacherAdd />} />
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

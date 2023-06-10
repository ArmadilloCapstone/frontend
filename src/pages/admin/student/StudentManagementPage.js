import React, { useState } from 'react';
import StudentDetail from './StudentDetail';
import StudentAdd from './StudentAdd';
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

export default function StudentManagementPage() {
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
          돌봄학생 목록
        </TabButton>
      ),
      tabCont: (
        <div className="StudentManagementPage">
          <Routes>
            <Route exact path="/" element={<StudentDetail />} />
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
        돌봄학생 추가
      </TabButton>
    ),
    tabCont: (
      <div className="StudentManagementPage">
        <Routes>
          <Route exact path="/" element={<StudentAdd />} />
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

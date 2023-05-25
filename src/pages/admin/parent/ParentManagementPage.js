import React, { useState } from 'react';
import ParentDetail from './ParentDetail';
import ParentAdd from './ParentAdd';
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
export default function ParentManagementPage() {
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
          학부모 목록
        </TabButton>
      ),
      tabCont: (
        <div className="ParentManagementPage">
          <Routes>
            <Route path="/" element={<ParentDetail />} />
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
          학부모 추가
        </TabButton>
      ),
      tabCont: (
        <div className="ParentManagementPage">
          <Routes>
            <Route path="/" element={<ParentAdd />} />
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


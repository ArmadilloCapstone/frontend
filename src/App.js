import React from 'react';
import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Layout/Header/Header';
import Sidebar from './components/Layout/Sidebar/Sidebar';

import {MainPage} from './pages/main/MainPage';
import {TimelinePage} from './pages/timeline/TimelinePage';
import StudentState from './pages/studentstate/StudentState';

import Footer from './components/Layout/Footer/Footer';

const Center = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: row;
  `

export default function App() {
  return (
    <Router>
        <Header/>
        <Center>
          <Sidebar/>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/TimelinePage" element={<TimelinePage />} />
            <Route path="/StudentState" element={<StudentState />} />
          </Routes>
        </Center>
        <Footer />
      </Router>
  );
}
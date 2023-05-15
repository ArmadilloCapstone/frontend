import React from 'react';
import styled from "styled-components";
import {BrowserRouter as Router, HashRouter, Route, Routes} from 'react-router-dom';

import Header from './components/Layout/Header/Header';
import TeacherSidebar from './components/Layout/Sidebar/TeacherSidebar';

import { MainPage } from './pages/main/MainPage';
import {TimelinePage} from './pages/timeline/TimelinePage';
import StudentState from './pages/studentstate/StudentState';
// import { EntireUserAddPage } from './pages/admin/entrire/EntireUserAddPage';
import Temp from './pages/admin/Temp/Temp';
import TeacherManagementPage from './pages/admin/teacher/TeacherManagementPage';
import StudentManagementPage from './pages/admin/student/StudentManagementPage';
import ParentManagementPage from './pages/admin/parent/ParentManagementPage';
import ClassManagementPage from './pages/admin/class/ClassManagementPage';
import AfterClassManagementPage from './pages/admin/afterClass/AfterClassManagement';
import StudentScheduleManagementPage from './pages/admin/studentSchedule/StudentScheduleManagement';
import Pickup from './pages/pickup/Pickup';

import Footer from './components/Layout/Footer/Footer';

const Center = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: row;
  `

export default function App() {
  return (
    <HashRouter>
        <Header/>
        <Center>
          <TeacherSidebar/>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/TimelinePage" element={<TimelinePage />} />
            <Route path="/StudentState" element={<StudentState />} />
            {/* <Route path="/EntireUserAddPage" element={<EntireUserAddPage />} /> */}
            <Route path="/Temp" element={<Temp />} />
            <Route path="/ClassManagementPage" element={<ClassManagementPage />} />
            <Route path="/TeacherManagementPage" element={<TeacherManagementPage />} />
            <Route path="/StudentManagementPage" element={<StudentManagementPage />} />
            <Route path="/ParentManagementPage" element={<ParentManagementPage />} />
            <Route path="/AfterClassManagementPage" element={<AfterClassManagementPage />} />
            <Route path="/StudentScheduleManagementPage" element={<StudentScheduleManagementPage />} />
            <Route path="/Pickup" element={<Pickup />} />
          </Routes>
        </Center>
        {/* <Footer /> */}
      </HashRouter>
  );
}
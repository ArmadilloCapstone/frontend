import React from 'react';
import styled from "styled-components";
import {BrowserRouter as Router, HashRouter, Route, Routes} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './components/Layout/Header/Header';
import Sidebar from './components/Layout/Sidebar/Sidebar';

import { LoginPage } from './pages/login/LoginPage';
import {TimelinePage} from './pages/timeline/TimelinePage';
import StudentState from './pages/studentstate/StudentState';
import {ParentMain} from './pages/parentMain/ParentMain';
// import { EntireUserAddPage } from './pages/admin/entrire/EntireUserAddPage';
import Temp from './pages/admin/Temp/Temp';
import TeacherManagementPage from './pages/admin/teacher/TeacherManagementPage';
import StudentManagementPage from './pages/admin/student/StudentManagementPage';
import ParentManagementPage from './pages/admin/parent/ParentManagementPage';
import ClassManagementPage from './pages/admin/class/ClassManagementPage';
import AfterClassManagementPage from './pages/admin/afterClass/AfterClassManagement';
import StudentScheduleManagementPage from './pages/admin/studentSchedule/StudentScheduleManagement';
import StudentTimeManagementPage from './pages/admin/studentTime/studentTimeManagementPage';
import Pickup from './pages/pickup/Pickup';
import GuardianPickup from './pages/pickup/GuardianPickup';
import Popup from './pages/popup/Popup';

// import Footer from './components/Layout/Footer/Footer';

const Center = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: row;
  `

export default function App() {
  const user_option = useSelector((state => state.user_option))
  return (
    <HashRouter>
        <Header/>
        <Center>
          <Sidebar/>
          <Routes>
            {/* 로그인 페이지 */}
            {
              (user_option == "1")?
              <Route path="/" element={<TimelinePage />} />:
              null
            }
            {
              (user_option == "2")?
              <Route path="/" element={<Pickup />} />:
              null
            }
            {
              (user_option == "3")?
              <Route path="/" element={<Pickup />} />:
              null
            }
            {
              (user_option == "4")?
              <Route path="/" element={<ClassManagementPage />} />:
              null
            }
            {
              (user_option != "1" && user_option != "2" && user_option != "3" && user_option != "4")?
              <Route path="/" element={<LoginPage />} />:
              null
            }
            {/* 돌봄교사 페이지 */}
            {
              (user_option == "1")?
              <Route path="/TimelinePage" element={<TimelinePage />} />:
              <Route path="/TimelinePage" element={<LoginPage />} />
            }
            {
              (user_option == "1")?
              <Route path="/StudentState" element={<StudentState />} />:
              <Route path="/StudentState" element={<LoginPage />} />
            }
            {/* <Route path="/EntireUserAddPage" element={<EntireUserAddPage />} /> */}
            {/* 학부모 페이지 */}
            {
              (user_option == "2")?
              <Route path="/ParentMain" element={<ParentMain />} />:
              <Route path="/ParentMain" element={<LoginPage />} />
            }
            {
              (user_option == "2")?
              <Route path="/Pickup" element={<Pickup />} />:
              <Route path="/Pickup" element={<LoginPage />} />
            }
            {/* 보호자 페이지 */}
            {
              (user_option == "3")?
              <Route path="/GuardianPickup" element={<GuardianPickup />} />:
              <Route path="/GuardianPickup" element={<LoginPage />} />
            }
            {/* 관리자 페이지 */}
            {
              (user_option == "4")?
              <Route path="/Temp" element={<Temp />} />:
              <Route path="/Temp" element={<LoginPage />} />
            }
            {
              (user_option == "4")?
              <Route path="/ClassManagementPage" element={<ClassManagementPage />} />:
              <Route path="/ClassManagementPage" element={<LoginPage />} />
            }
            {
              (user_option == "4")?
              <Route path="/TeacherManagementPage" element={<TeacherManagementPage />} />:
              <Route path="/TeacherManagementPage" element={<LoginPage />} />
            }
            {
              (user_option == "4")?
              <Route path="/StudentManagementPage" element={<StudentManagementPage />} />:
              <Route path="/StudentManagementPage" element={<LoginPage />} />
            }
            {
              (user_option == "4")?
              <Route path="/ParentManagementPage" element={<ParentManagementPage />} />:
              <Route path="/ParentManagementPage" element={<LoginPage />} />
            }
            {
              (user_option == "4")?
              <Route path="/AfterClassManagementPage" element={<AfterClassManagementPage />} />:
              <Route path="/AfterClassManagementPage" element={<LoginPage />} />
            }
            {
              (user_option == "4")?
              <Route path="/StudentScheduleManagementPage" element={<StudentScheduleManagementPage />} />:
              <Route path="/StudentScheduleManagementPage" element={<LoginPage />} />
            }
            {
              (user_option == "4")?
              <Route path="/StudentTimeManagementPage" element={<StudentTimeManagementPage />} />:
              <Route path="/StudentTimeManagementPage" element={<LoginPage />} />
            }
          </Routes>
        </Center>
        {/* <Footer /> */}
        <Popup/>
      </HashRouter>
  );
}
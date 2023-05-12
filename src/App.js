import React from 'react';
import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Layout/Header/Header';
import Sidebar from './components/Layout/Sidebar/Sidebar';

import {MainPage} from './pages/main/MainPage';
import {TimelinePage} from './pages/timeline/TimelinePage';
import { Link } from "react-router-dom";
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
          </Routes>
        </Center>
        <Footer />
      </Router>

    // <div className="App">
    //   <Router>
    //     {/* <Layout /> */}
    //     <Routes>
    //       <Route path="/" exact element={<MainPage />} />
    //       <Route path="/TimelinePage" element={<TimelinePage />} />
    //     </Routes>
    //   </Router>
    // </div>


    // <div>
    //   <nav
    //     style={{
    //       borderBottom: "solid 1px",
    //       paddingBottom: "1rem",
    //     }}
    //   >
    //     <Router>
    //         <Routes>
		// 			<Route path="/" element={<MainPage />}></Route>
		// 			<Route path="/TimelinePage" element={<TimelinePage />}></Route>
		// 		</Routes>
    //     <Link to="/">main</Link> |{" "}
    //     <Link to="/TimelinePage">timeline</Link>
    //     </Router>
    //   </nav>
    // </div>
  );
}
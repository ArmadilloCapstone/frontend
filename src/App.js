import React from 'react';
import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Layout/Header/Header';
import Sidebar from './components/Layout/Sidebar/Sidebar';

import {MainPage} from './pages/main/MainPage';
import {TimelinePage} from './pages/timeline/TimelinePage';
<<<<<<< HEAD
=======
import StudentState from './pages/studentstate/StudentState';

>>>>>>> 9204ed531c939e168ed3723a2524dbc9276d1083
import { Link } from "react-router-dom";
import Footer from './components/Layout/Footer/Footer';

const Center = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: row;
  `

export default function App() {
  return (
<<<<<<< HEAD
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
=======
    <div>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Router>
            <Routes>
					<Route path="/" element={<MainPage />}></Route>
					<Route path="/TimelinePage" element={<TimelinePage />}></Route>
					<Route path="/StudentState" element={<StudentState />}></Route>
				</Routes>
        <Link to="/">main</Link> |{" "}
        <Link to="/TimelinePage">timeline</Link> |{" "}
            <Link to="/StudentState">StudentState</Link>
        </Router>
      </nav>
    </div>
>>>>>>> 9204ed531c939e168ed3723a2524dbc9276d1083
  );
}
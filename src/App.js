import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {MainPage} from './pages/main/MainPage';
import {TimelinePage} from './pages/timeline/TimelinePage';
import StudentState from './pages/studentstate/StudentState';

import { Link } from "react-router-dom";

export default function App() {
  return (
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
  );
}
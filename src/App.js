import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {MainPage} from './pages/main/MainPage';
import {TimelinePage} from './pages/timeline/TimelinePage';

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
				</Routes>
        <Link to="/">main</Link> |{" "}
        <Link to="/TimelinePage">timeline</Link>
        </Router>
      </nav>
    </div>
  );
}
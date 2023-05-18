import React, { useState } from "react";
import "./Temp.css";
import "bootstrap/dist/css/bootstrap.min.css";

import FileUpload from "./FileUpload";

function Temp() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="container" style={{ fontFamily: "Eorinai", width: "1200px" }}>
      <div className="my-3">
        <p className="mb-5" style={{ fontSize: "40px", fontWeight: "bold" }}>
          사용자 추가
        </p>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <p
              className={`nav-link ${activeTab === 1 ? "active clicked" : ""}`}
              onClick={() => handleTabClick(1)}
            >
              파일 추가
            </p>
          </li>
          <li className="nav-item">
            <p
              className={`nav-link ${activeTab === 2 ? "active clicked" : ""}`}
              onClick={() => handleTabClick(2)}
            >
              파일추가2
            </p>
          </li>
        </ul>
      </div>
      <FileUpload />
    </div>
  );
}

export default Temp;

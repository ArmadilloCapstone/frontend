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
      <div >
        <p className="mb-5" style={{ fontSize: "40px", fontWeight: "bold", color: "#555555" }}>
          사용자 추가
        </p>
        <div className="btn-group">
          <button
            className={`btn ${activeTab === 1 ? "btn-primary active" : "btn-secondary"}`}
            onClick={() => handleTabClick(1)}
            style={{
              marginRight: "15px",
              borderRadius: "10px",
              backgroundColor: activeTab === 1 ? "#12B560" : "#E0E0E0",
              color: activeTab === 1 ? "#FFFFFF" : "#555555",
              border: "none",
              padding: "0", 
              width: "150px",
              height: "60px",
              fontSize: "18px", 
            }}
          >
            파일 추가
          </button>
          <button
            className={`btn ${activeTab === 2 ? "btn-primary active" : "btn-secondary"}`}
            onClick={() => handleTabClick(2)}
            style={{
              borderRadius: "10px",
              backgroundColor: activeTab === 2 ? "#12B560" : "#E0E0E0",
              color: activeTab === 2 ? "#FFFFFF" : "#555555",
              border: "none",
              padding: "0", 
              width: "150px", 
              height: "60px", 
              fontSize: "18px", 
            }}
          >
            파일추가2
          </button>
        </div>
      </div>
      <FileUpload />
    </div>
  );
}

export default Temp;

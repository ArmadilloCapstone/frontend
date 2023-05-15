import React from "react";
import "./Temp.css";
import "bootstrap/dist/css/bootstrap.min.css";

import FileUpload from "./FileUpload";

function Temp() {
    return (
        <div className="container" style={{ width: "1200px" }}>
            <div className="my-3">
                <p className="titletag">사용자 추가</p>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <p class="nav-link active">파일 추가</p>
                    </li>
                </ul>
            </div>
            <FileUpload />
        </div>
    );
}

export default Temp;
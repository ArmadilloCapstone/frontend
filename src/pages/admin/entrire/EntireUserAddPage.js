import React, { useState } from 'react';
import axios from 'axios';

import './EntireUserAdd.css'

export const EntireUserAddPage = () => {
const [csvFile, setCsvFile] = useState();

const formData = new FormData();

if (csvFile){
 formData.append('path_to_csv', csvFile);
}

const handleChange = (e) => {
    if (e.currentTarget.files) setCsvFile(e.currentTarget.files[0]);
};

const handleSubmit = (e) => {
 e.preventDefault();

 async function fetchData() {
 const res = await axios.post(
   'http://127.0.0.1:8000/end_point_name_here/',
   formData,
   );
   console.log(res.data);
  }
  fetchData();
};

  return (
      <div>
        <p className="titletag">사용자 추가</p>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <p class="nav-link active">전체 추가</p>
          </li>
        </ul>
        <form onSubmit={handleSubmit}>
        <div className="formtag">
          <input className="inputtag" type="file" accept=".csv" onChange={handleChange} />
          <button type="submit" className="filesubmitbutton">추가하기</button>
        </div>
        </form>
        
      </div>
  );
};
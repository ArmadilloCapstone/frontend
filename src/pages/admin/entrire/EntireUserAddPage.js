
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
   '/entireUserFile',
   formData,
   );
   console.log(res.data);
  }
  fetchData();
};

  return (
      <div>
        <p class="mb-5"style={{ fontSize: "40px", fontWeight: "bold" }}>사용자 추가</p>
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

// import {useEffect, useState} from 'react';
// import './EntireUserAdd.css'
// import axios from 'axios';

// export const EntireUserAddPage = () => {

//   const [csvFile, setCsvFile] = useState({
//     csv_file: "",
//     preview_URL: "img/default_image.png", // default 이미지 필요
//   });

//   let inputRef;

//   const saveCsv = (e) => {
//     e.preventDefault();
//     if(e.target.files[0]){
//       // 새로운 csv file을 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
//       URL.revokeObjectURL(csvFile.preview_URL);
//       const preview_URL = URL.createObjectURL(e.target.files[0]);
//       setCsvFile(() => (
//         {
//           csv_file: e.target.files[0],
//           preview_URL: preview_URL
//         }
//       ))
//     }
//   }

//   const deleteCsv = () => {
//     // createObjectURL()을 통해 생성한 기존 URL을 폐기
//     URL.revokeObjectURL(csvFile.preview_URL);
//     setCsvFile({
//       csv_file: "",
//       preview_URL: "img/default_image.png",
//     });
//   }

//   useEffect(()=> {
//     // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
//     return () => {
//       URL.revokeObjectURL(csvFile.preview_URL)
//     }
//   }, [])

//   const sendCsvToServer = async () => {
//     if (csvFile.csv_file) {
//       const formData = new FormData()
//       formData.append('path_to_csv', csvFile.csv_file);
//       await axios.post('/entireUserFile', formData);
//       alert("서버에 등록이 완료되었습니다!");
//       setCsvFile({
//         csv_file: "",
//         preview_URL: "img/default_image.png",
//       });
//     } else {
//       alert("파일을 등록하세요!")
//     }
//   }

//   return (
//     <div className="uploader-wrapper">
//        <p className="titletag">사용자 추가</p>
//          <ul class="nav nav-tabs">
//            <li class="nav-item">
//              <p class="nav-link active">전체 추가</p>
//            </li>
//          </ul>

//          <form onSubmit={sendCsvToServer}>
//          <div className="formtag">
//            <input className="inputtag" type="file" accept=".csv" onChange={saveCsv} />
//            <button type="submit" className="filesubmitbutton">추가하기</button>
//            <button type="submit" className="filesubmitbutton" onClick={deleteCsv}>삭제하기</button>
//          </div>
//          </form>





//          {/* <form  onSubmit={sendCsvToServer}>
//          <div className="formtag">
//            <input className="inputtag" type="file" accept=".csv" onChange={saveCsv}
//            // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
//         // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
//         onClick={(e) => e.target.value = null}
//         ref={refParam => inputRef = refParam}
//         style={{display: "none"}}
//             />
//       <div className="img-wrapper">
//         <img src={csvFile.preview_URL}/>
//       </div>
//       <div className="upload-button">
//            <button type="submit" className="filesubmitbutton" onClick={sendCsvToServer}>추가하기</button>
//            <button type="submit" className="filesubmitbutton" onClick={deleteCsv}>삭제하기</button>
//            </div>
//          </div>
//          </form> */}
//          </div>
      
//   );
// }


// import React, { useState } from 'react';
// import GuardianDetail from './GuardianDetail';
// import GuardianAdd from './GuardianAdd';
// import { Route, Routes } from "react-router-dom";

// export default function GuardianManagementPage() {
//   const [activeIndex, setActiveIndex] = useState(0);



//   const tabClickHandler = (index) => {
//     setActiveIndex(index);
//   };

//   const tabContArr = [
//     {
//       tabTitle: (
//         <button
//           className={`tab-button ${activeIndex === 0 ? "active" : ""}`}
//           onClick={() => tabClickHandler(0)}
//         >
//           보호자 목록
//         </button>
//       ),
//       tabCont: (
//         <div className="StudentManagementPage">
//           <Routes>
//             <Route exact path="/" element={<GuardianDetail />} />
//           </Routes>
//         </div>
//       )
//       },
//       {
//         tabTitle: (
//         <button
//         className={`tab-button ${activeIndex === 1 ? "active" : ""}`}
//         onClick={() => tabClickHandler(1)}
//       >
//         보호자 추가
//       </button>
//     ),
//     tabCont: (
//       <div className="StudentManagementPage">
//         <Routes>
//           <Route exact path="/" element={<GuardianAdd />} />
//         </Routes>
//       </div>
//     )
//       }
//   ];

//   return (
//     <div className="container" style={{ cursor: "pointer" }}>
//       <div className="my-3">
//         <ul class="nav nav-tabs">
//           {tabContArr.map((section, index) => {
//             return section.tabTitle
//           })}
//         </ul>

//       </div>
//       {tabContArr[activeIndex].tabCont}
//     </div>
//   );
// }


// import StudentDetail from './StudentDetail';

// function StudentManagementPage() {
//   return (
//     <StudentDetail />
//   );
// }
 
// export default StudentManagementPage;
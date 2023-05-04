import React, { useState } from "react";
import { groupIds } from "./fake-data";

const groups = [
    { id: groupIds.전호윤, title: "전호윤" },
    { id: groupIds.김예지, title: "김예지" },
    { id: groupIds.이아름, title: "이아름" }
  ];

  function Example() {
    const [Groups, setGroups] = useState("");
  
    return (
        <div class="timeline_sort">
        <button 
        onClick={()=>{
          let copy = [...Groups];
          copy.sort((a,b) => a.id - b.id);
          setGroups(copy);
        }}
        >이름순
        </button>
        <button 
        onClick={()=>{
          let copy = [...Groups];
          copy.sort((a,b) => a.id - b.id);
          setGroups(copy);
        }}
        >방과후순
        </button>
        <button 
        onClick={()=>{
          let copy = [...Groups];
          copy.sort((a,b) => a.id - b.id);
          setGroups(copy);
        }}
        >귀가순
        </button>
        </div>
    )
  }

  export default Example;

// function Example() {
//     const [Groups, setGroups] = useState(groups);

//     return (
//          <div>
//         <button onClick={()=>{
          
//             let copy = [...Groups];
//             copy.sort((a,b) => {
//             if(a.id < b.id) return 1;
//             if(a.id > b.id) return -1;
//             return 0;
//             })
//             //a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1);
//             setGroups(copy);
          
//         }}>이름순
//         </button>
//         {/* <button onClick={()=>{
          
//             let copy = [...Groups];
//             copy.sort((a,b) => a.id > b.id ? -1 : 1);
//             setGroups(copy);
          
//         }}>귀가시간순
//         </button>
//         <button onClick={()=>{
          
//             let copy = [...Groups];
//             copy.sort((a,b) => a.id > b.id ? -1 : 1);
//             setGroups(copy);
          
//         }}>방과후순
//         </button> */}
//     //     </div>
//     )
// }

// export default Example;
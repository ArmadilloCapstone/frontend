import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.css';
import teacherImg from './teacher.png';

function TelephoneLink() {
  const [callList, setCallList] = useState([
    {name: "수빈", phone_num: "010-2532-7535"},
    {name: "왜", phone_num: "010-1111-1111"}
  ]);

  // 주요 연락처 List 가져오기
  useEffect(() => {
    axios.post('http://localhost:80/callList', {
      parent_id: localStorage.getItem('userid')
    })
      .then(function (response) {
        console.log(response.data);
        setCallList(response.data.map(function (el) {
          var returnObj = {}
          returnObj['name'] = el.name;
          returnObj['phone_num'] = el.phone_num;
          return returnObj;
        }));
      }).catch(function (reason) {
        console.log(reason);
      });
  }, []);

  return (
    <div className="telephone-link-container">
      {callList.map((el, index) => (
        <div className="telephone-link-item" key={index}>
            <a href={"tel:" + el.phone_num}>
              <img src={teacherImg} alt={el.name} />
              <span>{el.name}</span>
            </a>
        </div>
      ))}
    </div>
  );
}

export default TelephoneLink;

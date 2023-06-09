import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.css';
import teacherImg from './teacher.png';

function TelephoneLink() {
  const [callList, setCallList] = useState([]);

  useEffect(() => {
    // console.log(localStorage.getItem('userid'));
    axios.post('http://dolbomi.site/callList/' + localStorage.getItem('userid'))
      .then(function (response) {
        // console.log(response.data);
        setCallList(response.data["teacherList"].map(function (el) {
          var returnObj = {}
          returnObj['name'] = el.name;
          returnObj['phone_num'] = el.phone_num;
          return returnObj;
        }));
      }).catch(function (reason) {
        // console.log(reason);
      });
  }, []);

  return (
    <div className="telephone-link-container" >
      <div className="telephone-link-header">돌봄교사 연락처</div> 
      <div className="gray-line"></div>
        {callList.map((el, index) => (
          <div className="telephone-link-item" key={index}>
              <a className="telephone-link" href={"tel:" + el.phone_num}>
                <img src={teacherImg} alt={el.name} />
                <span>{el.name}</span>
              </a>
          </div>
      ))}
    </div>
  );
}

export default TelephoneLink;

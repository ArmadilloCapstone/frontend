import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.css';
import teacherImg from './teacher.png';
import schoolImg from './school-round.png';
import buildingImg from './building.png';

function TelephoneLink() {
  const [callList, setCallList] = useState([
    { name: "돌봄교사", phone_num: "010-2532-7535" },
    { name: "아주초등학교", phone_num: "010-2532-7535" },
    { name: "아주초 행정실", phone_num: "010-2532-7535" }
  ]);

  // 주요 연락처 List 가져오기
  const loadCallList = async () => {
    try {
      const response = await axios.post('http://localhost:80/callList');
      const formattedData = response.data.map((el) => {
        return {
          name: el.name,
          phone_num: el.phone_num
        };
      });
      setCallList(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCallList();
  }, []);

  function phoneCall(phoneNumber, name) {
    const imageMap = {
      "010-2532-7535": teacherImg,
      "010-1234-5678": schoolImg,
      "010-9876-5432": buildingImg,
    };

    const image = imageMap[phoneNumber] || teacherImg;

    return (
      <div>
      <a href={"tel:" + phoneNumber}>
        <img src={image} alt={name} />
        <span>{name}</span>
      </a>
    </div>
  );
  }

  return (
    <div className="telephone-link-container">
      {callList.map((el, index) => (
        <div className="telephone-link-item" key={index}>
          {phoneCall(el.phone_num, el.name)}
        </div>
      ))}
    </div>
  );
}

export default TelephoneLink;

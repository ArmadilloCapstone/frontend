import '../adminPages.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function StudentDetail() {
  const [record, setRecord] = useState([]);

  // On Page load display all records 
  const loadStudentDetail = async () => {
    await axios.post('http://dolbomi.site/student')
      .then(function (response) {
        setRecord(response.data.map(function (el, idx) {
          console.log(el);

          var returnObj = {}
          returnObj['id'] = el.id;
          returnObj['name'] = el.name;
          returnObj['grade'] = el.grade;
          returnObj['phone_num'] = el.phone_num;
          returnObj['gender'] = el.gender;
          returnObj['class_name'] = el.class_name;
          returnObj['original_class_num'] = el.original_class_num;
          returnObj['birth_date'] = el.birth_date;

          return returnObj;
        }));
      }).catch(function (reason) {
        console.log(reason);
      });

  }
  useEffect(() => {
    loadStudentDetail();
  }, []);

  // Delete Student Record
  const deleteRecord = (productId) => {
    axios.delete(`http://dolbomi.site/student/${productId}`)
      .then((result) => {
        loadStudentDetail();
      })
      .catch(() => {
        alert('오류가 발생했습니다!');
      });
  };

  return (
    <section class="tableSection">
      <table class="admin">
        <thead class="admin">
          <tr class="admin">
            <th class="admin">이름</th>
            <th class="admin">학년</th>
            <th class="admin">연락처</th>
            <th class="admin">성별</th>
            <th class="admin">돌봄 반</th>
            <th class="admin">기존 반</th>
            <th class="admin">생년월일</th>
            <th class="admin">Action</th>
          </tr>
        </thead>
        <tbody>

          {record.map((name) =>
            <tr class="admin">
              <td class="admin">{name.name}</td>
              <td class="admin">{name.grade}</td>
              <td class="admin">{name.phone_num}</td>
              <td class="admin">{name.gender}</td>
              <td class="admin">{name.class_name}</td>
              <td class="admin">{name.original_class_num}</td>
              <td class="admin">{name.birth_date}</td>
              <td class="admin">
                <button class="delete"
                  onClick={() => {
                    const confirmBox = window.confirm(
                      "'" + name.name + "'" + " 돌봄학생을 정말 삭제하시겠습니까?"
                    )
                    if (confirmBox === true) {
                      deleteRecord(name.id)
                    }
                  }}>삭제</button>

              </td>
            </tr>
          )}
        </tbody>
      </table>

    </section >
  )
}

export default StudentDetail;
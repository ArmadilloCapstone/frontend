import '../adminPages.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function TeacherDetail() {
  const [record, setRecord] = useState([]);

  // On Page load display all records 
  const loadTeacherDetail = async () => {
    await axios.post('http://localhost:80/teacher')
      .then(function (response) {
        setRecord(response.data.map(function (el, idx) {
          console.log(el);

          var returnObj = {}
          returnObj['id'] = el.id;
          returnObj['name'] = el.name;
          returnObj['phone_num'] = el.phone_num;
          returnObj['gender'] = el.gender;
          returnObj['birth_date'] = el.birth_date;
          returnObj['class_name'] = el.class_name;

          return returnObj;
        }));
      }).catch(function (reason) {
        console.log(reason);
      });
  }

  useEffect(() => {
    loadTeacherDetail();
  }, []);

  // Delete Teacher Record
  const deleteRecord = (productId) => {
    axios.delete(`http://localhost:80/teacher/${productId}`)
      .then((result) => {
        loadTeacherDetail();
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
            <th class="admin">연락처</th>
            <th class="admin">성별</th>
            <th class="admin">생년월일</th>
            <th class="admin">돌봄 반 이름</th>
            <th class="admin">Action</th>
          </tr>
        </thead>
        <tbody class="admin">

          {record.map((name) =>
            <tr class="admin">
              <td class="admin">{name.name}</td>
              <td class="admin">{name.phone_num}</td>
              <td class="admin">{name.gender}</td>
              <td class="admin">{name.birth_date}</td>
              <td class="admin">{name.class_name}</td>
              <td class="admin">
                <button class="delete"
                  onClick={() => {
                    const confirmBox = window.confirm(
                      "'" + name.name + "'" + " 돌봄교사를 정말 삭제하시겠습니까?"
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
    </section>
  )
}

export default TeacherDetail;
import '../adminPages.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function AfterClassDetail() {
  const [record, setRecord] = useState([]);

  // On Page load display all records 
  const loadAfterClassDetail = async () => {
    await axios.post('http://dolbomi.site/after_school_class')
        .then(function(response){
          setRecord(response.data.map(function(el, idx){
            console.log(el);

          var returnObj = {}
          returnObj['id'] = el.id;
          returnObj['class_name'] = el.class_name;
          returnObj['start_time'] = el.start_time;
          returnObj['end_time'] = el.end_time;
          returnObj['day'] = el.day;

          return returnObj;
        }));
      }).catch(function (reason) {
        console.log(reason);
      });
  }

  useEffect(() => {
    loadAfterClassDetail();
  }, []);

  // Delete After Class Record
  const deleteRecord = (productId) => {
    axios.delete(`http://dolbomi.site/after_school_class/${productId}`)
      .then((response) => {
        if (response.data === "success") {
          loadAfterClassDetail();
        }
        else {
          alert(response.data);
        }
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
            <th class="admin">수업 이름</th>
            <th class="admin">시작 시간</th>
            <th class="admin">종료 시간</th>
            <th class="admin">요일</th>
            <th class="admin">Action</th>
          </tr>
        </thead>
        <tbody class="admin">

          {record.map((name) =>
            <tr class="admin">
              <td class="admin">{name.class_name}</td>
              <td class="admin">{name.start_time}</td>
              <td class="admin">{name.end_time}</td>
              <td class="admin">{name.day}</td>
              <td class="admin">
                <button class="delete"
                  onClick={() => {
                    const confirmBox = window.confirm(
                      "'" + name.class_name + "'" + " 방과후수업을 정말 삭제하시겠습니까?"
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

export default AfterClassDetail;
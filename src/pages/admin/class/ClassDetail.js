import '../adminPages.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function ClassDetail() {
  const [record, setRecord] = useState([]);

  // On Page load display all records 
  const loadClassDetail = async () => {
    await axios.post('http://dolbomi.site/dolbom_class')
      .then(function (response) {
        setRecord(response.data.map(function (el, idx) {
          console.log(el);


          var returnObj = {}
          returnObj['id'] = el.id;
          returnObj['class_name'] = el.class_name;
          returnObj['class_num'] = el.class_num;
          returnObj['year_seme'] = el.year_seme;

          return returnObj;
        }));
      }).catch(function (reason) {
        console.log(reason);
      });

  }
  useEffect(() => {
    loadClassDetail();
  }, []);

  // Delete Class Record
  const deleteRecord = (productId) => {
    axios.delete(`http://dolbomi.site/dolbom_class/${productId}`)
      .then((result) => {
        loadClassDetail();
      })
      .catch(() => {
        alert('오류가 발생했습니다!');
      });
  };

  // 정렬 메소드
  const sortByName = () => {
    let copy = [...record];
    copy.sort((a, b) => a.class_name.toUpperCase() < b.class_name.toUpperCase() ? -1 : 1);
    setRecord(copy);
  }
  const sortByNum = () => {
    let copy = [...record];
    copy.sort((a, b) => a.class_num < b.class_num ? -1 : 1);
    setRecord(copy);
  }


  return (
    <div>
      <div class="admin_sort">
      <button className="adminsortingButtons" onClick={() => sortByNum()}
        >번호순
        </button>
        <button className="adminsortingButtons" onClick={() => sortByName()}
        >이름순
        </button>
      </div>
      <section class="tableSection">
        <table class="admin">
          <thead class="admin">
            <tr class="admin">
              <th class="admin">학급 이름</th>
              <th class="admin">학급 번호</th>
              <th class="admin">년도-학기</th>
              <th class="admin">Action</th>
            </tr>
          </thead>
          <tbody class="admin">
            {record.map((name, idx) =>
              <tr class="admin" key={idx}>
                <td class="admin">{name.class_name}</td>
                <td class="admin">{name.class_num}</td>
                <td class="admin">{name.year_seme}</td>
                <td class="admin">
                  <button class="delete"
                    onClick={() => {
                      const confirmBox = window.confirm(
                        "'" + name.class_name + "'" + " 학급을 정말 삭제하시겠습니까?"
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
    </div>
  )
}

export default ClassDetail;
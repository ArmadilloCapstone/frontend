import '../adminPages.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import './ClassDetail.css';

function ClassDetail() {
  const [record, setRecord] = useState([]);

  const [user, setUser] = useState({
    id: 0,
    class_name: "",
    class_num: "",
    // year_seme: "",
    year: "",
    seme: ""
  });

  //  Object Destructuring 
  // const { class_name, class_num, year_seme } = user;
  const { class_name, class_num, year, seme } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  function changeUserForm(data) {
    var returnObj = {}
    returnObj['class_name'] = data.class_name;
    returnObj['class_num'] = data.class_num;
    returnObj['year_seme'] = data.year + "-" + data.seme;

    return returnObj;

  }

  // On Page load display all records 
  const loadClassDetail = async () => {
    await axios.post('/dolbom_class')
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

  // Insert Class Records 
  const submitClassRecord = async (e) => {
    e.preventDefault();
    e.target.reset();
    const postUser = changeUserForm(user);
    await axios.post('/dolbom_class_submit', postUser);
    // await axios.post('/dolbom_class_submit', user);
    alert('추가되었습니다!');

    loadClassDetail();
  };

  // Delete Class Record
  const deleteRecord = (productId) => {
    axios.delete(`/dolbom_class/${productId}`)
      .then((result) => {
        loadClassDetail();
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
            <th class="admin">학급 이름</th>
            <th class="admin">학급 번호</th>
            <th class="admin">년도-학기</th>
            <th class="admin">Action</th>
          </tr>
        </thead>
        <tbody class="admin">
          {record.map((name) =>
            <tr class="admin">
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
                  
    

                {/* <Link class=" mr-2" to={`/EditEmployee/editID/${name.id}`}>
                        <i class="fa fa-edit" aria-hidden="true"></i>
                      </Link> */}
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </section >
  )
}

export default ClassDetail;
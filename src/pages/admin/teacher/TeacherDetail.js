import '../adminPages.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from 'react-router-dom';

function TeacherDetail() {
  const [record, setRecord] = useState([]);

  const [user, setUser] = useState({
    id: 0,
    name: "",
    phone_num: "",
    gender: "",
    birth_date: "",
    class_name: "",
    class_id: null
  });

  //  Object Destructuring 
  const { name, phone_num, gender, birth_date, class_name, class_id } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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
          // if (el.gender === 1) {
          //   returnObj['gender'] = "남자";
          // }
          // else if (el.gender === 2) {
          //   returnObj['gender'] = "여자";
          // }
          returnObj['gender'] = el.gender;
          returnObj['birth_date'] = el.birth_date;
          returnObj['class_name'] = el.class_name;
          // returnObj['class_id'] = el.class_id;

          return returnObj;
        }));
      }).catch(function (reason) {
        console.log(reason);
      });
  }

  // const loadStudentDetail = async () => {
  //   var response = fetch('http://localhost:5000/api/v1/employee')
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (myJson) {
  //       setRecord(myJson);
  //     });
  // }

  useEffect(() => {
    loadTeacherDetail();
  }, []);

  // Insert Teacher Records 
  const submitTeacherRecord = async (e) => {
    e.preventDefault();
    e.target.reset();
    await axios.post('http://localhost:80/teacher_submit', user);
    alert('추가되었습니다!');

    loadTeacherDetail();
  };

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


  const OPTIONS = [
    { value: "apple", name: "사과" },
    { value: "banana", name: "바나나" },
    { value: "orange", name: "오렌지" },
  ];



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
            {/* <th>돌봄 반 ID</th> */}
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
              {/* <td>{name.class_id}</td> */}
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
                {/* <a className="text-danger mr-2"
                          onClick={() => {
                            const confirmBox = window.confirm(
                              "'" + name.name + "'" + " 돌봄교사를 정말 삭제하시겠습니까?"
                            )
                            if (confirmBox === true) {
                              deleteRecord(name.id)
                            }
                          }}> <i class="far fa-trash-alt" style={{ fontSize: "18px", marginRight: "5px" }}></i>삭제 </a> */}

                {/* <Link class=" mr-2" to={`/EditEmployee/editID/${name.id}`}>
                        <i class="fa fa-edit" aria-hidden="true"></i>
                      </Link> */}
              </td>
            </tr>
          )}
        </tbody>
      </table>

          {/* <div class="Tsm-4" style={{ textAlign: "center" }}>
            <div className="Tbox Tp-3 Tmb-3">
              <form onSubmit={submitTeacherRecord}>
                <h5 className="Tmb-3 ">추가하실 돌봄교사의 정보를 입력하세요.</h5>
                <div class="Tform-group">
                  <input type="text" class="form-control  Tmb-4" name="name" value={name} onChange={e => onInputChange(e)} placeholder="이름을 입력하세요." required="" />
                </div>

                <div class="Tform-group">
                  <input type="text" class="form-control Tmb-4" name="phone_num" value={phone_num} onChange={e => onInputChange(e)} placeholder="연락처를 입력하세요." required="" />
                </div>

                <div class="Tform-group">
                  <input type="text" class="form-control Tmb-4" name="gender" value={gender} onChange={e => onInputChange(e)} placeholder="성별을 입력하세요." required="" />
                </div>

                <div class="Tform-group">
                  <input type="text" class="form-control Tmb-4" name="birth_date" value={birth_date} onChange={e => onInputChange(e)} placeholder="생년월일을 입력하세요." required="" />
                </div>

                <div class="Tform-group">
                  <input type="text" class="form-control Tmb-4" name="class_name" value={class_name} onChange={e => onInputChange(e)} placeholder="담당 돌봄반 이름을 입력하세요." required="" />
                </div>

                <div class="Tform-group">
                  <input type="text" class="form-control Tmb-4" name="class_id" value={class_id} onChange={e => onInputChange(e)} placeholder="담당 돌봄반 ID를 입력하세요." required="" />
                </div>

                <div>
                  <button type="submit" class="btn Tbtn-primary Tmt-2">돌봄교사 추가</button>
                </div>
              </form>
            </div>
          </div>  */}
      {/* </div> */}
    </section>
  )
}

export default TeacherDetail;
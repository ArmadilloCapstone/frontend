import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import './TeacherDetail.css';
// import { Link } from 'react-router-dom';

function TeacherDetail() {
  // let genderList = [{ value: "남자" }, { value: "여자" }];
  // const [selectedValue, setSelectedValue] = useState("남자");
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
    await axios.post('http://13.209.104.24:8080/teacher')
      .then(function (response) {
        setRecord(response.data.map(function (el, idx) {
          console.log(el);

          var returnObj = {}
          returnObj['id'] = el.id;
          returnObj['name'] = el.name;
          returnObj['phone_num'] = el.phone_num;
          if(el.gender === 1) {
            returnObj['gender'] = "남자";
          }
          else if(el.gender === 2) {
            returnObj['gender'] = "여자";
          }
          // returnObj['gender'] = el.gender;
          returnObj['birth_date'] = el.birth_date;
          returnObj['class_name'] = el.class_name;
          returnObj['class_id'] = el.class_id;

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

  // Insert Employee Records 
  const submitTeacherRecord = async (e) => {
    e.preventDefault();
    e.target.reset();
    await axios.post('http://13.209.104.24:8080/teacher_submit', user);
    alert('추가되었습니다!');

    loadTeacherDetail();
  };

  // Delete Employee Record
  const deleteRecord = (productId) => {
    axios.delete(`/teacher/${productId}`)
      .then((result) => {
        loadTeacherDetail();
      })
      .catch(() => {
        alert('오류가 발생했습니다!');
      });
  };

  return (
    <section>

      {/* <div class="container"> */}
      {/* <h2 className="mb-10 mt-3">돌봄교사 관리</h2> */}
      <div className="Tcontainer" style={{fontFamily: "Eorinai" }}>
        <div className="Tmy-3">
          <p class="Tmb-5">돌봄교사 관리</p>
          <div class="Trow mt-3">
            <div class="Tsm-8">
              {/* <h4 class="text-center mt-4 mb-4" style={{ width: "1200px" }}>돌봄교사 리스트</h4> */}

              <table class="Ttable">
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>연락처</th>
                    <th>성별</th>
                    <th>생년월일</th>
                    <th>돌봄반 이름</th>
                    <th>돌봄반 ID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>

                  {record.map((name) =>
                    <tr>
                      <td>{name.name}</td>
                      <td>{name.phone_num}</td>
                      <td>{name.gender}</td>
                      <td>{name.birth_date}</td>
                      <td>{name.class_name}</td>
                      <td>{name.class_id}</td>
                      <td>
                        <a className="text-danger Tmr-2"
                          onClick={() => {
                            const confirmBox = window.confirm(
                              "'" + name.name + "'" + " 돌봄교사를 정말 삭제하시겠습니까?"
                            )
                            if (confirmBox === true) {
                              deleteRecord(name.id)
                            }
                          }}> <i class="far fa-trash-alt" style={{ fontSize: "18px", marginRight: "5px" }}></i>삭제 </a>

                        {/* <Link class=" mr-2" to={`/EditEmployee/editID/${name.id}`}>
                        <i class="fa fa-edit" aria-hidden="true"></i>
                      </Link> */}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div class="Tsm-4" style={{ textAlign: "center" }}>
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
          </div>

        </div>
      </div>

      {/* </div> */}
    </section>
  )
}

export default TeacherDetail;
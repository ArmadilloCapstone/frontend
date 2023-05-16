import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from 'react-router-dom';

function TeacherDetail() {
  // let genderList = [{ value: "남자" }, { value: "여자" }];
  // const [selectedValue, setSelectedValue] = useState("남자");
  const [record, setRecord] = useState([
    {
      id: 1,
      name: "황수빈",
      phone_num: "010-2532-7535",
      gender: "여자",
      birth_date: "981211",
      class_name: "돌봄A반",
      class_id: "1"
    },
    {
      id: 2,
      name: "김정우",
      phone_num: "010-1234-5678",
      gender: "남자",
      birth_date: "980219",
      class_name: "돌봄A반",
      class_id: "1"
    },
    {
      id: 3,
      name: "이태영",
      phone_num: "010-1111-2222",
      gender: "남자",
      birth_date: "800512",
      class_name: "돌봄A반",
      class_id: "1"
    },
    {
      id: 4,
      name: "박영인",
      phone_num: "010-3333-4444",
      gender: "여자",
      birth_date: "760115",
      class_name: "돌봄A반",
      class_id: "1"
    }
  ]);

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
    await axios.post('/teacher')
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
    await axios.post('/teacher', user);
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
      <div className="container" style={{ width: "1200px" }}>
        <div className="my-3">
          <p class="mb-5" style={{ fontSize: "40px", fontWeight: "bold" }}>돌봄교사 관리</p>
          <div class="row mt-3" style={{ width: "100%", textAlign: "center" }}>
            <div class="col-sm-8">
              {/* <h4 class="text-center mt-4 mb-4" style={{ width: "1200px" }}>돌봄교사 리스트</h4> */}

              <table class="table table-hover table-striped table-bordered" style={{ width: "1200px" }}>
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>연락처</th>
                    <th>성별</th>
                    <th>생년월일</th>
                    <th>돌봄 반 이름</th>
                    <th>돌봄 반 ID</th>
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
                        <a className="text-danger mr-2"
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

          <div class="col-sm-4" style={{ width: "100%", textAlign: "center" }}>
            <div className="box p-3 mb-3 mt-3" style={{ border: "1px solid #d0d0d0", height: "100%", width: "700px", margin: "auto" }}>
              <form onSubmit={submitTeacherRecord}>
                <h5 className="mb-3 ">추가할 돌봄교사의 정보를 입력하세요.</h5>
                <div class="form-group">
                  <input type="text" class="form-control  mb-4" name="name" value={name} onChange={e => onInputChange(e)} placeholder="이름을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="phone_num" value={phone_num} onChange={e => onInputChange(e)} placeholder="연락처를 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="gender" value={gender} onChange={e => onInputChange(e)} placeholder="성별을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="birth_date" value={birth_date} onChange={e => onInputChange(e)} placeholder="생년월일을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="class_name" value={class_name} onChange={e => onInputChange(e)} placeholder="담당 돌봄 반 이름을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="class_id" value={class_id} onChange={e => onInputChange(e)} placeholder="담당 돌봄 반 ID를 입력하세요." required="" />
                </div>

                <div style={{ width: "100%", textAlign: "center" }}>
                  <button type="submit" class="btn btn-primary btn-block mt-2">추가</button>
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
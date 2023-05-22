import '../adminPages.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function StudentDetail() {
  const [record, setRecord] = useState([]);

  const [user, setUser] = useState({
    id: 0,
    name: "",
    grade: null,
    phone_num: "",
    gender: "",
    class_id: null,
    original_class_num: null,
    birth_date: ""
  });

  //  Object Destructuring 
  const { name, grade, phone_num, gender, class_id, original_class_num, birth_date } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // On Page load display all records 
  const loadStudentDetail = async () => {
    await axios.post('http://localhost:8080/student') // student와 parent를 연결해서 어떻게 데이터를 가져오는 거지? db 쿼리로 처리하는 건가?
      .then(function (response) {
        setRecord(response.data.map(function (el, idx) {
          console.log(el);

          var returnObj = {}
          returnObj['id'] = el.id;
          returnObj['name'] = el.name;
          returnObj['grade'] = el.grade;
          returnObj['phone_num'] = el.phone_num;
          returnObj['gender'] = el.gender;
          // returnObj['class_id'] = el.class_id;
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

  // Insert Student Records 
  const submitStudentRecord = async (e) => {
    e.preventDefault();
    e.target.reset();
    await axios.post("http://localhost:8080/student_submit", user);
    alert('추가되었습니다!');

    loadStudentDetail();
  };

  // Delete Student Record
  const deleteRecord = (productId) => {
    axios.delete(`/student/${productId}`)
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
                      "'" + name.class_name + "'" + " 학급을 정말 삭제하시겠습니까?"
                    )
                    if (confirmBox === true) {
                      deleteRecord(name.id)
                    }
                  }}>삭제</button>
                {/* <a className="text-danger mr-2"
                  onClick={() => {
                    const confirmBox = window.confirm(
                      "'" + name.name + "'" + " 돌봄학생을 정말 삭제하시겠습니까?"
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


      {/* <div class="col-sm-4" style={{ width: "100%", textAlign: "center" }}>
            <div className="box p-3 mb-3 mt-3" style={{ border: "1px solid #d0d0d0", height: "100%", width: "700px", margin: "auto" }}>
              <form onSubmit={submitStudentRecord}>
                <h5 className="mb-3 ">추가할 돌봄학생의 정보를 입력하세요.</h5>
                <div class="form-group">
                  <input type="text" class="form-control  mb-4" name="name" value={name} onChange={e => onInputChange(e)} placeholder="이름을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="grade" value={grade} onChange={e => onInputChange(e)} placeholder="학년을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="phone_num" value={phone_num} onChange={e => onInputChange(e)} placeholder="연락처를 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="gender" value={gender} onChange={e => onInputChange(e)} placeholder="성별을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control  mb-4" name="class_id" value={class_id} onChange={e => onInputChange(e)} placeholder="돌봄 반을 입력하세요." required="" />
                </div>
                
                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="original_class_num" value={original_class_num} onChange={e => onInputChange(e)} placeholder="기존 반을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control  mb-4" name="birth_date" value={birth_date} onChange={e => onInputChange(e)} placeholder="생년월일을 입력하세요." required="" />
                </div>

                <div style={{ width: "100%", textAlign: "center" }}>
                  <button type="submit" class="btn btn-primary btn-block mt-2">추가</button>
                </div>
              </form>
            </div>
          </div> */}

    </section >
  )
}

export default StudentDetail;
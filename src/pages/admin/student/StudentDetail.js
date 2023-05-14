import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function StudentDetail() {
  const [record, setRecord] = useState([
    {
        name: "김예지",
        gender: "여자",
        grade: "1",
        original_class_num: "2",
        class_id: "1"
    },
    {
        name: "이아름",
        gender: "여자",
        grade: "2",
        original_class_num: "1",
        class_id: "1"
    },
    {
        name: "하현우",
        gender: "남자",
        grade: "3",
        original_class_num: "3",
        class_id: "1"
    }
  ]);

  const [user, setUser] = useState({
    name: "",
    gender: "",
    grade: "",
    original_class_num: "",
    class_id: ""
  });

  //  Object Destructuring 
  const { name, gender, grade, original_class_num, class_id } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // On Page load display all records 
  const loadStudentDetail = async () => {
    await axios.post('/student') // student와 parent를 연결해서 어떻게 데이터를 가져오는 거지? db 쿼리로 처리하는 건가?
        .then(function(response){
          setRecord(response.data.map(function(el, idx){
            console.log(el);

            var returnObj = {}
            returnObj['name'] = el.name;
            returnObj['gender'] = el.gender;
            returnObj['grade'] = el.grade;
            returnObj['original_class_num'] = el.original_class_num;
            returnObj['class_id'] = el.class_id;
            
            return returnObj;
          }));
        }).catch(function(reason){
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
    await axios.post("/student", user);
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
    <section>

      <div class="container">
        <h2 className="mb-10 mt-3">돌봄학생 관리</h2>
        <div class="row mt-3">
          <div class="col-sm-8">
            <h4 class="text-center mt-4 mb-4" style={{width: "1200px"}}>돌봄학생 리스트</h4>

            <table class="table table-hover table-striped table-bordered" style={{width: "1200px"}}>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>성별</th>
                  <th>학년</th>
                  <th>기존 반</th>
                  <th>돌봄 반</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {record.map((name) =>
                  <tr>
                    <td>{name.name}</td>
                    <td>{name.gender}</td>
                    <td>{name.grade}</td>
                    <td>{name.original_class_num}</td>
                    <td>{name.class_id}</td>
                    <td>
                      <a className="text-danger mr-2"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "'" + name.name + "'" + " 돌봄학생을 정말 삭제하시겠습니까?"
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

        <div class="col-sm-4">
            <div className="box p-3 mb-3 mt-3" style={{ border: "1px solid #d0d0d0", height: "100%", width: "1200px", margin: "auto" }}>
              <form onSubmit={submitStudentRecord}>
                <h5 className="mb-3 ">추가할 돌봄학생의 정보를 입력하세요.</h5>
                <div class="form-group">
                  <input type="text" class="form-control  mb-4" name="name" value={name} onChange={e => onInputChange(e)} placeholder="이름을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="gender" value={gender} onChange={e => onInputChange(e)} placeholder="성별을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="grade" value={grade} onChange={e => onInputChange(e)} placeholder="학년을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="original_class_num" value={original_class_num} onChange={e => onInputChange(e)} placeholder="기존 반을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control  mb-4" name="class_id" value={class_id} onChange={e => onInputChange(e)} placeholder="돌봄 반을 입력하세요." required="" />
                </div>

                <div style={{width: "100%", textAlign: "center"}}>
                <button type="submit" class="btn btn-primary btn-block mt-2">추가</button>
                </div>
              </form>
            </div>
          </div>

      </div>
    </section>
  )
}

export default StudentDetail;
import '../adminPages.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function ParentDetail() {
  const [record, setRecord] = useState([]);

  const [user, setUser] = useState({
    id: 0,
    name: "",
    phone_num: "",
    gender: "",
    birth_date: "",
    child_name: "",
    child_id: null
  });

  //  Object Destructuring 
  const { name, phone_num, gender, birth_date, child_name, child_id } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // On Page load display all records 
  const loadParentDetail = async () => {
    await axios.post('http://13.209.104.24:8080/parent')
      .then(function (response) {
        setRecord(response.data.map(function (el, idx) {
          console.log(el);

          var returnObj = {}
          returnObj['id'] = el.id;
          returnObj['name'] = el.name;
          returnObj['phone_num'] = el.phone_num;
          returnObj['gender'] = el.gender;
          returnObj['birth_date'] = el.birth_date;
          returnObj['child_name'] = el.child_name;
          // returnObj['child_id'] = el.child_id;

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
    loadParentDetail();
  }, []);

  // Insert Parent Records 
  const submitParentRecord = async (e) => {
    e.preventDefault();
    e.target.reset();
    await axios.post('http://13.209.104.24:8080/parent_submit', user);
    alert('추가되었습니다!');

    loadParentDetail();
  };

  // Delete Parent Record
  const deleteRecord = (productId) => {
    axios.delete(`/parent/${productId}`)
      .then((result) => {
        loadParentDetail();
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
            <th class="admin">학생 이름</th>
            {/* <th>학생 ID</th> */}
            <th class="admin">Action</th>
          </tr>
        </thead>
        <tbody>

          {record.map((name) =>
            <tr class="admin">
              <td class="admin">{name.name}</td>
              <td class="admin">{name.phone_num}</td>
              <td class="admin">{name.gender}</td>
              <td class="admin">{name.birth_date}</td>
              <td class="admin">{name.child_name}</td>
              {/* <td>{name.child_id}</td> */}
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
                      "'" + name.name + "'" + " 학부모를 정말 삭제하시겠습니까?"
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
              <form onSubmit={submitParentRecord}>
                <h5 className="mb-3 ">추가할 학부모의 정보를 입력하세요.</h5>
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
                  <input type="text" class="form-control  mb-4" name="birth_date" value={birth_date} onChange={e => onInputChange(e)} placeholder="생년월일을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="child_name" value={child_name} onChange={e => onInputChange(e)} placeholder="학생 이름을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="child_id" value={child_id} onChange={e => onInputChange(e)} placeholder="학생 ID를 입력하세요." required="" />
                </div>
                
                <div style={{ width: "100%", textAlign: "center" }}>
                  <button type="submit" class="btn btn-primary btn-block mt-2">추가</button>
                </div>
              </form>
            </div>
          </div> */}


    </section>
  )
}

export default ParentDetail;
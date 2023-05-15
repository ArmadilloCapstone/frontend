import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function ParentDetail() {
  const [record, setRecord] = useState([
    {
      name: "김부모",
      phone_num: "010-2532-7535",
      child_id: "1"
    },
    {
      name: "이부모",
      phone_num: "010-2532-7535",
      child_id: "2"
    },
    {
      name: "하부모",
      phone_num: "010-1111-2222",
      child_id: "3"
    }
  ]);

  const [user, setUser] = useState({
    id: 0,
    name: "",
    phone_num: "",
    child_id: ""
  });

  //  Object Destructuring 
  const { name, phone_num, child_id } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // On Page load display all records 
  const loadParentDetail = async () => {
    await axios.post('/parent')
      .then(function (response) {
        setRecord(response.data.map(function (el, idx) {
          console.log(el);

          var returnObj = {}
          returnObj['id'] = el.id;
          returnObj['name'] = el.name;
          returnObj['phone_num'] = el.phone_num;
          returnObj['child_id'] = el.child_id;

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
    await axios.post('/parent', user);
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
    <section>

      <div className="container" style={{ width: "1200px" }}>
        <div className="my-3">
          <p className="titletag">학부모 관리</p>
          <div class="row mt-3" style={{ width: "100%", textAlign: "center" }}>
            <div class="col-sm-8">
              {/* <h4 class="text-center mt-4 mb-4" style={{ width: "1200px" }}>학부모 리스트</h4> */}

              <table class="table table-hover table-striped table-bordered" style={{ width: "1200px" }}>
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>연락처</th>
                    <th>학생</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>

                  {record.map((name) =>
                    <tr>
                      <td>{name.name}</td>
                      <td>{name.phone_num}</td>
                      <td>{name.child_id}</td>
                      <td>
                        <a className="text-danger mr-2"
                          onClick={() => {
                            const confirmBox = window.confirm(
                              "'" + name.name + "'" + " 학부모를 정말 삭제하시겠습니까?"
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
              <form onSubmit={submitParentRecord}>
                <h5 className="mb-3 ">추가할 학부모의 정보를 입력하세요.</h5>
                <div class="form-group">
                  <input type="text" class="form-control  mb-4" name="name" value={name} onChange={e => onInputChange(e)} placeholder="학부모 이름을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="phone_num" value={phone_num} onChange={e => onInputChange(e)} placeholder="학부모 연락처를 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="child_id" value={child_id} onChange={e => onInputChange(e)} placeholder="학생을 입력하세요." required="" />
                </div>

                <div style={{ width: "100%", textAlign: "center" }}>
                  <button type="submit" class="btn btn-primary btn-block mt-2">추가</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default ParentDetail;
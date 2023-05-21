import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import './ClassDetail.css';

function ClassDetail() {
  const [record, setRecord] = useState([]);

  const [user, setUser] = useState({
    id: 0,
    class_name: "",
    class_num: "",
    year_seme: ""
  });

  //  Object Destructuring 
  const { class_name, class_num, year_seme } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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
    await axios.post('/dolbom_class_submit', user);
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
    <section>

      <div className="Ccontainer" >
        <div className="Cmy-3">
          <p className="Cmb-5">돌봄학급 관리</p>
          <div className="Cmt-3">
              <table className="Ctable">
                <thead className="Cthead">
                    <th>학급 이름</th>
                    <th>학급 번호</th>
                    <th>연도-학기</th>
                    <th>Action</th>
                </thead>
                  {record.map((name) =>
                    <tr>
                      <td>{name.class_name}</td>
                      <td>{name.class_num}</td>
                      <td>{name.year_seme}</td>
                      <td>
                        <a className="text-danger Cmr-2"
                          onClick={() => {
                            const confirmBox = window.confirm(
                              "'" + name.class_name + "'" + " 학급을 정말 삭제하시겠습니까?"
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
              </table>
          </div>

          <div class="Csm-4">
            <div className="Cmainbox Cmt-3">
              <form onSubmit={submitClassRecord}>
                <h5 className="Cmb-3 ">추가하실 돌봄학급의 정보를 입력하세요.</h5>
                <div>
                  <input type="text" class="Cmb-4" name="class_name" value={class_name} onChange={e => onInputChange(e)} placeholder="학급 이름을 입력하세요." required="" />
                </div>

                <div>
                  <input type="text" class="Cmb-4" name="class_num" value={class_num} onChange={e => onInputChange(e)} placeholder="학급 번호를 입력하세요." required="" />
                </div>

                <div>
                  <input type="text" class="Cmb-4" name="year_seme" value={year_seme} onChange={e => onInputChange(e)} placeholder="연도-학기를 입력하세요." required="" />
                </div>

                <div style={{ width: "100%", textAlign: "center", marginLeft: "-40px", marginTop: "60px"}}>
                  <button type="submit" class="btn Cbtn-primary Cmt-2">돌봄학급 추가</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default ClassDetail;
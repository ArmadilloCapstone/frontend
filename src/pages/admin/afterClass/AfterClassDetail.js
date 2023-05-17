import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function AfterClassDetail() {
  const [record, setRecord] = useState([
    {
      class_name: "종이접기A",
      start_time: "14:00",
      end_time: "16:00",
      day: "1(월)"
    },
    {
        class_name: "종이접기B",
        start_time: "14:00",
        end_time: "16:00",
        day: "3(수)"
    },
    {
        class_name: "중국어A",
        start_time: "13:00",
        end_time: "15:00",
        day: "2(화)"
      },
      {
          class_name: "중국어B",
          start_time: "13:00",
          end_time: "15:00",
          day: "5(금)"
      },
  ]);

  const [user, setUser] = useState({
    id: 0,
    class_name: "",
    start_time: "",
    end_time: "",
    day: null
  });

  //  Object Destructuring 
  const { class_name, start_time, end_time, day } = user;
  const onInputChange = e => {
    if(e.target.day === "월"){
        return e.target.day === 1
    }
    else if(e.target.day === "화"){
        return e.target.day === 2
    }
    else if(e.target.day === "수"){
        return e.target.day === 3
    }
    else if(e.target.day === "목"){
        return e.target.day === 4
    }
    else if(e.target.day === "금"){
        return e.target.day === 5
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // On Page load display all records 
  const loadAfterClassDetail = async () => {
    await axios.post('/after_school_class')
        .then(function(response){
          setRecord(response.data.map(function(el, idx){
            console.log(el);

            var returnObj = {}
            returnObj['id'] = el.id;
            returnObj['class_name'] = el.class_name;
            returnObj['start_time'] = el.start_time;
            returnObj['end_time'] = el.end_time;
            if(el.day === 1) {
                returnObj['day'] = "월";
            }
            else if(el.day === 2) {
                returnObj['day'] = "화";
            }
            else if(el.day === 3) {
                returnObj['day'] = "수";
            }
            else if(el.day === 4) {
                returnObj['day'] = "목";
            }
            else if(el.day === 5) {
                returnObj['day'] = "금";
            }
            
            return returnObj;
          }));
        }).catch(function(reason){
          console.log(reason);
        });
  }

  useEffect(() => {
    loadAfterClassDetail();
  }, []);

  // Insert After Class Records 
  const submitAfterClassRecord = async (e) => {
    e.preventDefault();
    e.target.reset();
    
    await axios.post('/after_school_class_submit', user);
    alert('추가되었습니다!');

    loadAfterClassDetail();
  };

  // Delete After Class Record
  const deleteRecord = (productId) => {
    axios.delete(`/parent/${productId}`)
      .then((result) => {
        loadAfterClassDetail();
      })
      .catch(() => {
        alert('오류가 발생했습니다!');
      });
  };

  return (
    <section>

<div className="container" style={{ width: "1200px" }}>
        <div className="my-3">
          <p class="mb-5"style={{ fontSize: "40px", fontWeight: "bold" }}>방과후수업 관리</p>
          <div class="row mt-3" style={{ width: "100%", textAlign: "center" }}>
          <div class="col-sm-8">
            {/* <h4 class="text-center mt-4 mb-4" style={{width: "1200px"}}>방과후수업 리스트</h4> */}

            <table class="table table-hover table-striped table-bordered" style={{width: "1200px"}}>
              <thead>
                <tr>
                  <th>수업 이름</th>
                  <th>시작 시간</th>
                  <th>종료 시간</th>
                  <th>요일</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {record.map((name) =>
                  <tr>
                    <td>{name.class_name}</td>
                    <td>{name.start_time}</td>
                    <td>{name.end_time}</td>
                    <td>{name.day}</td>
                    <td>
                      <a className="text-danger mr-2"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "'" + name.name + "'" + " 방과후수업을 정말 삭제하시겠습니까?"
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

        <div class="col-sm-4" style={{width: "100%", textAlign: "center"}}>
            <div className="box p-3 mb-3 mt-3" style={{ border: "1px solid #d0d0d0", height: "100%", width: "700px", margin: "auto" }}>
              <form onSubmit={submitAfterClassRecord}>
                <h5 className="mb-3 ">추가할 방과후수업의 정보를 입력하세요.</h5>
                <div class="form-group">
                  <input type="text" class="form-control  mb-4" name="class_name" value={class_name} onChange={e => onInputChange(e)} placeholder="방과후수업 이름을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="start_time" value={start_time} onChange={e => onInputChange(e)} placeholder="시작 시간을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="end_time" value={end_time} onChange={e => onInputChange(e)} placeholder="종료 시간을 입력하세요." required="" />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" name="day" value={day} onChange={e => onInputChange(e)} placeholder="요일을 입력하세요." required="" />
                </div>

                <div style={{width: "100%", textAlign: "center"}}>
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

export default AfterClassDetail;
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentScheduleDetail() {
    const [record, setRecord] = useState([
        {
            name: "가가가",
            student_id: "20230001",
            class_name: "종이접기A",
            class_id: "1"
        },
        {
            name: "가가가",
            student_id: "20230001",
            class_name: "종이접기B",
            class_id: "2"
        },
        {
            name: "나나나",
            student_id: "20230002",
            class_name: "중국어A",
            class_id: "3"
        },
        {
            name: "나나나",
            student_id: "20230002",
            class_name: "중국어B",
            class_id: "4"
        }
    ]);

    const [user, setUser] = useState({
        id: 0,
        name: "",
        student_id: "",
        class_name: "",
        class_id: null
    });

    //  Object Destructuring 
    const { name, student_id, class_name, class_id } = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // On Page load display all records 
    const loadStudentScheduleDetail = async () => {
        await axios.post('/student_schedule')
            .then(function (response) {
                setRecord(response.data.map(function (el, idx) {
                    console.log(el);

                    var returnObj = {}
                    returnObj['id'] = el.id;
                    returnObj['name'] = el.name;
                    returnObj['student_id'] = el.student_id;
                    returnObj['class_name'] = el.class_name;
                    returnObj['class_id'] = el.class_id;

                    return returnObj;
                }));
            }).catch(function (reason) {
                console.log(reason);
            });
    }

    useEffect(() => {
        loadStudentScheduleDetail();
    }, []);

    // Insert Student Schedule Records 
    const submitStudentScheduleRecord = async (e) => {
        e.preventDefault();
        e.target.reset();
        await axios.post('/student_schedule', user);
        alert('추가되었습니다!');

        loadStudentScheduleDetail();
    };

    // Delete Parent Record
    const deleteRecord = (productId) => {
        axios.delete(`/student_schedule/${productId}`)
            .then((result) => {
                loadStudentScheduleDetail();
            })
            .catch(() => {
                alert('오류가 발생했습니다!');
            });
    };

    return (
        <section>

            <div className="container" style={{ width: "1200px" }}>
                <div className="my-3">
                    <p class="mb-5"style={{ fontSize: "40px", fontWeight: "bold" }}>학생 시간표 관리</p>
                    <div class="row mt-3" style={{ width: "100%", textAlign: "center" }}>
                        <div class="col-sm-8">
                            {/* <h4 class="text-center mt-4 mb-4" style={{ width: "1200px" }}>학생 시간표 리스트</h4> */}

                            <table class="table table-hover table-striped table-bordered" style={{ width: "1200px" }}>
                                <thead>
                                    <tr>
                                        <th>학생 이름</th>
                                        <th>학생 ID</th>
                                        <th>방과후수업 이름</th>
                                        <th>방과후수업 ID</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {record.map((name) =>
                                        <tr>
                                            <td>{name.name}</td>
                                            <td>{name.student_id}</td>
                                            <td>{name.class_name}</td>
                                            <td>{name.class_id}</td>
                                            <td>
                                                <a className="text-danger mr-2"
                                                    onClick={() => {
                                                        const confirmBox = window.confirm(
                                                            "'" + name.name + "'" + " 학생의 시간표를 정말 삭제하시겠습니까?"
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
                            <form onSubmit={submitStudentScheduleRecord}>
                                <h5 className="mb-3 ">추가할 학생 시간표의 정보를 입력하세요.</h5>
                                <div class="form-group">
                                    <input type="text" class="form-control  mb-4" name="name" value={name} onChange={e => onInputChange(e)} placeholder="학생 이름을 입력하세요." required="" />
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control mb-4" name="sudent_id" value={student_id} onChange={e => onInputChange(e)} placeholder="학생 ID를 입력하세요." required="" />
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control mb-4" name="class_name" value={class_name} onChange={e => onInputChange(e)} placeholder="방과후수업 이름을 입력하세요." required="" />
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control mb-4" name="class_id" value={class_id} onChange={e => onInputChange(e)} placeholder="방과후수업 ID를 입력하세요." required="" />
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

export default StudentScheduleDetail;
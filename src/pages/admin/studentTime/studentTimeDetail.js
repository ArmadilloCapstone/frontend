import '../adminPages.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentTimeDetail() {
    const [record, setRecord] = useState([]);

    const [user, setUser] = useState({
        id: 0,
        name: "",
        entry_1: "",
        off_1: "",
        entry_2: "",
        off_2: "",
        entry_3: "",
        off_3: "",
        entry_4: "",
        off_4: "",
        entry_5: "",
        off_5: ""
    });

    //  Object Destructuring 
    const { student_id, entry_1, off_1, entry_2, off_2, entry_3, off_3, entry_4, off_4, entry_5, off_5 } = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // On Page load display all records 
    const loadStudentTimeDetail = async () => {
        await axios.post('/student_time') // student와 parent를 연결해서 어떻게 데이터를 가져오는 거지? db 쿼리로 처리하는 건가?
            .then(function (response) {
                setRecord(response.data.map(function (el, idx) {
                    console.log(el);

                    var returnObj = {}
                    returnObj['name'] = el.name;
                    returnObj['student_id'] = el.student_id;
                    returnObj['entry_1'] = el.entry_1;
                    returnObj['off_1'] = el.off_1;
                    returnObj['entry_2'] = el.entry_2;
                    returnObj['off_2'] = el.off_2;
                    returnObj['entry_3'] = el.entry_3;
                    returnObj['off_3'] = el.off_3;
                    returnObj['entry_4'] = el.entry_4;
                    returnObj['off_4'] = el.off_4;
                    returnObj['entry_5'] = el.entry_5;
                    returnObj['off_5'] = el.off_5;

                    return returnObj;
                }));
            }).catch(function (reason) {
                console.log(reason);
            });

    }
    useEffect(() => {
        loadStudentTimeDetail();
    }, []);

    // Insert Student Records 
    const submitStudentTimeRecord = async (e) => {
        e.preventDefault();
        e.target.reset();
        await axios.post("/student_time_submit", user);
        alert('추가되었습니다!');

        loadStudentTimeDetail();
    };

    // Delete Student Record
    const deleteRecord = (productId) => {
        axios.delete(`/student_time/${productId}`)
            .then((result) => {
                loadStudentTimeDetail();
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
                        <th class="admin">월(입)</th>
                        <th class="admin">월(퇴)</th>
                        <th class="admin">화(입)</th>
                        <th class="admin">화(퇴)</th>
                        <th class="admin">수(입)</th>
                        <th class="admin">수(퇴)</th>
                        <th class="admin">목(입)</th>
                        <th class="admin">목(퇴)</th>
                        <th class="admin">금(입)</th>
                        <th class="admin">금(퇴)</th>
                        <th class="admin">Action</th>
                    </tr>
                </thead>
                <tbody class="admin">

                    {record.map((name) =>
                        <tr class="admin">
                            <td class="admin">{name.name}</td>
                            <td class="admin">{name.entry_1}</td>
                            <td class="admin">{name.off_1}</td>
                            <td class="admin">{name.entry_2}</td>
                            <td class="admin">{name.off_2}</td>
                            <td class="admin">{name.entry_3}</td>
                            <td class="admin">{name.off_3}</td>
                            <td class="admin">{name.entry_4}</td>
                            <td class="admin">{name.off_4}</td>
                            <td class="admin">{name.entry_5}</td>
                            <td class="admin">{name.off_5}</td>
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
                                            "'" + name.name + "'" + "의 입퇴실 시간을 정말 삭제하시겠습니까?"
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
                            <form onSubmit={submitStudentTimeRecord}>
                                <h5 className="mb-3 ">추가할 학생 입퇴실 시간 정보를 입력하세요.</h5>
                                <div class="form-group">
                                    <input type="text" class="form-control  mb-4" name="student_id" value={student_id} onChange={e => onInputChange(e)} placeholder="학생 ID를 입력하세요." required="" />
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control mb-4" name="entry_1" value={entry_1} onChange={e => onInputChange(e)} placeholder="월요일 입실 시간을 입력하세요." required="" />
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control mb-4" name="off_1" value={off_1} onChange={e => onInputChange(e)} placeholder="월요일 퇴실 시간을 입력하세요." required="" />
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control mb-4" name="entry_2" value={entry_2} onChange={e => onInputChange(e)} placeholder="화요일 입실 시간을 입력하세요." required="" />
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control mb-4" name="off_2" value={off_2} onChange={e => onInputChange(e)} placeholder="화요일 퇴실 시간을 입력하세요." required="" />
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control mb-4" name="entry_3" value={entry_3} onChange={e => onInputChange(e)} placeholder="수요일 입실 시간을 입력하세요." required="" />
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control mb-4" name="off_3" value={off_3} onChange={e => onInputChange(e)} placeholder="수요일 퇴실 시간을 입력하세요." required="" />
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control mb-4" name="entry_4" value={entry_4} onChange={e => onInputChange(e)} placeholder="목요일 입실 시간을 입력하세요." required="" />
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control mb-4" name="off_4" value={off_4} onChange={e => onInputChange(e)} placeholder="목요일 퇴실 시간을 입력하세요." required="" />
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control mb-4" name="entry_5" value={entry_5} onChange={e => onInputChange(e)} placeholder="금요일 입실 시간을 입력하세요." required="" />
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control mb-4" name="off_5" value={off_5} onChange={e => onInputChange(e)} placeholder="금요일 퇴실 시간을 입력하세요." required="" />
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

export default StudentTimeDetail;
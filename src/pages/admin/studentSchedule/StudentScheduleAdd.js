import '../addPages.css'
import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentScheduleAdd() {
    const [student, setStudent] = useState([]);
    const [afterClass, setAfterClass] = useState([]);


    useEffect(() => {
        axios.post('http://localhost:80/student_schedule/studentList') // url 모름.. 변경 필요할듯
            .then(function (response) {
                console.log(response.data);
                setStudent(response.data.map(function (el, idx) {
                    var returnObj = {}
                    returnObj['student_id'] = el.student_id;
                    returnObj['name'] = el.name;
                    return returnObj;
                }));
            }).catch(function (reason) {
                console.log(reason);
            });
    }, []);

    useEffect(() => {
        axios.post('http://localhost:80/student_schedule/AfterSchoolClassList') // url 모름.. 변경 필요할듯
            .then(function (response) {
                console.log(response.data);
                setAfterClass(response.data.map(function (el, idx) {
                    var returnObj = {}
                    returnObj['class_id'] = el.class_id;
                    returnObj['class_name'] = el.class_name;
                    returnObj['day'] = el.day;
                    return returnObj;
                }));
            }).catch(function (reason) {
                console.log(reason);
            });
    }, []);

    const [user, setUser] = useState({
        id: 0,
        name: "",
        class_name: "",
        student_id: null,
        class_id: null,
        day: ""
    });

    //  Object Destructuring 
    const { student_id, class_id } = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    function onInputChange_Select(e, selectIdName) {
        var selectInput = document.getElementById(selectIdName);
        var value = (selectInput.options[selectInput.selectedIndex].value);
        setUser({ ...user, [e.target.name]: value });
    };

    // Insert Student Schedule Records 
    const submitStudentScheduleRecord = async (e) => {
        e.preventDefault();
        e.target.reset();
        await axios.post('http://localhost:80/student_schedule_submit', user)
            .then(function (response) {
                console.log(response.data);
                if (response.data === "success") {
                    alert('추가되었습니다!');
                }
                else {
                    alert('잘못 입력된 값이 존재합니다!');
                }

            }).catch(function (reason) {
                console.log(reason.data);
            });
        onReset();
    };

    const onReset = () => {
        setUser({
            id: 0,
            name: "",
            class_name: "",
            student_id: null,
            class_id: null
        });
    };

    return (
        <div class="wrapper">
            <div class="form_container">
                <form name="form" onSubmit={submitStudentScheduleRecord}>
                    <div class="heading">
                        <h2>학생 시간표 추가</h2>
                    </div>

                    <div class="form_wrap" select_box>
                        <div class="form_item">
                            <label class="select">학생 이름</label>
                            <select id="student_id" name="student_id" onChange={e => onInputChange_Select(e, "student_id")} required>
                                <option value="" selected>학생 이름을 선택하세요.</option>
                                {student.map((option) => (
                                    <option
                                        key={option.student_id}
                                        value={option.student_id}
                                    >
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div class="form_wrap" select_box>
                        <div class="form_item">
                            <label class="select">방과후수업 이름</label>
                            <select id="class_id" name="class_id" value={class_id} onChange={e => onInputChange_Select(e, "class_id")} required>
                                <option value="" selected>방과후수업 이름을 선택하세요.</option>
                                {afterClass.map((option) => (
                                    <option
                                        key={option.class_id}
                                        value={option.class_id}
                                    >
                                        {option.class_name}{'('}{option.day}{')'}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <button type="submit" class="add">추가하기</button>
                    </div>
                </form>

            </div >
        </div >

        // <div class="col-sm-4" style={{ width: "100%", textAlign: "center" }}>
        //     <div className="box p-3 mb-3 mt-3" style={{ border: "1px solid #d0d0d0", height: "100%", width: "700px", margin: "auto" }}>
        // <form onSubmit={submitStudentScheduleRecord} style={{ width: "100%", textAlign: "center" }}>
        //     <h5 className="mb-3 ">추가할 학생 시간표의 정보를 입력하세요.</h5>

        //     <select id="name" name="name" onChange={e => onInputChange_Select(e, "name")} required>
        //         <option value="" selected>학생 이름을 입력하세요.</option>
        //         {student.map((option) => (
        //             <option
        //                 key={option.name}
        //                 value={option.name}
        //             >
        //                 {option.name}
        //             </option>
        //         ))}
        //     </select>

        //     <select id="class_name" name="class_name" className="custom-select d-block w-100" onChange={e => onInputChange_Select(e, "class_name")} required>
        //         <option value="" selected>방과후수업 이름을 입력하세요.</option>
        //         {afterClass.map((option) => (
        //             <option
        //                 key={option.class_name}
        //                 value={option.class_name}
        //             >
        //                 {option.class_name}
        //             </option>
        //         ))}
        //     </select>

        //     <div style={{ width: "100%", textAlign: "center" }}>
        //         <button type="submit" class="btn btn-primary btn-block mt-2">추가</button>
        //     </div>
        // </form>
        //     </div>
        // </div>

    )
}

export default StudentScheduleAdd;
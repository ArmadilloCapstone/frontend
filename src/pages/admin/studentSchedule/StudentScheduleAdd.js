import '../addPages.css'
import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentScheduleAdd() {
    const [student, setStudent] = useState([]);
    const [afterClass, setAfterClass] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:80/ student_schedule/studentList') // url 모름.. 변경 필요할듯
            .then(function (response) {
                console.log(response.data);
                setStudent(response.data.map(function (el, idx) {
                    var returnObj = {}
                    returnObj['name'] = el.name;
                    return returnObj;
                }));
            }).catch(function (reason) {
                console.log(reason);
            });
    }, []);

    useEffect(() => {
        axios.post('http://localhost:80/ student_schedule/AfterSchoolClassList') // url 모름.. 변경 필요할듯
            .then(function (response) {
                console.log(response.data);
                setAfterClass(response.data.map(function (el, idx) {
                    var returnObj = {}
                    returnObj['class_name'] = el.class_name;
                    return returnObj;
                }));
            }).catch(function (reason) {
                console.log(reason);
            });
    }, []);

    const [user, setUser] = useState({
        id: 0,
        name: "",
        class_name: ""
    });

    //  Object Destructuring 
    const { name, class_name } = user;
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
        await axios.post('http://localhost:80/ student_schedule_submit', user);
        alert('추가되었습니다!');

        // loadStudentScheduleDetail();
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
                            <select id="name" name="name" onChange={e => onInputChange_Select(e, "name")} required>
                                <option value="" selected>학생 이름을 선택하세요.</option>
                                {student.map((option) => (
                                    <option
                                        key={option.name}
                                        value={option.name}
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
                            <select id="class_name" name="class_name" onChange={e => onInputChange_Select(e, "class_name")} required>
                                <option value="" selected>방과후수업 이름을 선택하세요.</option>
                                {afterClass.map((option) => (
                                    <option
                                        key={option.class_name}
                                        value={option.class_name}
                                    >
                                        {option.class_name}
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
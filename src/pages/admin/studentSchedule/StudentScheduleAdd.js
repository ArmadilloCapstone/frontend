import '../addPages.css'
import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentScheduleAdd() {
    const [student, setStudent] = useState([]);
    const [afterClass, setAfterClass] = useState([]);

    useEffect(() => {
        axios.post('http://dolbomi.site/student_schedule/studentList') 
            .then(function (response) {
                console.log(response.data);
                setStudent(response.data.map(function (el, idx) {
                    var returnObj = {}
                    returnObj['student_id'] = el.id;
                    returnObj['name'] = el.name;
                    return returnObj;
                }));
            }).catch(function (reason) {
                console.log(reason);
            });
    }, []);

    useEffect(() => {
        axios.post('http://dolbomi.site/student_schedule/AfterSchoolClassList') 
            .then(function (response) {
                console.log(response.data);
                setAfterClass(response.data.map(function (el, idx) {
                    var returnObj = {}
                    returnObj['class_id'] = el.id;
                    returnObj['class_name'] = el.class_name;
                    returnObj['day'] = el.day;
                    return returnObj;
                }));
            }).catch(function (reason) {
                console.log(reason);
            });
    }, []);

    const [user, setUser] = useState({
        student_id: null,
        class_id: null,
    });

    //  Object Destructuring 
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user)
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
        await axios.post('http://dolbomi.site/student_schedule_submit', user)
            .then(function (response) {
                console.log(response.data);
                if (response.data === "success") {
                    alert('추가되었습니다!');
                }
                else {
                    alert(response.data);
                }

            }).catch(function (reason) {
                console.log(reason.data);
            });
        onReset();
    };

    const onReset = () => {
        setUser({
            student_id: null,
            class_id: null
        });
    };

    console.log(student);

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
                            <select name="student_id" onChange={onInputChange} required>
                                <option value="" selected>학생 이름을 선택하세요.</option>
                                {student.map((option) => (
                                    <option
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
                            <select name="class_id" onChange={onInputChange} required>
                                <option value="" selected>방과후수업 이름을 선택하세요.</option>
                                {afterClass.map((option) => (
                                    <option
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
    )
}

export default StudentScheduleAdd;
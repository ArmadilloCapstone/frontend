import '../addPages.css'
import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentTimeAdd() {
    const [student, setStudent] = useState([]);

    useEffect(() => {
        axios.post('http://dolbomi.site/student_time/studentList')
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
    const { name, entry_1, off_1, entry_2, off_2, entry_3, off_3, entry_4, off_4, entry_5, off_5 } = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    function onInputChange_Select(e, selectIdName) {
        var selectInput = document.getElementById(selectIdName);
        var value = (selectInput.options[selectInput.selectedIndex].value);
        setUser({ ...user, [e.target.name]: value });
    };

    // Insert Student Records 
    const submitStudentTimeRecord = async (e) => {
        e.preventDefault();
        e.target.reset();
        await axios.post("http://dolbomi.site/student_time_submit", user)
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
    };

    return (
        <div class="wrapper">
            <div class="form_container">
                <form name="form" onSubmit={submitStudentTimeRecord}>
                    <div class="heading">
                        <h2>학생 입퇴실 시간 추가</h2>
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

                    <div class="form_wrap full">
                        <div class="form_item">
                            <label>월요일(입실시간)</label>
                            <input type="time" name="entry_1" value={entry_1} onChange={e => onInputChange(e)} placeholder="월요일 입실 시간을 입력하세요." required="" />
                        </div>
                        <div class="form_item">
                            <label>월요일(퇴실시간)</label>
                            <input type="time" name="off_1" value={off_1} onChange={e => onInputChange(e)} placeholder="월요일 퇴실 시간을 입력하세요." required="" />
                        </div>
                    </div>

                    <div class="form_wrap full">
                        <div class="form_item">
                            <label>화요일(입실시간)</label>
                            <input type="time" name="entry_2" value={entry_2} onChange={e => onInputChange(e)} placeholder="화요일 입실 시간을 입력하세요." required="" />
                        </div>
                        <div class="form_item">
                            <label>화요일(퇴실시간)</label>
                            <input type="time" name="off_2" value={off_2} onChange={e => onInputChange(e)} placeholder="화요일 퇴실 시간을 입력하세요." required="" />
                        </div>
                    </div>

                    <div class="form_wrap full">
                        <div class="form_item">
                            <label>수요일(입실시간)</label>
                            <input type="time" name="entry_3" value={entry_3} onChange={e => onInputChange(e)} placeholder="수요일 입실 시간을 입력하세요." required="" />
                        </div>
                        <div class="form_item">
                            <label>수요일(퇴실시간)</label>
                            <input type="time" name="off_3" value={off_3} onChange={e => onInputChange(e)} placeholder="수요일 퇴실 시간을 입력하세요." required="" />
                        </div>
                    </div>

                    <div class="form_wrap full">
                        <div class="form_item">
                            <label>목요일(입실시간)</label>
                            <input type="time" name="entry_4" value={entry_4} onChange={e => onInputChange(e)} placeholder="목요일 입실 시간을 입력하세요." required="" />
                        </div>
                        <div class="form_item">
                            <label>목요일(퇴실시간)</label>
                            <input type="time" name="off_4" value={off_4} onChange={e => onInputChange(e)} placeholder="목요일 퇴실 시간을 입력하세요." required="" />
                        </div>
                    </div>

                    <div class="form_wrap full">
                        <div class="form_item">
                            <label>금요일(입실시간)</label>
                            <input type="time" name="entry_5" value={entry_5} onChange={e => onInputChange(e)} placeholder="금요일 입실 시간을 입력하세요." required="" />
                        </div>
                        <div class="form_item">
                            <label>금요일(퇴실시간)</label>
                            <input type="time" name="off_5" value={off_5} onChange={e => onInputChange(e)} placeholder="금요일 퇴실 시간을 입력하세요." required="" />
                        </div>
                    </div>
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <button type="submit" class="add">추가하기</button>
                    </div>
                </form>

            </div>
        </div >
    )
}

export default StudentTimeAdd;
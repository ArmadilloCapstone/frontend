import '../addPages.css'
import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';

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

    // 경고 메시지 날리는 메소드
    function WarningSwal(message) {
        swal({
            title: message,
            icon: "warning",
            timer: 2000,
            dangerMode: true,
            button: "확인"
        })
    }

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

        if (document.getElementById('entry_1').value === '' || document.getElementById('off_1').value === '') {
            WarningSwal('월요일 입퇴실 시간을 제대로 입력하세요!');
            return false;
        }
        if (document.getElementById('entry_2').value === '' || document.getElementById('off_2').value === '') {
            WarningSwal('화요일 입퇴실 시간을 제대로 입력하세요!');
            return false;
        }
        if (document.getElementById('entry_3').value === '' || document.getElementById('off_3').value === '') {
            WarningSwal('수요일 입퇴실 시간을 제대로 입력하세요!');
            return false;
        }
        if (document.getElementById('entry_4').value === '' || document.getElementById('off_4').value === '') {
            WarningSwal('목요일 입퇴실 시간을 제대로 입력하세요!');
            return false;
        }
        if (document.getElementById('entry_5').value === '' || document.getElementById('off_5').value === '') {
            WarningSwal('금요일 입퇴실 시간을 제대로 입력하세요!');
            return false;
        }

        await axios.post("http://dolbomi.site/student_time_submit", user)
            .then(function (response) {
                console.log(response.data);
                if (response.data === "success") {
                    swal({
                        title: "추가되었습니다!",
                        icon: "success",
                        timer: 3000,
                        button: "확인"
                    })
                }
                else {
                    swal({
                        title: response.data,
                        icon: "error",
                        timer: 3000,
                        dangerMode: true,
                        button: "확인"
                    })
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
                            <input type="time" id="entry_1" name="entry_1" value={entry_1} onChange={e => onInputChange(e)} placeholder="월요일 입실 시간을 입력하세요." required="" />
                        </div>
                        <div class="form_item">
                            <label>월요일(퇴실시간)</label>
                            <input type="time" id="off_1" name="off_1" value={off_1} onChange={e => onInputChange(e)} placeholder="월요일 퇴실 시간을 입력하세요." required="" />
                        </div>
                    </div>

                    <div class="form_wrap full">
                        <div class="form_item">
                            <label>화요일(입실시간)</label>
                            <input type="time" id="entry_2" name="entry_2" value={entry_2} onChange={e => onInputChange(e)} placeholder="화요일 입실 시간을 입력하세요." required="" />
                        </div>
                        <div class="form_item">
                            <label>화요일(퇴실시간)</label>
                            <input type="time" id="off_2" name="off_2" value={off_2} onChange={e => onInputChange(e)} placeholder="화요일 퇴실 시간을 입력하세요." required="" />
                        </div>
                    </div>

                    <div class="form_wrap full">
                        <div class="form_item">
                            <label>수요일(입실시간)</label>
                            <input type="time" id="entry_3" name="entry_3" value={entry_3} onChange={e => onInputChange(e)} placeholder="수요일 입실 시간을 입력하세요." required="" />
                        </div>
                        <div class="form_item">
                            <label>수요일(퇴실시간)</label>
                            <input type="time" id="off_3" name="off_3" value={off_3} onChange={e => onInputChange(e)} placeholder="수요일 퇴실 시간을 입력하세요." required="" />
                        </div>
                    </div>

                    <div class="form_wrap full">
                        <div class="form_item">
                            <label>목요일(입실시간)</label>
                            <input type="time" id="entry_4" name="entry_4" value={entry_4} onChange={e => onInputChange(e)} placeholder="목요일 입실 시간을 입력하세요." required="" />
                        </div>
                        <div class="form_item">
                            <label>목요일(퇴실시간)</label>
                            <input type="time" id="off_4" name="off_4" value={off_4} onChange={e => onInputChange(e)} placeholder="목요일 퇴실 시간을 입력하세요." required="" />
                        </div>
                    </div>

                    <div class="form_wrap full">
                        <div class="form_item">
                            <label>금요일(입실시간)</label>
                            <input type="time" id="entry_5" name="entry_5" value={entry_5} onChange={e => onInputChange(e)} placeholder="금요일 입실 시간을 입력하세요." required="" />
                        </div>
                        <div class="form_item">
                            <label>금요일(퇴실시간)</label>
                            <input type="time" id="off_5" name="off_5" value={off_5} onChange={e => onInputChange(e)} placeholder="금요일 퇴실 시간을 입력하세요." required="" />
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
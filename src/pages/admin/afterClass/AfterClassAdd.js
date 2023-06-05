import '../addPages.css'
import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';

function AfterClassAdd() {
    let dayKind = [
        { value: "월" },
        { value: "화" },
        { value: "수" },
        { value: "목" },
        { value: "금" }
    ]

    const [user, setUser] = useState({
        id: 0,
        class_name: "",
        start_time: "",
        end_time: "",
        day: null
    });

    //  Object Destructuring 
    const { class_name, start_time, end_time, day } = user;

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

    const submitAfterClassRecord = async (e) => {
        e.preventDefault();
        e.target.reset();

        if(document.getElementById('class_name').value === ''){
            WarningSwal("방과후수업을 입력하세요!")
            return false;
        }
        if(document.getElementById('start_time').value === ''){
            WarningSwal("시작 시간을 입력하세요!")
            return false;
        }
        if(document.getElementById('end_time').value === ''){
            WarningSwal("종료 시간을 입력하세요!")
            return false;
        }

        await axios.post('http://dolbomi.site/after_school_class_submit', user)
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
                        title: "잘못 입력된 값이 존재합니다!",
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
            class_name: "",
            start_time: "",
            end_time: "",
            day: null
        });
    };

    return (
        <div class="wrapper">
            <div class="form_container">
                <form name="form" onSubmit={submitAfterClassRecord}>

                    <div class="form_item">
                        <label>방과후수업 이름</label>
                        <input type="text" id="class_name" name="class_name" value={class_name} onChange={e => onInputChange(e)} placeholder="방과후수업 이름을 입력하세요." required="" />
                    </div>

                    <div class="form_wrap full">
                        <div class="form_item">
                            <label>시작 시간</label>
                            <input type="time" id="start_time" name="start_time" value={start_time} onChange={e => onInputChange(e)} placeholder="시작 시간을 선택하세요." required="" />
                        </div>
                        <div class="form_item">
                            <label>종료 시간</label>
                            <input type="time" id="end_time" name="end_time" value={end_time} onChange={e => onInputChange(e)} placeholder="종료 시간을 선택하세요." required="" />
                        </div>
                    </div>

                    <div class="form_wrap" select_box>
                        <div class="form_item">
                            <label class="select">요일</label>
                            <select id="day" name="day" onChange={e => onInputChange_Select(e, "day")} required>
                                <option value="" selected>요일을 선택하세요.</option>
                                {dayKind.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.value}
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

export default AfterClassAdd;
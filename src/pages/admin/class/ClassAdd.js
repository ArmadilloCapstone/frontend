import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';

function ClassAdd() {
    const [user, setUser] = useState({
        id: 0,
        class_name: "",
        class_num: "",
        year: "",
        seme: ""
    });

    //  Object Destructuring 
    const { class_name, class_num, year, seme } = user;

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
        if (e.target.name == "class_num" && e.target.value < 1) {
            WarningSwal("양수 값만 입력할 수 있습니다.")
        }
        else if (e.target.name == "year" && e.target.value < 1) {
            WarningSwal("양수 값만 입력할 수 있습니다.")
        }
        else if (e.target.name == "seme" && (e.target.value != "" &&e.target.value != 1 && e.target.value != 2)) {
            WarningSwal("1과 2만 입력이 가능합니다.")
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    function changeUserForm(data) {
        var returnObj = {}
        returnObj['class_name'] = data.class_name;
        returnObj['class_num'] = data.class_num;
        returnObj['year_seme'] = data.year + "-" + data.seme;

        return returnObj;
    }

    const submitClassRecord = async (e) => {
        e.preventDefault();
        e.target.reset();

        if(document.getElementById('class_name').value === ''){
            WarningSwal("학급 이름을 입력하세요!");
            return false;
        }
        if(document.getElementById('class_num').value === ''){
            WarningSwal("학급 번호를 입력하세요!");
            return false;
        }
        if(document.getElementById('year').value === ''){
            WarningSwal("년도를 입력하세요!");
            return false;
        }
        if(document.getElementById('seme').value === ''){
            WarningSwal("학기를 입력하세요!");
            return false;
        }

        const postUser = changeUserForm(user);
        // console.log(postUser);
        await axios.post('http://dolbomi.site/dolbom_class_submit', postUser)
            .then(function (response) {
                // console.log(response.data);
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
                // console.log(reason.data);
            });
        onReset();
    };

    const onReset = () => {
        setUser({
            id: 0,
            class_name: "",
            class_num: "",
            year: "",
            seme: ""
        });
    };

    return (
        <div class="wrapper" style={{ fontFamily: "Eorinai" }}>
            <div class="form_container CM">
                <form name="form" onSubmit={submitClassRecord}>

                    <div class="form_item">
                        <label>학급 이름</label>
                        <input type="text" id="class_name" name="class_name" value={class_name} onChange={e => onInputChange(e)} placeholder="학급 이름을 입력하세요." required="" />
                    </div>

                    <div class="form_item">
                        <label>학급 번호</label>
                        <input type="number" id="class_num" name="class_num" value={class_num} onChange={e => onInputChange(e)} placeholder="학급 번호를 입력하세요." required="" />
                    </div>

                    <label>년도-학기</label>
                    <div class="form_wrap full">
                        <div class="form_item">
                            <label></label>
                            <input type="number" id="year" name="year" value={year} onChange={e => onInputChange(e)} placeholder="년도를 입력하세요." required="" />
                        </div>
                        <div class="form_item">
                            <label></label>
                            <input type="text" id="seme" name="seme" value={seme} onChange={e => onInputChange(e)} placeholder="학기를 입력하세요." required="" />
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

export default ClassAdd;
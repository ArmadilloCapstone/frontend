import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

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


    const onInputChange = e => {
        if (e.target.name == "class_num" && e.target.value < 1) {
            alert("양수 값만 입력할 수 있습니다.");
        }
        else if (e.target.name == "year" && e.target.value < 1) {
            alert("양수 값만 입력할 수 있습니다.");
        }
        else if (e.target.name == "seme" && (e.target.value != "" &&e.target.value != 1 && e.target.value != 2)) {
            alert("1과 2만 입력이 가능합니다..");
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
        const postUser = changeUserForm(user);
        console.log(postUser);
        await axios.post('http://dolbomi.site/dolbom_class_submit', postUser)
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

                    {/* <div class="form_wrap onlyone"> */}
                    <div class="form_item">
                        <label>학급 이름</label>
                        <input type="text" name="class_name" value={class_name} onChange={e => onInputChange(e)} placeholder="학급 이름을 입력하세요." required="" />
                    </div>
                    {/* </div> */}

                    <div class="form_item">
                        <label>학급 번호</label>
                        <input type="number" name="class_num" value={class_num} onChange={e => onInputChange(e)} placeholder="학급 번호를 입력하세요." required="" />
                    </div>

                    <label>년도-학기</label>
                    <div class="form_wrap full">
                        <div class="form_item">
                            <label></label>
                            <input type="number" name="year" value={year} onChange={e => onInputChange(e)} placeholder="년도를 입력하세요." required="" />
                        </div>
                        <div class="form_item">
                            <label></label>
                            <input type="text" name="seme" value={seme} onChange={e => onInputChange(e)} placeholder="학기를 입력하세요." required="" />
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
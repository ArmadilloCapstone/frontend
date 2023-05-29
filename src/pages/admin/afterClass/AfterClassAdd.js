import '../addPages.css'
import React, { useState, useEffect } from "react";
import axios from "axios";

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
    // const { class_name, class_num, year_seme } = user;
    const { class_name, start_time, end_time, day } = user;
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
        await axios.post('http://localhost/after_school_class_submit', user)
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
            start_time: "",
            end_time: "",
            day: null
        });
    };

    return (
        <div class="wrapper">
            <div class="form_container">
                <form name="form" onSubmit={submitAfterClassRecord}>

                    {/* <div class="form_wrap onlyone"> */}
                    <div class="form_item">
                        <label>방과후수업 이름</label>
                        <input type="text" name="class_name" value={class_name} onChange={e => onInputChange(e)} placeholder="방과후수업 이름을 입력하세요." required="" />
                    </div>
                    {/* </div> */}

                    <div class="form_wrap full">
                        <div class="form_item">
                            <label>시작 시간</label>
                            <input type="time" name="start_time" value={start_time} onChange={e => onInputChange(e)} placeholder="시작 시간을 선택하세요." required="" />
                        </div>
                        <div class="form_item">
                            <label>종료 시간</label>
                            <input type="time" name="end_time" value={end_time} onChange={e => onInputChange(e)} placeholder="종료 시간을 선택하세요." required="" />
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

        // <div class="col-sm-4" style={{ width: "100%", textAlign: "center" }}>
        //     <div className="box p-3 mb-3 mt-3" style={{ border: "1px solid #d0d0d0", height: "100%", width: "700px", margin: "auto" }}>
        //         <form onSubmit={submitAfterClassRecord}>
        //             <h5 className="mb-3 ">추가할 방과후수업의 정보를 입력하세요.</h5>
        //             <div class="form-group">
        //                 <input type="text" class="form-control  mb-4" name="class_name" value={class_name} onChange={e => onInputChange(e)} placeholder="방과후수업 이름을 입력하세요." required="" />
        //             </div>

        //             <div class="form-group">
        //                 <input type="time" class="form-control mb-4" name="start_time" value={start_time} onChange={e => onInputChange(e)} placeholder="시작 시간을 입력하세요." required="" />
        //             </div>

        //             <div class="form-group">
        //                 <input type="time" class="form-control mb-4" name="end_time" value={end_time} onChange={e => onInputChange(e)} placeholder="종료 시간을 입력하세요." required="" />
        //             </div>

        //             <select id="day" name="day" className="custom-select d-block w-100" onChange={e => onInputChange_Select(e, "day")} required>
        //                 <option value="" selected>요일을 입력하세요.</option>
        //                 {dayKind.map((option) => (
        //                     <option
        //                         key={option.value}
        //                         value={option.value}
        //                     >
        //                         {option.value}
        //                     </option>
        //                 ))}
        //             </select>

        //             <div style={{ width: "100%", textAlign: "center" }}>
        //                 <button type="submit" class="btn btn-primary btn-block mt-2">추가</button>
        //             </div>
        //         </form>
        //     </div>
        // </div>

    )
}

export default AfterClassAdd;
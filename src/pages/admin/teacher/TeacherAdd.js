import '../addPages.css'
import React, { useState, useEffect } from "react";
import axios from "axios";

function TeacherAdd() {
    let genderKind = [{ value: "남" }, { value: "여" }];

    const [dolbom, setDolbom] = useState([]);

    useEffect(() => {
        axios.post('http://dolbomi.site/teacher/dolbom_classList') // url 모름.. 변경 필요할듯
            .then(function (response) {
                console.log(response.data);
                setDolbom(response.data.map(function (el, idx) {
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
        // phone_num: "",
        phone_num1: "",
        phone_num2: "",
        phone_num3: "",
        gender: "",
        birth_date: "",
        class_name: "",
        class_id: null
    });

    //  Object Destructuring 
    const { name, phone_num1, phone_num2, phone_num3, gender, birth_date, class_name, class_id } = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    function onInputChange_Select(e, selectIdName) {
        var selectInput = document.getElementById(selectIdName);
        var value = (selectInput.options[selectInput.selectedIndex].value);
        setUser({ ...user, [e.target.name]: value });
    };

    // 서버로 전송하는 데이터(연락처) format 변경
    function changeUserForm(data) {
        var returnObj = {}
        returnObj['name'] = data.name;
        returnObj['phone_num'] = data.phone_num1 + "-" + data.phone_num2 + "-" + data.phone_num3;
        returnObj['gender'] = data.gender;
        returnObj['birth_date'] = data.birth_date;
        returnObj['class_name'] = data.class_name;

        return returnObj;
    }

    // Insert Teacher Records 
    const submitTeacherRecord = async (e) => {
        e.preventDefault();
        e.target.reset();
        const postUser = changeUserForm(user);
        await axios.post('http://dolbomi.site/teacher_submit', postUser);
        console.log(postUser);
        // await axios.post('/teacher_submit', user);
        alert('추가되었습니다!');

        // loadTeacherDetail();
    };

    return (
        <div class="wrapper">
            <div class="form_container TM">
                <form name="form" onSubmit={submitTeacherRecord}>

                    <div class="form_item">
                        <label>이름</label>
                        <input type="text" name="name" value={name} onChange={e => onInputChange(e)} placeholder="이름을 입력하세요." required="" />
                    </div>
                    {/* </div> */}

                    <label>연락처</label>
                    <div class="form_wrap full">
                        <div class="form_item">
                            <label> </label>
                            <input type="text" name="phone_num1" value={phone_num1} onChange={e => onInputChange(e)} placeholder="연락처를 입력하세요." required="" />
                        </div>
                        <div class="form_item">
                            <label> </label>
                            <input type="text" name="phone_num2" value={phone_num2} onChange={e => onInputChange(e)} placeholder="연락처를 입력하세요." required="" />
                        </div>
                        <div class="form_item">
                            <label> </label>
                            <input type="text" name="phone_num3" value={phone_num3} onChange={e => onInputChange(e)} placeholder="연락처를 입력하세요." required="" />
                        </div>
                    </div>

                    <div class="form_wrap" select_box>
                        <div class="form_item">
                            <label class="select">성별</label>
                            <select id="gender" name="gender" onChange={e => onInputChange_Select(e, "gender")} required>
                                <option value="" selected>성별을 선택하세요.</option>
                                {genderKind.map((option) => (
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

                    <div class="form_wrap" select_box>
                        <div class="form_item">
                            <label>생년월일</label>
                            <input type="date" max="9999-12-31" name="birth_date" value={birth_date} onChange={e => onInputChange(e)} placeholder="생년월일을 입력하세요." required="" />
                        </div>
                    </div>

                    <div class="form_wrap" select_box>
                        <div class="form_item">
                            <label class="select">돌봄 반</label>
                            <select id="class_name" name="class_name" onChange={e => onInputChange_Select(e, "class_name")} required>
                                <option value="" selected>돌봄 반을 선택하세요.</option>
                                {dolbom.map((option) => (
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
        //         <form onSubmit={submitTeacherRecord}>
        //             <h5 className="mb-3 ">추가할 돌봄교사의 정보를 입력하세요.</h5>
        //             <div class="form-group">
        //                 <input type="text" class="form-control  mb-4" name="name" value={name} onChange={e => onInputChange(e)} placeholder="이름을 입력하세요." required="" />
        //             </div>

        //             <div class="form-group">
        //                 <input type="text" class="form-control mb-4" name="phone_num1" value={phone_num1} onChange={e => onInputChange(e)} placeholder="연락처를 입력하세요." required="" />
        //                 <span>-</span>
        //                 <input type="text" class="form-control mb-4" name="phone_num2" value={phone_num2} onChange={e => onInputChange(e)} placeholder="연락처를 입력하세요." required="" />
        //                 <span>-</span>
        //                 <input type="text" class="form-control mb-4" name="phone_num3" value={phone_num3} onChange={e => onInputChange(e)} placeholder="연락처를 입력하세요." required="" />
        //             </div>

        //             <select id="gender" name="gender" className="custom-select d-block w-100" onChange={e => onInputChange_Select(e, "gender")} required>
        //                 <option value="" selected>성별을 입력하세요.</option>
        //                 {genderKind.map((option) => (
        //                     <option
        //                         key={option.value}
        //                         value={option.value}
        //                     >
        //                         {option.value}
        //                     </option>
        //                 ))}
        //             </select>

        //             <div class="form-group">
        //                 <input type="date" max="9999-12-31" class="form-control mb-4" name="birth_date" value={birth_date} onChange={e => onInputChange(e)} placeholder="생년월일을 입력하세요." required="" />
        //             </div>

        //             <select id="class_name" name="class_name" className="custom-select d-block w-100" onChange={e => onInputChange_Select(e, "class_name")} required>
        //                 <option value="" selected>돌봄 반을 입력하세요.</option>
        //                 {dolbom.map((option) => (
        //                     <option
        //                         key={option.class_name}
        //                         value={option.class_name}
        //                     >
        //                         {option.class_name}
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

export default TeacherAdd;
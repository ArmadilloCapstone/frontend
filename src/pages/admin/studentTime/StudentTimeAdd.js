import '../addPages.css'
import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentTimeAdd() {
    const [student, setStudent] = useState([]);

    useEffect(() => {
        axios.post('/studentFindAll') // url 모름.. 변경 필요할듯
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
        await axios.post("/student_time_submit", user);
        alert('추가되었습니다!');

        // loadStudentTimeDetail();
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

            </div >
        </div >



        // <div class="col-sm-4" style={{ width: "100%", textAlign: "center" }}>
        //     <div className="box p-3 mb-3 mt-3" style={{ border: "1px solid #d0d0d0", height: "100%", width: "700px", margin: "auto" }}>
        //         <form onSubmit={submitStudentTimeRecord}>
        //             <h5 className="mb-3 ">추가할 학생 입퇴실 시간 정보를 입력하세요.</h5>
        //             <select id="name" name="name" className="custom-select d-block w-100" onChange={e => onInputChange_Select(e, "name")} required>
        //                 <option value="" selected>학생 이름을 입력하세요.</option>
        //                 {student.map((option) => (
        //                     <option
        //                         key={option.name}
        //                         value={option.name}
        //                     >
        //                         {option.name}
        //                     </option>
        //                 ))}
        //             </select>

        //             <div class="form-group">
        //                 <input type="time" class="form-control mb-4" name="entry_1" value={entry_1} onChange={e => onInputChange(e)} placeholder="월요일 입실 시간을 입력하세요." required="" />
        //             </div>

        //             <div class="form-group">
        //                 <input type="time" class="form-control mb-4" name="off_1" value={off_1} onChange={e => onInputChange(e)} placeholder="월요일 퇴실 시간을 입력하세요." required="" />
        //             </div>

        //             <div class="form-group">
        //                 <input type="time" class="form-control mb-4" name="entry_2" value={entry_2} onChange={e => onInputChange(e)} placeholder="화요일 입실 시간을 입력하세요." required="" />
        //             </div>

        //             <div class="form-group">
        //                 <input type="time" class="form-control mb-4" name="off_2" value={off_2} onChange={e => onInputChange(e)} placeholder="화요일 퇴실 시간을 입력하세요." required="" />
        //             </div>

        //             <div class="form-group">
        //                 <input type="time" class="form-control mb-4" name="entry_3" value={entry_3} onChange={e => onInputChange(e)} placeholder="수요일 입실 시간을 입력하세요." required="" />
        //             </div>

        //             <div class="form-group">
        //                 <input type="time" class="form-control mb-4" name="off_3" value={off_3} onChange={e => onInputChange(e)} placeholder="수요일 퇴실 시간을 입력하세요." required="" />
        //             </div>

        //             <div class="form-group">
        //                 <input type="time" class="form-control mb-4" name="entry_4" value={entry_4} onChange={e => onInputChange(e)} placeholder="목요일 입실 시간을 입력하세요." required="" />
        //             </div>

        //             <div class="form-group">
        //                 <input type="time" class="form-control mb-4" name="off_4" value={off_4} onChange={e => onInputChange(e)} placeholder="목요일 퇴실 시간을 입력하세요." required="" />
        //             </div>

        //             <div class="form-group">
        //                 <input type="time" class="form-control mb-4" name="entry_5" value={entry_5} onChange={e => onInputChange(e)} placeholder="금요일 입실 시간을 입력하세요." required="" />
        //             </div>

        //             <div class="form-group">
        //                 <input type="time" class="form-control mb-4" name="off_5" value={off_5} onChange={e => onInputChange(e)} placeholder="금요일 퇴실 시간을 입력하세요." required="" />
        //             </div>

        //             <div style={{ width: "100%", textAlign: "center" }}>
        //                 <button type="submit" class="btn btn-primary btn-block mt-2">추가</button>
        //             </div>
        //         </form>
        //     </div>
        // </div>

    )
}

export default StudentTimeAdd;
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function ClassAdd() {
    const [user, setUser] = useState({
        id: 0,
        class_name: "",
        class_num: "",
        // year_seme: "",
        year: "",
        seme: ""
    });

    //  Object Destructuring 
    // const { class_name, class_num, year_seme } = user;
    const { class_name, class_num, year, seme } = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
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
        await axios.post('http://13.209.104.24:8080/dolbom_class_submit', postUser);
        // await axios.post('/dolbom_class_submit', user);
        alert('추가되었습니다!');

        // loadClassDetail();
    };

    return (
        <div class="wrapper">
            <div class="form_container">
                <form name="form" onSubmit={submitClassRecord}>
                    <div class="heading">
                        <h2>돌봄학급 추가</h2>
                    </div>

                    {/* <div class="form_wrap onlyone"> */}
                    <div class="form_item">
                        <label>학급 이름</label>
                        <input type="text" name="class_name" value={class_name} onChange={e => onInputChange(e)} placeholder="학급 이름을 입력하세요." required="" />
                    </div>
                    {/* </div> */}

                    <div class="form_item">
                        <label>학급 번호</label>
                        <input type="text" name="class_num" value={class_num} onChange={e => onInputChange(e)} placeholder="학급 번호를 입력하세요." required="" />
                    </div>

                    <label>년도-학기</label>
                    <div class="form_wrap full">
                        <div class="form_item">
                            <label></label>
                            <input type="text" name="year" value={year} onChange={e => onInputChange(e)} placeholder="년도를 입력하세요." required="" />
                        </div>
                        <div class="form_item">
                            <label></label>
                            <input type="text" name="seme" value={seme} onChange={e => onInputChange(e)} placeholder="학기를 입력하세요." required="" />
                        </div>
                    </div>
                    <div style={{ width: "100%", textAlign: "center" }}>
                    <button type="submit" class="add">추가</button>
                    </div>
                </form>
               
            </div >
        </div >








        // <div class="col-sm-4" style={{ width: "100%", textAlign: "center" }}>
        //     <div className="box p-3 mb-3 mt-3" style={{ border: "1px solid #d0d0d0", height: "100%", width: "700px", margin: "auto" }}>
        //         <form onSubmit={submitClassRecord}>
        //             <h5 className="mb-3 ">추가할 돌봄학급의 정보를 입력하세요.</h5>
        //             <div class="form-group">
        //                 <input type="text" class="form-control  mb-4" name="class_name" value={class_name} onChange={e => onInputChange(e)} placeholder="학급 이름을 입력하세요." required="" />
        //             </div>

        //             <div class="form-group">
        //                 <input type="text" class="form-control mb-4" name="class_num" value={class_num} onChange={e => onInputChange(e)} placeholder="학급 번호를 입력하세요." required="" />
        //             </div>

        //             {/* <div class="form-group">
        //           <input type="text" class="form-control mb-4" name="year_seme" value={year_seme} onChange={e => onInputChange(e)} placeholder="년도-학기를 입력하세요." required="" />
        //         </div> */}
        //             <div class="form-group" display="inline-block">
        //                 <input type="text" class="form-control mb-4" name="year" value={year}
        //                     onChange={e => onInputChange(e)} placeholder="년도를 입력하세요." required="" />
        //                 <span>-</span>
        //                 <input type="text" class="form-control mb-4" name="seme" value={seme}
        //                     onChange={e => onInputChange(e)} placeholder="학기를 입력하세요." required="" />
        //             </div>


        //             <div style={{ width: "100%", textAlign: "center" }}>
        //                 <button type="submit" class="btn btn-primary btn-block mt-2">추가</button>
        //             </div>
        //         </form>
        //     </div>
        // </div>

    )
}

export default ClassAdd;
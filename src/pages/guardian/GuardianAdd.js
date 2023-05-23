import React, { useState, useEffect } from "react";
import axios from "axios";

function GuardianAdd() {
  let genderKind = [{ value: "남" }, { value: "여" }];
  let gradeKind = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }];

  const [dolbom, setDolbom] = useState([]);
  const [original, setOriginal] = useState([]);

  useEffect(() => {
    axios.post('http://dolbomi.site/student/dolbom_classList') // url 모름.. 변경 필요할듯
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

  useEffect(() => {
    axios.post('http://dolbomi.site/student_original_class') // url 모름.. 변경 필요할듯
      .then(function (response) {
        console.log(response.data);
        setOriginal(response.data.map(function (el, idx) {
          var returnObj = {}
          returnObj['original_class_num'] = el.original_class_num;
          return returnObj;
        }));
      }).catch(function (reason) {
        console.log(reason);
      });
  }, []);

  const [user, setUser] = useState({
    id: 0,
    name: "",
    grade: null,
    // phone_num: "",
    phone_num1: "",
    phone_num2: "",
    phone_num3: "",
    gender: "",
    class_id: null,
    original_class_num: null,
    birth_date: ""
  });

  //  Object Destructuring 
  const { name, grade, phone_num1, phone_num2, phone_num3, gender, class_name, original_class_num, birth_date } = user;
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
    returnObj['grade'] = data.grade;
    returnObj['phone_num'] = data.phone_num1 + "-" + data.phone_num2 + "-" + data.phone_num3;
    returnObj['gender'] = data.gender;
    returnObj['class_name'] = data.class_name;
    returnObj['original_class_num'] = data.original_class_num;
    returnObj['birth_date'] = data.birth_date;

    return returnObj;
  }

  // Insert Student Records 
  const submitStudentRecord = async (e) => {
    e.preventDefault();
    e.target.reset();
    const postUser = changeUserForm(user);
    await axios.post('http://dolbomi.site/student_submit', postUser);
    // await axios.post("/student_submit", user);
    alert('추가되었습니다!');

    // loadStudentDetail();
  };

  return (
    <div class="wrapper">
      <div class="form_container">
        <form name="form" onSubmit={submitStudentRecord}>

          {/* <div class="form_wrap onlyone"> */}
          <div class="form_item">
            <label>이름</label>
            <input type="text" name="name" value={name} onChange={e => onInputChange(e)} placeholder="이름을 입력하세요." required="" />
          </div>

          <div class="form_wrap" select_box>
            <div class="form_item">
              <label class="select">학년</label>
              <select id="grade" name="grade" onChange={e => onInputChange_Select(e, "grade")} required>
                <option value="" selected>학년을 선택하세요.</option>
                {gradeKind.map((option) => (
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

          <label>연락처</label>
          <div class="form_wrap full">
            <div class="form_item">
              <label></label>
              <input type="text" name="phone_num1" value={phone_num1} onChange={e => onInputChange(e)} placeholder="연락처를 입력하세요." required="" />
            </div>
            <div class="form_item">
              <label></label>
              <input type="text" name="phone_num2" value={phone_num2} onChange={e => onInputChange(e)} placeholder="연락처를 입력하세요." required="" />
            </div>
            <div class="form_item">
              <label></label>
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

          <div class="form_wrap" select_box>
            <div class="form_item">
              <label class="select">기존 반</label>
              <select id="original_class_num" name="original_class_num" onChange={e => onInputChange_Select(e, "original_class_num")} required>
                <option value="" selected>기존 반을 선택하세요.</option>
                {original.map((option) => (
                  <option
                    key={option.original_class_num}
                    value={option.original_class_num}
                  >
                    {option.original_class_num}
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
          <div style={{ width: "100%", textAlign: "center" }}>
            <button type="submit" class="add">추가하기</button>
          </div>
        </form>
      </div >
    </div >



    // <div class="col-sm-4" style={{ width: "100%", textAlign: "center" }}>
    //   <div className="box p-3 mb-3 mt-3" style={{ border: "1px solid #d0d0d0", height: "100%", width: "700px", margin: "auto" }}>
    //     <form onSubmit={submitStudentRecord}>
    //       <h5 className="mb-3 ">추가할 돌봄학생의 정보를 입력하세요.</h5>
    //       <div class="form-group">
    //         <input type="text" class="form-control  mb-4" name="name" value={name} onChange={e => onInputChange(e)} placeholder="이름을 입력하세요." required="" />
    //       </div>

    //       <select id="grade" name="grade" className="custom-select d-block w-100" onChange={e => onInputChange_Select(e, "grade")} required>
    //         <option value="" selected>학년을 입력하세요.</option>
    //         {gradeKind.map((option) => (
    //           <option
    //             key={option.value}
    //             value={option.value}
    //           >
    //             {option.value}
    //           </option>
    //         ))}
    //       </select>

    //       <div class="form-group">
    //         <input type="text" class="form-control mb-4" name="phone_num1" value={phone_num1} onChange={e => onInputChange(e)} placeholder="연락처를 입력하세요." required="" />
    //         <span>-</span>
    //         <input type="text" class="form-control mb-4" name="phone_num2" value={phone_num2} onChange={e => onInputChange(e)} placeholder="연락처를 입력하세요." required="" />
    //         <span>-</span>
    //         <input type="text" class="form-control mb-4" name="phone_num3" value={phone_num3} onChange={e => onInputChange(e)} placeholder="연락처를 입력하세요." required="" />
    //       </div>

    //       <select id="gender" name="gender" className="custom-select d-block w-100" onChange={e => onInputChange_Select(e, "gender")} required>
    //         <option value="" selected>성별을 입력하세요.</option>
    //         {genderKind.map((option) => (
    //           <option
    //             key={option.value}
    //             value={option.value}
    //           >
    //             {option.value}
    //           </option>
    //         ))}
    //       </select>

    //       <select id="class_name" name="class_name" className="custom-select d-block w-100" onChange={e => onInputChange_Select(e, "class_name")} required>
    //         <option value="" selected>돌봄 반을 입력하세요.</option>
    //         {dolbom.map((option) => (
    //           <option
    //             key={option.class_name}
    //             value={option.class_name}
    //           >
    //             {option.class_name}
    //           </option>
    //         ))}
    //       </select>

    //       <select id="original_class_num" name="original_class_num" className="custom-select d-block w-100" onChange={e => onInputChange_Select(e, "original_class_num")} required>
    //         <option value="" selected>기존 반을 입력하세요.</option>
    //         {original.map((option) => (
    //           <option
    //             key={option.original_class_num}
    //             value={option.original_class_num}
    //           >
    //             {option.original_class_num}
    //           </option>
    //         ))}
    //       </select>

    //       <div class="form-group">
    //         <input type="date" max="9999-12-31" class="form-control  mb-4" name="birth_date" value={birth_date} onChange={e => onInputChange(e)} placeholder="생년월일을 입력하세요." required="" />
    //       </div>

    //       <div style={{ width: "100%", textAlign: "center" }}>
    //         <button type="submit" class="btn btn-primary btn-block mt-2">추가</button>
    //       </div>
    //     </form>
    //   </div>
    // </div>

  )
}

export default GuardianAdd;
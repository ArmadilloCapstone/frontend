import '../addPages.css'
import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';

function ParentAdd() {
  let genderKind = [{ value: "남" }, { value: "여" }];

  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios.post('http://dolbomi.site/parent/studentList')
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
    phone_num1: "",
    phone_num2: "",
    phone_num3: "",
    gender: "",
    birth_date: "",
    child_name: "",
  });

  //  Object Destructuring 
  const { name, phone_num1, phone_num2, phone_num3, gender, birth_date, child_name } = user;

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
    if (e.target.name == "phone_num1" && !(e.target.value >= 0 && e.target.value <= 999)) {
      WarningSwal("올바른 숫자를 입력해 주십시오");
    }
    else if (e.target.name == "phone_num2" && !(e.target.value >= 0 && e.target.value <= 9999)) {
      WarningSwal("올바른 숫자를 입력해 주십시오");
    }
    else if (e.target.name == "phone_num3" && !(e.target.value >= 0 && e.target.value <= 9999)) {
      WarningSwal("올바른 숫자를 입력해 주십시오");
    }
    else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
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
    returnObj['child_name'] = data.child_name;

    return returnObj;
  }

  // Insert Parent Records 
  const submitParentRecord = async (e) => {
    e.preventDefault();
    e.target.reset();

    if (document.getElementById('name').value === '') {
      WarningSwal('학부모 이름을 입력하세요!');
      return false;
    }
    if (document.getElementById('phone_num1').value === '' || document.getElementById('phone_num2').value === ''
      || document.getElementById('phone_num3').value === '') {
      WarningSwal('연락처를 입력하세요!');
      return false;
    }
    if (document.getElementById('birth_date').value === '') {
      WarningSwal('생년월일을 입력하세요!');
      return false;
    }

    const postUser = changeUserForm(user);
    await axios.post('http://dolbomi.site/parent_submit', postUser)
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
      name: "",
      phone_num1: "",
      phone_num2: "",
      phone_num3: "",
      gender: "",
      birth_date: "",
      child_name: "",
    });
  };

  return (
    <div class="wrapper">
      <div class="form_container">
        <form name="form" onSubmit={submitParentRecord}>
          
          <div class="form_item">
            <label>학부모 이름</label>
            <input type="text" id="name" name="name" value={name} onChange={e => onInputChange(e)} placeholder="학부모 이름을 입력하세요." required="" />
          </div>

          <label>학부모 연락처</label>
          <div class="form_wrap full">
            <div class="form_item">
              <label></label>
              <input type="text" id="phone_num1" name="phone_num1" value={phone_num1} onChange={e => onInputChange(e)} placeholder="연락처를 입력하세요." required="" />
            </div>
            <div class="form_item">
              <label></label>
              <input type="text" id="phone_num2" name="phone_num2" value={phone_num2} onChange={e => onInputChange(e)} placeholder="연락처를 입력하세요." required="" />
            </div>
            <div class="form_item">
              <label></label>
              <input type="text" id="phone_num3" name="phone_num3" value={phone_num3} onChange={e => onInputChange(e)} placeholder="연락처를 입력하세요." required="" />
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
              <input type="date" max="2023-06-08" id="birth_date" name="birth_date" value={birth_date} onChange={e => onInputChange(e)} placeholder="생년월일을 입력하세요." required="" />
            </div>
          </div>

          <div class="form_wrap" select_box>
            <div class="form_item">
              <label class="select">학생 이름</label>
              <select id="child_name" name="child_name" onChange={e => onInputChange_Select(e, "child_name")} required>
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
          <div style={{ width: "100%", textAlign: "center" }}>
            <button type="submit" class="add">추가하기</button>
          </div>
        </form>

      </div >
    </div >
  )
}

export default ParentAdd;